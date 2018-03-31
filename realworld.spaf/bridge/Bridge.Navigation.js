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
            props: {
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
                    Bridge.global.alert(System.String.format("Virtual Directory: {0}", [Bridge.Navigation.NavigationUtility.VirtualDirectory]));

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
                Bridge.Navigation.BridgeNavigator.prototype.Navigate.call(this, pageId, parameters);
                Bridge.Navigation.NavigationUtility.PushState(pageId, parameters);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuTmF2aWdhdGlvbi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiTmF2aWdhdGlvblV0aWxpdHkuY3MiLCJJbXBsL0JyaWRnZU5hdmlnYXRvci5jcyIsIkltcGwvQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZS5jcyIsIkltcGwvUGFnZURlc2NyaXB0b3IuY3MiLCJJbXBsL0JyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQWVxQ0EsUUFBZUE7O29CQUV4Q0EsY0FBY0EsaURBQWFBOztvQkFFM0JBLHlCQUF5QkEsTUFBTUEsSUFDM0JBLGNBQWNBLE9BQ1JBLGdDQUF3QkEsU0FBUUEsbUJBQVlBLGVBQWVBLGdCQUFlQTs7Ozs7Ozs7Ozs7Ozt3Q0FReERBLFFBQWVBOztvQkFFM0NBLDhDQUFVQSxRQUFPQTs7Ozs7Ozs7Ozs7Ozs7d0NBVVFBLEdBQUdBLFlBQTRDQTtvQkFFeEVBLElBQUlBLGNBQWNBO3dCQUNkQSxNQUFNQSxJQUFJQTs7O29CQUVkQSxJQUFJQSxDQUFDQSx1QkFBdUJBO3dCQUN4QkEsTUFBTUEsSUFBSUEsaUJBQVVBLDBEQUFpREE7OztvQkFFekVBLFlBQVlBLGVBQVdBO29CQUN2QkEsT0FBT0EsWUFBR0E7Ozs7Ozs7Ozs7Ozt3Q0FRcUJBO29CQUUvQkEsb0JBQWFBLGdEQUF1Q0E7O29CQUVwREEsY0FBY0EsaUNBQXlCQSwwQkFBeUJBO29CQUNoRUEsVUFBVUEsNEJBQXFCQSx3REFDekJBLGdDQUF3QkEsU0FBUUEsVUFBeUJBLG9DQUE0QkEsU0FBUUEsc0RBQWlCQTtvQkFDcEhBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ21Db0NBLE9BQU9BOzs7Ozs7Ozs7Ozs0QkFyRi9CQTs7Z0JBRW5CQSxxQkFBZ0JBOzs7OztnQkFL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WyJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBOYXZpZ2F0aW9uVXRpbGl0eVxuICAgIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgVmlydHVhbERpcmVjdG9yeSB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBQdXNoIHN0YXRlIG9uIGhpc3RvcnlcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFnZUlkXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFyYW1ldGVyc1wiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBQdXNoU3RhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBiYXNlVXJsID0gQnVpbGRCYXNlVXJsKHBhZ2VJZCk7XG5cbiAgICAgICAgICAgIFdpbmRvdy5IaXN0b3J5LlB1c2hTdGF0ZShudWxsLCBzdHJpbmcuRW1wdHksXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8gc3RyaW5nLkZvcm1hdChcInswfT17MX1cIixiYXNlVXJsLEdsb2JhbC5CdG9hKEpTT04uU3RyaW5naWZ5KHBhcmFtZXRlcnMpKSk6IGJhc2VVcmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gcmVwbGFjZSBzdGF0ZSBvbiBoaXN0b3J5XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2VJZFwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtZXRlcnNcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVwbGFjZVN0YXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBQdXNoU3RhdGUocGFnZUlkLHBhcmFtZXRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IHBhcmFtZXRlciBrZXkgZnJvbSBwYXJhbWV0ZXJzIGRpY3Rpb25hcnlcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFyYW1ldGVyc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtS2V5XCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEdldFBhcmFtZXRlcjxUPih0aGlzIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMsIHN0cmluZyBwYXJhbUtleSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiUGFyYW1ldGVycyBpcyBudWxsIVwiKTtcblxuICAgICAgICAgICAgaWYgKCFwYXJhbWV0ZXJzLkNvbnRhaW5zS2V5KHBhcmFtS2V5KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJObyBwYXJhbWV0ZXIgd2l0aCBrZXkgezB9IGZvdW5kIVwiLHBhcmFtS2V5KSk7XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcmFtZXRlcnNbcGFyYW1LZXldO1xuICAgICAgICAgICAgcmV0dXJuIChUKXZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBCdWlsZCBiYXNlIHVybCB1c2luZyBwYWdlIGlkIGFuZCB2aXJ0dWFsIGRpcmVjdG9yeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdlSWRcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmcgQnVpbGRCYXNlVXJsKHN0cmluZyBwYWdlSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIEdsb2JhbC5BbGVydChzdHJpbmcuRm9ybWF0KFwiVmlydHVhbCBEaXJlY3Rvcnk6IHswfVwiLFZpcnR1YWxEaXJlY3RvcnkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9Ly97MX1cIixXaW5kb3cuTG9jYXRpb24uUHJvdG9jb2wsV2luZG93LkxvY2F0aW9uLkhvc3QpO1xuICAgICAgICAgICAgYmFzZVVybCA9IHN0cmluZy5Jc051bGxPckVtcHR5KFZpcnR1YWxEaXJlY3RvcnkpXG4gICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9I3sxfVwiLGJhc2VVcmwscGFnZUlkKSAgICAgICAgICAgICAgICA6IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9I3syfVwiLGJhc2VVcmwsVmlydHVhbERpcmVjdG9yeSxwYWdlSWQpO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIElOYXZpZ2F0b3IgaW1wbGVtZW50YXRpb25cbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIHB1YmxpYyBjbGFzcyBCcmlkZ2VOYXZpZ2F0b3IgOiBJTmF2aWdhdG9yXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBJQW1Mb2FkYWJsZSBfYWN0dWFsQ29udHJvbGxlcjtcblxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBDb25maWd1cmF0aW9uO1xuICAgICAgICBwdWJsaWMgQnJpZGdlTmF2aWdhdG9yKElOYXZpZ2F0b3JDb25maWd1cmF0b3IgY29uZmlndXJhdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgQ29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBFbmFibGVTcGFmQW5jaG9ycygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhbGxBbmNob3JzID0galF1ZXJ5LlNlbGVjdChcImFcIik7XG4gICAgICAgICAgICBhbGxBbmNob3JzLk9mZihFdmVudFR5cGUuQ2xpY2suVG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBhbGxBbmNob3JzLkNsaWNrKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UualF1ZXJ5Mi5qUXVlcnlNb3VzZUV2ZW50PikoZXYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xpY2tlZEVsZW1lbnQgPSBldi5UYXJnZXQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZEVsZW1lbnQuR2V0VHlwZSgpICE9IHR5cGVvZihIVE1MQW5jaG9yRWxlbWVudCkpXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWRFbGVtZW50ID0galF1ZXJ5LkVsZW1lbnQoZXYuVGFyZ2V0KS5QYXJlbnRzKFwiYVwiKS5HZXQoMCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaHJlZiA9IGNsaWNrZWRFbGVtZW50LkdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoaHJlZikpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHZhciBpc015SHJlZiA9IGhyZWYuU3RhcnRzV2l0aChcInNwYWY6XCIpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXMgbXkgaHJlZlxuICAgICAgICAgICAgICAgIGlmIChpc015SHJlZilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGV2LlByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYWdlSWQgPSBocmVmLlJlcGxhY2UoXCJzcGFmOlwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShwYWdlSWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFuY2hvciBkZWZhdWx0IGJlaGF2aW91clxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gYSBwYWdlIElELlxuICAgICAgICAvLy8gVGhlIElEIG11c3QgYmUgcmVnaXN0ZXJlZC5cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFnZUlkXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBOYXZpZ2F0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZyxvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMuQ29uZmlndXJhdGlvbi5HZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHBhZ2VJZCk7XG4gICAgICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJQYWdlIG5vdCBmb3VuZCB3aXRoIElEIHswfVwiLHBhZ2VJZCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjaGVjayByZWRpcmVjdCBydWxlXG4gICAgICAgICAgICB2YXIgcmVkaXJlY3RLZXkgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLHBhZ2UuUmVkaXJlY3RSdWxlcykhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEZ1bmM8c3RyaW5nPj4oXCJrZXkxXCIpLkludm9rZSgpOihzdHJpbmcpbnVsbDtcbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkocmVkaXJlY3RLZXkpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGUocmVkaXJlY3RLZXkscGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYm9keSA9IHRoaXMuQ29uZmlndXJhdGlvbi5Cb2R5O1xuICAgICAgICAgICAgaWYoYm9keSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJDYW5ub3QgZmluZCBuYXZpZ2F0aW9uIGJvZHkgZWxlbWVudC5cIik7XG5cbiAgICAgICAgICAgIHRoaXMuQ29uZmlndXJhdGlvbi5Cb2R5LkxvYWQocGFnZS5IdG1sTG9jYXRpb24uSW52b2tlKCksbnVsbCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxzdHJpbmcsIHN0cmluZywgZ2xvYmFsOjpCcmlkZ2UualF1ZXJ5Mi5qcVhIUj4pKChvLHMsYSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIHBhZ2VcbiAgICAgICAgICAgICAgICBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLHBhZ2UuUHJlcGFyZVBhZ2UpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8QWN0aW9uPihcImtleTJcIikuSW52b2tlKCkpOm51bGw7XG5cbiAgICAgICAgICAgICAgICAvLyBhdXRvIGVuYWJsZSBzcGFmIGFuY2hvcnNcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQ29uZmlndXJhdGlvbi5EaXNhYmxlQXV0b1NwYWZBbmNob3JzT25OYXZpZ2F0ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmFibGVBbmNob3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTNcIixwYWdlLkF1dG9FbmFibGVTcGFmQW5jaG9ycykhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEZ1bmM8Ym9vbD4+KFwia2V5M1wiKS5JbnZva2UoKTooYm9vbD8pbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYoZW5hYmxlQW5jaG9ycy5IYXNWYWx1ZSAmJiBlbmFibGVBbmNob3JzLlZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5FbmFibGVTcGFmQW5jaG9ycygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwYWdlLlBhZ2VDb250cm9sbGVyICE9IG51bGwpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBsZWF2ZSBhY3R1YWwgY29udHJvbGVsclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5MYXN0TmF2aWdhdGVDb250cm9sbGVyICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxhc3ROYXZpZ2F0ZUNvbnRyb2xsZXIuT25MZWF2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvYWQgbmV3IGNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBwYWdlLlBhZ2VDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuT25Mb2FkKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIF9hY3R1YWxDb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIElBbUxvYWRhYmxlIExhc3ROYXZpZ2F0ZUNvbnRyb2xsZXIge2dldHtyZXR1cm4gX2FjdHVhbENvbnRyb2xsZXI7fX1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBTdWJzY3JpYmUgdG8gYW5jaG9ycyBjbGlja1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEluaXROYXZpZ2F0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5FbmFibGVTcGFmQW5jaG9ycygpO1xuXG4gICAgICAgICAgICAvLyBnbyBob21lXG4gICAgICAgICAgICB0aGlzLk5hdmlnYXRlKHRoaXMuQ29uZmlndXJhdGlvbi5Ib21lSWQpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIElOYXZpZ2F0b3JDb25maWd1cmF0b3IgSW1wbGVtZW50YXRpb24uIE11c3QgYmUgZXh0ZW5kZWQuXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZSA6IElOYXZpZ2F0b3JDb25maWd1cmF0b3JcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUxpc3Q8SVBhZ2VEZXNjcmlwdG9yPiBfcm91dGVzO1xuXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBJTGlzdDxJUGFnZURlc2NyaXB0b3I+IENyZWF0ZVJvdXRlcygpO1xuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgalF1ZXJ5IEJvZHkgeyBnZXQ7IH1cbiAgICAgICAgcHVibGljIGFic3RyYWN0IHN0cmluZyBIb21lSWQgeyBnZXQ7IH1cbiAgICAgICAgcHVibGljIGFic3RyYWN0IGJvb2wgRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUgeyBnZXQ7IH1cblxuXG5cbiAgICAgICAgcHJvdGVjdGVkIEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMgPSB0aGlzLkNyZWF0ZVJvdXRlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIElQYWdlRGVzY3JpcHRvciBHZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHN0cmluZyBrZXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNpbmdsZU9yRGVmYXVsdDxnbG9iYWw6OkJyaWRnZS5OYXZpZ2F0aW9uLklQYWdlRGVzY3JpcHRvcj4odGhpcy5fcm91dGVzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLk5hdmlnYXRpb24uSVBhZ2VEZXNjcmlwdG9yLCBib29sPikocz0+IHN0cmluZy5FcXVhbHMocy5LZXksIGtleSwgU3RyaW5nQ29tcGFyaXNvbi5DdXJyZW50Q3VsdHVyZUlnbm9yZUNhc2UpKSk7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIGNsYXNzIFBhZ2VEZXNjcmlwdG9yIDogSVBhZ2VEZXNjcmlwdG9yXG4gICAge1xuICAgICAgICBwdWJsaWMgUGFnZURlc2NyaXB0b3IoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkF1dG9FbmFibGVTcGFmQW5jaG9ycyA9ICgpID0+IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEtleSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPHN0cmluZz4gSHRtbExvY2F0aW9uIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8SUFtTG9hZGFibGU+IFBhZ2VDb250cm9sbGVyIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8Ym9vbD4gQ2FuQmVEaXJlY3RMb2FkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEFjdGlvbiBQcmVwYXJlUGFnZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPHN0cmluZz4gUmVkaXJlY3RSdWxlcyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPGJvb2w+IEF1dG9FbmFibGVTcGFmQW5jaG9ycyB7IGdldDsgc2V0OyB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICBwdWJsaWMgY2xhc3MgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmcgOiBCcmlkZ2VOYXZpZ2F0b3JcbiAgICB7XG5cbiAgICAgICAgcHVibGljIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nKElOYXZpZ2F0b3JDb25maWd1cmF0b3IgY29uZmlndXJhdGlvbikgOiBiYXNlKGNvbmZpZ3VyYXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIFdpbmRvdy5PblBvcFN0YXRlICs9IGUgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdXJsSW5mbyA9IHRoaXMuUGFyc2VVcmwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZShzdHJpbmcuSXNOdWxsT3JFbXB0eSh1cmxJbmZvLlBhZ2VJZCkgPyBjb25maWd1cmF0aW9uLkhvbWVJZCA6IHVybEluZm8uUGFnZUlkLCB1cmxJbmZvLlBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBOYXZpZ2F0ZVdpdGhvdXRQdXNoU3RhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuTmF2aWdhdGUocGFnZUlkLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBOYXZpZ2F0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5OYXZpZ2F0ZShwYWdlSWQsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgTmF2aWdhdGlvblV0aWxpdHkuUHVzaFN0YXRlKHBhZ2VJZCxwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXROYXZpZ2F0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IHRoaXMuUGFyc2VVcmwoKTtcblxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KHBhcnNlZC5QYWdlSWQpKVxuICAgICAgICAgICAgICAgIGJhc2UuSW5pdE5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiYXNlLkVuYWJsZVNwYWZBbmNob3JzKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMuQ29uZmlndXJhdGlvbi5HZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHBhcnNlZC5QYWdlSWQpO1xuICAgICAgICAgICAgICAgIGlmIChwYWdlID09IG51bGwpIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIlBhZ2Ugbm90IGZvdW5kIHdpdGggSUQgezB9XCIscGFyc2VkLlBhZ2VJZCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgbm90IG51bGwgYW5kIGV2YWx1YXRpb24gaXMgZmFsc2UgZmFsbGJhY2sgdG8gaG9tZVxuICAgICAgICAgICAgICAgIGlmIChwYWdlLkNhbkJlRGlyZWN0TG9hZCAhPSBudWxsICYmICFwYWdlLkNhbkJlRGlyZWN0TG9hZC5JbnZva2UoKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIE5hdmlnYXRpb25VdGlsaXR5LlJlcGxhY2VTdGF0ZSh0aGlzLkNvbmZpZ3VyYXRpb24uSG9tZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZVdpdGhvdXRQdXNoU3RhdGUodGhpcy5Db25maWd1cmF0aW9uLkhvbWVJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShwYXJzZWQuUGFnZUlkLHBhcnNlZC5QYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgVXJsRGVzY3JpcHRvciBQYXJzZVVybCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBuZXcgVXJsRGVzY3JpcHRvcigpO1xuXG4gICAgICAgICAgICB2YXIgaGFzaCA9IFdpbmRvdy5Mb2NhdGlvbi5IYXNoO1xuICAgICAgICAgICAgaGFzaCA9IGhhc2guUmVwbGFjZShcIiNcIiwgXCJcIik7XG5cbiAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JFbXB0eShoYXNoKSkgcmV0dXJuIHJlcztcblxuICAgICAgICAgICAgdmFyIGVxdWFsSW5kZXggPSBoYXNoLkluZGV4T2YoJz0nKTtcbiAgICAgICAgICAgIGlmIChlcXVhbEluZGV4ID09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoLlN1YnN0cmluZygwLCBlcXVhbEluZGV4KTsgIFxuXG4gICAgICAgICAgICB2YXIgZG91YmxlUG9pbnRzSW5keCA9IGVxdWFsSW5kZXggKyAxO1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBoYXNoLlN1YnN0cmluZyhkb3VibGVQb2ludHNJbmR4LCBoYXNoLkxlbmd0aCAtIGRvdWJsZVBvaW50c0luZHgpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyYW1ldGVycykpIHJldHVybiByZXM7IC8vIG5vIHBhcmFtZXRlcnNcblxuICAgICAgICAgICAgdmFyIGRlY29kZWQgPSBHbG9iYWwuQXRvYihwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIHZhciBkZXNlcmlhbGl6ZWQgPSBKU09OLlBhcnNlPERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+PihkZWNvZGVkKTtcblxuICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMgPSBkZXNlcmlhbGl6ZWQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgY2xhc3MgVXJsRGVzY3JpcHRvclxuICAgICAgICB7XG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIEZ1bGxCYXNlVXJsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgUGFnZUlkIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICAgICAgcHVibGljIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IFBhcmFtZXRlcnMgeyBnZXQ7IHNldDsgfVxuICAgICAgICB9XG4gICAgfVxufSJdCn0K
