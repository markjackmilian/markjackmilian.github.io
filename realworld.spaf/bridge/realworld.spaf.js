/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.9.0
 */
Bridge.assembly("realworld.spaf", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Ioc.IIoc", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.IResolver", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Messenger.IMessenger", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.INavigator", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.INavigatorConfigurator", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IBrowserHistoryManager", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IAmLoadable", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IPageDescriptor", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.Model.UrlDescriptor", {
        fields: {
            PageId: null,
            Parameters: null
        }
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

                    var value = parameters.getItem(paramKey);

                    var parseMethod = Bridge.Reflection.getMembers(T, 8, 284, "Parse", System.Array.init([System.String], System.Type));

                    if (parseMethod != null) {
                        return Bridge.cast(Bridge.unbox(Bridge.Reflection.midel(parseMethod, null).apply(null, Bridge.unbox(System.Array.init([value], System.Object))), T), T);
                    }

                    return Bridge.cast(Bridge.unbox(value, T), T);
                },
                /**
                 * Build base url using page id and virtual directory
                 *
                 * @static
                 * @public
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

    Bridge.define("Bridge.Navigation.Utility", {
        statics: {
            methods: {
                /**
                 * Load script sequentially
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.Utility
                 * @memberof Bridge.Navigation.Utility
                 * @param   {System.Collections.Generic.List$1}    scripts
                 * @return  {void}
                 */
                SequentialScriptLoad: function (scripts) {
                    if (!System.Linq.Enumerable.from(scripts, System.String).any()) {
                        return;
                    }
                    var toLoad = System.Linq.Enumerable.from(scripts, System.String).first();
                    $.getScript(toLoad, function (o, s, arg3) {
                        scripts.remove(toLoad);
                        Bridge.Navigation.Utility.SequentialScriptLoad(scripts);
                    });
                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.Attributes.SingleInstanceAttribute", {
        inherits: [System.Attribute]
    });

    Bridge.define("Bridge.Spaf.IViewModelLifeCycle", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Spaf.ViewModelBase", {
        fields: {
            _pageNode: null
        },
        props: {
            PageNode: {
                get: function () {
                    return this._pageNode || ((this._pageNode = document.getElementById(this.ElementId())));
                }
            }
        },
        methods: {
            ApplyBindings: function () {
                ko.applyBindings(this, this.PageNode);
            },
            RemoveBindings: function () {
                ko.removeNode(this.PageNode);
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp", {
        main: function Main () {
            var $step = 0,
                $task1, 
                $jumpFromFinally, 
                mainVm, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1], $step);
                        switch ($step) {
                            case 0: {
                                Bridge.Navigation.NavigationUtility.VirtualDirectory = "realworld.spaf"; //  virtual dir for release environment

                                Bridge.Spaf.SpafApp.Container = new Bridge.Ioc.BridgeIoc();
                                Bridge.Spaf.SpafApp.ContainerConfig(); // config container
                                mainVm = Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.MainViewModel);
                                $task1 = mainVm.Start();
                                $step = 1;
                                if ($task1.isCompleted()) {
                                    continue;
                                }
                                $task1.continue($asyncBody);
                                return;
                            }
                            case 1: {
                                $task1.getAwaitedResult();
                                Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(Bridge.Navigation.INavigator).Bridge$Navigation$INavigator$InitNavigation(); // init navigation
                                return;
                            }
                            default: {
                                return;
                            }
                        }
                    }
                }, arguments);

            $asyncBody();
        },
        statics: {
            fields: {
                Container: null
            },
            props: {
                HomeId: {
                    get: function () {
                        return "home";
                    }
                },
                LoginId: {
                    get: function () {
                        return "login";
                    }
                },
                RegisterId: {
                    get: function () {
                        return "register";
                    }
                },
                ProfileId: {
                    get: function () {
                        return "profile";
                    }
                },
                SettingsId: {
                    get: function () {
                        return "settings";
                    }
                },
                EditArticleId: {
                    get: function () {
                        return "editArticle";
                    }
                },
                ArticleId: {
                    get: function () {
                        return "article";
                    }
                }
            },
            methods: {
                ContainerConfig: function () {
                    // navigator
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Navigation.INavigator, Bridge.Navigation.BridgeNavigatorWithRouting);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Navigation.IBrowserHistoryManager, Bridge.Navigation.QueryParameterNavigationHistory);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(Bridge.Navigation.INavigatorConfigurator, Bridge.Spaf.CustomRoutesConfig);

                    // messenger
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Messenger.IMessenger, Bridge.Messenger.Messenger);

                    // viewmodels
                    Bridge.Spaf.SpafApp.RegisterAllViewModels();

                    // register custom resource, services..
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(realworld.spaf.Services.ISettings, realworld.spaf.Services.impl.Settings);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(realworld.spaf.Services.IUserService, realworld.spaf.Services.impl.UserService);

                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IArticleResources, realworld.spaf.Services.impl.ArticleResources);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IUserResources, realworld.spaf.Services.impl.UserResources);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IFeedResources, realworld.spaf.Services.impl.FeedResources);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IProfileResources, realworld.spaf.Services.impl.ProfileResources);

                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IRepository, realworld.spaf.Services.impl.LocalStorageRepository);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.ISettingsResources, realworld.spaf.Services.impl.SettingsResources);

                },
                /**
                 * Register all types that end with "viewmodel".
                 You can register a viewmode as Singlr Instance adding "SingleInstanceAttribute" to the class
                 *
                 * @static
                 * @private
                 * @this Bridge.Spaf.SpafApp
                 * @memberof Bridge.Spaf.SpafApp
                 * @return  {void}
                 */
                RegisterAllViewModels: function () {
                    var types = System.Linq.Enumerable.from(System.AppDomain.getAssemblies(), System.Reflection.Assembly).selectMany(function (s) {
                            return Bridge.Reflection.getAssemblyTypes(s);
                        }).where(function (w) {
                        return System.String.endsWith(Bridge.Reflection.getTypeName(w).toLowerCase(), "viewmodel");
                    }).toList(System.Type);

                    types.ForEach(function (f) {
                        var attributes = Bridge.Reflection.getAttributes(f, Bridge.Spaf.Attributes.SingleInstanceAttribute, true);

                        if (System.Linq.Enumerable.from(attributes, System.Object).any()) {
                            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance(f);
                        } else {
                            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register(f);
                        }
                    });

                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp.Messages", {
        $kind: "nested class",
        statics: {
            fields: {
                Sender: null
            },
            props: {
                LoginDone: {
                    get: function () {
                        return "LoginDone";
                    }
                }
            },
            ctors: {
                init: function () {
                    this.Sender = new Bridge.Spaf.SpafApp.Messages.GlobalSender();
                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp.Messages.GlobalSender", {
        $kind: "nested class"
    });

    Bridge.define("realworld.spaf.Classes.Extensions", {
        statics: {
            methods: {
                /**
                 * Deserialize realworld promise exception to get errors
                 *
                 * @static
                 * @public
                 * @this realworld.spaf.Classes.Extensions
                 * @memberof realworld.spaf.Classes.Extensions
                 * @param   {Bridge.PromiseException}                    exception
                 * @return  {System.Collections.Generic.Dictionary$2}
                 */
                GetValidationErrorResponse: function (exception) {
                    var $t;
                    var errors = Bridge.cast(Newtonsoft.Json.JsonConvert.DeserializeObject(($t = exception.arguments)[System.Array.index(0, $t)].responseJSON, realworld.spaf.Models.Response.ErrorResponse), realworld.spaf.Models.Response.ErrorResponse);
                    return errors.Errors;
                },
                /**
                 * Get readable error list
                 *
                 * @static
                 * @public
                 * @this realworld.spaf.Classes.Extensions
                 * @memberof realworld.spaf.Classes.Extensions
                 * @param   {Bridge.PromiseException}                     exception
                 * @return  {System.Collections.Generic.IEnumerable$1}
                 */
                GetValidationErrors: function (exception) {
                    return new (Bridge.GeneratorEnumerable$1(System.String))(Bridge.fn.bind(this, function (exception) {
                        var $step = 0,
                            $jumpFromFinally,
                            $returnValue,
                            errors,
                            $t,
                            error,
                            $t1,
                            errorDescription,
                            $async_e;

                        var $enumerator = new (Bridge.GeneratorEnumerator$1(System.String))(Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    switch ($step) {
                                        case 0: {
                                            errors = realworld.spaf.Classes.Extensions.GetValidationErrorResponse(exception);

                                                $t = Bridge.getEnumerator(errors);
                                                $step = 1;
                                                continue;
                                        }
                                        case 1: {
                                            if ($t.moveNext()) {
                                                    error = $t.Current;
                                                    $step = 2;
                                                    continue;
                                                }
                                            $step = 7;
                                            continue;
                                        }
                                        case 2: {
                                            $t1 = Bridge.getEnumerator(error.value);
                                                $step = 3;
                                                continue;
                                        }
                                        case 3: {
                                            if ($t1.moveNext()) {
                                                    errorDescription = $t1.Current;
                                                    $step = 4;
                                                    continue;
                                                }
                                            $step = 6;
                                            continue;
                                        }
                                        case 4: {
                                            $enumerator.current = System.String.format("{0} {1}", error.key, errorDescription);
                                                $step = 5;
                                                return true;
                                        }
                                        case 5: {
                                            $step = 3;
                                            continue;
                                        }
                                        case 6: {
                                            $step = 1;
                                            continue;
                                        }
                                        case 7: {

                                        }
                                        default: {
                                            return false;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                throw $async_e;
                            }
                        }));
                        return $enumerator;
                    }, arguments));
                },
                /**
                 * Get error for htmlerrorcode
                 *
                 * @static
                 * @public
                 * @this realworld.spaf.Classes.Extensions
                 * @memberof realworld.spaf.Classes.Extensions
                 * @param   {number}    errorCode
                 * @return  {string}
                 */
                GetErrorForCode: function (errorCode) {
                    switch (errorCode) {
                        case 401: 
                            return "Unauthorized";
                        case 403: 
                            return "Forbidden";
                        case 404: 
                            return "Not Found";
                        case 422: 
                            return "Validation Error";
                        default: 
                            return "Generic Error";
                    }
                },
                /**
                 * Get error code for promise exception
                 *
                 * @static
                 * @public
                 * @this realworld.spaf.Classes.Extensions
                 * @memberof realworld.spaf.Classes.Extensions
                 * @param   {Bridge.PromiseException}    exception
                 * @return  {number}
                 */
                ErrorCode: function (exception) {
                    var $t;
                    var errorCode = Bridge.cast(($t = exception.arguments)[System.Array.index(0, $t)].status, System.Int32);
                    return errorCode;
                }
            }
        }
    });

    Bridge.define("realworld.spaf.Classes.FeedRequestBuilder", {
        statics: {
            methods: {
                Default: function () {
                    return new realworld.spaf.Classes.FeedRequestBuilder();
                }
            }
        },
        fields: {
            _offset: 0,
            _limit: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this._limit = 20;
                this._offset = 0;
            }
        },
        methods: {
            WithOffSet: function (offset) {
                this._offset = offset;
                return this;
            },
            WithLimit: function (limit) {
                this._limit = limit;
                return this;
            },
            Build: function () {
                var stringBuilder = new System.Text.StringBuilder("articles/feed");

                stringBuilder.append(System.String.format("?limit={0}", [Bridge.box(this._limit, System.Int32)]));
                stringBuilder.append(System.String.format("&&offset={0}", [Bridge.box(this._offset, System.Int32)]));

                return stringBuilder.toString();

            }
        }
    });

    Bridge.define("realworld.spaf.Models.Article", {
        fields: {
            Title: null,
            Slug: null,
            Body: null,
            CreatedAt: null,
            UpdatedAt: null,
            TagList: null,
            Description: null,
            Author: null,
            Favorited: false,
            FavoritesCount: System.Int64(0)
        },
        props: {
            Create: {
                get: function () {
                    var $t;
                    return !Bridge.equals(($t = this.CreatedAt), null) ? System.DateTime.format($t, "MMMM dd") : null;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Author = new realworld.spaf.Models.Author();
            }
        }
    });

    Bridge.define("realworld.spaf.Models.Author", {
        fields: {
            Username: null,
            Bio: null,
            Image: null,
            Following: false
        }
    });

    Bridge.define("realworld.spaf.Models.Comment", {
        fields: {
            Id: System.Int64(0),
            CreatedAt: null,
            UpdatedAt: null,
            Body: null,
            Author: null
        },
        props: {
            Create: {
                get: function () {
                    return System.DateTime.format(this.CreatedAt, "MMMM dd");
                }
            }
        },
        ctors: {
            init: function () {
                this.CreatedAt = System.DateTime.getDefaultValue();
                this.UpdatedAt = System.DateTime.getDefaultValue();
            },
            ctor: function () {
                this.$initialize();
                this.Author = new realworld.spaf.Models.Author();
            }
        }
    });

    Bridge.define("realworld.spaf.Models.NewArticle", {
        fields: {
            Title: null,
            Description: null,
            Body: null,
            TagList: null
        }
    });

    Bridge.define("realworld.spaf.Models.Paginator", {
        fields: {
            Active: null,
            Page: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Active = ko.observable();
            }
        }
    });

    Bridge.define("realworld.spaf.Models.Profile", {
        fields: {
            Username: null,
            Bio: null,
            Image: null,
            Following: false
        }
    });

    Bridge.define("realworld.spaf.Models.Request.NewArticleRequest", {
        fields: {
            Article: null
        }
    });

    Bridge.define("realworld.spaf.Models.Request.SettingsRequest", {
        fields: {
            ImageUri: null,
            Username: null,
            Biography: null,
            Email: null,
            NewPassword: null
        }
    });

    Bridge.define("realworld.spaf.Models.Request.SignRequest", {
        fields: {
            User: null
        }
    });

    Bridge.define("realworld.spaf.Models.Request.UserRequest", {
        fields: {
            Username: null,
            Email: null,
            Password: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.ArticleResponse", {
        fields: {
            Articles: null,
            ArticlesCount: System.Int64(0)
        }
    });

    Bridge.define("realworld.spaf.Models.Response.CommentsResponse", {
        fields: {
            Comments: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.ErrorResponse", {
        fields: {
            Errors: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.FollowResponse", {
        fields: {
            Profile: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.ProfileResponse", {
        fields: {
            Profile: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.SettingsResponse", {
        fields: {
            User: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.SignResponse", {
        fields: {
            User: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.SingleArticleResponse", {
        fields: {
            Article: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.SingleCommentResponse", {
        fields: {
            Comment: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.TagsResponse", {
        fields: {
            Tags: null
        }
    });

    Bridge.define("realworld.spaf.Models.User", {
        fields: {
            Id: 0,
            Email: null,
            Token: null,
            Username: null,
            Bio: null,
            Image: null
        }
    });

    Bridge.define("realworld.spaf.Services.IArticleResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.IFeedResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.impl.ArticleRequestBuilder", {
        statics: {
            methods: {
                Default: function () {
                    return new realworld.spaf.Services.impl.ArticleRequestBuilder();
                }
            }
        },
        fields: {
            _tag: null,
            _author: null,
            _offset: 0,
            _limit: 0,
            _user: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this._limit = 20;
                this._offset = 0;
            }
        },
        methods: {
            WithOffSet: function (offset) {
                this._offset = offset;
                return this;
            },
            WithLimit: function (limit) {
                this._limit = limit;
                return this;
            },
            OfAuthor: function (author) {
                this._author = author;
                return this;
            },
            WithTag: function (tag) {
                this._tag = tag;
                return this;
            },
            OfFavorite: function (user) {
                this._user = user;
                return this;
            },
            Build: function () {
                var stringBuilder = new System.Text.StringBuilder("articles");

                stringBuilder.append(System.String.format("?limit={0}", [Bridge.box(this._limit, System.Int32)]));
                stringBuilder.append(System.String.format("&&offset={0}", [Bridge.box(this._offset, System.Int32)]));

                if (!System.String.isNullOrEmpty(this._tag)) {
                    stringBuilder.append(System.String.format("&&tag={0}", [this._tag]));
                }

                if (!System.String.isNullOrEmpty(this._author)) {
                    stringBuilder.append(System.String.format("&&author={0}", [this._author]));
                }

                if (!System.String.isNullOrEmpty(this._user)) {
                    stringBuilder.append(System.String.format("&&favorited={0}", [this._user]));
                }

                return stringBuilder.toString();

            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.ResourceBase", {
        methods: {
            /**
             * Generic Awaitable ajax call
             *
             * @instance
             * @protected
             * @this realworld.spaf.Services.impl.ResourceBase
             * @memberof realworld.spaf.Services.impl.ResourceBase
             * @param   {Function}                         T          
             * @param   {System.Object}                    options
             * @return  {System.Threading.Tasks.Task$1}
             */
            MakeCall: function (T, options) {
                return System.Threading.Tasks.Task.fromPromise($.ajax(options), function (resObj, success, jqXhr) {
                    var json = JSON.stringify(Bridge.unbox(resObj));
                    var obj = Newtonsoft.Json.JsonConvert.DeserializeObject(json, T);
                    return obj;
                });

            }
        }
    });

    Bridge.define("realworld.spaf.Services.IRepository", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.IProfileResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.ISettings", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.ISettingsResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.IUserResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.IUserService", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.ViewModels.MainViewModel", {
        fields: {
            _messenger: null,
            _userService: null,
            IsLogged: null,
            ActualPageId: null
        },
        ctors: {
            ctor: function (messenger, userService, navigator) {
                this.$initialize();
                this._messenger = messenger;
                this._userService = userService;

                this.IsLogged = ko.observable(false);
                this.ActualPageId = ko.observable(Bridge.Spaf.SpafApp.HomeId);

                // subscribe to logindone message
                this._messenger.Bridge$Messenger$IMessenger$Subscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone, Bridge.fn.bind(this, function (service) {
                    this.IsLogged(true);
                }), void 0);

                navigator.Bridge$Navigation$INavigator$addOnNavigated(Bridge.fn.bind(this, function (sender, loadable) {
                    var vm = Bridge.cast(loadable, Bridge.Spaf.LoadableViewModel);
                    this.ActualPageId(vm.ElementId());
                }));

            }
        },
        methods: {
            /**
             * Apply binding to mainmodel
             try auto login
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.MainViewModel
             * @memberof realworld.spaf.ViewModels.MainViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            Start: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        ko.applyBindings(this);
                                        $task1 = this._userService.realworld$spaf$Services$IUserService$TryAutoLoginWithStoredToken();
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.ProfileModel", {
        fields: {
            Image: null,
            Username: null,
            Bio: null,
            Following: null,
            Articles: null,
            UserArticles: null,
            Favourtites: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Image = ko.observable();
                this.Username = ko.observable();
                this.Bio = ko.observable();
                this.Following = ko.observable();
                this.Articles = ko.observableArray();
            }
        },
        methods: {
            MapMe: function (profile) {
                this.Image(profile.Image);
                this.Username(profile.Username);
                this.Bio(profile.Bio);
                this.Following(profile.Following);
            },
            ShowArticles: function () {
                var $t;
                this.Articles.removeAll();
                this.Articles.push.apply(this.Articles, ($t = realworld.spaf.Models.Article, System.Linq.Enumerable.from(this.UserArticles, $t).ToArray($t)));
            },
            ShowFavourites: function () {
                var $t;
                this.Articles.removeAll();
                this.Articles.push.apply(this.Articles, ($t = realworld.spaf.Models.Article, System.Linq.Enumerable.from(this.Favourtites, $t).ToArray($t)));
            }
        }
    });

    /** @namespace Bridge.Ioc */

    /**
     * Implementation of IIoc
     *
     * @public
     * @class Bridge.Ioc.BridgeIoc
     * @implements  Bridge.Ioc.IIoc
     */
    Bridge.define("Bridge.Ioc.BridgeIoc", {
        inherits: [Bridge.Ioc.IIoc],
        fields: {
            _resolvers: null
        },
        alias: [
            "Register$1", "Bridge$Ioc$IIoc$Register$1",
            "Register$2", "Bridge$Ioc$IIoc$Register$2",
            "Register$4", "Bridge$Ioc$IIoc$Register$4",
            "Register", "Bridge$Ioc$IIoc$Register",
            "Register$3", "Bridge$Ioc$IIoc$Register$3",
            "RegisterSingleInstance$1", "Bridge$Ioc$IIoc$RegisterSingleInstance$1",
            "RegisterSingleInstance$3", "Bridge$Ioc$IIoc$RegisterSingleInstance$3",
            "RegisterSingleInstance", "Bridge$Ioc$IIoc$RegisterSingleInstance",
            "RegisterSingleInstance$2", "Bridge$Ioc$IIoc$RegisterSingleInstance$2",
            "RegisterFunc", "Bridge$Ioc$IIoc$RegisterFunc",
            "RegisterInstance$1", "Bridge$Ioc$IIoc$RegisterInstance$1",
            "RegisterInstance", "Bridge$Ioc$IIoc$RegisterInstance",
            "RegisterInstance$2", "Bridge$Ioc$IIoc$RegisterInstance$2",
            "Resolve", "Bridge$Ioc$IIoc$Resolve",
            "Resolve$1", "Bridge$Ioc$IIoc$Resolve$1"
        ],
        ctors: {
            init: function () {
                this._resolvers = new (System.Collections.Generic.Dictionary$2(System.Type,Bridge.Ioc.IResolver)).ctor();
            }
        },
        methods: {
            Register$1: function (type, resolver) {
                this.CheckAlreadyAdded(type);
                this._resolvers.add(type, resolver);
            },
            Register$2: function (type, impl) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.TransientResolver(this, impl);
                this._resolvers.add(type, resolver);
            },
            Register$4: function (TType, TImplementation) {
                this.Register$2(TType, TImplementation);
            },
            Register: function (type) {
                this.Register$2(type, type);
            },
            Register$3: function (TType) {
                this.Register(TType);
            },
            RegisterSingleInstance$1: function (type, impl) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.SingleInstanceResolver(this, impl);
                this._resolvers.add(type, resolver);
            },
            RegisterSingleInstance$3: function (TType, TImplementation) {
                this.RegisterSingleInstance$1(TType, TImplementation);
            },
            RegisterSingleInstance: function (type) {
                this.RegisterSingleInstance$1(type, type);
            },
            RegisterSingleInstance$2: function (TType) {
                this.RegisterSingleInstance(TType);
            },
            RegisterFunc: function (TType, func) {
                this.CheckAlreadyAdded$1(TType);

                var resolver = new (Bridge.Ioc.FuncResolver$1(TType))(func);
                this._resolvers.add(TType, resolver);
            },
            RegisterInstance$1: function (type, instance) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.InstanceResolver(instance);
                this._resolvers.add(type, resolver);
            },
            RegisterInstance: function (instance) {
                this.RegisterInstance$1(Bridge.getType(instance), instance);
            },
            RegisterInstance$2: function (TType, instance) {
                this.RegisterInstance$1(TType, instance);
            },
            Resolve: function (TType) {
                this.CheckNotRegistered$1(TType);

                var resolver = this._resolvers.getItem(TType);
                return Bridge.cast(resolver.Bridge$Ioc$IResolver$Resolve(), TType);
            },
            Resolve$1: function (type) {
                this.CheckNotRegistered(type);

                var resolver = this._resolvers.getItem(type);
                return resolver.Bridge$Ioc$IResolver$Resolve();
            },
            CheckAlreadyAdded: function (type) {
                if (this._resolvers.containsKey(type)) {
                    throw new System.Exception(System.String.format("{0} is already registered!", [Bridge.Reflection.getTypeFullName(type)]));
                }
            },
            CheckAlreadyAdded$1: function (TType) {
                this.CheckAlreadyAdded(TType);
            },
            CheckNotRegistered: function (type) {
                if (!this._resolvers.containsKey(type)) {
                    throw new System.Exception(System.String.format("Cannot resolve {0}, it's not registered!", [Bridge.Reflection.getTypeFullName(type)]));
                }
            },
            CheckNotRegistered$1: function (TType) {
                this.CheckNotRegistered(TType);
            }
        }
    });

    Bridge.define("Bridge.Ioc.FuncResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (resolveFunc) {
                this.$initialize();
                this.Resolve = function () {
                    return resolveFunc();
                };
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.InstanceResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (resolvedObj) {
                this.$initialize();
                this.Resolve = function () {
                    return resolvedObj;
                };
            }
        }
    });

    Bridge.define("Bridge.Ioc.SingleInstanceResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            _singleInstance: null,
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (ioc, type) {
                this.$initialize();
                this.Resolve = Bridge.fn.bind(this, function () {
                    // first resolve. Using transient resolver
                    if (this._singleInstance == null) {
                        var transientResolver = new Bridge.Ioc.TransientResolver(ioc, type);
                        this._singleInstance = transientResolver.Resolve();
                    }

                    return this._singleInstance;
                });
            }
        }
    });

    Bridge.define("Bridge.Ioc.TransientResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (ioc, toresolveType) {
                this.$initialize();
                this.Resolve = function () {
                    var $t;
                    // get ctor
                    var $ctor = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(toresolveType, 1, 28), System.Reflection.ConstructorInfo).firstOrDefault(null, null);
                    if ($ctor == null) {
                        throw new System.Exception(System.String.format("No ctor found for type {0}!", [Bridge.Reflection.getTypeFullName(toresolveType)]));
                    }

                    // get ctor params
                    var ctorParams = ($ctor.pi || []);
                    if (!System.Linq.Enumerable.from(ctorParams, System.Object).any()) {
                        return Bridge.createInstance(toresolveType);
                    } else {
                        // recursive resolve
                        var parameters = new (System.Collections.Generic.List$1(System.Object)).$ctor2(ctorParams.length);

                        $t = Bridge.getEnumerator(ctorParams);
                        try {
                            while ($t.moveNext()) {
                                var parameterInfo = $t.Current;
                                parameters.add(ioc.Bridge$Ioc$IIoc$Resolve$1(parameterInfo.pt));
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }

                        return Bridge.Reflection.invokeCI($ctor, Bridge.unbox(parameters.ToArray()));
                    }
                };
            }
        }
    });

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @param   {TSender}    arg1    
     * @param   {TArgs}      arg2
     * @return  {void}
     */

    Bridge.define("Bridge.Messenger.Messenger", {
        inherits: [Bridge.Messenger.IMessenger],
        fields: {
            _calls: null
        },
        alias: [
            "Send$1", "Bridge$Messenger$IMessenger$Send$1",
            "Send", "Bridge$Messenger$IMessenger$Send",
            "Subscribe$1", "Bridge$Messenger$IMessenger$Subscribe$1",
            "Subscribe", "Bridge$Messenger$IMessenger$Subscribe",
            "Unsubscribe$1", "Bridge$Messenger$IMessenger$Unsubscribe$1",
            "Unsubscribe", "Bridge$Messenger$IMessenger$Unsubscribe",
            "ResetMessenger", "Bridge$Messenger$IMessenger$ResetMessenger"
        ],
        ctors: {
            init: function () {
                this._calls = new (System.Collections.Generic.Dictionary$2(System.Tuple$3(System.String,System.Type,System.Type),System.Collections.Generic.List$1(System.Tuple$2(System.Object,Function)))).ctor();
            }
        },
        methods: {
            /**
             * Send Message with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}    TSender    TSender
             * @param   {Function}    TArgs      TMessageArgs
             * @param   {TSender}     sender     Sender
             * @param   {string}      message    Message
             * @param   {TArgs}       args       Args
             * @return  {void}
             */
            Send$1: function (TSender, TArgs, sender, message, args) {
                if (sender == null) {
                    throw new System.ArgumentNullException.$ctor1("sender");
                }
                this.InnerSend(message, TSender, TArgs, sender, args);
            },
            /**
             * Send Message without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}    TSender    TSender
             * @param   {TSender}     sender     Sender
             * @param   {string}      message    Message
             * @return  {void}
             */
            Send: function (TSender, sender, message) {
                if (sender == null) {
                    throw new System.ArgumentNullException.$ctor1("sender");
                }
                this.InnerSend(message, TSender, null, sender, null);
            },
            /**
             * Subscribe Message with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {Function}         TArgs         TArgs
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @param   {System.Action}    callback      Action
             * @param   {TSender}          source        source
             * @return  {void}
             */
            Subscribe$1: function (TSender, TArgs, subscriber, message, callback, source) {
                if (source === void 0) { source = Bridge.getDefaultValue(TSender); }
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (Bridge.staticEquals(callback, null)) {
                    throw new System.ArgumentNullException.$ctor1("callback");
                }

                var wrap = function (sender, args) {
                    var send = Bridge.cast(sender, TSender);
                    if (source == null || Bridge.referenceEquals(send, source)) {
                        callback(Bridge.cast(sender, TSender), Bridge.cast(Bridge.unbox(args, TArgs), TArgs));
                    }
                };

                this.InnerSubscribe(subscriber, message, TSender, TArgs, wrap);
            },
            /**
             * Subscribe Message without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @param   {System.Action}    callback      Action
             * @param   {TSender}          source        source
             * @return  {void}
             */
            Subscribe: function (TSender, subscriber, message, callback, source) {
                if (source === void 0) { source = Bridge.getDefaultValue(TSender); }
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (Bridge.staticEquals(callback, null)) {
                    throw new System.ArgumentNullException.$ctor1("callback");
                }

                var wrap = function (sender, args) {
                    var send = Bridge.cast(sender, TSender);
                    if (source == null || Bridge.referenceEquals(send, source)) {
                        callback(Bridge.cast(sender, TSender));
                    }
                };

                this.InnerSubscribe(subscriber, message, TSender, null, wrap);
            },
            /**
             * Unsubscribe action with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {Function}         TArgs         TArgs
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @return  {void}
             */
            Unsubscribe$1: function (TSender, TArgs, subscriber, message) {
                this.InnerUnsubscribe(message, TSender, TArgs, subscriber);
            },
            /**
             * Unsubscribe action without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @return  {void}
             */
            Unsubscribe: function (TSender, subscriber, message) {
                this.InnerUnsubscribe(message, TSender, null, subscriber);
            },
            /**
             * Remove all callbacks
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @return  {void}
             */
            ResetMessenger: function () {
                this._calls.clear();
            },
            InnerSend: function (message, senderType, argType, sender, args) {
                var $t, $t1;
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }
                var key = { Item1: message, Item2: senderType, Item3: argType };
                if (!this._calls.containsKey(key)) {
                    return;
                }
                var actions = this._calls.getItem(key);
                if (actions == null || !System.Linq.Enumerable.from(actions, System.Tuple$2(System.Object,Function)).any()) {
                    return;
                }

                var actionsCopy = ($t = System.Tuple$2(System.Object,Function), System.Linq.Enumerable.from(actions, $t).toList($t));
                $t1 = Bridge.getEnumerator(actionsCopy);
                try {
                    while ($t1.moveNext()) {
                        var action = $t1.Current;
                        if (actions.contains(action)) {
                            action.Item2(sender, args);
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
            },
            InnerSubscribe: function (subscriber, message, senderType, argType, callback) {
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }
                var key = { Item1: message, Item2: senderType, Item3: argType };
                var value = { Item1: subscriber, Item2: callback };
                if (this._calls.containsKey(key)) {
                    this._calls.getItem(key).add(value);
                } else {
                    var list = function (_o1) {
                            _o1.add(value);
                            return _o1;
                        }(new (System.Collections.Generic.List$1(System.Tuple$2(System.Object,Function))).ctor());
                    this._calls.setItem(key, list);
                }
            },
            InnerUnsubscribe: function (message, senderType, argType, subscriber) {
                var $t;
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }

                var key = { Item1: message, Item2: senderType, Item3: argType };
                if (!this._calls.containsKey(key)) {
                    return;
                }

                var toremove = System.Linq.Enumerable.from(this._calls.getItem(key), System.Tuple$2(System.Object,Function)).where(function (tuple) {
                        return Bridge.referenceEquals(tuple.Item1, subscriber);
                    }).toList(System.Tuple$2(System.Object,Function));

                $t = Bridge.getEnumerator(toremove);
                try {
                    while ($t.moveNext()) {
                        var tuple = $t.Current;
                        this._calls.getItem(key).remove(tuple);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                if (!System.Linq.Enumerable.from(this._calls.getItem(key), System.Tuple$2(System.Object,Function)).any()) {
                    this._calls.remove(key);
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
        events: {
            OnNavigated: null
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
            "addOnNavigated", "Bridge$Navigation$INavigator$addOnNavigated",
            "removeOnNavigated", "Bridge$Navigation$INavigator$removeOnNavigated",
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
                allAnchors.click(Bridge.fn.bind(this, function (ev) {
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
                }));
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

                // leave actual controlelr
                if (this.LastNavigateController != null) {
                    this.LastNavigateController.Bridge$Navigation$IAmLoadable$OnLeave();
                }

                this.Configuration.Bridge$Navigation$INavigatorConfigurator$Body.load(page.Bridge$Navigation$IPageDescriptor$HtmlLocation(), null, Bridge.fn.bind(this, function (o, s, a) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        scripts, 
                        $t1, 
                        scriptsTask, 
                        $t2, 
                        enableAnchors, 
                        $t3, 
                        controller, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3], $step);
                                switch ($step) {
                                    case 0: {
                                        // load dependencies
                                        if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$DependenciesScripts, null)) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 3;
                                        continue;
                                    }
                                    case 1: {
                                        scripts = ($t1 = System.String, System.Linq.Enumerable.from((page.Bridge$Navigation$IPageDescriptor$DependenciesScripts()), $t1).toList($t1));
                                        if (page.Bridge$Navigation$IPageDescriptor$SequentialDependenciesScriptLoad) {
                                            Bridge.Navigation.Utility.SequentialScriptLoad(scripts);
                                        }
                                        // parallel load
                                        scriptsTask = System.Linq.Enumerable.from(scripts, System.String).select(function (url) {
                                            return System.Threading.Tasks.Task.fromPromise($.getScript(url));
                                        });
                                        $task1 = System.Threading.Tasks.Task.whenAll(scriptsTask);
                                        $step = 2;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $step = 3;
                                        continue;
                                    }
                                    case 3: {
                                        // prepare page
                                        !Bridge.staticEquals(($t2 = page.Bridge$Navigation$IPageDescriptor$PreparePage), null) ? $t2() : null;

                                        // auto enable spaf anchors
                                        if (!this.Configuration.Bridge$Navigation$INavigatorConfigurator$DisableAutoSpafAnchorsOnNavigate) {
                                            enableAnchors = !Bridge.staticEquals(($t3 = page.Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors), null) ? $t3() : null;
                                            if (System.Nullable.hasValue(enableAnchors) && System.Nullable.getValue(enableAnchors)) {
                                                this.EnableSpafAnchors();
                                            }
                                        }

                                        if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$PageController, null)) {
                                            // load new controller
                                            controller = page.Bridge$Navigation$IPageDescriptor$PageController();
                                            controller.Bridge$Navigation$IAmLoadable$OnLoad(parameters);

                                            Bridge.Navigation.BridgeNavigator._actualController = controller;

                                            !Bridge.staticEquals(this.OnNavigated, null) ? this.OnNavigated(this, controller) : null;
                                        }
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
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
                return System.Linq.Enumerable.from(this._routes, Bridge.Navigation.IPageDescriptor).singleOrDefault(function (s) {
                        return System.String.equals(s.Bridge$Navigation$IPageDescriptor$Key, key, 1);
                    }, null);
            }
        }
    });

    Bridge.define("Bridge.Navigation.ComplexObjectNavigationHistory", {
        inherits: [Bridge.Navigation.IBrowserHistoryManager],
        alias: [
            "PushState", "Bridge$Navigation$IBrowserHistoryManager$PushState",
            "ParseUrl", "Bridge$Navigation$IBrowserHistoryManager$ParseUrl"
        ],
        methods: {
            PushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                var baseUrl = Bridge.Navigation.NavigationUtility.BuildBaseUrl(pageId);

                window.history.pushState(null, "", parameters != null ? System.String.format("{0}={1}", baseUrl, Bridge.global.btoa(JSON.stringify(parameters))) : baseUrl);
            },
            ParseUrl: function () {
                var res = new Bridge.Navigation.Model.UrlDescriptor();

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

    Bridge.define("Bridge.Navigation.PageDescriptor", {
        inherits: [Bridge.Navigation.IPageDescriptor],
        fields: {
            Key: null,
            HtmlLocation: null,
            PageController: null,
            CanBeDirectLoad: null,
            PreparePage: null,
            SequentialDependenciesScriptLoad: false,
            RedirectRules: null,
            AutoEnableSpafAnchors: null,
            DependenciesScripts: null
        },
        alias: [
            "Key", "Bridge$Navigation$IPageDescriptor$Key",
            "HtmlLocation", "Bridge$Navigation$IPageDescriptor$HtmlLocation",
            "PageController", "Bridge$Navigation$IPageDescriptor$PageController",
            "CanBeDirectLoad", "Bridge$Navigation$IPageDescriptor$CanBeDirectLoad",
            "PreparePage", "Bridge$Navigation$IPageDescriptor$PreparePage",
            "SequentialDependenciesScriptLoad", "Bridge$Navigation$IPageDescriptor$SequentialDependenciesScriptLoad",
            "RedirectRules", "Bridge$Navigation$IPageDescriptor$RedirectRules",
            "AutoEnableSpafAnchors", "Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors",
            "DependenciesScripts", "Bridge$Navigation$IPageDescriptor$DependenciesScripts"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                this.AutoEnableSpafAnchors = function () {
                    return true;
                };
            }
        }
    });

    Bridge.define("Bridge.Navigation.QueryParameterNavigationHistory", {
        inherits: [Bridge.Navigation.IBrowserHistoryManager],
        alias: [
            "PushState", "Bridge$Navigation$IBrowserHistoryManager$PushState",
            "ParseUrl", "Bridge$Navigation$IBrowserHistoryManager$ParseUrl"
        ],
        methods: {
            PushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                var baseUrl = Bridge.Navigation.NavigationUtility.BuildBaseUrl(pageId);

                window.history.pushState(null, "", parameters != null ? System.String.format("{0}{1}", baseUrl, this.BuildQueryParameter(parameters)) : baseUrl);
            },
            ParseUrl: function () {
                var $t;
                var res = new Bridge.Navigation.Model.UrlDescriptor();
                res.Parameters = new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor();

                var hash = window.location.hash;
                hash = System.String.replaceAll(hash, "#", "");

                if (System.String.isNullOrEmpty(hash)) {
                    return res;
                }

                var equalIndex = System.String.indexOf(hash, String.fromCharCode(63));
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


                var splittedByDoubleAnd = ($t = System.String, System.Linq.Enumerable.from(parameters.split("&"), $t).toList($t));
                splittedByDoubleAnd.ForEach(function (f) {
                    var splitted = f.split("=");
                    res.Parameters.add(splitted[System.Array.index(0, splitted)], decodeURIComponent(splitted[System.Array.index(1, splitted)]));
                });

                return res;
            },
            BuildQueryParameter: function (parameters) {
                var $t;
                if (parameters == null || !System.Linq.Enumerable.from(parameters, System.Collections.Generic.KeyValuePair$2(System.String,System.Object)).any()) {
                    return "";
                }

                var strBuilder = new System.Text.StringBuilder("?");
                $t = Bridge.getEnumerator(parameters);
                try {
                    while ($t.moveNext()) {
                        var keyValuePair = $t.Current;
                        strBuilder.append(encodeURIComponent(keyValuePair.key));
                        strBuilder.append("=");
                        strBuilder.append(encodeURIComponent(Bridge.toString(keyValuePair.value)));
                        strBuilder.append("&");
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                var res = System.String.trimEnd(strBuilder.toString(), [38]);

                return res;

            }
        }
    });

    Bridge.define("Bridge.Spaf.LoadableViewModel", {
        inherits: [Bridge.Spaf.ViewModelBase,Bridge.Navigation.IAmLoadable],
        fields: {
            Partials: null
        },
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        ctors: {
            init: function () {
                this.Partials = new (System.Collections.Generic.List$1(Bridge.Spaf.IViewModelLifeCycle)).ctor();
            }
        },
        methods: {
            OnLoad: function (parameters) {
                var $t;
                this.ApplyBindings();
                ($t = this.Partials) != null ? $t.ForEach(function (f) {
                        f.Bridge$Spaf$IViewModelLifeCycle$Init(parameters);
                    }) : null;
            },
            OnLeave: function () {
                var $t;
                ($t = this.Partials) != null ? $t.ForEach(function (f) {
                        f.Bridge$Spaf$IViewModelLifeCycle$DeInit();
                    }) : null;
                this.RemoveBindings();
            }
        }
    });

    Bridge.define("Bridge.Spaf.PartialModel", {
        inherits: [Bridge.Spaf.IViewModelLifeCycle],
        fields: {
            _partialElement: null
        },
        alias: [
            "Init", "Bridge$Spaf$IViewModelLifeCycle$Init",
            "DeInit", "Bridge$Spaf$IViewModelLifeCycle$DeInit"
        ],
        methods: {
            /**
             * Init partial
             *
             * @instance
             * @public
             * @this Bridge.Spaf.PartialModel
             * @memberof Bridge.Spaf.PartialModel
             * @param   {System.Collections.Generic.Dictionary$2}    parameters    data for init the partials
             * @return  {void}
             */
            Init: function (parameters) {

                $.get(this.HtmlUrl, null, Bridge.fn.bind(this, function (o, s, arg3) {
                    var $t;
                    this._partialElement = ($t = document.createElement("div"), $t.innerHTML = Bridge.toString(o), $t);
                    var node = document.getElementById(this.ElementId());
                    node.appendChild(this._partialElement);
                    ko.applyBindings(this, this._partialElement);
                }));
            },
            DeInit: function () {
                // check if ko contains this node
                if (this._partialElement == null) {
                    return;
                }
                var data = ko.dataFor(this._partialElement);
                if (data == null) {
                    return;
                }

                ko.removeNode(this._partialElement);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.AuthorizedResourceBase", {
        inherits: [realworld.spaf.Services.impl.ResourceBase],
        fields: {
            UserService: null
        },
        ctors: {
            ctor: function (userService) {
                this.$initialize();
                realworld.spaf.Services.impl.ResourceBase.ctor.call(this);
                this.UserService = userService;
            }
        },
        methods: {
            /**
             * Generic Awaitable ajax call
             *
             * @instance
             * @protected
             * @this realworld.spaf.Services.impl.AuthorizedResourceBase
             * @memberof realworld.spaf.Services.impl.AuthorizedResourceBase
             * @param   {Function}                         T          
             * @param   {System.Object}                    options
             * @return  {System.Threading.Tasks.Task$1}
             */
            MakeAuthorizedCall: function (T, options) {
                if (!this.UserService.realworld$spaf$Services$IUserService$IsLogged) {
                    throw new System.Exception("You must be logged to use this resource");
                }

                options.beforeSend = Bridge.fn.bind(this, function (xhr, o) {
                    xhr.setRequestHeader("Authorization", System.String.format("Token {0}", [this.UserService.realworld$spaf$Services$IUserService$LoggedUser.Token]));
                    return true;
                });
                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, T, options);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.LocalStorageRepository", {
        inherits: [realworld.spaf.Services.IRepository],
        statics: {
            fields: {
                TokenKey: null
            },
            ctors: {
                init: function () {
                    this.TokenKey = "token";
                }
            }
        },
        fields: {
            _storage: null
        },
        alias: [
            "SaveToken", "realworld$spaf$Services$IRepository$SaveToken",
            "GetTokenIfExist", "realworld$spaf$Services$IRepository$GetTokenIfExist",
            "DeleteToken", "realworld$spaf$Services$IRepository$DeleteToken"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                this._storage = window.localStorage;
            }
        },
        methods: {
            SaveToken: function (token) {
                this._storage.setItem(realworld.spaf.Services.impl.LocalStorageRepository.TokenKey, token);
            },
            GetTokenIfExist: function () {
                var token = this._storage.getItem(realworld.spaf.Services.impl.LocalStorageRepository.TokenKey);
                return token != null ? Bridge.toString(token) : null;
            },
            DeleteToken: function () {
                this._storage.removeItem(realworld.spaf.Services.impl.LocalStorageRepository.TokenKey);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.Settings", {
        inherits: [realworld.spaf.Services.ISettings],
        fields: {
            ApiUri: null,
            ArticleInPage: 0
        },
        alias: [
            "ApiUri", "realworld$spaf$Services$ISettings$ApiUri",
            "ArticleInPage", "realworld$spaf$Services$ISettings$ArticleInPage"
        ],
        ctors: {
            init: function () {
                this.ApiUri = "https://conduit.productionready.io/api";
                this.ArticleInPage = 10;
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.UserResources", {
        inherits: [realworld.spaf.Services.impl.ResourceBase,realworld.spaf.Services.IUserResources],
        fields: {
            _settings: null
        },
        alias: [
            "Login", "realworld$spaf$Services$IUserResources$Login",
            "Register", "realworld$spaf$Services$IUserResources$Register",
            "GetCurrentUser", "realworld$spaf$Services$IUserResources$GetCurrentUser"
        ],
        ctors: {
            ctor: function (settings) {
                this.$initialize();
                realworld.spaf.Services.impl.ResourceBase.ctor.call(this);
                this._settings = settings;
            }
        },
        methods: {
            Login: function (loginRequest) {
                var options = { url: System.String.format("{0}/users/login", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "POST", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(loginRequest) };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SignResponse, options);
            },
            Register: function (loginRequest) {
                var options = { url: System.String.format("{0}/users", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "POST", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(loginRequest) };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SignResponse, options);
            },
            GetCurrentUser: function (token) {
                var options = { url: System.String.format("{0}/user", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "GET", dataType: "json", beforeSend: function (xhr, o) {
                    xhr.setRequestHeader("Authorization", System.String.format("Token {0}", [token]));
                    return true;
                } };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SignResponse, options);

            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.UserService", {
        inherits: [realworld.spaf.Services.IUserService],
        fields: {
            _userResources: null,
            _messenger: null,
            _repository: null,
            LoggedUser: null
        },
        props: {
            IsLogged: {
                get: function () {
                    return this.LoggedUser != null;
                }
            }
        },
        alias: [
            "LoggedUser", "realworld$spaf$Services$IUserService$LoggedUser",
            "IsLogged", "realworld$spaf$Services$IUserService$IsLogged",
            "Login", "realworld$spaf$Services$IUserService$Login",
            "Register", "realworld$spaf$Services$IUserService$Register",
            "TryAutoLoginWithStoredToken", "realworld$spaf$Services$IUserService$TryAutoLoginWithStoredToken"
        ],
        ctors: {
            ctor: function (userResources, messenger, repository) {
                this.$initialize();
                this._userResources = userResources;
                this._messenger = messenger;
                this._repository = repository;
            }
        },
        methods: {
            Login: function (mail, password) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    loginResponse, 
                    $t, 
                    $t1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._userResources.realworld$spaf$Services$IUserResources$Login(($t = new realworld.spaf.Models.Request.SignRequest(), $t.User = ($t1 = new realworld.spaf.Models.Request.UserRequest(), $t1.Email = mail, $t1.Password = password, $t1), $t));
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;

                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            Register: function (username, mail, password) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    loginResponse, 
                    $t, 
                    $t1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._userResources.realworld$spaf$Services$IUserResources$Register(($t = new realworld.spaf.Models.Request.SignRequest(), $t.User = ($t1 = new realworld.spaf.Models.Request.UserRequest(), $t1.Email = mail, $t1.Password = password, $t1.Username = username, $t1), $t));
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;

                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            TryAutoLoginWithStoredToken: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    storedToken, 
                    loginResponse, 
                    $async_e, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4], $step);
                                switch ($step) {
                                    case 0: {
                                        storedToken = this._repository.realworld$spaf$Services$IRepository$GetTokenIfExist();
                                        if (storedToken == null) {
                                            $tcs.setResult(null);
                                            return;
                                        }

                                        
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        $task1 = this._userResources.realworld$spaf$Services$IUserResources$GetCurrentUser(storedToken);
                                        $step = 2;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;
                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
                                        $step = 4;
                                        continue;
                                    }
                                    case 3: {
                                        this._repository.realworld$spaf$Services$IRepository$DeleteToken();
                                        this.LoggedUser = null;
                                        $async_e = null;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            if ( $step >= 1 && $step <= 2 ) {
                                if (Bridge.is($async_e, Bridge.PromiseException)) {
                                    $step = 3;
                                    $asyncBody();
                                    return;
                                }
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("Bridge.Ioc.InstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.InstanceResolver],
        ctors: {
            ctor: function (resolvedObj) {
                this.$initialize();
                Bridge.Ioc.InstanceResolver.ctor.call(this, resolvedObj);

            }
        }
    }; });

    Bridge.define("Bridge.Ioc.SingleInstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.SingleInstanceResolver],
        ctors: {
            ctor: function (ioc) {
                this.$initialize();
                Bridge.Ioc.SingleInstanceResolver.ctor.call(this, ioc, T);
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.TransientResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.TransientResolver],
        ctors: {
            ctor: function (ioc) {
                this.$initialize();
                Bridge.Ioc.TransientResolver.ctor.call(this, ioc, T);

            }
        }
    }; });

    Bridge.define("Bridge.Navigation.BridgeNavigatorWithRouting", {
        inherits: [Bridge.Navigation.BridgeNavigator],
        fields: {
            _browserHistoryManager: null
        },
        alias: [
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation"
        ],
        ctors: {
            ctor: function (configuration, browserHistoryManager) {
                this.$initialize();
                Bridge.Navigation.BridgeNavigator.ctor.call(this, configuration);
                this._browserHistoryManager = browserHistoryManager;
                window.onpopstate = Bridge.fn.combine(window.onpopstate, Bridge.fn.bind(this, function (e) {
                    var urlInfo = this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$ParseUrl();
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
                this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$PushState(pageId, parameters);
                Bridge.Navigation.BridgeNavigator.prototype.Navigate.call(this, pageId, parameters);
            },
            InitNavigation: function () {
                var parsed = this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$ParseUrl();

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
                        this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$PushState(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId, void 0);
                        this.NavigateWithoutPushState(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId);
                    } else {
                        this.Navigate(parsed.PageId, parsed.Parameters);
                    }
                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.CustomRoutesConfig", {
        inherits: [Bridge.Navigation.BridgeNavigatorConfigBase],
        fields: {
            _userService: null,
            DisableAutoSpafAnchorsOnNavigate: false,
            Body: null,
            HomeId: null
        },
        props: {
            VirtualDirectory: {
                get: function () {
                    return System.String.isNullOrEmpty(Bridge.Navigation.NavigationUtility.VirtualDirectory) ? "" : System.String.format("{0}/", [Bridge.Navigation.NavigationUtility.VirtualDirectory]);
                }
            }
        },
        alias: [
            "DisableAutoSpafAnchorsOnNavigate", "Bridge$Navigation$INavigatorConfigurator$DisableAutoSpafAnchorsOnNavigate",
            "CreateRoutes", "Bridge$Navigation$INavigatorConfigurator$CreateRoutes",
            "Body", "Bridge$Navigation$INavigatorConfigurator$Body",
            "HomeId", "Bridge$Navigation$INavigatorConfigurator$HomeId"
        ],
        ctors: {
            init: function () {
                this.DisableAutoSpafAnchorsOnNavigate = false;
                this.Body = $("#pageBody");
                this.HomeId = Bridge.Spaf.SpafApp.HomeId;
            },
            ctor: function (userService) {
                this.$initialize();
                Bridge.Navigation.BridgeNavigatorConfigBase.ctor.call(this);
                this._userService = userService;
            }
        },
        methods: {
            CreateRoutes: function () {
                return Bridge.fn.bind(this, function (_o1) {
                        var $t;
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/home.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.HomeId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.HomeViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/login.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.LoginId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.LoginViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/register.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.RegisterId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.RegisterViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/profile.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.ProfileId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.ProfileViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = Bridge.fn.bind(this, function () {
                            return this._userService.realworld$spaf$Services$IUserService$IsLogged;
                        }), $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/settings.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.SettingsId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.SettingsViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return false;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/editArticle.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.EditArticleId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.EditArticleViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/article.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.ArticleId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.ArticleViewModel);
                        }, $t));
                        return _o1;
                    })(new (System.Collections.Generic.List$1(Bridge.Navigation.IPageDescriptor)).ctor());
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.ArticleResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.IArticleResources],
        fields: {
            _settings: null
        },
        alias: [
            "GetArticles", "realworld$spaf$Services$IArticleResources$GetArticles",
            "GetTags", "realworld$spaf$Services$IArticleResources$GetTags",
            "GetArticle", "realworld$spaf$Services$IArticleResources$GetArticle",
            "Favorite", "realworld$spaf$Services$IArticleResources$Favorite",
            "UnFavorite", "realworld$spaf$Services$IArticleResources$UnFavorite",
            "Create", "realworld$spaf$Services$IArticleResources$Create",
            "GetArticleComments", "realworld$spaf$Services$IArticleResources$GetArticleComments",
            "AddComment", "realworld$spaf$Services$IArticleResources$AddComment"
        ],
        ctors: {
            ctor: function (settings, userService) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
            GetArticles: function (builder) {
                var options = { url: System.String.format("{0}/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, builder.Build()), type: "GET", dataType: "json" };

                return this.UserService.realworld$spaf$Services$IUserService$IsLogged ? this.MakeAuthorizedCall(realworld.spaf.Models.Response.ArticleResponse, options) : this.MakeCall(realworld.spaf.Models.Response.ArticleResponse, options);
            },
            GetTags: function () {
                var options = { url: System.String.format("{0}/tags", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.TagsResponse, options);
            },
            GetArticle: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SingleArticleResponse, options);
            },
            Favorite: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}/favorite", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "POST", dataType: "json", contentType: "application/json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SingleArticleResponse, options);
            },
            UnFavorite: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}/favorite", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "DELETE", dataType: "json", contentType: "application/json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SingleArticleResponse, options);
            },
            Create: function (newArticle) {
                var options = { url: System.String.format("{0}/articles", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "POST", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(newArticle) };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SingleArticleResponse, options);
            },
            GetArticleComments: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}/comments", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.CommentsResponse, options);
            },
            AddComment: function (slug, comment) {
                var $t;
                var options = { url: System.String.format("{0}/articles/{1}/comments", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "POST", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(($t = new realworld.spaf.Models.Comment(), $t.Body = comment, $t)) };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SingleCommentResponse, options);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.FeedResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.IFeedResources],
        fields: {
            _settings: null
        },
        alias: ["GetFeed", "realworld$spaf$Services$IFeedResources$GetFeed"],
        ctors: {
            ctor: function (settings, userService) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
            GetFeed: function (builder) {
                var options = { url: System.String.format("{0}/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, builder.Build()), type: "GET", dataType: "json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.ArticleResponse, options);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.ProfileResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.IProfileResources],
        fields: {
            _settings: null
        },
        alias: [
            "Follow", "realworld$spaf$Services$IProfileResources$Follow",
            "UnFollow", "realworld$spaf$Services$IProfileResources$UnFollow",
            "Get", "realworld$spaf$Services$IProfileResources$Get"
        ],
        ctors: {
            ctor: function (userService, settings) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
            Follow: function (username) {
                var options = { url: System.String.format("{0}/profiles/{1}/follow", this._settings.realworld$spaf$Services$ISettings$ApiUri, username), type: "POST", dataType: "json", contentType: "application/json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.FollowResponse, options);
            },
            UnFollow: function (username) {
                var options = { url: System.String.format("{0}/profiles/{1}/follow", this._settings.realworld$spaf$Services$ISettings$ApiUri, username), type: "DELETE", dataType: "json", contentType: "application/json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.FollowResponse, options);
            },
            Get: function (username) {
                var options = { url: System.String.format("{0}/profiles/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, username), type: "GET", dataType: "json", contentType: "application/json" };

                return this.UserService.realworld$spaf$Services$IUserService$IsLogged ? this.MakeAuthorizedCall(realworld.spaf.Models.Response.ProfileResponse, options) : realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.ProfileResponse, options);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.SettingsResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.ISettingsResources],
        fields: {
            _settings: null
        },
        alias: ["UpdateSettings", "realworld$spaf$Services$ISettingsResources$UpdateSettings"],
        ctors: {
            ctor: function (settings, userService) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
            UpdateSettings: function (settingsRequest) {
                var options = { url: System.String.format("{0}/user", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "PUT", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(settingsRequest) };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SettingsResponse, options);
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.ArticleViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _articleResources: null,
            _userService: null,
            _navigator: null,
            _profileResources: null,
            Article: null,
            Comments: null,
            Comment: null
        },
        props: {
            IsLogged: {
                get: function () {
                    return this._userService.realworld$spaf$Services$IUserService$IsLogged;
                }
            },
            LoggedUser: {
                get: function () {
                    return this._userService.realworld$spaf$Services$IUserService$LoggedUser;
                }
            }
        },
        alias: ["OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad"],
        ctors: {
            ctor: function (articleResources, userService, navigator, profileResources) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._articleResources = articleResources;
                this._userService = userService;
                this._navigator = navigator;
                this._profileResources = profileResources;

                this.Article = new realworld.spaf.Models.Article();
                this.Comments = ko.observableArray();
                this.Comment = ko.observable();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.ArticleId;
            },
            OnLoad: function (parameters) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    slug, 
                    articleTask, 
                    commentsTask, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters);

                                    slug = Bridge.Navigation.NavigationUtility.GetParameter(System.String, parameters, "slug");
                                    if (System.String.isNullOrEmpty(slug)) {
                                        throw new System.Exception("Article page need slug parameter");
                                    }

                                    articleTask = this.LoadArticle(slug);
                                    commentsTask = this.LoadComments(slug);
                                    $task1 = System.Threading.Tasks.Task.whenAll(articleTask, commentsTask);
                                    $step = 1;
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
                                    return;
                                }
                                case 1: {
                                    $task1.getAwaitedResult();
                                    this.RefreshBinding(); // manual refresh for performance
                                    this._navigator.Bridge$Navigation$INavigator$EnableSpafAnchors(); // todo check why not auto enabled
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            /**
             * Add comment to article
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            AddComment: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    commentResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        if (!this.IsLogged) {
                                            $tcs.setResult(null);
                                            return;
                                        }

                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$AddComment(this.Article.Slug, this.Comment());
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        commentResponse = $taskResult1;
                                        this.Comment("");
                                        this.Comments.push(commentResponse.Comment);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Follow Article Author
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            FollowAuthor: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._profileResources.realworld$spaf$Services$IProfileResources$Follow(this.Article.Author.Username);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Manual revaluate binding
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @return  {void}
             */
            RefreshBinding: function () {
                ko.cleanNode(this.PageNode);
                this.ApplyBindings();
            },
            /**
             * Load comments
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @param   {string}                         slug
             * @return  {System.Threading.Tasks.Task}
             */
            LoadComments: function (slug) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    comment, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$GetArticleComments(slug);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        comment = $taskResult1;
                                        this.Comments.push.apply(this.Comments, comment.Comments);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Load Article info
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @param   {string}                         slug
             * @return  {System.Threading.Tasks.Task}
             */
            LoadArticle: function (slug) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    article, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$GetArticle(slug);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        article = $taskResult1;
                                        this.Article = article.Article;
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.EditArticleViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _articleResources: null,
            _navigator: null,
            Title: null,
            Body: null,
            Description: null,
            Tags: null
        },
        alias: ["OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad"],
        ctors: {
            ctor: function (articleResources, navigator) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._articleResources = articleResources;
                this._navigator = navigator;
                this.Title = ko.observable();
                this.Body = ko.observable();
                this.Description = ko.observable();
                this.Tags = ko.observable();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.EditArticleId;
            },
            OnLoad: function (parameters) {
                Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters);

                //            var articleSlug = parameters.GetParameter<string>("slug");
                //            if(string.IsNullOrEmpty(articleSlug))
                //                throw new Exception("Slug missing!");

            },
            Create: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    newArticel, 
                    $t, 
                    $t1, 
                    $t2, 
                    article, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        // todo validations
                                        newArticel = ($t = new realworld.spaf.Models.Request.NewArticleRequest(), $t.Article = ($t1 = new realworld.spaf.Models.NewArticle(), $t1.Title = this.Title(), $t1.Body = this.Body(), $t1.Description = this.Description(), $t1.TagList = ($t2 = System.String, System.Linq.Enumerable.from(System.String.split(this.Tags(), [44].map(function (i) {{ return String.fromCharCode(i); }})), $t2).ToArray($t2)), $t1), $t);

                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$Create(newArticel);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        article = $taskResult1;
                                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ArticleId, function (_o1) {
                                            _o1.add("slug", article.Article.Slug);
                                            return _o1;
                                        }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.HomeViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _tagFilter: null,
            _resources: null,
            _settings: null,
            _messenger: null,
            _userService: null,
            _feedResources: null,
            _navigator: null,
            Articles: null,
            Pages: null,
            Tags: null,
            ActiveTabIndex: null,
            Tabs: null,
            IsLogged: null
        },
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        ctors: {
            ctor: function (resources, settings, messenger, userService, feedResources, navigator) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._resources = resources;
                this._settings = settings;
                this._messenger = messenger;
                this._userService = userService;
                this._feedResources = feedResources;
                this._navigator = navigator;
                this.Articles = ko.observableArray();
                this.Pages = ko.observableArray();
                this.Tags = ko.observableArray();
                this.Tabs = ko.observableArray();
                this.IsLogged = ko.observable(this._userService.realworld$spaf$Services$IUserService$IsLogged);
                this.ActiveTabIndex = ko.observable(-1);

            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.HomeId;
            },
            OnLoad: function (parameters) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    articlesTask, 
                    loadTagsTask, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters); // always call base (where applybinding)

                                    articlesTask = this.LoadArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage)); // load article task
                                    loadTagsTask = this.LoadTags();
                                    $task1 = System.Threading.Tasks.Task.whenAll(articlesTask, loadTagsTask);
                                    $step = 1;
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
                                    return;
                                }
                                case 1: {
                                    $task1.getAwaitedResult();
                                    this.RefreshPaginator(articlesTask.getResult());
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            OnLeave: function () {
                Bridge.Spaf.LoadableViewModel.prototype.OnLeave.call(this);
                this._messenger.Bridge$Messenger$IMessenger$Unsubscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.LoginId);
            },
            /**
             * Navigate to user detail
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {void}
             */
            GoToUser: function (article) {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ProfileId, function (_o1) {
                        _o1.add("username", article.Author.Username);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
            },
            /**
             * Navigate to article detail
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {void}
             */
            GoToArticle: function (article) {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ArticleId, function (_o1) {
                        _o1.add("slug", article.Slug);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
            },
            /**
             * Add passed article to fav
             Only for auth users
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {System.Threading.Tasks.Task}
             */
            AddToFavourite: function (article) {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    singleArticle, 
                    $taskResult1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        if (!this.IsLogged()) {
                                            $tcs.setResult(null);
                                            return;
                                        }

                                        if (article.Favorited) {
                                            $step = 1;
                                            continue;
                                        }  else {
                                            $step = 3;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        $task2 = this._resources.realworld$spaf$Services$IArticleResources$UnFavorite(article.Slug);
                                        $step = 2;
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        $taskResult1 = $taskResult2;
                                        $step = 5;
                                        continue;
                                    }
                                    case 3: {
                                        $task3 = this._resources.realworld$spaf$Services$IArticleResources$Favorite(article.Slug);
                                        $step = 4;
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
                                        return;
                                    }
                                    case 4: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $taskResult1 = $taskResult3;
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
                                        singleArticle = $taskResult1;

                                        this.Articles.replace(article, singleArticle.Article);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Go to user feed
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            ResetTabsForFeed: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articleResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.ActiveTabIndex(-2);
                                        this.Tabs.removeAll();
                                        this._tagFilter = null;
                                        $task1 = this.LoadFeed(realworld.spaf.Classes.FeedRequestBuilder.Default().WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage));
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articleResponse = $taskResult1;
                                        this.RefreshPaginator(articleResponse);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Reset Tab
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            ResetTabs: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articleResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.ActiveTabIndex(-1);
                                        this.Tabs.removeAll();
                                        this._tagFilter = null;
                                        $task1 = this.LoadArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage));
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articleResponse = $taskResult1;
                                        this.RefreshPaginator(articleResponse);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Go to page
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Paginator}    paginator
             * @return  {System.Threading.Tasks.Task}
             */
            GoToPage: function (paginator) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    request, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        System.Linq.Enumerable.from(this.Pages(), realworld.spaf.Models.Paginator).single(function (s) {
                                            return s.Active();
                                        }).Active(false);
                                        paginator.Active(true);

                                        request = realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithOffSet(Bridge.Int.mul((((paginator.Page - 1) | 0)), this._settings.realworld$spaf$Services$ISettings$ArticleInPage)).WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage);

                                        if (!System.String.isNullOrEmpty(this._tagFilter)) {
                                            request = request.WithTag(this._tagFilter);
                                        }

                                        $task1 = this.LoadArticles(request);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Filter articles by tag
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {string}                         tag
             * @return  {System.Threading.Tasks.Task}
             */
            FilterByTag: function (tag) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    tabName, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        tabName = System.String.format("#{0}", [tag]);
                                        $task1 = this.ArticlesForTab(tabName);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Load articles for passed tab
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {string}                         tab
             * @return  {System.Threading.Tasks.Task}
             */
            ArticlesForTab: function (tab) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    tagName, 
                    actualIndex, 
                    articles, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        tagName = System.String.trimStart(tab, [35]);
                                        this._tagFilter = tagName;

                                        actualIndex = this.Tabs().indexOf(tab);

                                        if (actualIndex === -1) {
                                            this.Tabs.push(tab);
                                        }

                                        this.ActiveTabIndex(this.Tabs().indexOf(tab));

                                        $task1 = this.LoadArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithTag(tagName).WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage));
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articles = $taskResult1;
                                        this.RefreshPaginator(articles);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Load articles
             Clear list and reload
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Services.impl.ArticleRequestBuilder}    request
             * @return  {System.Threading.Tasks.Task$1}
             */
            LoadArticles: function (request) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articleResoResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._resources.realworld$spaf$Services$IArticleResources$GetArticles(request);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articleResoResponse = $taskResult1;
                                        this.Articles.removeAll();
                                        this.Articles.push.apply(this.Articles, articleResoResponse.Articles);
                                        $tcs.setResult(articleResoResponse);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Load feed
             Clear list and reload
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Classes.FeedRequestBuilder}    request
             * @return  {System.Threading.Tasks.Task$1}
             */
            LoadFeed: function (request) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    feedResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._feedResources.realworld$spaf$Services$IFeedResources$GetFeed(request);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        feedResponse = $taskResult1;
                                        this.Articles.removeAll();
                                        this.Articles.push.apply(this.Articles, feedResponse.Articles);
                                        $tcs.setResult(feedResponse);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Reload tags
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            LoadTags: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    tags, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._resources.realworld$spaf$Services$IArticleResources$GetTags();
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        tags = $taskResult1;
                                        this.Tags.removeAll();
                                        this.Tags.push.apply(this.Tags, tags.Tags);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * When update articles rebuild paginator
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Response.ArticleResponse}    articleResoResponse
             * @return  {void}
             */
            RefreshPaginator: function (articleResoResponse) {
                this.Pages.removeAll();

                if (!System.Linq.Enumerable.from(articleResoResponse.Articles, realworld.spaf.Models.Article).any()) {
                    return;
                } // no articles

                var pagesCount = System.Int64.clip32(articleResoResponse.ArticlesCount.div(System.Int64(articleResoResponse.Articles.length)));
                var range = System.Linq.Enumerable.range(1, pagesCount);
                var pages = range.select(function (s) {
                    var $t;
                    return ($t = new realworld.spaf.Models.Paginator(), $t.Page = s, $t);
                }).ToArray(realworld.spaf.Models.Paginator);
                pages[System.Array.index(0, pages)].Active(true);
                this.Pages.push.apply(this.Pages, pages);
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.LoginViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _navigator: null,
            _userService: null,
            Email: null,
            Password: null,
            IsBusy: null,
            Errors: null
        },
        ctors: {
            ctor: function (navigator, userService) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._navigator = navigator;
                this._userService = userService;

                this.Email = ko.observable();
                this.Password = ko.observable();
                this.IsBusy = ko.observable();
                this.Errors = ko.observableArray();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.LoginId;
            },
            Login: function () {
                this.IsBusy(true);
                this.Errors.removeAll();
                return this._userService.realworld$spaf$Services$IUserService$Login(this.Email(), this.Password()).continueWith(Bridge.fn.bind(this, function (c) {
                    var $t;
                    this.IsBusy(false);

                    if (c.isFaulted()) {
                        var firstException = System.Linq.Enumerable.from(c.getException().innerExceptions, System.Exception).first();

                        if (Bridge.is(firstException, Bridge.PromiseException)) {
                            var e = Bridge.cast(System.Linq.Enumerable.from(c.getException().innerExceptions, System.Exception).first(), Bridge.PromiseException);
                            var errors = realworld.spaf.Classes.Extensions.GetValidationErrors(e);
                            this.Errors.push.apply(this.Errors, ($t = System.String, System.Linq.Enumerable.from(errors, $t).ToArray($t)));
                        } else {
                            // transient "not completed task" caused by bridge version (in fix)
                            this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.HomeId, void 0);
                        }
                    } else {
                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.HomeId, void 0);
                    }
                }));
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.ProfileViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _profileResource: null,
            _userService: null,
            _articleResources: null,
            _navigator: null,
            _messenger: null,
            ProfileModel: null,
            ActiveTabIndex: null,
            IsLogged: null
        },
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        ctors: {
            ctor: function (profileResource, userService, articleResources, navigator, messenger) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this.ProfileModel = new realworld.spaf.ViewModels.ProfileModel();
                this._profileResource = profileResource;
                this._userService = userService;
                this._articleResources = articleResources;
                this._navigator = navigator;
                this._messenger = messenger;

                this.ActiveTabIndex = ko.observable(0);
                this.IsLogged = ko.observable(this._userService.realworld$spaf$Services$IUserService$IsLogged);

                this._messenger.Bridge$Messenger$IMessenger$Subscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone, Bridge.fn.bind(this, function (service) {
                    this.IsLogged(true);
                }), void 0);

            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.ProfileId;
            },
            OnLoad: function (parameters) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    username, 
                    $e1, 
                    userTask, 
                    articleTask, 
                    favouriteTask, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters);
                                    username = "";
                                    try {
                                        username = Bridge.Navigation.NavigationUtility.GetParameter(System.String, parameters, "username");
                                    } catch ($e1) {
                                        $e1 = System.Exception.create($e1);
                                        if (!this._userService.realworld$spaf$Services$IUserService$IsLogged) {
                                            throw new System.Exception("No username passed and you are not logged!");
                                        }

                                        username = this._userService.realworld$spaf$Services$IUserService$LoggedUser.Username;
                                    }

                                    userTask = this.LoadUser(username);
                                    articleTask = this.LoadArticles(username);
                                    favouriteTask = this.LoadFavouritesArticles(username);

                                    $task1 = System.Threading.Tasks.Task.whenAll(userTask, articleTask, favouriteTask);
                                    $step = 1;
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
                                    return;
                                }
                                case 1: {
                                    $task1.getAwaitedResult();
                                    this.ProfileModel.ShowArticles();
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            OnLeave: function () {
                Bridge.Spaf.LoadableViewModel.prototype.OnLeave.call(this);
                this._messenger.Bridge$Messenger$IMessenger$Unsubscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.LoginId);
            },
            /**
             * Add passed article to fav
             Only for auth users
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {System.Threading.Tasks.Task}
             */
            AddToFavourite: function (article) {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    singleArticle, 
                    $taskResult1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        if (!this.IsLogged()) {
                                            $tcs.setResult(null);
                                            return;
                                        }

                                        if (article.Favorited) {
                                            $step = 1;
                                            continue;
                                        }  else {
                                            $step = 3;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        $task2 = this._articleResources.realworld$spaf$Services$IArticleResources$UnFavorite(article.Slug);
                                        $step = 2;
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        $taskResult1 = $taskResult2;
                                        $step = 5;
                                        continue;
                                    }
                                    case 3: {
                                        $task3 = this._articleResources.realworld$spaf$Services$IArticleResources$Favorite(article.Slug);
                                        $step = 4;
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
                                        return;
                                    }
                                    case 4: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $taskResult1 = $taskResult3;
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
                                        singleArticle = $taskResult1;

                                        this.ProfileModel.Articles.replace(article, singleArticle.Article);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Follow / unfollow
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            Follow: function () {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    username, 
                    follow, 
                    $taskResult1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        username = this.ProfileModel.Username();
                                        if (this.ProfileModel.Following()) {
                                            $step = 1;
                                            continue;
                                        }  else {
                                            $step = 3;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        $task2 = this._profileResource.realworld$spaf$Services$IProfileResources$UnFollow(username);
                                        $step = 2;
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        $taskResult1 = $taskResult2;
                                        $step = 5;
                                        continue;
                                    }
                                    case 3: {
                                        $task3 = this._profileResource.realworld$spaf$Services$IProfileResources$Follow(username);
                                        $step = 4;
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
                                        return;
                                    }
                                    case 4: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $taskResult1 = $taskResult3;
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
                                        follow = $taskResult1;
                                        this.ProfileModel.Following(follow.Profile.Following);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Navigate to user detail
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {void}
             */
            GoToUser: function (article) {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ProfileId, function (_o1) {
                        _o1.add("username", article.Author.Username);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
            },
            /**
             * Navigate to article detail
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {void}
             */
            GoToArticle: function (article) {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ArticleId, function (_o1) {
                        _o1.add("slug", article.Slug);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
            },
            /**
             * Show user articles
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @return  {void}
             */
            ShowArticles: function () {
                this.ActiveTabIndex(0);
                this.ProfileModel.ShowArticles();
            },
            /**
             * Show favs
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @return  {void}
             */
            ShowFavourites: function () {
                this.ActiveTabIndex(1);
                this.ProfileModel.ShowFavourites();
            },
            /**
             * Load user data
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {string}                         username
             * @return  {System.Threading.Tasks.Task}
             */
            LoadUser: function (username) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    profileResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._profileResource.realworld$spaf$Services$IProfileResources$Get(username);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        profileResponse = $taskResult1;
                                        this.ProfileModel.MapMe(profileResponse.Profile);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Load Articles
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {string}                         username
             * @return  {System.Threading.Tasks.Task}
             */
            LoadArticles: function (username) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articles, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$GetArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(5).OfAuthor(username));
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articles = $taskResult1;

                                        this.ProfileModel.UserArticles = articles.Articles;
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Load Articles Favorites
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {string}                         username
             * @return  {System.Threading.Tasks.Task}
             */
            LoadFavouritesArticles: function (username) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articles, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$GetArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(5).OfFavorite(username));
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articles = $taskResult1;

                                        this.ProfileModel.Favourtites = articles.Articles;
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.RegisterViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _navigator: null,
            _userService: null,
            Username: null,
            Email: null,
            Password: null,
            Errors: null
        },
        ctors: {
            ctor: function (navigator, userService) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._navigator = navigator;
                this._userService = userService;

                this.Username = ko.observable();
                this.Email = ko.observable();
                this.Password = ko.observable();
                this.Errors = ko.observableArray();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.RegisterId;
            },
            Register: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    e, 
                    errors, 
                    $t, 
                    $async_e, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([1,2,3,4], $step);
                                switch ($step) {

                                    case 1: {
                                        this.Errors.removeAll();
                                        $task1 = this._userService.realworld$spaf$Services$IUserService$Register(this.Username(), this.Email(), this.Password());
                                        $step = 2;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task1.getAwaitedResult();
                                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.HomeId, void 0);
                                        $step = 4;
                                        continue;
                                    }
                                    case 3: {
                                        errors = realworld.spaf.Classes.Extensions.GetValidationErrors(e);
                                        this.Errors.push.apply(this.Errors, ($t = System.String, System.Linq.Enumerable.from(errors, $t).ToArray($t)));
                                        $async_e = null;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            if ( $step >= 1 && $step <= 2 ) {
                                if (Bridge.is($async_e, Bridge.PromiseException)) {
                                    e = $async_e;
                                    $step = 3;
                                    $asyncBody();
                                    return;
                                }
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.SettingsViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _userService: null,
            _settingsResources: null,
            _navigator: null,
            ImageUri: null,
            Username: null,
            Biography: null,
            Email: null,
            NewPassword: null,
            Errors: null
        },
        ctors: {
            ctor: function (userService, settingsResources, navigator) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._userService = userService;
                this._settingsResources = settingsResources;
                this._navigator = navigator;

                this.ImageUri = ko.observable();
                this.Username = ko.observable();
                this.Biography = ko.observable();
                this.Email = ko.observable();
                this.NewPassword = ko.observable();
                this.Errors = ko.observableArray();

                this.PopulateEntries();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.SettingsId;
            },
            PopulateEntries: function () {
                var user = this._userService.realworld$spaf$Services$IUserService$LoggedUser;
                this.Username(user.Username);
                this.Email(user.Email);
                this.ImageUri(user.Image);
                this.Biography(user.Bio);
            },
            UpdateSettings: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    settingsRequest, 
                    $t, 
                    userUpdated, 
                    e, 
                    errors, 
                    $async_e, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([1,2,3,4], $step);
                                switch ($step) {

                                    case 1: {
                                        settingsRequest = ($t = new realworld.spaf.Models.Request.SettingsRequest(), $t.Username = this.Username(), $t.NewPassword = this.NewPassword(), $t.Biography = this.Biography(), $t.Email = this.Email(), $t.ImageUri = this.ImageUri(), $t);

                                        $task1 = this._settingsResources.realworld$spaf$Services$ISettingsResources$UpdateSettings(settingsRequest);
                                        $step = 2;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        userUpdated = $taskResult1;
                                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ProfileId, void 0);
                                        $step = 4;
                                        continue;
                                    }
                                    case 3: {
                                        errors = realworld.spaf.Classes.Extensions.GetValidationErrors(e);
                                        this.Errors.push.apply(this.Errors, ($t = System.String, System.Linq.Enumerable.from(errors, $t).ToArray($t)));
                                        $async_e = null;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            if ( $step >= 1 && $step <= 2 ) {
                                if (Bridge.is($async_e, Bridge.PromiseException)) {
                                    e = $async_e;
                                    $step = 3;
                                    $asyncBody();
                                    return;
                                }
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiU3BhZi9OYXZpZ2F0aW9uL05hdmlnYXRpb25VdGlsaXR5LmNzIiwiU3BhZi9OYXZpZ2F0aW9uL1V0aWxpdHkuY3MiLCJTcGFmL1ZpZXdNb2RlbEJhc2UuY3MiLCJTcGFmQXBwLmNzIiwiQ2xhc3Nlcy9FeHRlbnNpb25zLmNzIiwiQ2xhc3Nlcy9GZWVkUmVxdWVzdEJ1aWxkZXIuY3MiLCJNb2RlbHMvQXJ0aWNsZS5jcyIsIk1vZGVscy9Db21tZW50LmNzIiwiTW9kZWxzL1BhZ2luYXRvci5jcyIsIkNsYXNzZXMvQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLmNzIiwiU2VydmljZXMvaW1wbC9SZXNvdXJjZUJhc2UuY3MiLCJWaWV3TW9kZWxzL01haW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1Byb2ZpbGVWaWV3TW9kZWwuY3MiLCJTcGFmL0lvYy9CcmlkZ2VJb2MuY3MiLCJTcGFmL0lvYy9SZXNvbHZlcnMvRnVuY1Jlc29sdmVyLmNzIiwiU3BhZi9Jb2MvUmVzb2x2ZXJzL0luc3RhbmNlUmVzb2x2ZXIuY3MiLCJTcGFmL0lvYy9SZXNvbHZlcnMvU2luZ2xlSW5zdGFuY2VSZXNvbHZlci5jcyIsIlNwYWYvSW9jL1Jlc29sdmVycy9UcmFuc2llbnRSZXNvbHZlci5jcyIsIlNwYWYvTWVzc2VuZ2VyL01lc3Nlbmdlci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL0JyaWRnZU5hdmlnYXRvci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL0JyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UuY3MiLCJTcGFmL05hdmlnYXRpb24vSW1wbC9Db21wbGV4T2JqZWN0TmF2aWdhdGlvbkhpc3RvcnkuY3MiLCJTcGFmL05hdmlnYXRpb24vSW1wbC9QYWdlRGVzY3JpcHRvci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL1F1ZXJ5UGFyYW1ldGVyTmF2aWdhdGlvbkhpc3RvcnkuY3MiLCJTcGFmL0xvYWRhYmxlVmlld01vZGVsLmNzIiwiU3BhZi9QYXJ0aWFsTW9kZWwuY3MiLCJTZXJ2aWNlcy9pbXBsL0F1dGhvcml6ZWRSZXNvdXJjZUJhc2UuY3MiLCJTZXJ2aWNlcy9pbXBsL0xvY2FsU3RvcmFnZVJlcG9zaXRvcnkuY3MiLCJTZXJ2aWNlcy9pbXBsL1VzZXJSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1VzZXJTZXJ2aWNlLmNzIiwiU3BhZi9OYXZpZ2F0aW9uL0ltcGwvQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmcuY3MiLCJDdXN0b21Sb3V0ZXNDb25maWcuY3MiLCJTZXJ2aWNlcy9pbXBsL0FydGljbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL0ZlZWRSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1Byb2ZpbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1NldHRpbmdzUmVzb3VyY2VzLmNzIiwiVmlld01vZGVscy9BcnRpY2xlVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9FZGl0QXJ0aWNsZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvSG9tZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvTG9naW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1JlZ2lzdGVyVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9TZXR0aW5nc1ZpZXdNb2RlbC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBWWdEQTs7Ozs7Ozs7Ozs7Ozs7O3dDQVVYQSxHQUFHQSxZQUE0Q0E7b0JBRXhFQSxJQUFJQSxjQUFjQTt3QkFDZEEsTUFBTUEsSUFBSUE7OztvQkFFZEEsSUFBSUEsQ0FBQ0EsdUJBQXVCQTt3QkFDeEJBLE1BQU1BLElBQUlBLGlCQUFVQSwwREFBaURBOzs7b0JBRXpFQSxZQUFZQSxtQkFBV0E7O29CQUV2QkEsa0JBQWtC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Ozs7O3dDQUt6QkEsU0FBYUE7d0NBQ2JBLG9DQUFpQkEsTUFBK0JBLDJDQUFRQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBOYXZpZ2F0aW9uVXRpbGl0eVxuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRGVmaW5lIHZpcnR1YWwgZGlyZWN0b3J5IGZvciBzb21ldGhpbmcgbGlrZTpcbiAgICAgICAgLy8vIHByb3RvY29sOi8vYXdlc29tZXNpdGUuaW8vc29tZWRpcmVjdG9yeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBWaXJ0dWFsRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgcGFyYW1ldGVyIGtleSBmcm9tIHBhcmFtZXRlcnMgZGljdGlvbmFyeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbWV0ZXJzXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFyYW1LZXlcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgR2V0UGFyYW1ldGVyPFQ+KHRoaXMgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycywgc3RyaW5nIHBhcmFtS2V5KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycyA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJQYXJhbWV0ZXJzIGlzIG51bGwhXCIpO1xuXG4gICAgICAgICAgICBpZiAoIXBhcmFtZXRlcnMuQ29udGFpbnNLZXkocGFyYW1LZXkpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIk5vIHBhcmFtZXRlciB3aXRoIGtleSB7MH0gZm91bmQhXCIscGFyYW1LZXkpKTtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFyYW1ldGVyc1twYXJhbUtleV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBwYXJzZU1ldGhvZCA9IHR5cGVvZihUKS5HZXRNZXRob2QoXCJQYXJzZVwiLCBuZXcgVHlwZVtdIHsgdHlwZW9mKHN0cmluZykgfSApO1xuXG4gICAgICAgICAgICBpZiAocGFyc2VNZXRob2QgIT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFQpcGFyc2VNZXRob2QuSW52b2tlKG51bGwsIG5ldyBvYmplY3RbXSB7IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFQpIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBCdWlsZCBiYXNlIHVybCB1c2luZyBwYWdlIGlkIGFuZCB2aXJ0dWFsIGRpcmVjdG9yeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdlSWRcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBCdWlsZEJhc2VVcmwoc3RyaW5nIHBhZ2VJZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9Ly97MX1cIixXaW5kb3cuTG9jYXRpb24uUHJvdG9jb2wsV2luZG93LkxvY2F0aW9uLkhvc3QpO1xuICAgICAgICAgICAgYmFzZVVybCA9IHN0cmluZy5Jc051bGxPckVtcHR5KFZpcnR1YWxEaXJlY3RvcnkpXG4gICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9I3sxfVwiLGJhc2VVcmwscGFnZUlkKSAgICAgICAgICAgICAgICA6IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9I3syfVwiLGJhc2VVcmwsVmlydHVhbERpcmVjdG9yeSxwYWdlSWQpO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgVXRpbGl0eVxuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBzY3JpcHQgc2VxdWVudGlhbGx5XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNjcmlwdHNcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2VxdWVudGlhbFNjcmlwdExvYWQoTGlzdDxzdHJpbmc+IHNjcmlwdHMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8c3RyaW5nPihzY3JpcHRzKSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHRvTG9hZCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8c3RyaW5nPihzY3JpcHRzKTtcbiAgICAgICAgICAgIGpRdWVyeS5HZXRTY3JpcHQodG9Mb2FkLCAoU3lzdGVtLkFjdGlvbjxvYmplY3Qsc3RyaW5nLGpxWEhSPikoKG8sIHMsIGFyZzMpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2NyaXB0cy5SZW1vdmUodG9Mb2FkKTtcbiAgICAgICAgICAgICAgICBTZXF1ZW50aWFsU2NyaXB0TG9hZChzY3JpcHRzKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBWaWV3TW9kZWxCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBkb20uSFRNTEVsZW1lbnQgX3BhZ2VOb2RlO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEVsZW1lbnQgaWQgb2YgdGhlIHBhZ2UgXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgRWxlbWVudElkKCk7XHJcbnB1YmxpYyBkb20uSFRNTEVsZW1lbnQgUGFnZU5vZGVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9wYWdlTm9kZSA/PyAodGhpcy5fcGFnZU5vZGUgPSBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoRWxlbWVudElkKCkpKTtcclxuICAgIH1cclxufVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFwcGx5QmluZGluZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyh0aGlzLCB0aGlzLlBhZ2VOb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZUJpbmRpbmdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtub2Nrb3V0LmtvLnJlbW92ZU5vZGUodGhpcy5QYWdlTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5Jb2M7XHJcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xyXG51c2luZyBCcmlkZ2UuU3BhZi5BdHRyaWJ1dGVzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVscztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU3BhZkFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUlvYyBDb250YWluZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICNpZiBURVNUXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgI2VuZGlmXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAjaWYgIURFQlVHXHJcbiAgICAgICAgICAgIE5hdmlnYXRpb25VdGlsaXR5LlZpcnR1YWxEaXJlY3RvcnkgPSBcInJlYWx3b3JsZC5zcGFmXCI7IC8vICB2aXJ0dWFsIGRpciBmb3IgcmVsZWFzZSBlbnZpcm9ubWVudFxyXG4gICAgICAgICAgICAjZW5kaWZcclxuXHJcbiAgICAgICAgICAgIENvbnRhaW5lciA9IG5ldyBCcmlkZ2VJb2MoKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyQ29uZmlnKCk7IC8vIGNvbmZpZyBjb250YWluZXJcclxuICAgICAgICAgICAgdmFyIG1haW5WbSA9IENvbnRhaW5lci5SZXNvbHZlPE1haW5WaWV3TW9kZWw+KCk7XHJcbiAgICAgICAgICAgIGF3YWl0IG1haW5WbS5TdGFydCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlc29sdmU8SU5hdmlnYXRvcj4oKS5Jbml0TmF2aWdhdGlvbigpOyAvLyBpbml0IG5hdmlnYXRpb25cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ29udGFpbmVyQ29uZmlnKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIG5hdmlnYXRvclxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJTmF2aWdhdG9yLCBCcmlkZ2VOYXZpZ2F0b3JXaXRoUm91dGluZz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SUJyb3dzZXJIaXN0b3J5TWFuYWdlciwgUXVlcnlQYXJhbWV0ZXJOYXZpZ2F0aW9uSGlzdG9yeT4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElOYXZpZ2F0b3JDb25maWd1cmF0b3IsIEN1c3RvbVJvdXRlc0NvbmZpZz4oKTsgXHJcblxyXG4gICAgICAgICAgICAvLyBtZXNzZW5nZXJcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SU1lc3NlbmdlciwgTWVzc2VuZ2VyLk1lc3Nlbmdlcj4oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZpZXdtb2RlbHNcclxuICAgICAgICAgICAgUmVnaXN0ZXJBbGxWaWV3TW9kZWxzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZWdpc3RlciBjdXN0b20gcmVzb3VyY2UsIHNlcnZpY2VzLi5cclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SVNldHRpbmdzLCBTZXR0aW5ncz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SVVzZXJTZXJ2aWNlLCBVc2VyU2VydmljZT4oKTtcclxuXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJQXJ0aWNsZVJlc291cmNlcyxBcnRpY2xlUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVVzZXJSZXNvdXJjZXMsVXNlclJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElGZWVkUmVzb3VyY2VzLEZlZWRSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJUHJvZmlsZVJlc291cmNlcyxQcm9maWxlUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElSZXBvc2l0b3J5LExvY2FsU3RvcmFnZVJlcG9zaXRvcnk+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJU2V0dGluZ3NSZXNvdXJjZXMsU2V0dGluZ3NSZXNvdXJjZXM+KCk7XHJcblxyXG4gICAgICAgIH1cclxuI3JlZ2lvbiBQQUdFUyBJRFNcclxuLy8gc3RhdGljIHBhZ2VzIGlkXHJcbnB1YmxpYyBzdGF0aWMgc3RyaW5nIEhvbWVJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJob21lXCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgc3RhdGljIHN0cmluZyBMb2dpbklkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcImxvZ2luXCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgc3RhdGljIHN0cmluZyBSZWdpc3RlcklkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcInJlZ2lzdGVyXCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgc3RhdGljIHN0cmluZyBQcm9maWxlSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwicHJvZmlsZVwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgU2V0dGluZ3NJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJzZXR0aW5nc1wiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgRWRpdEFydGljbGVJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJlZGl0QXJ0aWNsZVwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgQXJ0aWNsZUlkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcImFydGljbGVcIjtcclxuICAgIH1cclxufVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBNRVNTQUdFU1xyXG4gICAgICAgIC8vIG1lc3NlbmdlciBoZWxwZXIgZm9yIGdsb2JhbCBtZXNzYWdlcyBhbmQgbWVzc2FnZXMgaWRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTWVzc2FnZXNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBHbG9iYWxTZW5kZXIgeyB9O1xyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBHbG9iYWxTZW5kZXIgU2VuZGVyID0gbmV3IEdsb2JhbFNlbmRlcigpO1xyXG5wdWJsaWMgc3RhdGljIHN0cmluZyBMb2dpbkRvbmVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiTG9naW5Eb25lXCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVnaXN0ZXIgYWxsIHR5cGVzIHRoYXQgZW5kIHdpdGggXCJ2aWV3bW9kZWxcIi5cclxuICAgICAgICAvLy8gWW91IGNhbiByZWdpc3RlciBhIHZpZXdtb2RlIGFzIFNpbmdsciBJbnN0YW5jZSBhZGRpbmcgXCJTaW5nbGVJbnN0YW5jZUF0dHJpYnV0ZVwiIHRvIHRoZSBjbGFzc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZWdpc3RlckFsbFZpZXdNb2RlbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGVzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3RNYW55PEFzc2VtYmx5LFR5cGU+KEFwcERvbWFpbi5DdXJyZW50RG9tYWluLkdldEFzc2VtYmxpZXMoKSwoRnVuYzxBc3NlbWJseSxTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxUeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcclxuICAgICAgICAgICAgICAgIC5XaGVyZSgoRnVuYzxUeXBlLGJvb2w+KSh3ID0+IHcuTmFtZS5Ub0xvd2VyKCkuRW5kc1dpdGgoXCJ2aWV3bW9kZWxcIikpKS5Ub0xpc3QoKTtcclxuXHJcbiAgICAgICAgICAgIHR5cGVzLkZvckVhY2goKEFjdGlvbjxUeXBlPikoZiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IGYuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoU2luZ2xlSW5zdGFuY2VBdHRyaWJ1dGUpLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0PihhdHRyaWJ1dGVzKSlcclxuICAgICAgICAgICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZShmKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXIoZik7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuQ2xhc3Nlc1xue1xuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uc1xuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRGVzZXJpYWxpemUgcmVhbHdvcmxkIHByb21pc2UgZXhjZXB0aW9uIHRvIGdldCBlcnJvcnNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXhjZXB0aW9uXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBEaWN0aW9uYXJ5PHN0cmluZyxzdHJpbmdbXT4gR2V0VmFsaWRhdGlvbkVycm9yUmVzcG9uc2UodGhpcyBQcm9taXNlRXhjZXB0aW9uIGV4Y2VwdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IChFcnJvclJlc3BvbnNlKUpzb25Db252ZXJ0LkRlc2VyaWFsaXplT2JqZWN0PEVycm9yUmVzcG9uc2U+KGV4Y2VwdGlvbi5Bcmd1bWVudHNbMF0uVG9EeW5hbWljKCkucmVzcG9uc2VKU09OKTtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcnMuRXJyb3JzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IHJlYWRhYmxlIGVycm9yIGxpc3RcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXhjZXB0aW9uXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBJRW51bWVyYWJsZTxzdHJpbmc+IEdldFZhbGlkYXRpb25FcnJvcnModGhpcyBQcm9taXNlRXhjZXB0aW9uIGV4Y2VwdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IGV4Y2VwdGlvbi5HZXRWYWxpZGF0aW9uRXJyb3JSZXNwb25zZSgpO1xuXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZXJyb3IgaW4gZXJyb3JzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlcnJvckRlc2NyaXB0aW9uIGluIGVycm9yLlZhbHVlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJ7MH0gezF9XCIsZXJyb3IuS2V5LGVycm9yRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdldCBlcnJvciBmb3IgaHRtbGVycm9yY29kZVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJlcnJvckNvZGVcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBHZXRFcnJvckZvckNvZGUoaW50IGVycm9yQ29kZSlcbiAgICAgICAge1xuICAgICAgICAgICAgc3dpdGNoIChlcnJvckNvZGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlVuYXV0aG9yaXplZFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgNDAzOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJGb3JiaWRkZW5cIjtcbiAgICAgICAgICAgICAgICBjYXNlIDQwNDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTm90IEZvdW5kXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA0MjI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlZhbGlkYXRpb24gRXJyb3JcIjtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJHZW5lcmljIEVycm9yXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgZXJyb3IgY29kZSBmb3IgcHJvbWlzZSBleGNlcHRpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXhjZXB0aW9uXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRXJyb3JDb2RlKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvckNvZGUgPSAoaW50KWV4Y2VwdGlvbi5Bcmd1bWVudHNbMF0uVG9EeW5hbWljKCkuc3RhdHVzO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yQ29kZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGV4dDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXNcbntcbiAgICBwdWJsaWMgY2xhc3MgRmVlZFJlcXVlc3RCdWlsZGVyXG4gICAge1xuICAgICAgICBwcml2YXRlIGludCBfb2Zmc2V0O1xuICAgICAgICBwcml2YXRlIGludCBfbGltaXQ7XG5cblxuICAgICAgICBwcml2YXRlIEZlZWRSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gMjA7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBGZWVkUmVxdWVzdEJ1aWxkZXIgRGVmYXVsdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmVlZFJlcXVlc3RCdWlsZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgRmVlZFJlcXVlc3RCdWlsZGVyIFdpdGhPZmZTZXQoaW50IG9mZnNldClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgRmVlZFJlcXVlc3RCdWlsZGVyIFdpdGhMaW1pdChpbnQgbGltaXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHN0cmluZyBCdWlsZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoXCJhcnRpY2xlcy9mZWVkXCIpO1xuXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiP2xpbWl0PXswfVwiLHRoaXMuX2xpbWl0KSk7XG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZvZmZzZXQ9ezB9XCIsdGhpcy5fb2Zmc2V0KSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxuXHJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFydGljbGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQXJ0aWNsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkF1dGhvciA9IG5ldyBBdXRob3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInRpdGxlXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVGl0bGUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwic2x1Z1wiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFNsdWcgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYm9keVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJvZHkgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiY3JlYXRlZEF0XCIpXVxyXG4gICAgICAgIHB1YmxpYyBEYXRlVGltZT8gQ3JlYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInVwZGF0ZWRBdFwiKV1cclxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWU/IFVwZGF0ZWRBdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ0YWdMaXN0XCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBUYWdMaXN0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImRlc2NyaXB0aW9uXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYXV0aG9yXCIpXVxyXG4gICAgICAgIHB1YmxpYyBBdXRob3IgQXV0aG9yIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImZhdm9yaXRlZFwiKV1cclxuICAgICAgICBwdWJsaWMgYm9vbCBGYXZvcml0ZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiZmF2b3JpdGVzQ291bnRcIildXHJcbiAgICAgICAgcHVibGljIGxvbmcgRmF2b3JpdGVzQ291bnQgeyBnZXQ7IHNldDsgfVxyXG5wdWJsaWMgc3RyaW5nIENyZWF0ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIix0aGlzLkNyZWF0ZWRBdCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPERhdGVUaW1lPihcImtleTFcIikuVG9TdHJpbmcoXCJNTU1NIGRkXCIpOihzdHJpbmcpbnVsbDtcclxuICAgIH1cclxufSAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXG57XG4gICAgcHVibGljIGNsYXNzIENvbW1lbnRcbiAgICB7XG4gICAgICAgIHB1YmxpYyBDb21tZW50KClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BdXRob3IgPSBuZXcgQXV0aG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJpZFwiKV1cbiAgICAgICAgcHVibGljIGxvbmcgSWQgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJjcmVhdGVkQXRcIildXG4gICAgICAgIHB1YmxpYyBEYXRlVGltZSBDcmVhdGVkQXQgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ1cGRhdGVkQXRcIildXG4gICAgICAgIHB1YmxpYyBEYXRlVGltZSBVcGRhdGVkQXQgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJib2R5XCIpXVxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJvZHkgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJhdXRob3JcIildXG4gICAgICAgIHB1YmxpYyBBdXRob3IgQXV0aG9yIHsgZ2V0OyBzZXQ7IH1cbnB1YmxpYyBzdHJpbmcgQ3JlYXRlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkNyZWF0ZWRBdC5Ub1N0cmluZyhcIk1NTU0gZGRcIik7XHJcbiAgICB9XHJcbn1cbiAgICB9XG59IiwiXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXG57XG4gICAgcHVibGljIGNsYXNzIFBhZ2luYXRvclxuICAgIHtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPkFjdGl2ZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBpbnQgUGFnZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFBhZ2luYXRvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90YWc7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9hdXRob3I7XG4gICAgICAgIHByaXZhdGUgaW50IF9vZmZzZXQ7XG4gICAgICAgIHByaXZhdGUgaW50IF9saW1pdDtcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3VzZXI7XG5cblxuICAgICAgICBwcml2YXRlIEFydGljbGVSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gMjA7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgRGVmYXVsdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhPZmZTZXQoaW50IG9mZnNldClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhMaW1pdChpbnQgbGltaXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgT2ZBdXRob3Ioc3RyaW5nIGF1dGhvcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fYXV0aG9yID0gYXV0aG9yO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhUYWcoc3RyaW5nIHRhZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdGFnID0gdGFnO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgT2ZGYXZvcml0ZShzdHJpbmcgdXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdXNlciA9IHVzZXI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHN0cmluZyBCdWlsZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoXCJhcnRpY2xlc1wiKTtcblxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIj9saW1pdD17MH1cIix0aGlzLl9saW1pdCkpO1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmb2Zmc2V0PXswfVwiLHRoaXMuX29mZnNldCkpO1xuXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3RhZykpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmdGFnPXswfVwiLHRoaXMuX3RhZykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX2F1dGhvcikpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmYXV0aG9yPXswfVwiLHRoaXMuX2F1dGhvcikpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3VzZXIpKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJmZhdm9yaXRlZD17MH1cIix0aGlzLl91c2VyKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBSZXNvdXJjZUJhc2VcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdlbmVyaWMgQXdhaXRhYmxlIGFqYXggY2FsbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgVGFzazxUPiBNYWtlQ2FsbDxUPihBamF4T3B0aW9ucyBvcHRpb25zKSBcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIFRhc2suRnJvbVByb21pc2U8VD4oalF1ZXJ5LkFqYXgob3B0aW9ucylcbiAgICAgICAgICAgICAgICAsIChGdW5jPG9iamVjdCwgc3RyaW5nLCBqcVhIUiwgVD4pICgocmVzT2JqLCBzdWNjZXNzLCBqcVhocikgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5TdHJpbmdpZnkocmVzT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IEpzb25Db252ZXJ0LkRlc2VyaWFsaXplT2JqZWN0PFQ+KGpzb24pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgQnJpZGdlLlNwYWYuQXR0cmlidXRlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBbU2luZ2xlSW5zdGFuY2VdXG4gICAgcHVibGljIGNsYXNzIE1haW5WaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzTG9nZ2VkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+QWN0dWFsUGFnZUlkIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgTWFpblZpZXdNb2RlbChJTWVzc2VuZ2VyIG1lc3NlbmdlciwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLElOYXZpZ2F0b3IgbmF2aWdhdG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPihmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLkFjdHVhbFBhZ2VJZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBzdWJzY3JpYmUgdG8gbG9naW5kb25lIG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUsIChBY3Rpb248VXNlclNlcnZpY2U+KShzZXJ2aWNlID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLklzTG9nZ2VkLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBuYXZpZ2F0b3IuT25OYXZpZ2F0ZWQgKz0gKHNlbmRlciwgbG9hZGFibGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gKExvYWRhYmxlVmlld01vZGVsKSBsb2FkYWJsZTtcbiAgICAgICAgICAgICAgICB0aGlzLkFjdHVhbFBhZ2VJZC5TZWxmKHZtLkVsZW1lbnRJZCgpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBcHBseSBiaW5kaW5nIHRvIG1haW5tb2RlbFxuICAgICAgICAvLy8gdHJ5IGF1dG8gbG9naW5cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgU3RhcnQoKVxuICAgICAgICB7XG4gICAgICAgICAgICBSZXR5cGVkLmtub2Nrb3V0LmtvLmFwcGx5QmluZGluZ3ModGhpcyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5UcnlBdXRvTG9naW5XaXRoU3RvcmVkVG9rZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgXG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBQcm9maWxlVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG5wdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpXHJcbntcclxuICAgIHJldHVybiBTcGFmQXBwLlByb2ZpbGVJZDtcclxufVxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElQcm9maWxlUmVzb3VyY2VzIF9wcm9maWxlUmVzb3VyY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlTW9kZWwgUHJvZmlsZU1vZGVsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+QWN0aXZlVGFiSW5kZXg7IC8vIHRhYiBhY3RpdmUgaW5kZXhcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzTG9nZ2VkIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlVmlld01vZGVsKElQcm9maWxlUmVzb3VyY2VzIHByb2ZpbGVSZXNvdXJjZSwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBcbiAgICAgICAgICAgIElBcnRpY2xlUmVzb3VyY2VzIGFydGljbGVSZXNvdXJjZXMsIElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJTWVzc2VuZ2VyIG1lc3NlbmdlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwgPSBuZXcgUHJvZmlsZU1vZGVsKCk7XG4gICAgICAgICAgICB0aGlzLl9wcm9maWxlUmVzb3VyY2UgPSBwcm9maWxlUmVzb3VyY2U7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgICAgIF9hcnRpY2xlUmVzb3VyY2VzID0gYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xuXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigwKTtcbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPih0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUsIChBY3Rpb248VXNlclNlcnZpY2U+KShzZXJ2aWNlID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZC5TZWxmKHRydWUpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBzdHJpbmcuRW1wdHk7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJ1c2VybmFtZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTm8gdXNlcm5hbWUgcGFzc2VkIGFuZCB5b3UgYXJlIG5vdCBsb2dnZWQhXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gdGhpcy5fdXNlclNlcnZpY2UuTG9nZ2VkVXNlci5Vc2VybmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHVzZXJUYXNrID0gdGhpcy5Mb2FkVXNlcih1c2VybmFtZSk7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVRhc2sgPSB0aGlzLkxvYWRBcnRpY2xlcyh1c2VybmFtZSk7XG4gICAgICAgICAgICB2YXIgZmF2b3VyaXRlVGFzayA9IHRoaXMuTG9hZEZhdm91cml0ZXNBcnRpY2xlcyh1c2VybmFtZSk7XG5cbiAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbCh1c2VyVGFzaywgYXJ0aWNsZVRhc2ssIGZhdm91cml0ZVRhc2spO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuU2hvd0FydGljbGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPbkxlYXZlKClcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxlYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuVW5zdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsIFNwYWZBcHAuTG9naW5JZCk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQWRkIHBhc3NlZCBhcnRpY2xlIHRvIGZhdlxuICAgICAgICAvLy8gT25seSBmb3IgYXV0aCB1c2Vyc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQWRkVG9GYXZvdXJpdGUoQXJ0aWNsZSBhcnRpY2xlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQuU2VsZigpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBzaW5nbGVBcnRpY2xlID0gYXJ0aWNsZS5GYXZvcml0ZWQgPyBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLlVuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKSA6IFxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuQXJ0aWNsZXMucmVwbGFjZShhcnRpY2xlLHNpbmdsZUFydGljbGUuQXJ0aWNsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBGb2xsb3cgLyB1bmZvbGxvd1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGb2xsb3coKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSB0aGlzLlByb2ZpbGVNb2RlbC5Vc2VybmFtZS5TZWxmKCk7XG4gICAgICAgICAgICB2YXIgZm9sbG93ID0gdGhpcy5Qcm9maWxlTW9kZWwuRm9sbG93aW5nLlNlbGYoKSA/IGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZS5VbkZvbGxvdyh1c2VybmFtZSkgXG4gICAgICAgICAgICAgICAgOiBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2UuRm9sbG93KHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLkZvbGxvd2luZy5TZWxmKGZvbGxvdy5Qcm9maWxlLkZvbGxvd2luZyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIHVzZXIgZGV0YWlsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvVXNlcihBcnRpY2xlIGFydGljbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLlByb2ZpbGVJZCwgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwidXNlcm5hbWVcIixhcnRpY2xlLkF1dGhvci5Vc2VybmFtZSk7cmV0dXJuIF9vMTt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGFydGljbGUgZGV0YWlsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvQXJ0aWNsZShBcnRpY2xlIGFydGljbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkFydGljbGVJZCxnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJzbHVnXCIsYXJ0aWNsZS5TbHVnKTtyZXR1cm4gX28xO30pKTtcbiAgICAgICAgfVxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBTaG93IHVzZXIgYXJ0aWNsZXNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0FydGljbGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKDApO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuU2hvd0FydGljbGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBTaG93IGZhdnNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0Zhdm91cml0ZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoMSk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5TaG93RmF2b3VyaXRlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCB1c2VyIGRhdGFcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidXNlcm5hbWVcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZFVzZXIoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcHJvZmlsZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlLkdldCh1c2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5NYXBNZShwcm9maWxlUmVzcG9uc2UuUHJvZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIEFydGljbGVzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkQXJ0aWNsZXMoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KDUpXG4gICAgICAgICAgICAgICAgLk9mQXV0aG9yKHVzZXJuYW1lKSk7XG5cbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlVzZXJBcnRpY2xlcyA9IGFydGljbGVzLkFydGljbGVzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIEFydGljbGVzIEZhdm9yaXRlc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZEZhdm91cml0ZXNBcnRpY2xlcyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlcyA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQoNSlcbiAgICAgICAgICAgICAgICAuT2ZGYXZvcml0ZSh1c2VybmFtZSkpO1xuXG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5GYXZvdXJ0aXRlcyA9IGFydGljbGVzLkFydGljbGVzO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3MgUHJvZmlsZU1vZGVsXG4gICAge1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5JbWFnZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlVzZXJuYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+QmlvIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPkZvbGxvd2luZyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPEFydGljbGU+QXJ0aWNsZXMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxBcnRpY2xlPiBVc2VyQXJ0aWNsZXMgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8QXJ0aWNsZT4gRmF2b3VydGl0ZXMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlTW9kZWwoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkltYWdlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuQmlvID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Gb2xsb3dpbmcgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPigpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8QXJ0aWNsZT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIE1hcE1lIChQcm9maWxlIHByb2ZpbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuSW1hZ2UuU2VsZihwcm9maWxlLkltYWdlKTtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUuU2VsZihwcm9maWxlLlVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuQmlvLlNlbGYocHJvZmlsZS5CaW8pO1xuICAgICAgICAgICAgdGhpcy5Gb2xsb3dpbmcuU2VsZihwcm9maWxlLkZvbGxvd2luZyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93QXJ0aWNsZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxBcnRpY2xlPih0aGlzLlVzZXJBcnRpY2xlcykpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93RmF2b3VyaXRlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PEFydGljbGU+KHRoaXMuRmF2b3VydGl0ZXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLklvY1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gSW1wbGVtZW50YXRpb24gb2YgSUlvY1xyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBCcmlkZ2VJb2MgOiBJSW9jXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBEaWN0aW9uYXJ5PFR5cGUsIElSZXNvbHZlcj4gX3Jlc29sdmVycyA9IG5ldyBEaWN0aW9uYXJ5PFR5cGUsIElSZXNvbHZlcj4oKTtcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBSRUdJU1RSQVRJT05cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXIoVHlwZSB0eXBlLCBJUmVzb2x2ZXIgcmVzb2x2ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja0FscmVhZHlBZGRlZCh0eXBlKTtcclxuICAgICAgICAgICAgX3Jlc29sdmVycy5BZGQodHlwZSwgcmVzb2x2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXIoVHlwZSB0eXBlLCBUeXBlIGltcGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja0FscmVhZHlBZGRlZCh0eXBlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXNvbHZlciA9IG5ldyBUcmFuc2llbnRSZXNvbHZlcih0aGlzLCBpbXBsKTtcclxuICAgICAgICAgICAgX3Jlc29sdmVycy5BZGQodHlwZSwgcmVzb2x2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXI8VFR5cGUsIFRJbXBsZW1lbnRhdGlvbj4oKSB3aGVyZSBUSW1wbGVtZW50YXRpb24gOiBjbGFzcywgVFR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyKHR5cGVvZihUVHlwZSksIHR5cGVvZihUSW1wbGVtZW50YXRpb24pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyKFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyKHR5cGUsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXI8VFR5cGU+KCkgd2hlcmUgVFR5cGUgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVnaXN0ZXIodHlwZW9mKFRUeXBlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlclNpbmdsZUluc3RhbmNlKFR5cGUgdHlwZSwgVHlwZSBpbXBsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBuZXcgU2luZ2xlSW5zdGFuY2VSZXNvbHZlcih0aGlzLCBpbXBsKTtcclxuICAgICAgICAgICAgX3Jlc29sdmVycy5BZGQodHlwZSwgcmVzb2x2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxUVHlwZSwgVEltcGxlbWVudGF0aW9uPigpIHdoZXJlIFRJbXBsZW1lbnRhdGlvbiA6IGNsYXNzLCBUVHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZSh0eXBlb2YoVFR5cGUpLCB0eXBlb2YoVEltcGxlbWVudGF0aW9uKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlclNpbmdsZUluc3RhbmNlKFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UodHlwZSwgdHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlclNpbmdsZUluc3RhbmNlPFRUeXBlPigpIHdoZXJlIFRUeXBlIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UodHlwZW9mKFRUeXBlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlckZ1bmM8VFR5cGU+KEZ1bmM8VFR5cGU+IGZ1bmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja0FscmVhZHlBZGRlZDxUVHlwZT4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXNvbHZlciA9IG5ldyBGdW5jUmVzb2x2ZXI8VFR5cGU+KGZ1bmMpO1xyXG4gICAgICAgICAgICBfcmVzb2x2ZXJzLkFkZCh0eXBlb2YoVFR5cGUpLCByZXNvbHZlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckluc3RhbmNlKFR5cGUgdHlwZSwgb2JqZWN0IGluc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBuZXcgSW5zdGFuY2VSZXNvbHZlcihpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIF9yZXNvbHZlcnMuQWRkKHR5cGUsIHJlc29sdmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVySW5zdGFuY2Uob2JqZWN0IGluc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVnaXN0ZXJJbnN0YW5jZShpbnN0YW5jZS5HZXRUeXBlKCksIGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVySW5zdGFuY2U8VFR5cGU+KFRUeXBlIGluc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVnaXN0ZXJJbnN0YW5jZSh0eXBlb2YoVFR5cGUpLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUkVTT0xWRVxyXG4gICAgICAgIHB1YmxpYyBUVHlwZSBSZXNvbHZlPFRUeXBlPigpIHdoZXJlIFRUeXBlIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoZWNrTm90UmVnaXN0ZXJlZDxUVHlwZT4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXNvbHZlciA9IF9yZXNvbHZlcnNbdHlwZW9mKFRUeXBlKV07XHJcbiAgICAgICAgICAgIHJldHVybiAoVFR5cGUpcmVzb2x2ZXIuUmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBSZXNvbHZlKFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoZWNrTm90UmVnaXN0ZXJlZCh0eXBlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXNvbHZlciA9IF9yZXNvbHZlcnNbdHlwZV07XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlci5SZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUFJJVkFURVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hlY2tBbHJlYWR5QWRkZWQoVHlwZSB0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9yZXNvbHZlcnMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJ7MH0gaXMgYWxyZWFkeSByZWdpc3RlcmVkIVwiLHR5cGUuRnVsbE5hbWUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGVja0FscmVhZHlBZGRlZDxUVHlwZT4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQodHlwZW9mKFRUeXBlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hlY2tOb3RSZWdpc3RlcmVkKFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghX3Jlc29sdmVycy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIkNhbm5vdCByZXNvbHZlIHswfSwgaXQncyBub3QgcmVnaXN0ZXJlZCFcIix0eXBlLkZ1bGxOYW1lKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hlY2tOb3RSZWdpc3RlcmVkPFRUeXBlPigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja05vdFJlZ2lzdGVyZWQodHlwZW9mKFRUeXBlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLklvY1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRnVuY1Jlc29sdmVyPFQ+IDogSVJlc29sdmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEZ1bmM8b2JqZWN0PiBSZXNvbHZlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEZ1bmNSZXNvbHZlcihGdW5jPFQ+IHJlc29sdmVGdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXNvbHZlID0gKCkgPT4gcmVzb2x2ZUZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLklvY1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSW5zdGFuY2VSZXNvbHZlciA6IElSZXNvbHZlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBGdW5jPG9iamVjdD4gUmVzb2x2ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnN0YW5jZVJlc29sdmVyKG9iamVjdCByZXNvbHZlZE9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlc29sdmUgPSAoKSA9PiByZXNvbHZlZE9iajtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEluc3RhbmNlUmVzb2x2ZXI8VD4gOiBJbnN0YW5jZVJlc29sdmVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnN0YW5jZVJlc29sdmVyKFQgcmVzb2x2ZWRPYmopIDogYmFzZShyZXNvbHZlZE9iailcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuSW9jXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTaW5nbGVJbnN0YW5jZVJlc29sdmVyIDogSVJlc29sdmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBvYmplY3QgX3NpbmdsZUluc3RhbmNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgRnVuYzxvYmplY3Q+IFJlc29sdmUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2luZ2xlSW5zdGFuY2VSZXNvbHZlcihJSW9jIGlvYywgVHlwZSB0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVzb2x2ZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGZpcnN0IHJlc29sdmUuIFVzaW5nIHRyYW5zaWVudCByZXNvbHZlclxyXG4gICAgICAgICAgICAgICAgaWYgKF9zaW5nbGVJbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2llbnRSZXNvbHZlciA9IG5ldyBUcmFuc2llbnRSZXNvbHZlcihpb2MsIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9zaW5nbGVJbnN0YW5jZSA9IHRyYW5zaWVudFJlc29sdmVyLlJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3NpbmdsZUluc3RhbmNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU2luZ2xlSW5zdGFuY2VSZXNvbHZlcjxUPiA6IFNpbmdsZUluc3RhbmNlUmVzb2x2ZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIFNpbmdsZUluc3RhbmNlUmVzb2x2ZXIoSUlvYyBpb2MpIDogYmFzZShpb2MsIHR5cGVvZihUKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5Jb2Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRyYW5zaWVudFJlc29sdmVyIDogSVJlc29sdmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEZ1bmM8b2JqZWN0PiBSZXNvbHZlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRyYW5zaWVudFJlc29sdmVyKElJb2MgaW9jLCBUeXBlIHRvcmVzb2x2ZVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlJlc29sdmUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgY3RvclxyXG4gICAgICAgICAgICAgICAgdmFyIGN0b3IgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PFN5c3RlbS5SZWZsZWN0aW9uLkNvbnN0cnVjdG9ySW5mbz4odG9yZXNvbHZlVHlwZS5HZXRDb25zdHJ1Y3RvcnMoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3RvciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIk5vIGN0b3IgZm91bmQgZm9yIHR5cGUgezB9IVwiLHRvcmVzb2x2ZVR5cGUuRnVsbE5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgY3RvciBwYXJhbXNcclxuICAgICAgICAgICAgICAgIHZhciBjdG9yUGFyYW1zID0gY3Rvci5HZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PFN5c3RlbS5SZWZsZWN0aW9uLlBhcmFtZXRlckluZm8+KGN0b3JQYXJhbXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2UodG9yZXNvbHZlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlIHJlc29sdmVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IG5ldyBMaXN0PG9iamVjdD4oY3RvclBhcmFtcy5MZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgcGFyYW1ldGVySW5mbyBpbiBjdG9yUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLkFkZChpb2MuUmVzb2x2ZShwYXJhbWV0ZXJJbmZvLlBhcmFtZXRlclR5cGUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0b3IuSW52b2tlKHBhcmFtZXRlcnMuVG9BcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRyYW5zaWVudFJlc29sdmVyPFQ+IDogVHJhbnNpZW50UmVzb2x2ZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIFRyYW5zaWVudFJlc29sdmVyKElJb2MgaW9jKSA6IGJhc2UoaW9jLCB0eXBlb2YoVCkpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5NZXNzZW5nZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1lc3NlbmdlciA6IElNZXNzZW5nZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5XHJcbiAgICAgICAgICAgIERpY3Rpb25hcnk8VHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPiwgTGlzdDxUdXBsZTxvYmplY3QsIEFjdGlvbjxvYmplY3QsIG9iamVjdD4+Pj4gX2NhbGxzID1cclxuICAgICAgICAgICAgICAgIG5ldyBEaWN0aW9uYXJ5PFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4sIExpc3Q8VHVwbGU8b2JqZWN0LCBBY3Rpb248b2JqZWN0LCBvYmplY3Q+Pj4+KCk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU2VuZCBNZXNzYWdlIHdpdGggYXJnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRBcmdzXCI+VE1lc3NhZ2VBcmdzPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2VuZGVyXCI+U2VuZGVyPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJnc1wiPkFyZ3M8L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNlbmQ8VFNlbmRlciwgVEFyZ3M+KFRTZW5kZXIgc2VuZGVyLCBzdHJpbmcgbWVzc2FnZSwgVEFyZ3MgYXJncykgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc2VuZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2VuZGVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLklubmVyU2VuZChtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIHR5cGVvZihUQXJncyksIHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNlbmQgTWVzc2FnZSB3aXRob3V0IGFyZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU2VuZGVyXCI+VFNlbmRlcjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlbmRlclwiPlNlbmRlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNlbmQ8VFNlbmRlcj4oVFNlbmRlciBzZW5kZXIsIHN0cmluZyBtZXNzYWdlKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzZW5kZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZW5kZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuSW5uZXJTZW5kKG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgbnVsbCwgc2VuZGVyLCBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3Vic2NyaWJlIE1lc3NhZ2Ugd2l0aCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVEFyZ3NcIj5UQXJnczwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN1YnNjcmliZXJcIj5TdWJzY3JpYmVyPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIj5BY3Rpb248L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNvdXJjZVwiPnNvdXJjZTwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU3Vic2NyaWJlPFRTZW5kZXIsIFRBcmdzPihvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UsIEFjdGlvbjxUU2VuZGVyLCBUQXJncz4gY2FsbGJhY2ssXHJcbiAgICAgICAgICAgIFRTZW5kZXIgc291cmNlID0gbnVsbCkgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInN1YnNjcmliZXJcIik7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImNhbGxiYWNrXCIpO1xyXG5cclxuICAgICAgICAgICAgQWN0aW9uPG9iamVjdCwgb2JqZWN0PiB3cmFwID0gKHNlbmRlciwgYXJncykgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbmQgPSAoVFNlbmRlcilzZW5kZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09IG51bGwgfHwgc2VuZCA9PSBzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKFRTZW5kZXIpc2VuZGVyLCAoVEFyZ3MpYXJncyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLklubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIsIG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgdHlwZW9mKFRBcmdzKSwgKEFjdGlvbjxvYmplY3Qsb2JqZWN0Pil3cmFwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3Vic2NyaWJlIE1lc3NhZ2Ugd2l0aG91dCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdWJzY3JpYmVyXCI+U3Vic2NyaWJlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCI+QWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzb3VyY2VcIj5zb3VyY2U8L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN1YnNjcmliZTxUU2VuZGVyPihvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UsIEFjdGlvbjxUU2VuZGVyPiBjYWxsYmFjayxcclxuICAgICAgICAgICAgVFNlbmRlciBzb3VyY2UgPSBudWxsKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic3Vic2NyaWJlclwiKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiY2FsbGJhY2tcIik7XHJcblxyXG4gICAgICAgICAgICBBY3Rpb248b2JqZWN0LCBvYmplY3Q+IHdyYXAgPSAoc2VuZGVyLCBhcmdzKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VuZCA9IChUU2VuZGVyKXNlbmRlcjtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UgPT0gbnVsbCB8fCBzZW5kID09IHNvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygoVFNlbmRlcilzZW5kZXIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Jbm5lclN1YnNjcmliZShzdWJzY3JpYmVyLCBtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIG51bGwsIChBY3Rpb248b2JqZWN0LG9iamVjdD4pd3JhcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFVuc3Vic2NyaWJlIGFjdGlvbiB3aXRoIGFyZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU2VuZGVyXCI+VFNlbmRlcjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUQXJnc1wiPlRBcmdzPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3Vic2NyaWJlclwiPlN1YnNjcmliZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVbnN1YnNjcmliZTxUU2VuZGVyLCBUQXJncz4ob2JqZWN0IHN1YnNjcmliZXIsIHN0cmluZyBtZXNzYWdlKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5uZXJVbnN1YnNjcmliZShtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIHR5cGVvZihUQXJncyksIHN1YnNjcmliZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBVbnN1YnNjcmliZSBhY3Rpb24gd2l0aG91dCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdWJzY3JpYmVyXCI+U3Vic2NyaWJlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVuc3Vic2NyaWJlPFRTZW5kZXI+KG9iamVjdCBzdWJzY3JpYmVyLCBzdHJpbmcgbWVzc2FnZSkgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLklubmVyVW5zdWJzY3JpYmUobWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCBudWxsLCBzdWJzY3JpYmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVtb3ZlIGFsbCBjYWxsYmFja3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0TWVzc2VuZ2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxzLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSW5uZXJTZW5kKHN0cmluZyBtZXNzYWdlLCBUeXBlIHNlbmRlclR5cGUsIFR5cGUgYXJnVHlwZSwgb2JqZWN0IHNlbmRlciwgb2JqZWN0IGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIm1lc3NhZ2VcIik7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBuZXcgVHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPihtZXNzYWdlLCBzZW5kZXJUeXBlLCBhcmdUeXBlKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxscy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuX2NhbGxzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zID09IG51bGwgfHwgIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PFR1cGxlPG9iamVjdCxBY3Rpb248b2JqZWN0LG9iamVjdD4+PihhY3Rpb25zKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3Rpb25zQ29weSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9MaXN0PFR1cGxlPG9iamVjdCxBY3Rpb248b2JqZWN0LG9iamVjdD4+PihhY3Rpb25zKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFjdGlvbiBpbiBhY3Rpb25zQ29weSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMuQ29udGFpbnMoYWN0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uSXRlbTIoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIElubmVyU3Vic2NyaWJlKG9iamVjdCBzdWJzY3JpYmVyLCBzdHJpbmcgbWVzc2FnZSwgVHlwZSBzZW5kZXJUeXBlLCBUeXBlIGFyZ1R5cGUsXHJcbiAgICAgICAgICAgIEFjdGlvbjxvYmplY3QsIG9iamVjdD4gY2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIm1lc3NhZ2VcIik7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBuZXcgVHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPihtZXNzYWdlLCBzZW5kZXJUeXBlLCBhcmdUeXBlKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gbmV3IFR1cGxlPG9iamVjdCwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4oc3Vic2NyaWJlciwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2FsbHMuQ29udGFpbnNLZXkoa2V5KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbHNba2V5XS5BZGQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgTGlzdDxUdXBsZTxvYmplY3QsIEFjdGlvbjxvYmplY3QsIG9iamVjdD4+PigpLChfbzEpPT57X28xLkFkZCh2YWx1ZSk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxzW2tleV0gPSBsaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSW5uZXJVbnN1YnNjcmliZShzdHJpbmcgbWVzc2FnZSwgVHlwZSBzZW5kZXJUeXBlLCBUeXBlIGFyZ1R5cGUsIG9iamVjdCBzdWJzY3JpYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzdWJzY3JpYmVyXCIpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIm1lc3NhZ2VcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIga2V5ID0gbmV3IFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4obWVzc2FnZSwgc2VuZGVyVHlwZSwgYXJnVHlwZSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbHMuQ29udGFpbnNLZXkoa2V5KSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciB0b3JlbW92ZSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8VHVwbGU8b2JqZWN0LEFjdGlvbjxvYmplY3Qsb2JqZWN0Pj4+KHRoaXMuX2NhbGxzW2tleV0sKEZ1bmM8VHVwbGU8b2JqZWN0LEFjdGlvbjxvYmplY3Qsb2JqZWN0Pj4sYm9vbD4pKHR1cGxlID0+IHR1cGxlLkl0ZW0xID09IHN1YnNjcmliZXIpKS5Ub0xpc3QoKTtcclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0dXBsZSBpbiB0b3JlbW92ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxzW2tleV0uUmVtb3ZlKHR1cGxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8VHVwbGU8b2JqZWN0LEFjdGlvbjxvYmplY3Qsb2JqZWN0Pj4+KHRoaXMuX2NhbGxzW2tleV0pKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbHMuUmVtb3ZlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIC8vLyA8c3VtbWFyeT5cbiAgICAvLy8gSU5hdmlnYXRvciBpbXBsZW1lbnRhdGlvblxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgcHVibGljIGNsYXNzIEJyaWRnZU5hdmlnYXRvciA6IElOYXZpZ2F0b3JcbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIElBbUxvYWRhYmxlIF9hY3R1YWxDb250cm9sbGVyO1xuXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBJTmF2aWdhdG9yQ29uZmlndXJhdG9yIENvbmZpZ3VyYXRpb247XG4gICAgICAgIHB1YmxpYyBCcmlkZ2VOYXZpZ2F0b3IoSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBjb25maWd1cmF0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICBDb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIEVuYWJsZVNwYWZBbmNob3JzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFsbEFuY2hvcnMgPSBqUXVlcnkuU2VsZWN0KFwiYVwiKTtcbiAgICAgICAgICAgIGFsbEFuY2hvcnMuT2ZmKEV2ZW50VHlwZS5DbGljay5Ub1N0cmluZygpKTtcbiAgICAgICAgICAgIGFsbEFuY2hvcnMuQ2xpY2soKEFjdGlvbjxqUXVlcnlNb3VzZUV2ZW50PikoZXYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xpY2tlZEVsZW1lbnQgPSBldi5UYXJnZXQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZEVsZW1lbnQuR2V0VHlwZSgpICE9IHR5cGVvZihIVE1MQW5jaG9yRWxlbWVudCkpXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWRFbGVtZW50ID0galF1ZXJ5LkVsZW1lbnQoZXYuVGFyZ2V0KS5QYXJlbnRzKFwiYVwiKS5HZXQoMCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaHJlZiA9IGNsaWNrZWRFbGVtZW50LkdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoaHJlZikpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHZhciBpc015SHJlZiA9IGhyZWYuU3RhcnRzV2l0aChcInNwYWY6XCIpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXMgbXkgaHJlZlxuICAgICAgICAgICAgICAgIGlmIChpc015SHJlZilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGV2LlByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYWdlSWQgPSBocmVmLlJlcGxhY2UoXCJzcGFmOlwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShwYWdlSWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFuY2hvciBkZWZhdWx0IGJlaGF2aW91clxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gYSBwYWdlIElELlxuICAgICAgICAvLy8gVGhlIElEIG11c3QgYmUgcmVnaXN0ZXJlZC5cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFnZUlkXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBOYXZpZ2F0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZyxvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMuQ29uZmlndXJhdGlvbi5HZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHBhZ2VJZCk7XG4gICAgICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJQYWdlIG5vdCBmb3VuZCB3aXRoIElEIHswfVwiLHBhZ2VJZCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjaGVjayByZWRpcmVjdCBydWxlXG4gICAgICAgICAgICB2YXIgcmVkaXJlY3RLZXkgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLHBhZ2UuUmVkaXJlY3RSdWxlcykhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEZ1bmM8c3RyaW5nPj4oXCJrZXkxXCIpLkludm9rZSgpOihzdHJpbmcpbnVsbDtcbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkocmVkaXJlY3RLZXkpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGUocmVkaXJlY3RLZXkscGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYm9keSA9IHRoaXMuQ29uZmlndXJhdGlvbi5Cb2R5O1xuICAgICAgICAgICAgaWYoYm9keSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJDYW5ub3QgZmluZCBuYXZpZ2F0aW9uIGJvZHkgZWxlbWVudC5cIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGxlYXZlIGFjdHVhbCBjb250cm9sZWxyXG4gICAgICAgICAgICBpZiAodGhpcy5MYXN0TmF2aWdhdGVDb250cm9sbGVyICE9IG51bGwpXG4gICAgICAgICAgICAgICAgdGhpcy5MYXN0TmF2aWdhdGVDb250cm9sbGVyLk9uTGVhdmUoKTtcblxuICAgICAgICAgICAgdGhpcy5Db25maWd1cmF0aW9uLkJvZHkuTG9hZChwYWdlLkh0bWxMb2NhdGlvbi5JbnZva2UoKSxudWxsLCAoQWN0aW9uPHN0cmluZyxzdHJpbmcsanFYSFI+KShhc3luYyAobyxzLGEpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gbG9hZCBkZXBlbmRlbmNpZXNcbiAgICAgICAgICAgICAgICBpZiAocGFnZS5EZXBlbmRlbmNpZXNTY3JpcHRzICE9IG51bGwpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2NyaXB0cyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9MaXN0PHN0cmluZz4oKHBhZ2UuRGVwZW5kZW5jaWVzU2NyaXB0cy5JbnZva2UoKSkpO1xuICAgICAgICAgICAgICAgICAgICBpZihwYWdlLlNlcXVlbnRpYWxEZXBlbmRlbmNpZXNTY3JpcHRMb2FkKVxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbGl0eS5TZXF1ZW50aWFsU2NyaXB0TG9hZChzY3JpcHRzKTtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyYWxsZWwgbG9hZFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmlwdHNUYXNrID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8c3RyaW5nLFRhc2s8b2JqZWN0W10+PihzY3JpcHRzLChGdW5jPHN0cmluZyxUYXNrPG9iamVjdFtdPj4pKHVybCA9PiBUYXNrLkZyb21Qcm9taXNlKGpRdWVyeS5HZXRTY3JpcHQodXJsKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbDxvYmplY3RbXT4oc2NyaXB0c1Rhc2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIHBhZ2VcbiAgICAgICAgICAgICAgICBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLHBhZ2UuUHJlcGFyZVBhZ2UpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8QWN0aW9uPihcImtleTJcIikuSW52b2tlKCkpOm51bGw7XG5cbiAgICAgICAgICAgICAgICAvLyBhdXRvIGVuYWJsZSBzcGFmIGFuY2hvcnNcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQ29uZmlndXJhdGlvbi5EaXNhYmxlQXV0b1NwYWZBbmNob3JzT25OYXZpZ2F0ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmFibGVBbmNob3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTNcIixwYWdlLkF1dG9FbmFibGVTcGFmQW5jaG9ycykhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEZ1bmM8Ym9vbD4+KFwia2V5M1wiKS5JbnZva2UoKTooYm9vbD8pbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYoZW5hYmxlQW5jaG9ycy5IYXNWYWx1ZSAmJiBlbmFibGVBbmNob3JzLlZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5FbmFibGVTcGFmQW5jaG9ycygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwYWdlLlBhZ2VDb250cm9sbGVyICE9IG51bGwpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBsb2FkIG5ldyBjb250cm9sbGVyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVyID0gcGFnZS5QYWdlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLk9uTG9hZChwYXJhbWV0ZXJzKTtcblxuICAgICAgICAgICAgICAgICAgICBfYWN0dWFsQ29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLk9uTmF2aWdhdGVkIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT50aGlzLk9uTmF2aWdhdGVkLkludm9rZSh0aGlzLGNvbnRyb2xsZXIpKTpudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pKTsgXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZXZlbnQgRXZlbnRIYW5kbGVyPElBbUxvYWRhYmxlPiBPbk5hdmlnYXRlZDtcbnB1YmxpYyBJQW1Mb2FkYWJsZSBMYXN0TmF2aWdhdGVDb250cm9sbGVyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfYWN0dWFsQ29udHJvbGxlcjtcclxuICAgIH1cclxufVxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBTdWJzY3JpYmUgdG8gYW5jaG9ycyBjbGlja1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEluaXROYXZpZ2F0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5FbmFibGVTcGFmQW5jaG9ycygpO1xuXG4gICAgICAgICAgICAvLyBnbyBob21lXG4gICAgICAgICAgICB0aGlzLk5hdmlnYXRlKHRoaXMuQ29uZmlndXJhdGlvbi5Ib21lSWQpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIElOYXZpZ2F0b3JDb25maWd1cmF0b3IgSW1wbGVtZW50YXRpb24uIE11c3QgYmUgZXh0ZW5kZWQuXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZSA6IElOYXZpZ2F0b3JDb25maWd1cmF0b3JcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUxpc3Q8SVBhZ2VEZXNjcmlwdG9yPiBfcm91dGVzO1xuXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBJTGlzdDxJUGFnZURlc2NyaXB0b3I+IENyZWF0ZVJvdXRlcygpO1xuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgalF1ZXJ5IEJvZHkgeyBnZXQ7IH1cbiAgICAgICAgcHVibGljIGFic3RyYWN0IHN0cmluZyBIb21lSWQgeyBnZXQ7IH1cbiAgICAgICAgcHVibGljIGFic3RyYWN0IGJvb2wgRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUgeyBnZXQ7IH1cblxuXG5cbiAgICAgICAgcHJvdGVjdGVkIEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMgPSB0aGlzLkNyZWF0ZVJvdXRlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIElQYWdlRGVzY3JpcHRvciBHZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHN0cmluZyBrZXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNpbmdsZU9yRGVmYXVsdDxJUGFnZURlc2NyaXB0b3I+KHRoaXMuX3JvdXRlcywoRnVuYzxJUGFnZURlc2NyaXB0b3IsYm9vbD4pKHM9PiBzdHJpbmcuRXF1YWxzKHMuS2V5LCBrZXksIFN0cmluZ0NvbXBhcmlzb24uQ3VycmVudEN1bHR1cmVJZ25vcmVDYXNlKSkpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbi5Nb2RlbDtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIGNsYXNzIENvbXBsZXhPYmplY3ROYXZpZ2F0aW9uSGlzdG9yeSA6IElCcm93c2VySGlzdG9yeU1hbmFnZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyB2b2lkIFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSBOYXZpZ2F0aW9uVXRpbGl0eS5CdWlsZEJhc2VVcmwocGFnZUlkKTtcblxuICAgICAgICAgICAgV2luZG93Lkhpc3RvcnkuUHVzaFN0YXRlKG51bGwsIHN0cmluZy5FbXB0eSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9PXsxfVwiLGJhc2VVcmwsR2xvYmFsLkJ0b2EoSlNPTi5TdHJpbmdpZnkocGFyYW1ldGVycykpKTogYmFzZVVybCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVXJsRGVzY3JpcHRvciBQYXJzZVVybCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBuZXcgVXJsRGVzY3JpcHRvcigpO1xuXG4gICAgICAgICAgICB2YXIgaGFzaCA9IFdpbmRvdy5Mb2NhdGlvbi5IYXNoO1xuICAgICAgICAgICAgaGFzaCA9IGhhc2guUmVwbGFjZShcIiNcIiwgXCJcIik7XG5cbiAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JFbXB0eShoYXNoKSkgcmV0dXJuIHJlcztcblxuICAgICAgICAgICAgdmFyIGVxdWFsSW5kZXggPSBoYXNoLkluZGV4T2YoJz0nKTtcbiAgICAgICAgICAgIGlmIChlcXVhbEluZGV4ID09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoLlN1YnN0cmluZygwLCBlcXVhbEluZGV4KTsgIFxuXG4gICAgICAgICAgICB2YXIgZG91YmxlUG9pbnRzSW5keCA9IGVxdWFsSW5kZXggKyAxO1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBoYXNoLlN1YnN0cmluZyhkb3VibGVQb2ludHNJbmR4LCBoYXNoLkxlbmd0aCAtIGRvdWJsZVBvaW50c0luZHgpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyYW1ldGVycykpIHJldHVybiByZXM7IC8vIG5vIHBhcmFtZXRlcnNcblxuICAgICAgICAgICAgdmFyIGRlY29kZWQgPSBHbG9iYWwuQXRvYihwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIHZhciBkZXNlcmlhbGl6ZWQgPSBKU09OLlBhcnNlPERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+PihkZWNvZGVkKTtcblxuICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMgPSBkZXNlcmlhbGl6ZWQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIGNsYXNzIFBhZ2VEZXNjcmlwdG9yIDogSVBhZ2VEZXNjcmlwdG9yXG4gICAge1xuICAgICAgICBwdWJsaWMgUGFnZURlc2NyaXB0b3IoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkF1dG9FbmFibGVTcGFmQW5jaG9ycyA9ICgpID0+IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEtleSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPHN0cmluZz4gSHRtbExvY2F0aW9uIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8SUFtTG9hZGFibGU+IFBhZ2VDb250cm9sbGVyIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8Ym9vbD4gQ2FuQmVEaXJlY3RMb2FkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEFjdGlvbiBQcmVwYXJlUGFnZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBib29sIFNlcXVlbnRpYWxEZXBlbmRlbmNpZXNTY3JpcHRMb2FkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8c3RyaW5nPiBSZWRpcmVjdFJ1bGVzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8Ym9vbD4gQXV0b0VuYWJsZVNwYWZBbmNob3JzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIEZ1bmM8SUVudW1lcmFibGU8c3RyaW5nPj4gRGVwZW5kZW5jaWVzU2NyaXB0cyB7IGdldDsgc2V0OyB9XG4gICAgfVxuXG4gICAgXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UZXh0O1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb24uTW9kZWw7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBjbGFzcyBRdWVyeVBhcmFtZXRlck5hdmlnYXRpb25IaXN0b3J5IDogSUJyb3dzZXJIaXN0b3J5TWFuYWdlclxuICAgIHtcbiAgICAgICAgcHVibGljIHZvaWQgUHVzaFN0YXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYmFzZVVybCA9IE5hdmlnYXRpb25VdGlsaXR5LkJ1aWxkQmFzZVVybChwYWdlSWQpO1xuXG4gICAgICAgICAgICBXaW5kb3cuSGlzdG9yeS5QdXNoU3RhdGUobnVsbCwgc3RyaW5nLkVtcHR5LFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IHN0cmluZy5Gb3JtYXQoXCJ7MH17MX1cIixiYXNlVXJsLEJ1aWxkUXVlcnlQYXJhbWV0ZXIocGFyYW1ldGVycykpOiBiYXNlVXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBVcmxEZXNjcmlwdG9yIFBhcnNlVXJsKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcyA9IG5ldyBVcmxEZXNjcmlwdG9yKCk7XG4gICAgICAgICAgICByZXMuUGFyYW1ldGVycyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpO1xuXG4gICAgICAgICAgICB2YXIgaGFzaCA9IFdpbmRvdy5Mb2NhdGlvbi5IYXNoO1xuICAgICAgICAgICAgaGFzaCA9IGhhc2guUmVwbGFjZShcIiNcIiwgXCJcIik7XG5cbiAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JFbXB0eShoYXNoKSkgcmV0dXJuIHJlcztcblxuICAgICAgICAgICAgdmFyIGVxdWFsSW5kZXggPSBoYXNoLkluZGV4T2YoJz8nKTtcbiAgICAgICAgICAgIGlmIChlcXVhbEluZGV4ID09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoLlN1YnN0cmluZygwLCBlcXVhbEluZGV4KTsgIFxuXG4gICAgICAgICAgICB2YXIgZG91YmxlUG9pbnRzSW5keCA9IGVxdWFsSW5kZXggKyAxO1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBoYXNoLlN1YnN0cmluZyhkb3VibGVQb2ludHNJbmR4LCBoYXNoLkxlbmd0aCAtIGRvdWJsZVBvaW50c0luZHgpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyYW1ldGVycykpIHJldHVybiByZXM7IC8vIG5vIHBhcmFtZXRlcnNcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3BsaXR0ZWRCeURvdWJsZUFuZCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9MaXN0PHN0cmluZz4ocGFyYW1ldGVycy5TcGxpdChcIiZcIikpO1xuICAgICAgICAgICAgc3BsaXR0ZWRCeURvdWJsZUFuZC5Gb3JFYWNoKChTeXN0ZW0uQWN0aW9uPHN0cmluZz4pKGYgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgc3BsaXR0ZWQgPSBmLlNwbGl0KFwiPVwiKTtcbiAgICAgICAgICAgICAgICByZXMuUGFyYW1ldGVycy5BZGQoc3BsaXR0ZWRbMF0sR2xvYmFsLkRlY29kZVVSSUNvbXBvbmVudChzcGxpdHRlZFsxXSkpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgQnVpbGRRdWVyeVBhcmFtZXRlcihEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycyA9PSBudWxsIHx8ICFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxLZXlWYWx1ZVBhaXI8c3RyaW5nLG9iamVjdD4+KHBhcmFtZXRlcnMpKSByZXR1cm4gc3RyaW5nLkVtcHR5O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3RyQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKFwiP1wiKTtcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBrZXlWYWx1ZVBhaXIgaW4gcGFyYW1ldGVycylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdHJCdWlsZGVyLkFwcGVuZChHbG9iYWwuRW5jb2RlVVJJQ29tcG9uZW50KGtleVZhbHVlUGFpci5LZXkpKTtcbiAgICAgICAgICAgICAgICBzdHJCdWlsZGVyLkFwcGVuZChcIj1cIik7XG4gICAgICAgICAgICAgICAgc3RyQnVpbGRlci5BcHBlbmQoR2xvYmFsLkVuY29kZVVSSUNvbXBvbmVudChrZXlWYWx1ZVBhaXIuVmFsdWUuVG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgICAgIHN0ckJ1aWxkZXIuQXBwZW5kKFwiJlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlcyA9IHN0ckJ1aWxkZXIuVG9TdHJpbmcoKS5UcmltRW5kKCcmJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXM7XG5cbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgTG9hZGFibGVWaWV3TW9kZWwgOiBWaWV3TW9kZWxCYXNlLCBJQW1Mb2FkYWJsZVxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBMaXN0PElWaWV3TW9kZWxMaWZlQ3ljbGU+IFBhcnRpYWxzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQXBwbHlCaW5kaW5ncygpO1xyXG4gICAgICAgICAgICBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLHRoaXMuUGFydGlhbHMpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8TGlzdDxJVmlld01vZGVsTGlmZUN5Y2xlPj4oXCJrZXkxXCIpLkZvckVhY2goKFN5c3RlbS5BY3Rpb248SVZpZXdNb2RlbExpZmVDeWNsZT4pKGY9PiBmLkluaXQocGFyYW1ldGVycykpKSk6bnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgT25MZWF2ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLHRoaXMuUGFydGlhbHMpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8TGlzdDxJVmlld01vZGVsTGlmZUN5Y2xlPj4oXCJrZXkyXCIpLkZvckVhY2goKFN5c3RlbS5BY3Rpb248SVZpZXdNb2RlbExpZmVDeWNsZT4pKGY9PmYuRGVJbml0KCkpKSk6bnVsbDtcclxuICAgICAgICAgICAgYmFzZS5SZW1vdmVCaW5kaW5ncygpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIExpc3Q8SVZpZXdNb2RlbExpZmVDeWNsZT4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1BhcnRpYWxzPW5ldyBMaXN0PElWaWV3TW9kZWxMaWZlQ3ljbGU+KCk7fVxyXG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxue1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBQYXJ0aWFsTW9kZWwgOiAgSVZpZXdNb2RlbExpZmVDeWNsZVxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBkb20uSFRNTERpdkVsZW1lbnQgX3BhcnRpYWxFbGVtZW50O1xuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEVsZW1lbnQgaWQgb2YgdGhlIHBhZ2UgXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgRWxlbWVudElkKCk7XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBIdG1sTG9jYXRpb25cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHN0cmluZyBIdG1sVXJsIHsgZ2V0OyB9XG5cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBJbml0IHBhcnRpYWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFyYW1ldGVyc1wiPmRhdGEgZm9yIGluaXQgdGhlIHBhcnRpYWxzPC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBJbml0KERpY3Rpb25hcnk8c3RyaW5nLG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuXG4gICAgICAgICAgICBqUXVlcnkuR2V0KHRoaXMuSHRtbFVybCwgbnVsbCwgKEFjdGlvbjxvYmplY3Qsc3RyaW5nLGpxWEhSPikoKG8sIHMsIGFyZzMpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGlhbEVsZW1lbnQgPSBuZXcgZG9tLkhUTUxEaXZFbGVtZW50XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUwgPSBvLlRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEVsZW1lbnRJZCgpKTtcbiAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkPGRvbS5IVE1MRGl2RWxlbWVudD4odGhpcy5fcGFydGlhbEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGtub2Nrb3V0LmtvLmFwcGx5QmluZGluZ3ModGhpcywgdGhpcy5fcGFydGlhbEVsZW1lbnQpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBEZUluaXQoKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiBrbyBjb250YWlucyB0aGlzIG5vZGVcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWFsRWxlbWVudCA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGtub2Nrb3V0LmtvLmRhdGFGb3IodGhpcy5fcGFydGlhbEVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBrbm9ja291dC5rby5yZW1vdmVOb2RlKHRoaXMuX3BhcnRpYWxFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSVZpZXdNb2RlbExpZmVDeWNsZVxuICAgIHtcbiAgICAgICAgdm9pZCBJbml0KERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpO1xuICAgICAgICB2b2lkIERlSW5pdCgpO1xuICAgIH1cbn1cblxuXG5cbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQXV0aG9yaXplZFJlc291cmNlQmFzZSA6IFJlc291cmNlQmFzZVxuICAgIHtcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IElVc2VyU2VydmljZSBVc2VyU2VydmljZTtcblxuICAgICAgICBwcm90ZWN0ZWQgQXV0aG9yaXplZFJlc291cmNlQmFzZShJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdlbmVyaWMgQXdhaXRhYmxlIGFqYXggY2FsbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJvdGVjdGVkIFRhc2s8VD4gTWFrZUF1dGhvcml6ZWRDYWxsPFQ+KEFqYXhPcHRpb25zIG9wdGlvbnMpIFxuICAgICAgICB7XG4gICAgICAgICAgICBpZighdGhpcy5Vc2VyU2VydmljZS5Jc0xvZ2dlZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiWW91IG11c3QgYmUgbG9nZ2VkIHRvIHVzZSB0aGlzIHJlc291cmNlXCIpO1xuXG4gICAgICAgICAgICBvcHRpb25zLkJlZm9yZVNlbmQgPSAoeGhyLCBvKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHhoci5TZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBzdHJpbmcuRm9ybWF0KFwiVG9rZW4gezB9XCIsdGhpcy5Vc2VyU2VydmljZS5Mb2dnZWRVc2VyLlRva2VuKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8VD4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIExvY2FsU3RvcmFnZVJlcG9zaXRvcnkgOiBJUmVwb3NpdG9yeVxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBzdHJpbmcgVG9rZW5LZXkgPSBcInRva2VuXCI7XG4gICAgICAgIHByaXZhdGUgU3RvcmFnZSBfc3RvcmFnZTtcblxuICAgICAgICBwdWJsaWMgTG9jYWxTdG9yYWdlUmVwb3NpdG9yeSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UgPSBXaW5kb3cuTG9jYWxTdG9yYWdlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdm9pZCBTYXZlVG9rZW4oc3RyaW5nIHRva2VuKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLlNldEl0ZW0oVG9rZW5LZXksdG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRUb2tlbklmRXhpc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLl9zdG9yYWdlLkdldEl0ZW0oVG9rZW5LZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuIT1udWxsP3Rva2VuLlRvU3RyaW5nKCk6KHN0cmluZyludWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgRGVsZXRlVG9rZW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLlJlbW92ZUl0ZW0oVG9rZW5LZXkpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFVzZXJSZXNvdXJjZXMgOiBSZXNvdXJjZUJhc2UsIElVc2VyUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIFVzZXJSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzKSBcbiAgICAgICAge1xuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gTG9naW4oU2lnblJlcXVlc3QgbG9naW5SZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlcnMvbG9naW5cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChsb2dpblJlcXVlc3QpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBSZWdpc3RlcihTaWduUmVxdWVzdCBsb2dpblJlcXVlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2Vyc1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KGxvZ2luUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpZ25SZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IEdldEN1cnJlbnRVc2VyKHN0cmluZyB0b2tlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQmVmb3JlU2VuZCA9ICh4aHIsIG8pID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4aHIuU2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgc3RyaW5nLkZvcm1hdChcIlRva2VuIHswfVwiLHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpZ25SZXNwb25zZT4ob3B0aW9ucyk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBjbGFzcyBVc2VyU2VydmljZSA6IElVc2VyU2VydmljZVxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclJlc291cmNlcyBfdXNlclJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVzc2VuZ2VyIF9tZXNzZW5nZXI7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVJlcG9zaXRvcnkgX3JlcG9zaXRvcnk7XG5cbiAgICAgICAgcHVibGljIFVzZXJTZXJ2aWNlKElVc2VyUmVzb3VyY2VzIHVzZXJSZXNvdXJjZXMsIElNZXNzZW5nZXIgbWVzc2VuZ2VyLCBJUmVwb3NpdG9yeSByZXBvc2l0b3J5KVxuICAgICAgICB7XG4gICAgICAgICAgICBfdXNlclJlc291cmNlcyA9IHVzZXJSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xuICAgICAgICAgICAgX3JlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFVzZXIgTG9nZ2VkVXNlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbnB1YmxpYyBib29sIElzTG9nZ2VkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkxvZ2dlZFVzZXIgIT0gbnVsbDtcclxuICAgIH1cclxufVxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBMb2dpbihzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuTG9naW4obmV3IFNpZ25SZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXNlciA9IG5ldyBVc2VyUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSBtYWlsLFxuICAgICAgICAgICAgICAgICAgICBQYXNzd29yZCA9IHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxVc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSZWdpc3RlcihzdHJpbmcgdXNlcm5hbWUsIHN0cmluZyBtYWlsLCBzdHJpbmcgcGFzc3dvcmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsb2dpblJlc3BvbnNlID0gYXdhaXQgdGhpcy5fdXNlclJlc291cmNlcy5SZWdpc3RlcihuZXcgU2lnblJlcXVlc3RcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VyID0gbmV3IFVzZXJSZXF1ZXN0XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IG1haWwsXG4gICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkID0gcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIFVzZXJuYW1lID0gdXNlcm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbG9naW5SZXNwb25zZS5Vc2VyO1xuICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5TYXZlVG9rZW4obG9naW5SZXNwb25zZS5Vc2VyLlRva2VuKTtcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TZW5kPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFRyeUF1dG9Mb2dpbldpdGhTdG9yZWRUb2tlbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdG9yZWRUb2tlbiA9IHRoaXMuX3JlcG9zaXRvcnkuR2V0VG9rZW5JZkV4aXN0KCk7XG4gICAgICAgICAgICBpZiAoc3RvcmVkVG9rZW4gPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuR2V0Q3VycmVudFVzZXIoc3RvcmVkVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LlNhdmVUb2tlbihsb2dpblJlc3BvbnNlLlVzZXIuVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TZW5kPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChQcm9taXNlRXhjZXB0aW9uIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LkRlbGV0ZVRva2VuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb24uTW9kZWw7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBjbGFzcyBCcmlkZ2VOYXZpZ2F0b3JXaXRoUm91dGluZyA6IEJyaWRnZU5hdmlnYXRvclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQnJvd3Nlckhpc3RvcnlNYW5hZ2VyIF9icm93c2VySGlzdG9yeU1hbmFnZXI7XG5cbiAgICAgICAgcHVibGljIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nKElOYXZpZ2F0b3JDb25maWd1cmF0b3IgY29uZmlndXJhdGlvbiwgSUJyb3dzZXJIaXN0b3J5TWFuYWdlciBicm93c2VySGlzdG9yeU1hbmFnZXIpIDogYmFzZShjb25maWd1cmF0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyID0gYnJvd3Nlckhpc3RvcnlNYW5hZ2VyO1xuICAgICAgICAgICAgV2luZG93Lk9uUG9wU3RhdGUgKz0gZSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciB1cmxJbmZvID0gX2Jyb3dzZXJIaXN0b3J5TWFuYWdlci5QYXJzZVVybCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGVXaXRob3V0UHVzaFN0YXRlKHN0cmluZy5Jc051bGxPckVtcHR5KHVybEluZm8uUGFnZUlkKSA/IGNvbmZpZ3VyYXRpb24uSG9tZUlkIDogdXJsSW5mby5QYWdlSWQsIHVybEluZm8uUGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5OYXZpZ2F0ZShwYWdlSWQsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE5hdmlnYXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyLlB1c2hTdGF0ZShwYWdlSWQscGFyYW1ldGVycyk7XG4gICAgICAgICAgICBiYXNlLk5hdmlnYXRlKHBhZ2VJZCwgcGFyYW1ldGVycyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBJbml0TmF2aWdhdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyLlBhcnNlVXJsKCk7XG5cbiAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JFbXB0eShwYXJzZWQuUGFnZUlkKSlcbiAgICAgICAgICAgICAgICBiYXNlLkluaXROYXZpZ2F0aW9uKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmFzZS5FbmFibGVTcGFmQW5jaG9ycygpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLkNvbmZpZ3VyYXRpb24uR2V0UGFnZURlc2NyaXB0b3JCeUtleShwYXJzZWQuUGFnZUlkKTtcbiAgICAgICAgICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJQYWdlIG5vdCBmb3VuZCB3aXRoIElEIHswfVwiLHBhcnNlZC5QYWdlSWQpKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIG5vdCBudWxsIGFuZCBldmFsdWF0aW9uIGlzIGZhbHNlIGZhbGxiYWNrIHRvIGhvbWVcbiAgICAgICAgICAgICAgICBpZiAocGFnZS5DYW5CZURpcmVjdExvYWQgIT0gbnVsbCAmJiAhcGFnZS5DYW5CZURpcmVjdExvYWQuSW52b2tlKCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyLlB1c2hTdGF0ZSh0aGlzLkNvbmZpZ3VyYXRpb24uSG9tZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZVdpdGhvdXRQdXNoU3RhdGUodGhpcy5Db25maWd1cmF0aW9uLkhvbWVJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShwYXJzZWQuUGFnZUlkLHBhcnNlZC5QYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICBcbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIGNsYXNzIEN1c3RvbVJvdXRlc0NvbmZpZyA6IEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XHJcbiAgICAgICAgcHVibGljIEN1c3RvbVJvdXRlc0NvbmZpZyhJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSUxpc3Q8SVBhZ2VEZXNjcmlwdG9yPiBDcmVhdGVSb3V0ZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PElQYWdlRGVzY3JpcHRvcj4oKSwoX28xKT0+e19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9ob21lLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkhvbWVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8SG9tZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL2xvZ2luLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkxvZ2luSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPExvZ2luVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvcmVnaXN0ZXIuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuUmVnaXN0ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8UmVnaXN0ZXJWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9wcm9maWxlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8UHJvZmlsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9zZXR0aW5ncy5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5TZXR0aW5nc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxTZXR0aW5nc1ZpZXdNb2RlbD4oKSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvZWRpdEFydGljbGUuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuRWRpdEFydGljbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8RWRpdEFydGljbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9hcnRpY2xlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkFydGljbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8QXJ0aWNsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBqUXVlcnkgQm9keSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBIb21lSWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5wcml2YXRlIHN0cmluZyBWaXJ0dWFsRGlyZWN0b3J5XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmcuSXNOdWxsT3JFbXB0eShOYXZpZ2F0aW9uVXRpbGl0eS5WaXJ0dWFsRGlyZWN0b3J5KSA/IHN0cmluZy5FbXB0eSA6IHN0cmluZy5Gb3JtYXQoXCJ7MH0vXCIsTmF2aWdhdGlvblV0aWxpdHkuVmlydHVhbERpcmVjdG9yeSk7XHJcbiAgICB9XHJcbn1cblxyXG4gICAgXG5wcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0Rpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlPWZhbHNlO3ByaXZhdGUgalF1ZXJ5IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2R5PWpRdWVyeS5TZWxlY3QoXCIjcGFnZUJvZHlcIik7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0hvbWVJZD1TcGFmQXBwLkhvbWVJZDt9XHJcblxyXG4gICBcclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XHJcblxyXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXJ0aWNsZVJlc291cmNlcyA6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElBcnRpY2xlUmVzb3VyY2VzXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xyXG5cclxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IEdldEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlciBidWlsZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksYnVpbGRlci5CdWlsZCgpKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlVzZXJTZXJ2aWNlLklzTG9nZ2VkXHJcbiAgICAgICAgICAgICAgICA/IGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEFydGljbGVSZXNwb25zZT4ob3B0aW9ucylcclxuICAgICAgICAgICAgICAgIDogdGhpcy5NYWtlQ2FsbDxBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8VGFnc1Jlc3BvbnNlPiBHZXRUYWdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdGFnc1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFRhZ3NSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IEdldEFydGljbGUoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gRmF2b3JpdGUoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9mYXZvcml0ZVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gVW5GYXZvcml0ZShzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2Zhdm9yaXRlXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IENyZWF0ZShOZXdBcnRpY2xlUmVxdWVzdCBuZXdBcnRpY2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlc1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobmV3QXJ0aWNsZSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8Q29tbWVudHNSZXNwb25zZT4gR2V0QXJ0aWNsZUNvbW1lbnRzKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vY29tbWVudHNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPENvbW1lbnRzUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQ29tbWVudFJlc3BvbnNlPiBBZGRDb21tZW50KHN0cmluZyBzbHVnLCBzdHJpbmcgY29tbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2NvbW1lbnRzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KG5ldyBDb21tZW50XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9keSA9IGNvbW1lbnRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQ29tbWVudFJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgRmVlZFJlc291cmNlcyA6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElGZWVkUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpIDogYmFzZSh1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBUYXNrPEFydGljbGVSZXNwb25zZT4gR2V0RmVlZChGZWVkUmVxdWVzdEJ1aWxkZXIgYnVpbGRlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxidWlsZGVyLkJ1aWxkKCkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8QXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBQcm9maWxlUmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSVByb2ZpbGVSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgUHJvZmlsZVJlc291cmNlcyhJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIElTZXR0aW5ncyBzZXR0aW5ncykgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPEZvbGxvd1Jlc3BvbnNlPiBGb2xsb3coc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vcHJvZmlsZXMvezF9L2ZvbGxvd1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSx1c2VybmFtZSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEZvbGxvd1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPEZvbGxvd1Jlc3BvbnNlPiBVbkZvbGxvdyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9wcm9maWxlcy97MX0vZm9sbG93XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHVzZXJuYW1lKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJERUxFVEVcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxGb2xsb3dSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxQcm9maWxlUmVzcG9uc2U+IEdldChzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9wcm9maWxlcy97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksdXNlcm5hbWUpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLlVzZXJTZXJ2aWNlLklzTG9nZ2VkID8gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8UHJvZmlsZVJlc3BvbnNlPihvcHRpb25zKSA6IGJhc2UuTWFrZUNhbGw8UHJvZmlsZVJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiAiLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBTZXR0aW5nc1Jlc291cmNlczogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSVNldHRpbmdzUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIFNldHRpbmdzUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTZXR0aW5nc1Jlc3BvbnNlPiBVcGRhdGVTZXR0aW5ncyhTZXR0aW5nc1JlcXVlc3Qgc2V0dGluZ3NSZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlclwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUFVUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3Qoc2V0dGluZ3NSZXF1ZXN0KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNldHRpbmdzUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgUmV0eXBlZDtcbnVzaW5nIENvbW1lbnQgPSByZWFsd29ybGQuc3BhZi5Nb2RlbHMuQ29tbWVudDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBBcnRpY2xlVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG5wdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpXHJcbntcclxuICAgIHJldHVybiBTcGFmQXBwLkFydGljbGVJZDtcclxufVxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcnRpY2xlUmVzb3VyY2VzIF9hcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElQcm9maWxlUmVzb3VyY2VzIF9wcm9maWxlUmVzb3VyY2VzO1xuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlIEFydGljbGUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Q29tbWVudD5Db21tZW50cyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkNvbW1lbnQgeyBnZXQ7IHNldDsgfVxucHVibGljIGJvb2wgSXNMb2dnZWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkO1xyXG4gICAgfVxyXG59cHVibGljIFVzZXIgTG9nZ2VkVXNlclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UuTG9nZ2VkVXNlcjtcclxuICAgIH1cclxufVxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIFxuICAgICAgICAgICAgSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElQcm9maWxlUmVzb3VyY2VzIHByb2ZpbGVSZXNvdXJjZXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9hcnRpY2xlUmVzb3VyY2VzID0gYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF9wcm9maWxlUmVzb3VyY2VzID0gcHJvZmlsZVJlc291cmNlcztcblxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlID0gbmV3IEFydGljbGUoKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPENvbW1lbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIHZhciBzbHVnID0gcGFyYW1ldGVycy5HZXRQYXJhbWV0ZXI8c3RyaW5nPihcInNsdWdcIik7XG4gICAgICAgICAgICBpZihzdHJpbmcuSXNOdWxsT3JFbXB0eShzbHVnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiQXJ0aWNsZSBwYWdlIG5lZWQgc2x1ZyBwYXJhbWV0ZXJcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBhcnRpY2xlVGFzayA9IHRoaXMuTG9hZEFydGljbGUoc2x1Zyk7XG4gICAgICAgICAgICB2YXIgY29tbWVudHNUYXNrID0gdGhpcy5Mb2FkQ29tbWVudHMoc2x1Zyk7XG4gICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGwoYXJ0aWNsZVRhc2ssY29tbWVudHNUYXNrKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoQmluZGluZygpOyAvLyBtYW51YWwgcmVmcmVzaCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5FbmFibGVTcGFmQW5jaG9ycygpOyAvLyB0b2RvIGNoZWNrIHdoeSBub3QgYXV0byBlbmFibGVkXG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBZGQgY29tbWVudCB0byBhcnRpY2xlXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFkZENvbW1lbnQoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQpIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGNvbW1lbnRSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuQWRkQ29tbWVudCh0aGlzLkFydGljbGUuU2x1ZywgdGhpcy5Db21tZW50LlNlbGYoKSk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnQuU2VsZihzdHJpbmcuRW1wdHkpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50cy5wdXNoKGNvbW1lbnRSZXNwb25zZS5Db21tZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEZvbGxvdyBBcnRpY2xlIEF1dGhvclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGb2xsb3dBdXRob3IoKVxuICAgICAgICB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2VzLkZvbGxvdyh0aGlzLkFydGljbGUuQXV0aG9yLlVzZXJuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTWFudWFsIHJldmFsdWF0ZSBiaW5kaW5nXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBSZWZyZXNoQmluZGluZygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJldHlwZWQua25vY2tvdXQua28uY2xlYW5Ob2RlKHRoaXMuUGFnZU5vZGUpO1xuICAgICAgICAgICAgYmFzZS5BcHBseUJpbmRpbmdzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIGNvbW1lbnRzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNsdWdcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZENvbW1lbnRzKHN0cmluZyBzbHVnKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29tbWVudCA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZUNvbW1lbnRzKHNsdWcpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50cy5wdXNoKGNvbW1lbnQuQ29tbWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlIGluZm9cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2x1Z1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkQXJ0aWNsZShzdHJpbmcgc2x1ZylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFydGljbGUgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGUoc2x1Zyk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGUgPSBhcnRpY2xlLkFydGljbGU7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgRWRpdEFydGljbGVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG5wdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpXHJcbntcclxuICAgIHJldHVybiBTcGFmQXBwLkVkaXRBcnRpY2xlSWQ7XHJcbn1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VGl0bGUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Cb2R5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+RGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5UYWdzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBFZGl0QXJ0aWNsZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgX2FydGljbGVSZXNvdXJjZXMgPSBhcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIHRoaXMuVGl0bGUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkJvZHkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkRlc2NyaXB0aW9uID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5UYWdzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XG5cbi8vICAgICAgICAgICAgdmFyIGFydGljbGVTbHVnID0gcGFyYW1ldGVycy5HZXRQYXJhbWV0ZXI8c3RyaW5nPihcInNsdWdcIik7XG4vLyAgICAgICAgICAgIGlmKHN0cmluZy5Jc051bGxPckVtcHR5KGFydGljbGVTbHVnKSlcbi8vICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJTbHVnIG1pc3NpbmchXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIENyZWF0ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIHRvZG8gdmFsaWRhdGlvbnNcbiAgICAgICAgICAgIHZhciBuZXdBcnRpY2VsID0gbmV3IE5ld0FydGljbGVSZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQXJ0aWNsZSA9IG5ldyBOZXdBcnRpY2xlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBUaXRsZSA9IHRoaXMuVGl0bGUuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBCb2R5ID0gdGhpcy5Cb2R5LlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb24gPSB0aGlzLkRlc2NyaXB0aW9uLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgVGFnTGlzdCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KHRoaXMuVGFncy5TZWxmKCkuU3BsaXQoJywnKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZSA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuQ3JlYXRlKG5ld0FydGljZWwpO1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuQXJ0aWNsZUlkLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInNsdWdcIixhcnRpY2xlLkFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xyXG51c2luZyBCcmlkZ2UuU3BhZjtcclxudXNpbmcgQnJpZGdlLlNwYWYuQXR0cmlidXRlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcclxue1xyXG4gICAgY2xhc3MgSG9tZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXHJcbiAgICB7XHJcbnB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKClcclxue1xyXG4gICAgcmV0dXJuIFNwYWZBcHAuSG9tZUlkO1xyXG59XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3RhZ0ZpbHRlciA9IG51bGw7IC8vIHRhZyBmaWx0ZXJcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcnRpY2xlUmVzb3VyY2VzIF9yZXNvdXJjZXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElGZWVkUmVzb3VyY2VzIF9mZWVkUmVzb3VyY2VzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xyXG5cclxuICAgICAgICAjcmVnaW9uIEtOT0NLT1VUSlNcclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8QXJ0aWNsZT5BcnRpY2xlczsgLy8gYXJ0aWNsZXNcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8UGFnaW5hdG9yPlBhZ2VzOyAvLyBwYWdpbmF0b3IgaGVscGVyXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5UYWdzOyAvLyB0YWdzXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+QWN0aXZlVGFiSW5kZXg7IC8vIHRhYiBhY3RpdmUgaW5kZXhcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8c3RyaW5nPlRhYnM7XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzTG9nZ2VkO1xyXG4gICAgICAgIFxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBIb21lVmlld01vZGVsKElBcnRpY2xlUmVzb3VyY2VzIHJlc291cmNlcywgSVNldHRpbmdzIHNldHRpbmdzLCBJTWVzc2VuZ2VyIG1lc3NlbmdlcixcclxuICAgICAgICAgICAgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBJRmVlZFJlc291cmNlcyBmZWVkUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXNvdXJjZXMgPSByZXNvdXJjZXM7XHJcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xyXG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcclxuICAgICAgICAgICAgX2ZlZWRSZXNvdXJjZXMgPSBmZWVkUmVzb3VyY2VzO1xyXG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxBcnRpY2xlPigpO1xyXG4gICAgICAgICAgICB0aGlzLlBhZ2VzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxQYWdpbmF0b3I+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFncyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcclxuICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KHRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkKTtcclxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oLTEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7IC8vIGFsd2F5cyBjYWxsIGJhc2UgKHdoZXJlIGFwcGx5YmluZGluZylcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlc1Rhc2sgPSB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7IC8vIGxvYWQgYXJ0aWNsZSB0YXNrXHJcbiAgICAgICAgICAgIHZhciBsb2FkVGFnc1Rhc2sgPSB0aGlzLkxvYWRUYWdzKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbChhcnRpY2xlc1Rhc2ssbG9hZFRhZ3NUYXNrKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVzVGFzay5SZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25MZWF2ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uTGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlVuc3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLCBTcGFmQXBwLkxvZ2luSWQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gS05PQ0tPVVQgTUVUSE9EU1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIHVzZXIgZGV0YWlsXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvVXNlcihBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Qcm9maWxlSWQsIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInVzZXJuYW1lXCIsYXJ0aWNsZS5BdXRob3IuVXNlcm5hbWUpO3JldHVybiBfbzE7fSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGFydGljbGUgZGV0YWlsXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvQXJ0aWNsZShBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFkZCBwYXNzZWQgYXJ0aWNsZSB0byBmYXZcclxuICAgICAgICAvLy8gT25seSBmb3IgYXV0aCB1c2Vyc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRUb0Zhdm91cml0ZShBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQuU2VsZigpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgc2luZ2xlQXJ0aWNsZSA9IGFydGljbGUuRmF2b3JpdGVkID8gYXdhaXQgdGhpcy5fcmVzb3VyY2VzLlVuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKSA6IFxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVzb3VyY2VzLkZhdm9yaXRlKGFydGljbGUuU2x1Zyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlcGxhY2UoYXJ0aWNsZSxzaW5nbGVBcnRpY2xlLkFydGljbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHbyB0byB1c2VyIGZlZWRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVzZXRUYWJzRm9yRmVlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoLTIpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLkxvYWRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVzZXQgVGFiXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlc2V0VGFicygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoLTEpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlUmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHbyB0byBwYWdlXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdpbmF0b3JcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgR29Ub1BhZ2UoUGFnaW5hdG9yIHBhZ2luYXRvcilcclxuICAgICAgICB7XHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2luZ2xlPFBhZ2luYXRvcj4oICAgICAgICAgICAgdGhpcy5QYWdlcy5TZWxmKCksKEZ1bmM8UGFnaW5hdG9yLGJvb2w+KShzID0+IHMuQWN0aXZlLlNlbGYoKSkpLkFjdGl2ZS5TZWxmKGZhbHNlKTtcclxuICAgICAgICAgICAgcGFnaW5hdG9yLkFjdGl2ZS5TZWxmKHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAuV2l0aE9mZlNldCgocGFnaW5hdG9yLlBhZ2UtMSkqdGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSlcclxuICAgICAgICAgICAgICAgIC5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3RhZ0ZpbHRlcikpXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gcmVxdWVzdC5XaXRoVGFnKHRoaXMuX3RhZ0ZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhyZXF1ZXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRmlsdGVyIGFydGljbGVzIGJ5IHRhZ1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidGFnXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEZpbHRlckJ5VGFnKHN0cmluZyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFiTmFtZSA9IHN0cmluZy5Gb3JtYXQoXCIjezB9XCIsdGFnKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5BcnRpY2xlc0ZvclRhYih0YWJOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBhcnRpY2xlcyBmb3IgcGFzc2VkIHRhYlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidGFiXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFydGljbGVzRm9yVGFiKHN0cmluZyB0YWIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFnTmFtZSA9IHRhYi5UcmltU3RhcnQoJyMnKTtcclxuICAgICAgICAgICAgdGhpcy5fdGFnRmlsdGVyID0gdGFnTmFtZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3R1YWxJbmRleCA9IHRoaXMuVGFicy5TZWxmKCkuSW5kZXhPZih0YWIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoYWN0dWFsSW5kZXggPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRhYnMucHVzaCh0YWIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKHRoaXMuVGFicy5TZWxmKCkuSW5kZXhPZih0YWIpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlcyA9IGF3YWl0IHRoaXMuTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KClcclxuICAgICAgICAgICAgICAgIC5XaXRoVGFnKHRhZ05hbWUpXHJcbiAgICAgICAgICAgICAgICAuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFBSSVZBVEUgTUVUSE9EU1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgYXJ0aWNsZXNcclxuICAgICAgICAvLy8gQ2xlYXIgbGlzdCBhbmQgcmVsb2FkXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IExvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgcmVxdWVzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzb1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5fcmVzb3VyY2VzLkdldEFydGljbGVzKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnB1c2goYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnRpY2xlUmVzb1Jlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgZmVlZFxyXG4gICAgICAgIC8vLyBDbGVhciBsaXN0IGFuZCByZWxvYWRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrPEFydGljbGVSZXNwb25zZT4gTG9hZEZlZWQoRmVlZFJlcXVlc3RCdWlsZGVyIHJlcXVlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmVlZFJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZmVlZFJlc291cmNlcy5HZXRGZWVkKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnB1c2goZmVlZFJlc3BvbnNlLkFydGljbGVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZlZWRSZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVsb2FkIHRhZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRUYWdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YWdzID0gYXdhaXQgdGhpcy5fcmVzb3VyY2VzLkdldFRhZ3MoKTtcclxuICAgICAgICAgICAgdGhpcy5UYWdzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLlRhZ3MucHVzaCh0YWdzLlRhZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFdoZW4gdXBkYXRlIGFydGljbGVzIHJlYnVpbGQgcGFnaW5hdG9yXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlUmVzb1Jlc3BvbnNlXCI+PC9wYXJhbT5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVmcmVzaFBhZ2luYXRvcihBcnRpY2xlUmVzcG9uc2UgYXJ0aWNsZVJlc29SZXNwb25zZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGFnZXMucmVtb3ZlQWxsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PEFydGljbGU+KGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXMpKSByZXR1cm47IC8vIG5vIGFydGljbGVzXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcGFnZXNDb3VudCA9IChpbnQpIChhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzQ291bnQgLyBhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzLkxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZhciByYW5nZSA9IEVudW1lcmFibGUuUmFuZ2UoMSwgcGFnZXNDb3VudCk7XHJcbiAgICAgICAgICAgIHZhciBwYWdlcyA9IHJhbmdlLlNlbGVjdDxQYWdpbmF0b3I+KChGdW5jPGludCxQYWdpbmF0b3I+KShzID0+IG5ldyBQYWdpbmF0b3JcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUGFnZSA9IHNcclxuICAgICAgICAgICAgfSkpLlRvQXJyYXkoKTtcclxuICAgICAgICAgICAgcGFnZXNbMF0uQWN0aXZlLlNlbGYodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUGFnZXMucHVzaChwYWdlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICAgICBcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIHB1YmxpYyBjbGFzcyBMb2dpblZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5Mb2dpbklkO1xyXG59XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkVtYWlsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+UGFzc3dvcmQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SXNCdXN5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5FcnJvcnMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBMb2dpblZpZXdNb2RlbChJTmF2aWdhdG9yIG5hdmlnYXRvciwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuRW1haWwgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlBhc3N3b3JkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Jc0J1c3kgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPigpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIFRhc2sgTG9naW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLklzQnVzeS5TZWxmKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UuTG9naW4odGhpcy5FbWFpbC5TZWxmKCksIHRoaXMuUGFzc3dvcmQuU2VsZigpKS5Db250aW51ZVdpdGgoKEFjdGlvbjxUYXNrPikoYyA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuSXNCdXN5LlNlbGYoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGMuSXNGYXVsdGVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0RXhjZXB0aW9uID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxFeGNlcHRpb24+KGMuRXhjZXB0aW9uLklubmVyRXhjZXB0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0RXhjZXB0aW9uIGlzIFByb21pc2VFeGNlcHRpb24pXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gKFByb21pc2VFeGNlcHRpb24pU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxFeGNlcHRpb24+KGMuRXhjZXB0aW9uLklubmVyRXhjZXB0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KGVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNpZW50IFwibm90IGNvbXBsZXRlZCB0YXNrXCIgY2F1c2VkIGJ5IGJyaWRnZSB2ZXJzaW9uIChpbiBmaXgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkhvbWVJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgUmV0eXBlZDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBSZWdpc3RlclZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5SZWdpc3RlcklkO1xyXG59XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBVc2VybmFtZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBFbWFpbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBQYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheTxzdHJpbmc+IEVycm9ycyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFJlZ2lzdGVyVmlld01vZGVsKElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcblxuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZSA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc3dvcmQgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlZ2lzdGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuUmVnaXN0ZXIodGhpcy5Vc2VybmFtZS5TZWxmKCksIHRoaXMuRW1haWwuU2VsZigpLCB0aGlzLlBhc3N3b3JkLlNlbGYoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgU2V0dGluZ3NWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5nc1Jlc291cmNlcyBfc2V0dGluZ3NSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5TZXR0aW5nc0lkO1xyXG59XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkltYWdlVXJpIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VXNlcm5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5CaW9ncmFwaHkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5FbWFpbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPk5ld1Bhc3N3b3JkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5FcnJvcnMgeyBnZXQ7IHNldDsgfVxuXG5cbiAgICAgICAgcHVibGljIFNldHRpbmdzVmlld01vZGVsKElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSVNldHRpbmdzUmVzb3VyY2VzIHNldHRpbmdzUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzUmVzb3VyY2VzID0gc2V0dGluZ3NSZXNvdXJjZXM7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG5cbiAgICAgICAgICAgIHRoaXMuSW1hZ2VVcmkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5CaW9ncmFwaHkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5OZXdQYXNzd29yZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG5cbiAgICAgICAgICAgIHRoaXMuUG9wdWxhdGVFbnRyaWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHZvaWQgUG9wdWxhdGVFbnRyaWVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZS5TZWxmKHVzZXIuVXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5FbWFpbC5TZWxmKHVzZXIuRW1haWwpO1xuICAgICAgICAgICAgdGhpcy5JbWFnZVVyaS5TZWxmKHVzZXIuSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5CaW9ncmFwaHkuU2VsZih1c2VyLkJpbyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgVXBkYXRlU2V0dGluZ3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZ3NSZXF1ZXN0ID0gbmV3IFNldHRpbmdzUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWUgPSB0aGlzLlVzZXJuYW1lLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgTmV3UGFzc3dvcmQgPSB0aGlzLk5ld1Bhc3N3b3JkLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgQmlvZ3JhcGh5ID0gdGhpcy5CaW9ncmFwaHkuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IHRoaXMuRW1haWwuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBJbWFnZVVyaSA9IHRoaXMuSW1hZ2VVcmkuU2VsZigpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciB1c2VyVXBkYXRlZCA9IGF3YWl0IHRoaXMuX3NldHRpbmdzUmVzb3VyY2VzLlVwZGF0ZVNldHRpbmdzKHNldHRpbmdzUmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuUHJvZmlsZUlkKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdCn0K
