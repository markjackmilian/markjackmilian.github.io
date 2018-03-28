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
                    window.history.pushState(null, "", parameters != null ? System.String.format("{0}//{1}#{2}={3}", window.location.protocol, window.location.host, pageId, Bridge.global.btoa(JSON.stringify(parameters))) : System.String.format("{0}//{1}#{2}", window.location.protocol, window.location.host, pageId));
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
                    window.history.pushState(null, "", parameters != null ? System.String.format("{0}//{1}#{2}={3}", window.location.protocol, window.location.host, pageId, Bridge.global.btoa(JSON.stringify(parameters))) : System.String.format("{0}//{1}#{2}", window.location.protocol, window.location.host, pageId));
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
                    var enableAnchors = !Bridge.staticEquals(($t2 = page.Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors), null) ? $t2() : null;
                    if (System.Nullable.hasValue(enableAnchors) && System.Nullable.getValue(enableAnchors)) {
                        this.EnableSpafAnchors();
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuTmF2aWdhdGlvbi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiTmF2aWdhdGlvblV0aWxpdHkuY3MiLCJJbXBsL0JyaWRnZU5hdmlnYXRvci5jcyIsIkltcGwvQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZS5jcyIsIkltcGwvUGFnZURlc2NyaXB0b3IuY3MiLCJJbXBsL0JyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBYXFDQSxRQUFlQTs7b0JBRXhDQSx5QkFBeUJBLE1BQU1BLElBQzNCQSxjQUFjQSxPQUNSQSx5Q0FBaUNBLDBCQUF5QkEsc0JBQXFCQSxRQUFPQSxtQkFBWUEsZUFBZUEsZ0JBQW1DQSxxQ0FBNkJBLDBCQUF5QkEsc0JBQXFCQTs7Ozs7Ozs7Ozs7Ozt3Q0FRN01BLFFBQWVBOztvQkFFM0NBLHlCQUF5QkEsTUFBTUEsSUFDM0JBLGNBQWNBLE9BQ1JBLHlDQUFpQ0EsMEJBQXlCQSxzQkFBcUJBLFFBQU9BLG1CQUFZQSxlQUFlQSxnQkFBbUNBLHFDQUE2QkEsMEJBQXlCQSxzQkFBcUJBOzs7Ozs7Ozs7Ozs7Ozt3Q0FVaE5BLEdBQUdBLFlBQTRDQTtvQkFFeEVBLElBQUlBLGNBQWNBO3dCQUNkQSxNQUFNQSxJQUFJQTs7O29CQUVkQSxJQUFJQSxDQUFDQSx1QkFBdUJBO3dCQUN4QkEsTUFBTUEsSUFBSUEsaUJBQVVBLDBEQUFpREE7OztvQkFFekVBLFlBQVlBLGVBQVdBO29CQUN2QkEsT0FBT0EsWUFBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDK0NpQ0EsT0FBT0E7Ozs7Ozs7Ozs7OzRCQWhGL0JBOztnQkFFbkJBLHFCQUFnQkE7Ozs7O2dCQUtoQkEsaUJBQWlCQTtnQkFDakJBLGlCQUFpQkEsQUFBaUVBOzs7Ozs7Ozs7Ozs7OztnQ0E2QnpEQSxRQUFlQTs7O2dCQUV4Q0EsV0FBV0EsbUZBQTBDQTtnQkFDckRBLElBQUlBLFFBQVFBO29CQUFNQSxNQUFNQSxJQUFJQSxpQkFBVUEsb0RBQTJDQTs7OztnQkFHakZBLGtCQUFrQkEsMkJBQW9DQSx1REFBcUJBLFFBQUtBLE9BQThEQSxBQUFRQTtnQkFDdEpBLElBQUlBLENBQUNBLDRCQUFxQkE7b0JBRXRCQSxjQUFjQSxhQUFZQTtvQkFDMUJBOzs7Z0JBR0pBLFdBQVdBO2dCQUNYQSxJQUFHQSxRQUFRQTtvQkFDUEEsTUFBTUEsSUFBSUE7OztnQkFFZEEsc0VBQTZCQSx1REFBMkJBLE1BQU1BLEFBQXNFQSwrQkFBQ0EsR0FBRUEsR0FBRUE7OztvQkFHcklBLDRCQUFvQ0EscURBQW1CQSxRQUFLQSxBQUFxQ0EsUUFBeURBOzs7b0JBRzFKQSxvQkFBb0JBLDRCQUFvQ0EsK0RBQTZCQSxRQUFLQSxRQUE0REEsQUFBT0E7b0JBQzdKQSxJQUFHQSwyQ0FBMEJBO3dCQUN6QkE7OztvQkFFSkEsSUFBSUEsNEVBQXVCQTs7d0JBR3ZCQSxJQUFJQSwrQkFBK0JBOzRCQUMvQkE7Ozs7d0JBR0pBLGlCQUFpQkE7d0JBQ2pCQSxnREFBa0JBOzt3QkFFbEJBLHNEQUFvQkE7Ozs7Ozs7Ozs7Ozs7OztnQkFhNUJBOzs7Z0JBR0FBLGNBQWNBOzs7Ozs7Ozs7WUFoRlZBLHFCQUFxQkE7O1lBRXJCQSxJQUFJQSx3REFBNEJBLEFBQU9BO2dCQUNuQ0EsaUJBQWlCQSxFQUFlQTs7O1lBRXBDQSxXQUFXQTs7WUFFWEEsSUFBSUEsNEJBQXFCQTtnQkFBT0E7OztZQUVoQ0EsZUFBZUE7OztZQUdmQSxJQUFJQTtnQkFFQUE7Z0JBQ0FBLGFBQWFBO2dCQUNiQSxjQUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JDcEJ0QkEsZUFBZUE7Ozs7OENBRzJCQTtnQkFFMUNBLE9BQU9BLDRCQUFrRkEsOEJBQWFBLEFBQXVFQTsrQkFBSUEscUJBQWNBLHlDQUFPQSxLQUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JDakIzTUEsNkJBQTZCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDQUNBOztrRUFBNkNBO2dCQUUzRUEseURBQXFCQTtvQkFFakJBLGNBQWNBO29CQUNkQSw4QkFBOEJBLDRCQUFxQkEsa0JBQWtCQSxnRUFBdUJBLGdCQUFnQkE7Ozs7O2dEQUk5RUEsUUFBZUE7O2dCQUVqREEsZ0VBQWNBLFFBQVFBOztnQ0FFSUEsUUFBZUE7O2dCQUV6Q0EsZ0VBQWNBLFFBQVFBO2dCQUN0QkEsOENBQTRCQSxRQUFPQTs7O2dCQUtuQ0EsYUFBYUE7O2dCQUViQSxJQUFJQSw0QkFBcUJBO29CQUNyQkE7O29CQUdBQTs7b0JBRUFBLFdBQVdBLG1GQUEwQ0E7b0JBQ3JEQSxJQUFJQSxRQUFRQTt3QkFBTUEsTUFBTUEsSUFBSUEsaUJBQVVBLG9EQUEyQ0E7Ozs7b0JBR2pGQSxJQUFJQSw2RUFBd0JBLFNBQVFBLENBQUNBO3dCQUVqQ0EsaURBQStCQTt3QkFDL0JBLDhCQUE4QkE7O3dCQUc5QkEsY0FBY0EsZUFBY0E7Ozs7O2dCQU1wQ0EsVUFBVUEsSUFBSUE7O2dCQUVkQSxXQUFXQTtnQkFDWEEsT0FBT0E7O2dCQUVQQSxJQUFJQSw0QkFBcUJBO29CQUFPQSxPQUFPQTs7O2dCQUV2Q0EsaUJBQWlCQTtnQkFDakJBLElBQUlBLGVBQWNBO29CQUVkQSxhQUFhQTtvQkFDYkEsT0FBT0E7OztnQkFHWEEsYUFBYUEsZUFBa0JBOztnQkFFL0JBLHVCQUF1QkE7Z0JBQ3ZCQSxpQkFBaUJBLFlBQWVBLGtCQUFrQkEsZ0JBQWNBOztnQkFFaEVBLElBQUlBLDRCQUFxQkE7b0JBQWFBLE9BQU9BOzs7Z0JBRTdDQSxjQUFjQSxtQkFBWUE7Z0JBQzFCQSxtQkFBbUJBLG1DQUFXQSxrRkFBNEJBOztnQkFFMURBLGlCQUFpQkE7O2dCQUVqQkEsT0FBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTmF2aWdhdGlvblV0aWxpdHlcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFB1c2ggc3RhdGUgb24gaGlzdG9yeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdlSWRcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbWV0ZXJzXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgV2luZG93Lkhpc3RvcnkuUHVzaFN0YXRlKG51bGwsIHN0cmluZy5FbXB0eSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9Ly97MX0jezJ9PXszfVwiLFdpbmRvdy5Mb2NhdGlvbi5Qcm90b2NvbCxXaW5kb3cuTG9jYXRpb24uSG9zdCxwYWdlSWQsR2xvYmFsLkJ0b2EoSlNPTi5TdHJpbmdpZnkocGFyYW1ldGVycykpKSAgICAgICAgICAgICAgICAgICAgOiBzdHJpbmcuRm9ybWF0KFwiezB9Ly97MX0jezJ9XCIsV2luZG93LkxvY2F0aW9uLlByb3RvY29sLFdpbmRvdy5Mb2NhdGlvbi5Ib3N0LHBhZ2VJZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gcmVwbGFjZSBzdGF0ZSBvbiBoaXN0b3J5XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2VJZFwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtZXRlcnNcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVwbGFjZVN0YXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBXaW5kb3cuSGlzdG9yeS5QdXNoU3RhdGUobnVsbCwgc3RyaW5nLkVtcHR5LFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IHN0cmluZy5Gb3JtYXQoXCJ7MH0vL3sxfSN7Mn09ezN9XCIsV2luZG93LkxvY2F0aW9uLlByb3RvY29sLFdpbmRvdy5Mb2NhdGlvbi5Ib3N0LHBhZ2VJZCxHbG9iYWwuQnRvYShKU09OLlN0cmluZ2lmeShwYXJhbWV0ZXJzKSkpICAgICAgICAgICAgICAgICAgICA6IHN0cmluZy5Gb3JtYXQoXCJ7MH0vL3sxfSN7Mn1cIixXaW5kb3cuTG9jYXRpb24uUHJvdG9jb2wsV2luZG93LkxvY2F0aW9uLkhvc3QscGFnZUlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgcGFyYW1ldGVyIGtleSBmcm9tIHBhcmFtZXRlcnMgZGljdGlvbmFyeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbWV0ZXJzXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFyYW1LZXlcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgR2V0UGFyYW1ldGVyPFQ+KHRoaXMgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycywgc3RyaW5nIHBhcmFtS2V5KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycyA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJQYXJhbWV0ZXJzIGlzIG51bGwhXCIpO1xuXG4gICAgICAgICAgICBpZiAoIXBhcmFtZXRlcnMuQ29udGFpbnNLZXkocGFyYW1LZXkpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIk5vIHBhcmFtZXRlciB3aXRoIGtleSB7MH0gZm91bmQhXCIscGFyYW1LZXkpKTtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFyYW1ldGVyc1twYXJhbUtleV07XG4gICAgICAgICAgICByZXR1cm4gKFQpdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIElOYXZpZ2F0b3IgaW1wbGVtZW50YXRpb25cbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIHB1YmxpYyBjbGFzcyBCcmlkZ2VOYXZpZ2F0b3IgOiBJTmF2aWdhdG9yXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBJQW1Mb2FkYWJsZSBfYWN0dWFsQ29udHJvbGxlcjtcblxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBDb25maWd1cmF0aW9uO1xuICAgICAgICBwdWJsaWMgQnJpZGdlTmF2aWdhdG9yKElOYXZpZ2F0b3JDb25maWd1cmF0b3IgY29uZmlndXJhdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgQ29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBFbmFibGVTcGFmQW5jaG9ycygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhbGxBbmNob3JzID0galF1ZXJ5LlNlbGVjdChcImFcIik7XG4gICAgICAgICAgICBhbGxBbmNob3JzLkNsaWNrKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UualF1ZXJ5Mi5qUXVlcnlNb3VzZUV2ZW50PikoZXYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xpY2tlZEVsZW1lbnQgPSBldi5UYXJnZXQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZEVsZW1lbnQuR2V0VHlwZSgpICE9IHR5cGVvZihIVE1MQW5jaG9yRWxlbWVudCkpXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWRFbGVtZW50ID0galF1ZXJ5LkVsZW1lbnQoZXYuVGFyZ2V0KS5QYXJlbnRzKFwiYVwiKS5HZXQoMCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaHJlZiA9IGNsaWNrZWRFbGVtZW50LkdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoaHJlZikpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHZhciBpc015SHJlZiA9IGhyZWYuU3RhcnRzV2l0aChcInNwYWY6XCIpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXMgbXkgaHJlZlxuICAgICAgICAgICAgICAgIGlmIChpc015SHJlZilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGV2LlByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYWdlSWQgPSBocmVmLlJlcGxhY2UoXCJzcGFmOlwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShwYWdlSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBhbmNob3IgZGVmYXVsdCBiZWhhdmlvdXJcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGEgcGFnZSBJRC5cbiAgICAgICAgLy8vIFRoZSBJRCBtdXN0IGJlIHJlZ2lzdGVyZWQuXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2VJZFwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTmF2aWdhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLkNvbmZpZ3VyYXRpb24uR2V0UGFnZURlc2NyaXB0b3JCeUtleShwYWdlSWQpO1xuICAgICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiUGFnZSBub3QgZm91bmQgd2l0aCBJRCB7MH1cIixwYWdlSWQpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3QgcnVsZVxuICAgICAgICAgICAgdmFyIHJlZGlyZWN0S2V5ID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixwYWdlLlJlZGlyZWN0UnVsZXMpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxGdW5jPHN0cmluZz4+KFwia2V5MVwiKS5JbnZva2UoKTooc3RyaW5nKW51bGw7XG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHJlZGlyZWN0S2V5KSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlKHJlZGlyZWN0S2V5LHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGJvZHkgPSB0aGlzLkNvbmZpZ3VyYXRpb24uQm9keTtcbiAgICAgICAgICAgIGlmKGJvZHkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiQ2Fubm90IGZpbmQgbmF2aWdhdGlvbiBib2R5IGVsZW1lbnQuXCIpO1xuXG4gICAgICAgICAgICB0aGlzLkNvbmZpZ3VyYXRpb24uQm9keS5Mb2FkKHBhZ2UuSHRtbExvY2F0aW9uLkludm9rZSgpLG51bGwsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248c3RyaW5nLCBzdHJpbmcsIGdsb2JhbDo6QnJpZGdlLmpRdWVyeTIuanFYSFI+KSgobyxzLGEpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gcHJlcGFyZSBwYWdlXG4gICAgICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIixwYWdlLlByZXBhcmVQYWdlKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEFjdGlvbj4oXCJrZXkyXCIpLkludm9rZSgpKTpudWxsO1xuXG4gICAgICAgICAgICAgICAgLy8gYXV0byBlbmFibGUgc3BhZiBhbmNob3JzXG4gICAgICAgICAgICAgICAgdmFyIGVuYWJsZUFuY2hvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5M1wiLHBhZ2UuQXV0b0VuYWJsZVNwYWZBbmNob3JzKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8RnVuYzxib29sPj4oXCJrZXkzXCIpLkludm9rZSgpOihib29sPyludWxsO1xuICAgICAgICAgICAgICAgIGlmKGVuYWJsZUFuY2hvcnMuSGFzVmFsdWUgJiYgZW5hYmxlQW5jaG9ycy5WYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5FbmFibGVTcGFmQW5jaG9ycygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UuUGFnZUNvbnRyb2xsZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxlYXZlIGFjdHVhbCBjb250cm9sZWxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkxhc3ROYXZpZ2F0ZUNvbnRyb2xsZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFzdE5hdmlnYXRlQ29udHJvbGxlci5PbkxlYXZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9hZCBuZXcgY29udHJvbGxlclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IHBhZ2UuUGFnZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5PbkxvYWQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgICAgICAgICAgX2FjdHVhbENvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pKTsgXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgSUFtTG9hZGFibGUgTGFzdE5hdmlnYXRlQ29udHJvbGxlciB7Z2V0e3JldHVybiBfYWN0dWFsQ29udHJvbGxlcjt9fVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFN1YnNjcmliZSB0byBhbmNob3JzIGNsaWNrXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgSW5pdE5hdmlnYXRpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkVuYWJsZVNwYWZBbmNob3JzKCk7XG5cbiAgICAgICAgICAgIC8vIGdvIGhvbWVcbiAgICAgICAgICAgIHRoaXMuTmF2aWdhdGUodGhpcy5Db25maWd1cmF0aW9uLkhvbWVJZCk7XG4gICAgICAgIH1cblxuICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBJbXBsZW1lbnRhdGlvbi4gTXVzdCBiZSBleHRlbmRlZC5cbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBCcmlkZ2VOYXZpZ2F0b3JDb25maWdCYXNlIDogSU5hdmlnYXRvckNvbmZpZ3VyYXRvclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTGlzdDxJUGFnZURlc2NyaXB0b3I+IF9yb3V0ZXM7XG5cbiAgICAgICAgcHVibGljIGFic3RyYWN0IElMaXN0PElQYWdlRGVzY3JpcHRvcj4gQ3JlYXRlUm91dGVzKCk7XG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBqUXVlcnkgQm9keSB7IGdldDsgfVxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc3RyaW5nIEhvbWVJZCB7IGdldDsgfVxuXG5cbiAgICAgICAgcHJvdGVjdGVkIEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMgPSB0aGlzLkNyZWF0ZVJvdXRlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIElQYWdlRGVzY3JpcHRvciBHZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHN0cmluZyBrZXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNpbmdsZU9yRGVmYXVsdDxnbG9iYWw6OkJyaWRnZS5OYXZpZ2F0aW9uLklQYWdlRGVzY3JpcHRvcj4odGhpcy5fcm91dGVzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLk5hdmlnYXRpb24uSVBhZ2VEZXNjcmlwdG9yLCBib29sPikocz0+IHN0cmluZy5FcXVhbHMocy5LZXksIGtleSwgU3RyaW5nQ29tcGFyaXNvbi5DdXJyZW50Q3VsdHVyZUlnbm9yZUNhc2UpKSk7XG4gICAgICAgIH1cbiAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIGNsYXNzIFBhZ2VEZXNjcmlwdG9yIDogSVBhZ2VEZXNjcmlwdG9yXG4gICAge1xuICAgICAgICBwdWJsaWMgUGFnZURlc2NyaXB0b3IoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkF1dG9FbmFibGVTcGFmQW5jaG9ycyA9ICgpID0+IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEtleSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPHN0cmluZz4gSHRtbExvY2F0aW9uIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8SUFtTG9hZGFibGU+IFBhZ2VDb250cm9sbGVyIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8Ym9vbD4gQ2FuQmVEaXJlY3RMb2FkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEFjdGlvbiBQcmVwYXJlUGFnZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPHN0cmluZz4gUmVkaXJlY3RSdWxlcyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPGJvb2w+IEF1dG9FbmFibGVTcGFmQW5jaG9ycyB7IGdldDsgc2V0OyB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICBwdWJsaWMgY2xhc3MgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmcgOiBCcmlkZ2VOYXZpZ2F0b3JcbiAgICB7XG5cbiAgICAgICAgcHVibGljIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nKElOYXZpZ2F0b3JDb25maWd1cmF0b3IgY29uZmlndXJhdGlvbikgOiBiYXNlKGNvbmZpZ3VyYXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIFdpbmRvdy5PblBvcFN0YXRlICs9IGUgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdXJsSW5mbyA9IHRoaXMuUGFyc2VVcmwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZShzdHJpbmcuSXNOdWxsT3JFbXB0eSh1cmxJbmZvLlBhZ2VJZCkgPyBjb25maWd1cmF0aW9uLkhvbWVJZCA6IHVybEluZm8uUGFnZUlkLCB1cmxJbmZvLlBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBOYXZpZ2F0ZVdpdGhvdXRQdXNoU3RhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuTmF2aWdhdGUocGFnZUlkLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBOYXZpZ2F0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5OYXZpZ2F0ZShwYWdlSWQsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgTmF2aWdhdGlvblV0aWxpdHkuUHVzaFN0YXRlKHBhZ2VJZCxwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXROYXZpZ2F0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IHRoaXMuUGFyc2VVcmwoKTtcblxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KHBhcnNlZC5QYWdlSWQpKVxuICAgICAgICAgICAgICAgIGJhc2UuSW5pdE5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiYXNlLkVuYWJsZVNwYWZBbmNob3JzKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMuQ29uZmlndXJhdGlvbi5HZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHBhcnNlZC5QYWdlSWQpO1xuICAgICAgICAgICAgICAgIGlmIChwYWdlID09IG51bGwpIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIlBhZ2Ugbm90IGZvdW5kIHdpdGggSUQgezB9XCIscGFyc2VkLlBhZ2VJZCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgbm90IG51bGwgYW5kIGV2YWx1YXRpb24gaXMgZmFsc2UgZmFsbGJhY2sgdG8gaG9tZVxuICAgICAgICAgICAgICAgIGlmIChwYWdlLkNhbkJlRGlyZWN0TG9hZCAhPSBudWxsICYmICFwYWdlLkNhbkJlRGlyZWN0TG9hZC5JbnZva2UoKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIE5hdmlnYXRpb25VdGlsaXR5LlJlcGxhY2VTdGF0ZSh0aGlzLkNvbmZpZ3VyYXRpb24uSG9tZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZVdpdGhvdXRQdXNoU3RhdGUodGhpcy5Db25maWd1cmF0aW9uLkhvbWVJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShwYXJzZWQuUGFnZUlkLHBhcnNlZC5QYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgVXJsRGVzY3JpcHRvciBQYXJzZVVybCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBuZXcgVXJsRGVzY3JpcHRvcigpO1xuXG4gICAgICAgICAgICB2YXIgaGFzaCA9IFdpbmRvdy5Mb2NhdGlvbi5IYXNoO1xuICAgICAgICAgICAgaGFzaCA9IGhhc2guUmVwbGFjZShcIiNcIiwgXCJcIik7XG5cbiAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JFbXB0eShoYXNoKSkgcmV0dXJuIHJlcztcblxuICAgICAgICAgICAgdmFyIGVxdWFsSW5kZXggPSBoYXNoLkluZGV4T2YoJz0nKTtcbiAgICAgICAgICAgIGlmIChlcXVhbEluZGV4ID09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoLlN1YnN0cmluZygwLCBlcXVhbEluZGV4KTsgIFxuXG4gICAgICAgICAgICB2YXIgZG91YmxlUG9pbnRzSW5keCA9IGVxdWFsSW5kZXggKyAxO1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBoYXNoLlN1YnN0cmluZyhkb3VibGVQb2ludHNJbmR4LCBoYXNoLkxlbmd0aCAtIGRvdWJsZVBvaW50c0luZHgpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyYW1ldGVycykpIHJldHVybiByZXM7IC8vIG5vIHBhcmFtZXRlcnNcblxuICAgICAgICAgICAgdmFyIGRlY29kZWQgPSBHbG9iYWwuQXRvYihwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIHZhciBkZXNlcmlhbGl6ZWQgPSBKU09OLlBhcnNlPERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+PihkZWNvZGVkKTtcblxuICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMgPSBkZXNlcmlhbGl6ZWQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cblxuICAgICBcbiAgICAgICAgY2xhc3MgVXJsRGVzY3JpcHRvclxuICAgICAgICB7XG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIFBhZ2VJZCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBQYXJhbWV0ZXJzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgfVxuICAgIH1cbn0iXQp9Cg==
