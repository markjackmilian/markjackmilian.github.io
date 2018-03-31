/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.7.1
 */
Bridge.assembly("Bridge.Navigation", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Navigation.INavigator", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.INavigatorConfigurator", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.BridgeNavigatorWithRouting.UrlDescriptor", {
        props: {
            FullBaseUrl: null,
            PageId: null,
            Parameters: null
        }
    });

    Bridge.define("Bridge.Navigation.IAmLoadable", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IPageDescriptor", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.NavigationUtility", {
        statics: {
            fields: {
                /**
                 * Define virtual directory for something like:
                 protocol://awesomesite.io/somedirectory
                 *
                 * @static
                 * @public
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @type string
                 */
                VirtualDirectory: null
            },
            methods: {
                /**
                 * Push state on history
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.NavigationUtility
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @param   {string}                                     pageId        
                 * @param   {System.Collections.Generic.Dictionary$2}    parameters
                 * @return  {void}
                 */
                PushState: function (pageId, parameters) {
                    if (parameters === void 0) { parameters = null; }
                    var baseUrl = Bridge.Navigation.NavigationUtility.BuildBaseUrl(pageId);

                    window.history.pushState(null, "", parameters != null ? System.String.format("{0}={1}", baseUrl, Bridge.global.btoa(JSON.stringify(parameters))) : baseUrl);
                },
                /**
                 * replace state on history
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.NavigationUtility
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @param   {string}                                     pageId        
                 * @param   {System.Collections.Generic.Dictionary$2}    parameters
                 * @return  {void}
                 */
                ReplaceState: function (pageId, parameters) {
                    if (parameters === void 0) { parameters = null; }
                    Bridge.Navigation.NavigationUtility.PushState(pageId, parameters);
                },
                /**
                 * Get parameter key from parameters dictionary
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.NavigationUtility
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @param   {Function}                                   T             
                 * @param   {System.Collections.Generic.Dictionary$2}    parameters    
                 * @param   {string}                                     paramKey
                 * @return  {T}
                 */
                GetParameter: function (T, parameters, paramKey) {
                    if (parameters == null) {
                        throw new System.Exception("Parameters is null!");
                    }

                    if (!parameters.containsKey(paramKey)) {
                        throw new System.Exception(System.String.format("No parameter with key {0} found!", [paramKey]));
                    }

                    var value = parameters.get(paramKey);
                    return Bridge.cast(Bridge.unbox(value), T);
                },
                /**
                 * Build base url using page id and virtual directory
                 *
                 * @static
                 * @private
                 * @this Bridge.Navigation.NavigationUtility
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @param   {string}    pageId
                 * @return  {string}
                 */
                BuildBaseUrl: function (pageId) {
                    var baseUrl = System.String.format("{0}//{1}", window.location.protocol, window.location.host);
                    baseUrl = System.String.isNullOrEmpty(Bridge.Navigation.NavigationUtility.VirtualDirectory) ? System.String.format("{0}#{1}", baseUrl, pageId) : System.String.format("{0}/{1}#{2}", baseUrl, Bridge.Navigation.NavigationUtility.VirtualDirectory, pageId);
                    return baseUrl;
                }
            }
        }
    });

    /** @namespace Bridge.Navigation */

    /**
     * INavigator implementation
     *
     * @public
     * @class Bridge.Navigation.BridgeNavigator
     * @implements  Bridge.Navigation.INavigator
     */
    Bridge.define("Bridge.Navigation.BridgeNavigator", {
        inherits: [Bridge.Navigation.INavigator],
        statics: {
            fields: {
                _actualController: null
            }
        },
        fields: {
            Configuration: null
        },
        props: {
            LastNavigateController: {
                get: function () {
                    return Bridge.Navigation.BridgeNavigator._actualController;
                }
            }
        },
        alias: [
            "EnableSpafAnchors", "Bridge$Navigation$INavigator$EnableSpafAnchors",
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "LastNavigateController", "Bridge$Navigation$INavigator$LastNavigateController",
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation"
        ],
        ctors: {
            ctor: function (configuration) {
                this.$initialize();
                this.Configuration = configuration;
            }
        },
        methods: {
            EnableSpafAnchors: function () {
                var allAnchors = $("a");
                allAnchors.off(System.Enum.toString(System.String, "click"));
                allAnchors.click(Bridge.fn.bind(this, $asm.$.Bridge.Navigation.BridgeNavigator.f1));
            },
            /**
             * Navigate to a page ID.
             The ID must be registered.
             *
             * @instance
             * @public
             * @this Bridge.Navigation.BridgeNavigator
             * @memberof Bridge.Navigation.BridgeNavigator
             * @param   {string}                                     pageId        
             * @param   {System.Collections.Generic.Dictionary$2}    parameters
             * @return  {void}
             */
            Navigate: function (pageId, parameters) {
                var $t;
                if (parameters === void 0) { parameters = null; }
                var page = this.Configuration.Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey(pageId);
                if (page == null) {
                    throw new System.Exception(System.String.format("Page not found with ID {0}", [pageId]));
                }

                // check redirect rule
                var redirectKey = !Bridge.staticEquals(($t = page.Bridge$Navigation$IPageDescriptor$RedirectRules), null) ? $t() : null;
                if (!System.String.isNullOrEmpty(redirectKey)) {
                    this.Navigate(redirectKey, parameters);
                    return;
                }

                var body = this.Configuration.Bridge$Navigation$INavigatorConfigurator$Body;
                if (body == null) {
                    throw new System.Exception("Cannot find navigation body element.");
                }

                this.Configuration.Bridge$Navigation$INavigatorConfigurator$Body.load(page.Bridge$Navigation$IPageDescriptor$HtmlLocation(), null, Bridge.fn.bind(this, function (o, s, a) {
                    var $t1, $t2;
                    // prepare page
                    !Bridge.staticEquals(($t1 = page.Bridge$Navigation$IPageDescriptor$PreparePage), null) ? $t1() : null;

                    // auto enable spaf anchors
                    if (!this.Configuration.Bridge$Navigation$INavigatorConfigurator$DisableAutoSpafAnchorsOnNavigate) {
                        var enableAnchors = !Bridge.staticEquals(($t2 = page.Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors), null) ? $t2() : null;
                        if (System.Nullable.hasValue(enableAnchors) && System.Nullable.getValue(enableAnchors)) {
                            this.EnableSpafAnchors();
                        }
                    }

                    if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$PageController, null)) {
                        // leave actual controlelr
                        if (this.LastNavigateController != null) {
                            this.LastNavigateController.Bridge$Navigation$IAmLoadable$OnLeave();
                        }

                        // load new controller
                        var controller = page.Bridge$Navigation$IPageDescriptor$PageController();
                        controller.Bridge$Navigation$IAmLoadable$OnLoad(parameters);

                        Bridge.Navigation.BridgeNavigator._actualController = controller;
                    }

                }));
            },
            /**
             * Subscribe to anchors click
             *
             * @instance
             * @public
             * @this Bridge.Navigation.BridgeNavigator
             * @memberof Bridge.Navigation.BridgeNavigator
             * @return  {void}
             */
            InitNavigation: function () {
                this.EnableSpafAnchors();

                // go home
                this.Navigate(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId);
            }
        }
    });

    Bridge.ns("Bridge.Navigation.BridgeNavigator", $asm.$);

    Bridge.apply($asm.$.Bridge.Navigation.BridgeNavigator, {
        f1: function (ev) {
            var clickedElement = ev.target;

            if (!Bridge.referenceEquals(Bridge.getType(clickedElement), HTMLAnchorElement)) {
                clickedElement = $(ev.target).parents("a").get(0);
            }

            var href = clickedElement.getAttribute("href");

            if (System.String.isNullOrEmpty(href)) {
                return;
            }

            var isMyHref = System.String.startsWith(href, "spaf:");

            // if is my href
            if (isMyHref) {
                ev.preventDefault();
                var pageId = System.String.replaceAll(href, "spaf:", "");
                this.Navigate(pageId);
            }

            // anchor default behaviour
        }
    });

    /**
     * INavigatorConfigurator Implementation. Must be extended.
     *
     * @abstract
     * @public
     * @class Bridge.Navigation.BridgeNavigatorConfigBase
     * @implements  Bridge.Navigation.INavigatorConfigurator
     */
    Bridge.define("Bridge.Navigation.BridgeNavigatorConfigBase", {
        inherits: [Bridge.Navigation.INavigatorConfigurator],
        fields: {
            _routes: null
        },
        alias: ["GetPageDescriptorByKey", "Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey"],
        ctors: {
            ctor: function () {
                this.$initialize();
                this._routes = this.CreateRoutes();
            }
        },
        methods: {
            GetPageDescriptorByKey: function (key) {
                return System.Linq.Enumerable.from(this._routes).singleOrDefault(function (s) {
                        return System.String.equals(s.Bridge$Navigation$IPageDescriptor$Key, key, 1);
                    }, null);
            }
        }
    });

    Bridge.define("Bridge.Navigation.PageDescriptor", {
        inherits: [Bridge.Navigation.IPageDescriptor],
        props: {
            Key: null,
            HtmlLocation: null,
            PageController: null,
            CanBeDirectLoad: null,
            PreparePage: null,
            RedirectRules: null,
            AutoEnableSpafAnchors: null
        },
        alias: [
            "Key", "Bridge$Navigation$IPageDescriptor$Key",
            "HtmlLocation", "Bridge$Navigation$IPageDescriptor$HtmlLocation",
            "PageController", "Bridge$Navigation$IPageDescriptor$PageController",
            "CanBeDirectLoad", "Bridge$Navigation$IPageDescriptor$CanBeDirectLoad",
            "PreparePage", "Bridge$Navigation$IPageDescriptor$PreparePage",
            "RedirectRules", "Bridge$Navigation$IPageDescriptor$RedirectRules",
            "AutoEnableSpafAnchors", "Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                this.AutoEnableSpafAnchors = $asm.$.Bridge.Navigation.PageDescriptor.f1;
            }
        }
    });

    Bridge.ns("Bridge.Navigation.PageDescriptor", $asm.$);

    Bridge.apply($asm.$.Bridge.Navigation.PageDescriptor, {
        f1: function () {
            return true;
        }
    });

    Bridge.define("Bridge.Navigation.BridgeNavigatorWithRouting", {
        inherits: [Bridge.Navigation.BridgeNavigator],
        alias: [
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation"
        ],
        ctors: {
            ctor: function (configuration) {
                this.$initialize();
                Bridge.Navigation.BridgeNavigator.ctor.call(this, configuration);
                window.onpopstate = Bridge.fn.combine(window.onpopstate, Bridge.fn.bind(this, function (e) {
                    var urlInfo = this.ParseUrl();
                    this.NavigateWithoutPushState(System.String.isNullOrEmpty(urlInfo.PageId) ? configuration.Bridge$Navigation$INavigatorConfigurator$HomeId : urlInfo.PageId, urlInfo.Parameters);
                }));
            }
        },
        methods: {
            NavigateWithoutPushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                Bridge.Navigation.BridgeNavigator.prototype.Navigate.call(this, pageId, parameters);
            },
            Navigate: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                Bridge.Navigation.NavigationUtility.PushState(pageId, parameters);
                Bridge.Navigation.BridgeNavigator.prototype.Navigate.call(this, pageId, parameters);
            },
            InitNavigation: function () {
                var parsed = this.ParseUrl();

                if (System.String.isNullOrEmpty(parsed.PageId)) {
                    Bridge.Navigation.BridgeNavigator.prototype.InitNavigation.call(this);
                } else {
                    this.EnableSpafAnchors();

                    var page = this.Configuration.Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey(parsed.PageId);
                    if (page == null) {
                        throw new System.Exception(System.String.format("Page not found with ID {0}", [parsed.PageId]));
                    }

                    // if not null and evaluation is false fallback to home
                    if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$CanBeDirectLoad, null) && !page.Bridge$Navigation$IPageDescriptor$CanBeDirectLoad()) {
                        Bridge.Navigation.NavigationUtility.ReplaceState(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId);
                        this.NavigateWithoutPushState(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId);
                    } else {
                        this.Navigate(parsed.PageId, parsed.Parameters);
                    }
                }
            },
            ParseUrl: function () {
                var res = new Bridge.Navigation.BridgeNavigatorWithRouting.UrlDescriptor();

                var hash = window.location.hash;
                hash = System.String.replaceAll(hash, "#", "");

                if (System.String.isNullOrEmpty(hash)) {
                    return res;
                }

                var equalIndex = System.String.indexOf(hash, String.fromCharCode(61));
                if (equalIndex === -1) {
                    res.PageId = hash;
                    return res;
                }

                res.PageId = hash.substr(0, equalIndex);

                var doublePointsIndx = (equalIndex + 1) | 0;
                var parameters = hash.substr(doublePointsIndx, ((hash.length - doublePointsIndx) | 0));

                if (System.String.isNullOrEmpty(parameters)) {
                    return res;
                } // no parameters

                var decoded = Bridge.global.atob(parameters);
                var deserialized = Bridge.merge(Bridge.createInstance(System.Collections.Generic.Dictionary$2(System.String,System.Object)), JSON.parse(decoded));

                res.Parameters = deserialized;

                return res;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuTmF2aWdhdGlvbi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiTmF2aWdhdGlvblV0aWxpdHkuY3MiLCJJbXBsL0JyaWRnZU5hdmlnYXRvci5jcyIsIkltcGwvQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZS5jcyIsIkltcGwvUGFnZURlc2NyaXB0b3IuY3MiLCJJbXBsL0JyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FZZ0RBOzs7Ozs7Ozs7Ozs7OztxQ0FRWEEsUUFBZUE7O29CQUV4Q0EsY0FBY0EsaURBQWFBOztvQkFFM0JBLHlCQUF5QkEsTUFBTUEsSUFDM0JBLGNBQWNBLE9BQ1JBLGdDQUF3QkEsU0FBUUEsbUJBQVlBLGVBQWVBLGdCQUFlQTs7Ozs7Ozs7Ozs7Ozt3Q0FReERBLFFBQWVBOztvQkFFM0NBLDhDQUFVQSxRQUFPQTs7Ozs7Ozs7Ozs7Ozs7d0NBVVFBLEdBQUdBLFlBQTRDQTtvQkFFeEVBLElBQUlBLGNBQWNBO3dCQUNkQSxNQUFNQSxJQUFJQTs7O29CQUVkQSxJQUFJQSxDQUFDQSx1QkFBdUJBO3dCQUN4QkEsTUFBTUEsSUFBSUEsaUJBQVVBLDBEQUFpREE7OztvQkFFekVBLFlBQVlBLGVBQVdBO29CQUN2QkEsT0FBT0EsWUFBR0E7Ozs7Ozs7Ozs7Ozt3Q0FRcUJBO29CQUUvQkEsY0FBY0EsaUNBQXlCQSwwQkFBeUJBO29CQUNoRUEsVUFBVUEsNEJBQXFCQSx3REFDekJBLGdDQUF3QkEsU0FBUUEsVUFBeUJBLG9DQUE0QkEsU0FBUUEsc0RBQWlCQTtvQkFDcEhBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ2dDb0NBLE9BQU9BOzs7Ozs7Ozs7Ozs0QkFyRi9CQTs7Z0JBRW5CQSxxQkFBZ0JBOzs7OztnQkFLaEJBLGlCQUFp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eXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBOYXZpZ2F0aW9uVXRpbGl0eVxuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRGVmaW5lIHZpcnR1YWwgZGlyZWN0b3J5IGZvciBzb21ldGhpbmcgbGlrZTpcbiAgICAgICAgLy8vIHByb3RvY29sOi8vYXdlc29tZXNpdGUuaW8vc29tZWRpcmVjdG9yeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBWaXJ0dWFsRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gUHVzaCBzdGF0ZSBvbiBoaXN0b3J5XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2VJZFwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtZXRlcnNcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUHVzaFN0YXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYmFzZVVybCA9IEJ1aWxkQmFzZVVybChwYWdlSWQpO1xuXG4gICAgICAgICAgICBXaW5kb3cuSGlzdG9yeS5QdXNoU3RhdGUobnVsbCwgc3RyaW5nLkVtcHR5LFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IHN0cmluZy5Gb3JtYXQoXCJ7MH09ezF9XCIsYmFzZVVybCxHbG9iYWwuQnRvYShKU09OLlN0cmluZ2lmeShwYXJhbWV0ZXJzKSkpOiBiYXNlVXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIHJlcGxhY2Ugc3RhdGUgb24gaGlzdG9yeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdlSWRcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbWV0ZXJzXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlcGxhY2VTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgUHVzaFN0YXRlKHBhZ2VJZCxwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdldCBwYXJhbWV0ZXIga2V5IGZyb20gcGFyYW1ldGVycyBkaWN0aW9uYXJ5XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtZXRlcnNcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbUtleVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBHZXRQYXJhbWV0ZXI8VD4odGhpcyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzLCBzdHJpbmcgcGFyYW1LZXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlBhcmFtZXRlcnMgaXMgbnVsbCFcIik7XG5cbiAgICAgICAgICAgIGlmICghcGFyYW1ldGVycy5Db250YWluc0tleShwYXJhbUtleSkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiTm8gcGFyYW1ldGVyIHdpdGgga2V5IHswfSBmb3VuZCFcIixwYXJhbUtleSkpO1xuXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJhbWV0ZXJzW3BhcmFtS2V5XTtcbiAgICAgICAgICAgIHJldHVybiAoVCl2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQnVpbGQgYmFzZSB1cmwgdXNpbmcgcGFnZSBpZCBhbmQgdmlydHVhbCBkaXJlY3RvcnlcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFnZUlkXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIEJ1aWxkQmFzZVVybChzdHJpbmcgcGFnZUlkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYmFzZVVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vL3sxfVwiLFdpbmRvdy5Mb2NhdGlvbi5Qcm90b2NvbCxXaW5kb3cuTG9jYXRpb24uSG9zdCk7XG4gICAgICAgICAgICBiYXNlVXJsID0gc3RyaW5nLklzTnVsbE9yRW1wdHkoVmlydHVhbERpcmVjdG9yeSlcbiAgICAgICAgICAgICAgICA/IHN0cmluZy5Gb3JtYXQoXCJ7MH0jezF9XCIsYmFzZVVybCxwYWdlSWQpICAgICAgICAgICAgICAgIDogc3RyaW5nLkZvcm1hdChcInswfS97MX0jezJ9XCIsYmFzZVVybCxWaXJ0dWFsRGlyZWN0b3J5LHBhZ2VJZCk7XG4gICAgICAgICAgICByZXR1cm4gYmFzZVVybDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gSU5hdmlnYXRvciBpbXBsZW1lbnRhdGlvblxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgcHVibGljIGNsYXNzIEJyaWRnZU5hdmlnYXRvciA6IElOYXZpZ2F0b3JcbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIElBbUxvYWRhYmxlIF9hY3R1YWxDb250cm9sbGVyO1xuXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBJTmF2aWdhdG9yQ29uZmlndXJhdG9yIENvbmZpZ3VyYXRpb247XG4gICAgICAgIHB1YmxpYyBCcmlkZ2VOYXZpZ2F0b3IoSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBjb25maWd1cmF0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICBDb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIEVuYWJsZVNwYWZBbmNob3JzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFsbEFuY2hvcnMgPSBqUXVlcnkuU2VsZWN0KFwiYVwiKTtcbiAgICAgICAgICAgIGFsbEFuY2hvcnMuT2ZmKEV2ZW50VHlwZS5DbGljay5Ub1N0cmluZygpKTtcbiAgICAgICAgICAgIGFsbEFuY2hvcnMuQ2xpY2soKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5qUXVlcnkyLmpRdWVyeU1vdXNlRXZlbnQ+KShldiA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBjbGlja2VkRWxlbWVudCA9IGV2LlRhcmdldDtcblxuICAgICAgICAgICAgICAgIGlmIChjbGlja2VkRWxlbWVudC5HZXRUeXBlKCkgIT0gdHlwZW9mKEhUTUxBbmNob3JFbGVtZW50KSlcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tlZEVsZW1lbnQgPSBqUXVlcnkuRWxlbWVudChldi5UYXJnZXQpLlBhcmVudHMoXCJhXCIpLkdldCgwKTtcblxuICAgICAgICAgICAgICAgIHZhciBocmVmID0gY2xpY2tlZEVsZW1lbnQuR2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JFbXB0eShocmVmKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlzTXlIcmVmID0gaHJlZi5TdGFydHNXaXRoKFwic3BhZjpcIik7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBpcyBteSBocmVmXG4gICAgICAgICAgICAgICAgaWYgKGlzTXlIcmVmKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZXYuUHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VJZCA9IGhyZWYuUmVwbGFjZShcInNwYWY6XCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlKHBhZ2VJZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYW5jaG9yIGRlZmF1bHQgYmVoYXZpb3VyXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byBhIHBhZ2UgSUQuXG4gICAgICAgIC8vLyBUaGUgSUQgbXVzdCBiZSByZWdpc3RlcmVkLlxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdlSWRcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE5hdmlnYXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gdGhpcy5Db25maWd1cmF0aW9uLkdldFBhZ2VEZXNjcmlwdG9yQnlLZXkocGFnZUlkKTtcbiAgICAgICAgICAgIGlmIChwYWdlID09IG51bGwpIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIlBhZ2Ugbm90IGZvdW5kIHdpdGggSUQgezB9XCIscGFnZUlkKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNoZWNrIHJlZGlyZWN0IHJ1bGVcbiAgICAgICAgICAgIHZhciByZWRpcmVjdEtleSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIscGFnZS5SZWRpcmVjdFJ1bGVzKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8RnVuYzxzdHJpbmc+PihcImtleTFcIikuSW52b2tlKCk6KHN0cmluZyludWxsO1xuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eShyZWRpcmVjdEtleSkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShyZWRpcmVjdEtleSxwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBib2R5ID0gdGhpcy5Db25maWd1cmF0aW9uLkJvZHk7XG4gICAgICAgICAgICBpZihib2R5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIkNhbm5vdCBmaW5kIG5hdmlnYXRpb24gYm9keSBlbGVtZW50LlwiKTtcblxuICAgICAgICAgICAgdGhpcy5Db25maWd1cmF0aW9uLkJvZHkuTG9hZChwYWdlLkh0bWxMb2NhdGlvbi5JbnZva2UoKSxudWxsLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPHN0cmluZywgc3RyaW5nLCBnbG9iYWw6OkJyaWRnZS5qUXVlcnkyLmpxWEhSPikoKG8scyxhKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgcGFnZVxuICAgICAgICAgICAgICAgIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkyXCIscGFnZS5QcmVwYXJlUGFnZSkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9Pmdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxBY3Rpb24+KFwia2V5MlwiKS5JbnZva2UoKSk6bnVsbDtcblxuICAgICAgICAgICAgICAgIC8vIGF1dG8gZW5hYmxlIHNwYWYgYW5jaG9yc1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5Db25maWd1cmF0aW9uLkRpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuYWJsZUFuY2hvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5M1wiLHBhZ2UuQXV0b0VuYWJsZVNwYWZBbmNob3JzKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8RnVuYzxib29sPj4oXCJrZXkzXCIpLkludm9rZSgpOihib29sPyludWxsO1xuICAgICAgICAgICAgICAgICAgICBpZihlbmFibGVBbmNob3JzLkhhc1ZhbHVlICYmIGVuYWJsZUFuY2hvcnMuVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVuYWJsZVNwYWZBbmNob3JzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UuUGFnZUNvbnRyb2xsZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxlYXZlIGFjdHVhbCBjb250cm9sZWxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkxhc3ROYXZpZ2F0ZUNvbnRyb2xsZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFzdE5hdmlnYXRlQ29udHJvbGxlci5PbkxlYXZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9hZCBuZXcgY29udHJvbGxlclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IHBhZ2UuUGFnZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5PbkxvYWQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgICAgICAgICAgX2FjdHVhbENvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pKTsgXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgSUFtTG9hZGFibGUgTGFzdE5hdmlnYXRlQ29udHJvbGxlciB7Z2V0e3JldHVybiBfYWN0dWFsQ29udHJvbGxlcjt9fVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFN1YnNjcmliZSB0byBhbmNob3JzIGNsaWNrXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgSW5pdE5hdmlnYXRpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkVuYWJsZVNwYWZBbmNob3JzKCk7XG5cbiAgICAgICAgICAgIC8vIGdvIGhvbWVcbiAgICAgICAgICAgIHRoaXMuTmF2aWdhdGUodGhpcy5Db25maWd1cmF0aW9uLkhvbWVJZCk7XG4gICAgICAgIH1cblxuICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBJbXBsZW1lbnRhdGlvbi4gTXVzdCBiZSBleHRlbmRlZC5cbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBCcmlkZ2VOYXZpZ2F0b3JDb25maWdCYXNlIDogSU5hdmlnYXRvckNvbmZpZ3VyYXRvclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTGlzdDxJUGFnZURlc2NyaXB0b3I+IF9yb3V0ZXM7XG5cbiAgICAgICAgcHVibGljIGFic3RyYWN0IElMaXN0PElQYWdlRGVzY3JpcHRvcj4gQ3JlYXRlUm91dGVzKCk7XG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBqUXVlcnkgQm9keSB7IGdldDsgfVxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc3RyaW5nIEhvbWVJZCB7IGdldDsgfVxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgYm9vbCBEaXNhYmxlQXV0b1NwYWZBbmNob3JzT25OYXZpZ2F0ZSB7IGdldDsgfVxuXG5cblxuICAgICAgICBwcm90ZWN0ZWQgQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcyA9IHRoaXMuQ3JlYXRlUm91dGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgSVBhZ2VEZXNjcmlwdG9yIEdldFBhZ2VEZXNjcmlwdG9yQnlLZXkoc3RyaW5nIGtleSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2luZ2xlT3JEZWZhdWx0PGdsb2JhbDo6QnJpZGdlLk5hdmlnYXRpb24uSVBhZ2VEZXNjcmlwdG9yPih0aGlzLl9yb3V0ZXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuTmF2aWdhdGlvbi5JUGFnZURlc2NyaXB0b3IsIGJvb2w+KShzPT4gc3RyaW5nLkVxdWFscyhzLktleSwga2V5LCBTdHJpbmdDb21wYXJpc29uLkN1cnJlbnRDdWx0dXJlSWdub3JlQ2FzZSkpKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICBwdWJsaWMgY2xhc3MgUGFnZURlc2NyaXB0b3IgOiBJUGFnZURlc2NyaXB0b3JcbiAgICB7XG4gICAgICAgIHB1YmxpYyBQYWdlRGVzY3JpcHRvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXV0b0VuYWJsZVNwYWZBbmNob3JzID0gKCkgPT4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgS2V5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8c3RyaW5nPiBIdG1sTG9jYXRpb24geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgRnVuYzxJQW1Mb2FkYWJsZT4gUGFnZUNvbnRyb2xsZXIgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgRnVuYzxib29sPiBDYW5CZURpcmVjdExvYWQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgQWN0aW9uIFByZXBhcmVQYWdlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8c3RyaW5nPiBSZWRpcmVjdFJ1bGVzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8Ym9vbD4gQXV0b0VuYWJsZVNwYWZBbmNob3JzIHsgZ2V0OyBzZXQ7IH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBjbGFzcyBCcmlkZ2VOYXZpZ2F0b3JXaXRoUm91dGluZyA6IEJyaWRnZU5hdmlnYXRvclxuICAgIHtcblxuICAgICAgICBwdWJsaWMgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmcoSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBjb25maWd1cmF0aW9uKSA6IGJhc2UoY29uZmlndXJhdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgV2luZG93Lk9uUG9wU3RhdGUgKz0gZSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciB1cmxJbmZvID0gdGhpcy5QYXJzZVVybCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGVXaXRob3V0UHVzaFN0YXRlKHN0cmluZy5Jc051bGxPckVtcHR5KHVybEluZm8uUGFnZUlkKSA/IGNvbmZpZ3VyYXRpb24uSG9tZUlkIDogdXJsSW5mby5QYWdlSWQsIHVybEluZm8uUGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5OYXZpZ2F0ZShwYWdlSWQsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE5hdmlnYXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBOYXZpZ2F0aW9uVXRpbGl0eS5QdXNoU3RhdGUocGFnZUlkLHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgYmFzZS5OYXZpZ2F0ZShwYWdlSWQsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgSW5pdE5hdmlnYXRpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcGFyc2VkID0gdGhpcy5QYXJzZVVybCgpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyc2VkLlBhZ2VJZCkpXG4gICAgICAgICAgICAgICAgYmFzZS5Jbml0TmF2aWdhdGlvbigpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJhc2UuRW5hYmxlU3BhZkFuY2hvcnMoKTtcblxuICAgICAgICAgICAgICAgIHZhciBwYWdlID0gdGhpcy5Db25maWd1cmF0aW9uLkdldFBhZ2VEZXNjcmlwdG9yQnlLZXkocGFyc2VkLlBhZ2VJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiUGFnZSBub3QgZm91bmQgd2l0aCBJRCB7MH1cIixwYXJzZWQuUGFnZUlkKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBub3QgbnVsbCBhbmQgZXZhbHVhdGlvbiBpcyBmYWxzZSBmYWxsYmFjayB0byBob21lXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UuQ2FuQmVEaXJlY3RMb2FkICE9IG51bGwgJiYgIXBhZ2UuQ2FuQmVEaXJlY3RMb2FkLkludm9rZSgpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgTmF2aWdhdGlvblV0aWxpdHkuUmVwbGFjZVN0YXRlKHRoaXMuQ29uZmlndXJhdGlvbi5Ib21lSWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZSh0aGlzLkNvbmZpZ3VyYXRpb24uSG9tZUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlKHBhcnNlZC5QYWdlSWQscGFyc2VkLlBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBVcmxEZXNjcmlwdG9yIFBhcnNlVXJsKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcyA9IG5ldyBVcmxEZXNjcmlwdG9yKCk7XG5cbiAgICAgICAgICAgIHZhciBoYXNoID0gV2luZG93LkxvY2F0aW9uLkhhc2g7XG4gICAgICAgICAgICBoYXNoID0gaGFzaC5SZXBsYWNlKFwiI1wiLCBcIlwiKTtcblxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KGhhc2gpKSByZXR1cm4gcmVzO1xuXG4gICAgICAgICAgICB2YXIgZXF1YWxJbmRleCA9IGhhc2guSW5kZXhPZignPScpO1xuICAgICAgICAgICAgaWYgKGVxdWFsSW5kZXggPT0gLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzLlBhZ2VJZCA9IGhhc2g7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzLlBhZ2VJZCA9IGhhc2guU3Vic3RyaW5nKDAsIGVxdWFsSW5kZXgpOyAgXG5cbiAgICAgICAgICAgIHZhciBkb3VibGVQb2ludHNJbmR4ID0gZXF1YWxJbmRleCArIDE7XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IGhhc2guU3Vic3RyaW5nKGRvdWJsZVBvaW50c0luZHgsIGhhc2guTGVuZ3RoIC0gZG91YmxlUG9pbnRzSW5keCk7XG5cbiAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JFbXB0eShwYXJhbWV0ZXJzKSkgcmV0dXJuIHJlczsgLy8gbm8gcGFyYW1ldGVyc1xuXG4gICAgICAgICAgICB2YXIgZGVjb2RlZCA9IEdsb2JhbC5BdG9iKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgdmFyIGRlc2VyaWFsaXplZCA9IEpTT04uUGFyc2U8RGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4+KGRlY29kZWQpO1xuXG4gICAgICAgICAgICByZXMuUGFyYW1ldGVycyA9IGRlc2VyaWFsaXplZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuXG4gICAgIFxuICAgICAgICBjbGFzcyBVcmxEZXNjcmlwdG9yXG4gICAgICAgIHtcbiAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgRnVsbEJhc2VVcmwgeyBnZXQ7IHNldDsgfVxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBQYWdlSWQgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgICAgICBwdWJsaWMgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gUGFyYW1ldGVycyB7IGdldDsgc2V0OyB9XG4gICAgICAgIH1cbiAgICB9XG59Il0KfQo=
