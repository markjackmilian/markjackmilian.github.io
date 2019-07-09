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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiU3BhZi9OYXZpZ2F0aW9uL05hdmlnYXRpb25VdGlsaXR5LmNzIiwiU3BhZi9OYXZpZ2F0aW9uL1V0aWxpdHkuY3MiLCJTcGFmL1ZpZXdNb2RlbEJhc2UuY3MiLCJTcGFmQXBwLmNzIiwiQ2xhc3Nlcy9FeHRlbnNpb25zLmNzIiwiQ2xhc3Nlcy9GZWVkUmVxdWVzdEJ1aWxkZXIuY3MiLCJNb2RlbHMvQXJ0aWNsZS5jcyIsIk1vZGVscy9Db21tZW50LmNzIiwiTW9kZWxzL1BhZ2luYXRvci5jcyIsIkNsYXNzZXMvQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLmNzIiwiU2VydmljZXMvaW1wbC9SZXNvdXJjZUJhc2UuY3MiLCJWaWV3TW9kZWxzL01haW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1Byb2ZpbGVWaWV3TW9kZWwuY3MiLCJTcGFmL0lvYy9CcmlkZ2VJb2MuY3MiLCJTcGFmL0lvYy9SZXNvbHZlcnMvRnVuY1Jlc29sdmVyLmNzIiwiU3BhZi9Jb2MvUmVzb2x2ZXJzL0luc3RhbmNlUmVzb2x2ZXIuY3MiLCJTcGFmL0lvYy9SZXNvbHZlcnMvU2luZ2xlSW5zdGFuY2VSZXNvbHZlci5jcyIsIlNwYWYvSW9jL1Jlc29sdmVycy9UcmFuc2llbnRSZXNvbHZlci5jcyIsIlNwYWYvTWVzc2VuZ2VyL01lc3Nlbmdlci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL0JyaWRnZU5hdmlnYXRvci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL0JyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UuY3MiLCJTcGFmL05hdmlnYXRpb24vSW1wbC9Db21wbGV4T2JqZWN0TmF2aWdhdGlvbkhpc3RvcnkuY3MiLCJTcGFmL05hdmlnYXRpb24vSW1wbC9QYWdlRGVzY3JpcHRvci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL1F1ZXJ5UGFyYW1ldGVyTmF2aWdhdGlvbkhpc3RvcnkuY3MiLCJTcGFmL0xvYWRhYmxlVmlld01vZGVsLmNzIiwiU3BhZi9QYXJ0aWFsTW9kZWwuY3MiLCJTZXJ2aWNlcy9pbXBsL0F1dGhvcml6ZWRSZXNvdXJjZUJhc2UuY3MiLCJTZXJ2aWNlcy9pbXBsL0xvY2FsU3RvcmFnZVJlcG9zaXRvcnkuY3MiLCJTZXJ2aWNlcy9pbXBsL1VzZXJSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1VzZXJTZXJ2aWNlLmNzIiwiU3BhZi9OYXZpZ2F0aW9uL0ltcGwvQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmcuY3MiLCJDdXN0b21Sb3V0ZXNDb25maWcuY3MiLCJTZXJ2aWNlcy9pbXBsL0FydGljbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL0ZlZWRSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1Byb2ZpbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1NldHRpbmdzUmVzb3VyY2VzLmNzIiwiVmlld01vZGVscy9BcnRpY2xlVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9FZGl0QXJ0aWNsZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvSG9tZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvTG9naW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1JlZ2lzdGVyVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9TZXR0aW5nc1ZpZXdNb2RlbC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBWWdEQTs7Ozs7Ozs7Ozs7Ozs7O3dDQVVYQSxHQUFHQSxZQUE0Q0E7b0JBRXhFQSxJQUFJQSxjQUFjQTt3QkFDZEEsTUFBTUEsSUFBSUE7OztvQkFFZEEsSUFBSUEsQ0FBQ0EsdUJBQXVCQTt3QkFDeEJBLE1BQU1BLElBQUlBLGlCQUFVQSwwREFBaURBOzs7b0JBRXpFQSxZQUFZQSxtQkFBV0E7O29CQUV2QkEsa0JBQWtC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ekJBLFNBQWFBO3dDQUNiQSxvQ0FBaUJBLE1BQStCQSwyQ0FBUUEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTmF2aWdhdGlvblV0aWxpdHlcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERlZmluZSB2aXJ0dWFsIGRpcmVjdG9yeSBmb3Igc29tZXRoaW5nIGxpa2U6XG4gICAgICAgIC8vLyBwcm90b2NvbDovL2F3ZXNvbWVzaXRlLmlvL3NvbWVkaXJlY3RvcnlcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgVmlydHVhbERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IHBhcmFtZXRlciBrZXkgZnJvbSBwYXJhbWV0ZXJzIGRpY3Rpb25hcnlcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFyYW1ldGVyc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtS2V5XCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEdldFBhcmFtZXRlcjxUPih0aGlzIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMsIHN0cmluZyBwYXJhbUtleSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiUGFyYW1ldGVycyBpcyBudWxsIVwiKTtcblxuICAgICAgICAgICAgaWYgKCFwYXJhbWV0ZXJzLkNvbnRhaW5zS2V5KHBhcmFtS2V5KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJObyBwYXJhbWV0ZXIgd2l0aCBrZXkgezB9IGZvdW5kIVwiLHBhcmFtS2V5KSk7XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcmFtZXRlcnNbcGFyYW1LZXldO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcGFyc2VNZXRob2QgPSB0eXBlb2YoVCkuR2V0TWV0aG9kKFwiUGFyc2VcIiwgbmV3IFR5cGVbXSB7IHR5cGVvZihzdHJpbmcpIH0gKTtcblxuICAgICAgICAgICAgaWYgKHBhcnNlTWV0aG9kICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChUKXBhcnNlTWV0aG9kLkludm9rZShudWxsLCBuZXcgb2JqZWN0W10geyB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChUKSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQnVpbGQgYmFzZSB1cmwgdXNpbmcgcGFnZSBpZCBhbmQgdmlydHVhbCBkaXJlY3RvcnlcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFnZUlkXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQnVpbGRCYXNlVXJsKHN0cmluZyBwYWdlSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBiYXNlVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS8vezF9XCIsV2luZG93LkxvY2F0aW9uLlByb3RvY29sLFdpbmRvdy5Mb2NhdGlvbi5Ib3N0KTtcbiAgICAgICAgICAgIGJhc2VVcmwgPSBzdHJpbmcuSXNOdWxsT3JFbXB0eShWaXJ0dWFsRGlyZWN0b3J5KVxuICAgICAgICAgICAgICAgID8gc3RyaW5nLkZvcm1hdChcInswfSN7MX1cIixiYXNlVXJsLHBhZ2VJZCkgICAgICAgICAgICAgICAgOiBzdHJpbmcuRm9ybWF0KFwiezB9L3sxfSN7Mn1cIixiYXNlVXJsLFZpcnR1YWxEaXJlY3RvcnkscGFnZUlkKTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlVXJsO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFV0aWxpdHlcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgc2NyaXB0IHNlcXVlbnRpYWxseVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzY3JpcHRzXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNlcXVlbnRpYWxTY3JpcHRMb2FkKExpc3Q8c3RyaW5nPiBzY3JpcHRzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PHN0cmluZz4oc2NyaXB0cykpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB0b0xvYWQgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PHN0cmluZz4oc2NyaXB0cyk7XG4gICAgICAgICAgICBqUXVlcnkuR2V0U2NyaXB0KHRvTG9hZCwgKFN5c3RlbS5BY3Rpb248b2JqZWN0LHN0cmluZyxqcVhIUj4pKChvLCBzLCBhcmczKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNjcmlwdHMuUmVtb3ZlKHRvTG9hZCk7XG4gICAgICAgICAgICAgICAgU2VxdWVudGlhbFNjcmlwdExvYWQoc2NyaXB0cyk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVmlld01vZGVsQmFzZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgZG9tLkhUTUxFbGVtZW50IF9wYWdlTm9kZTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBFbGVtZW50IGlkIG9mIHRoZSBwYWdlIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc3RyaW5nIEVsZW1lbnRJZCgpO1xyXG5wdWJsaWMgZG9tLkhUTUxFbGVtZW50IFBhZ2VOb2RlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFnZU5vZGUgPz8gKHRoaXMuX3BhZ2VOb2RlID0gZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEVsZW1lbnRJZCgpKSk7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICBwdWJsaWMgdm9pZCBBcHBseUJpbmRpbmdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtub2Nrb3V0LmtvLmFwcGx5QmluZGluZ3ModGhpcywgdGhpcy5QYWdlTm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVCaW5kaW5ncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrbm9ja291dC5rby5yZW1vdmVOb2RlKHRoaXMuUGFnZU5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSW9jO1xyXG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWYuQXR0cmlidXRlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHM7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNwYWZBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIElJb2MgQ29udGFpbmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAjaWYgVEVTVFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICNlbmRpZlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgI2lmICFERUJVR1xyXG4gICAgICAgICAgICBOYXZpZ2F0aW9uVXRpbGl0eS5WaXJ0dWFsRGlyZWN0b3J5ID0gXCJyZWFsd29ybGQuc3BhZlwiOyAvLyAgdmlydHVhbCBkaXIgZm9yIHJlbGVhc2UgZW52aXJvbm1lbnRcclxuICAgICAgICAgICAgI2VuZGlmXHJcblxyXG4gICAgICAgICAgICBDb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lckNvbmZpZygpOyAvLyBjb25maWcgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHZhciBtYWluVm0gPSBDb250YWluZXIuUmVzb2x2ZTxNYWluVmlld01vZGVsPigpO1xyXG4gICAgICAgICAgICBhd2FpdCBtYWluVm0uU3RhcnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZXNvbHZlPElOYXZpZ2F0b3I+KCkuSW5pdE5hdmlnYXRpb24oKTsgLy8gaW5pdCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvbnRhaW5lckNvbmZpZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBuYXZpZ2F0b3JcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SU5hdmlnYXRvciwgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmc+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElCcm93c2VySGlzdG9yeU1hbmFnZXIsIFF1ZXJ5UGFyYW1ldGVyTmF2aWdhdGlvbkhpc3Rvcnk+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJTmF2aWdhdG9yQ29uZmlndXJhdG9yLCBDdXN0b21Sb3V0ZXNDb25maWc+KCk7IFxyXG5cclxuICAgICAgICAgICAgLy8gbWVzc2VuZ2VyXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElNZXNzZW5nZXIsIE1lc3Nlbmdlci5NZXNzZW5nZXI+KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2aWV3bW9kZWxzXHJcbiAgICAgICAgICAgIFJlZ2lzdGVyQWxsVmlld01vZGVscygpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgY3VzdG9tIHJlc291cmNlLCBzZXJ2aWNlcy4uXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElTZXR0aW5ncywgU2V0dGluZ3M+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElVc2VyU2VydmljZSwgVXNlclNlcnZpY2U+KCk7XHJcblxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SUFydGljbGVSZXNvdXJjZXMsQXJ0aWNsZVJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElVc2VyUmVzb3VyY2VzLFVzZXJSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJRmVlZFJlc291cmNlcyxGZWVkUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVByb2ZpbGVSZXNvdXJjZXMsUHJvZmlsZVJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJUmVwb3NpdG9yeSxMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5PigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVNldHRpbmdzUmVzb3VyY2VzLFNldHRpbmdzUmVzb3VyY2VzPigpO1xyXG5cclxuICAgICAgICB9XHJcbiNyZWdpb24gUEFHRVMgSURTXHJcbi8vIHN0YXRpYyBwYWdlcyBpZFxyXG5wdWJsaWMgc3RhdGljIHN0cmluZyBIb21lSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiaG9tZVwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgTG9naW5JZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJsb2dpblwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgUmVnaXN0ZXJJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJyZWdpc3RlclwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgUHJvZmlsZUlkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcInByb2ZpbGVcIjtcclxuICAgIH1cclxufXB1YmxpYyBzdGF0aWMgc3RyaW5nIFNldHRpbmdzSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwic2V0dGluZ3NcIjtcclxuICAgIH1cclxufXB1YmxpYyBzdGF0aWMgc3RyaW5nIEVkaXRBcnRpY2xlSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiZWRpdEFydGljbGVcIjtcclxuICAgIH1cclxufXB1YmxpYyBzdGF0aWMgc3RyaW5nIEFydGljbGVJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJhcnRpY2xlXCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTUVTU0FHRVNcclxuICAgICAgICAvLyBtZXNzZW5nZXIgaGVscGVyIGZvciBnbG9iYWwgbWVzc2FnZXMgYW5kIG1lc3NhZ2VzIGlkc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE1lc3NhZ2VzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgR2xvYmFsU2VuZGVyIHsgfTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgR2xvYmFsU2VuZGVyIFNlbmRlciA9IG5ldyBHbG9iYWxTZW5kZXIoKTtcclxucHVibGljIHN0YXRpYyBzdHJpbmcgTG9naW5Eb25lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkxvZ2luRG9uZVwiO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlZ2lzdGVyIGFsbCB0eXBlcyB0aGF0IGVuZCB3aXRoIFwidmlld21vZGVsXCIuXHJcbiAgICAgICAgLy8vIFlvdSBjYW4gcmVnaXN0ZXIgYSB2aWV3bW9kZSBhcyBTaW5nbHIgSW5zdGFuY2UgYWRkaW5nIFwiU2luZ2xlSW5zdGFuY2VBdHRyaWJ1dGVcIiB0byB0aGUgY2xhc3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVnaXN0ZXJBbGxWaWV3TW9kZWxzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0TWFueTxBc3NlbWJseSxUeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKEZ1bmM8QXNzZW1ibHksU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8VHlwZT4+KShzID0+IHMuR2V0VHlwZXMoKSkpXHJcbiAgICAgICAgICAgICAgICAuV2hlcmUoKEZ1bmM8VHlwZSxib29sPikodyA9PiB3Lk5hbWUuVG9Mb3dlcigpLkVuZHNXaXRoKFwidmlld21vZGVsXCIpKSkuVG9MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChBY3Rpb248VHlwZT4pKGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFNpbmdsZUluc3RhbmNlQXR0cmlidXRlKSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4oYXR0cmlidXRlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UoZik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyKGYpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERlc2VyaWFsaXplIHJlYWx3b3JsZCBwcm9taXNlIGV4Y2VwdGlvbiB0byBnZXQgZXJyb3JzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRGljdGlvbmFyeTxzdHJpbmcsc3RyaW5nW10+IEdldFZhbGlkYXRpb25FcnJvclJlc3BvbnNlKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSAoRXJyb3JSZXNwb25zZSlKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxFcnJvclJlc3BvbnNlPihleGNlcHRpb24uQXJndW1lbnRzWzBdLlRvRHluYW1pYygpLnJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLkVycm9ycztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdldCByZWFkYWJsZSBlcnJvciBsaXN0XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8c3RyaW5nPiBHZXRWYWxpZGF0aW9uRXJyb3JzKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBleGNlcHRpb24uR2V0VmFsaWRhdGlvbkVycm9yUmVzcG9uc2UoKTtcblxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGVycm9yIGluIGVycm9ycylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZXJyb3JEZXNjcmlwdGlvbiBpbiBlcnJvci5WYWx1ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiezB9IHsxfVwiLGVycm9yLktleSxlcnJvckRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgZXJyb3IgZm9yIGh0bWxlcnJvcmNvZGVcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXJyb3JDb2RlXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgR2V0RXJyb3JGb3JDb2RlKGludCBlcnJvckNvZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyb3JDb2RlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJVbmF1dGhvcml6ZWRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRm9yYmlkZGVuXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5vdCBGb3VuZFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgNDIyOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJWYWxpZGF0aW9uIEVycm9yXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR2VuZXJpYyBFcnJvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IGVycm9yIGNvZGUgZm9yIHByb21pc2UgZXhjZXB0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVycm9yQ29kZSh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JDb2RlID0gKGludClleGNlcHRpb24uQXJndW1lbnRzWzBdLlRvRHluYW1pYygpLnN0YXR1cztcbiAgICAgICAgICAgIHJldHVybiBlcnJvckNvZGU7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5DbGFzc2VzXG57XG4gICAgcHVibGljIGNsYXNzIEZlZWRSZXF1ZXN0QnVpbGRlclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX29mZnNldDtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2xpbWl0O1xuXG5cbiAgICAgICAgcHJpdmF0ZSBGZWVkUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IDIwO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRmVlZFJlcXVlc3RCdWlsZGVyIERlZmF1bHQoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZlZWRSZXF1ZXN0QnVpbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXF1ZXN0QnVpbGRlciBXaXRoT2ZmU2V0KGludCBvZmZzZXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXF1ZXN0QnVpbGRlciBXaXRoTGltaXQoaW50IGxpbWl0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnVpbGQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKFwiYXJ0aWNsZXMvZmVlZFwiKTtcblxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIj9saW1pdD17MH1cIix0aGlzLl9saW1pdCkpO1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmb2Zmc2V0PXswfVwiLHRoaXMuX29mZnNldCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcblxyXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFydGljbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BdXRob3IgPSBuZXcgQXV0aG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ0aXRsZVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRpdGxlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInNsdWdcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTbHVnIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImJvZHlcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBCb2R5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImNyZWF0ZWRBdFwiKV1cclxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWU/IENyZWF0ZWRBdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ1cGRhdGVkQXRcIildXHJcbiAgICAgICAgcHVibGljIERhdGVUaW1lPyBVcGRhdGVkQXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidGFnTGlzdFwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gVGFnTGlzdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJkZXNjcmlwdGlvblwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImF1dGhvclwiKV1cclxuICAgICAgICBwdWJsaWMgQXV0aG9yIEF1dGhvciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJmYXZvcml0ZWRcIildXHJcbiAgICAgICAgcHVibGljIGJvb2wgRmF2b3JpdGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImZhdm9yaXRlc0NvdW50XCIpXVxyXG4gICAgICAgIHB1YmxpYyBsb25nIEZhdm9yaXRlc0NvdW50IHsgZ2V0OyBzZXQ7IH1cclxucHVibGljIHN0cmluZyBDcmVhdGVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsdGhpcy5DcmVhdGVkQXQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxEYXRlVGltZT4oXCJrZXkxXCIpLlRvU3RyaW5nKFwiTU1NTSBkZFwiKTooc3RyaW5nKW51bGw7XHJcbiAgICB9XHJcbn0gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xue1xuICAgIHB1YmxpYyBjbGFzcyBDb21tZW50XG4gICAge1xuICAgICAgICBwdWJsaWMgQ29tbWVudCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXV0aG9yID0gbmV3IEF1dGhvcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbSnNvblByb3BlcnR5KFwiaWRcIildXG4gICAgICAgIHB1YmxpYyBsb25nIElkIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiY3JlYXRlZEF0XCIpXVxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgQ3JlYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwidXBkYXRlZEF0XCIpXVxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgVXBkYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYm9keVwiKV1cbiAgICAgICAgcHVibGljIHN0cmluZyBCb2R5IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYXV0aG9yXCIpXVxuICAgICAgICBwdWJsaWMgQXV0aG9yIEF1dGhvciB7IGdldDsgc2V0OyB9XG5wdWJsaWMgc3RyaW5nIENyZWF0ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DcmVhdGVkQXQuVG9TdHJpbmcoXCJNTU1NIGRkXCIpO1xyXG4gICAgfVxyXG59XG4gICAgfVxufSIsIlxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xue1xuICAgIHB1YmxpYyBjbGFzcyBQYWdpbmF0b3JcbiAgICB7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5BY3RpdmUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgaW50IFBhZ2UgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBQYWdpbmF0b3IoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFjdGl2ZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGV4dDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBwdWJsaWMgY2xhc3MgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0cmluZyBfdGFnO1xuICAgICAgICBwcml2YXRlIHN0cmluZyBfYXV0aG9yO1xuICAgICAgICBwcml2YXRlIGludCBfb2Zmc2V0O1xuICAgICAgICBwcml2YXRlIGludCBfbGltaXQ7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF91c2VyO1xuXG5cbiAgICAgICAgcHJpdmF0ZSBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IDIwO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIERlZmF1bHQoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFydGljbGVSZXF1ZXN0QnVpbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBXaXRoT2ZmU2V0KGludCBvZmZzZXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBXaXRoTGltaXQoaW50IGxpbWl0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIE9mQXV0aG9yKHN0cmluZyBhdXRob3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2F1dGhvciA9IGF1dGhvcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBXaXRoVGFnKHN0cmluZyB0YWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZyA9IHRhZztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIE9mRmF2b3JpdGUoc3RyaW5nIHVzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXIgPSB1c2VyO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnVpbGQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKFwiYXJ0aWNsZXNcIik7XG5cbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCI/bGltaXQ9ezB9XCIsdGhpcy5fbGltaXQpKTtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJm9mZnNldD17MH1cIix0aGlzLl9vZmZzZXQpKTtcblxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl90YWcpKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJnRhZz17MH1cIix0aGlzLl90YWcpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl9hdXRob3IpKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJmF1dGhvcj17MH1cIix0aGlzLl9hdXRob3IpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl91c2VyKSlcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZmYXZvcml0ZWQ9ezB9XCIsdGhpcy5fdXNlcikpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgUmVzb3VyY2VCYXNlXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmljIEF3YWl0YWJsZSBhamF4IGNhbGxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIFRhc2s8VD4gTWFrZUNhbGw8VD4oQWpheE9wdGlvbnMgb3B0aW9ucykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBUYXNrLkZyb21Qcm9taXNlPFQ+KGpRdWVyeS5BamF4KG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLCAoRnVuYzxvYmplY3QsIHN0cmluZywganFYSFIsIFQ+KSAoKHJlc09iaiwgc3VjY2VzcywganFYaHIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04uU3RyaW5naWZ5KHJlc09iaik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxUPihqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgW1NpbmdsZUluc3RhbmNlXVxuICAgIHB1YmxpYyBjbGFzcyBNYWluVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkFjdHVhbFBhZ2VJZCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIE1haW5WaWV3TW9kZWwoSU1lc3NlbmdlciBtZXNzZW5nZXIsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSxJTmF2aWdhdG9yIG5hdmlnYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5BY3R1YWxQYWdlSWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gc3Vic2NyaWJlIHRvIGxvZ2luZG9uZSBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoQWN0aW9uPFVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZC5TZWxmKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgbmF2aWdhdG9yLk9uTmF2aWdhdGVkICs9IChzZW5kZXIsIGxvYWRhYmxlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IChMb2FkYWJsZVZpZXdNb2RlbCkgbG9hZGFibGU7XG4gICAgICAgICAgICAgICAgdGhpcy5BY3R1YWxQYWdlSWQuU2VsZih2bS5FbGVtZW50SWQoKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXBwbHkgYmluZGluZyB0byBtYWlubW9kZWxcbiAgICAgICAgLy8vIHRyeSBhdXRvIGxvZ2luXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFN0YXJ0KClcbiAgICAgICAge1xuICAgICAgICAgICAgUmV0eXBlZC5rbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHRoaXMpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuVHJ5QXV0b0xvZ2luV2l0aFN0b3JlZFRva2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgIFxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgUHJvZmlsZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5Qcm9maWxlSWQ7XHJcbn1cbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUHJvZmlsZVJlc291cmNlcyBfcHJvZmlsZVJlc291cmNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcblxuICAgICAgICBwdWJsaWMgUHJvZmlsZU1vZGVsIFByb2ZpbGVNb2RlbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkFjdGl2ZVRhYkluZGV4OyAvLyB0YWIgYWN0aXZlIGluZGV4XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZCB7IGdldDsgc2V0OyB9XG5cblxuICAgICAgICBwdWJsaWMgUHJvZmlsZVZpZXdNb2RlbChJUHJvZmlsZVJlc291cmNlcyBwcm9maWxlUmVzb3VyY2UsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgXG4gICAgICAgICAgICBJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvciwgSU1lc3NlbmdlciBtZXNzZW5nZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsID0gbmV3IFByb2ZpbGVNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZmlsZVJlc291cmNlID0gcHJvZmlsZVJlc291cmNlO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcblxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oMCk7XG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4odGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoQWN0aW9uPFVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQuU2VsZih0cnVlKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gc3RyaW5nLkVtcHR5O1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSBwYXJhbWV0ZXJzLkdldFBhcmFtZXRlcjxzdHJpbmc+KFwidXNlcm5hbWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk5vIHVzZXJuYW1lIHBhc3NlZCBhbmQgeW91IGFyZSBub3QgbG9nZ2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9IHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2dlZFVzZXIuVXNlcm5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB1c2VyVGFzayA9IHRoaXMuTG9hZFVzZXIodXNlcm5hbWUpO1xuICAgICAgICAgICAgdmFyIGFydGljbGVUYXNrID0gdGhpcy5Mb2FkQXJ0aWNsZXModXNlcm5hbWUpO1xuICAgICAgICAgICAgdmFyIGZhdm91cml0ZVRhc2sgPSB0aGlzLkxvYWRGYXZvdXJpdGVzQXJ0aWNsZXModXNlcm5hbWUpO1xuXG4gICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGwodXNlclRhc2ssIGFydGljbGVUYXNrLCBmYXZvdXJpdGVUYXNrKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlNob3dBcnRpY2xlcygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25MZWF2ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25MZWF2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlVuc3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLCBTcGFmQXBwLkxvZ2luSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFkZCBwYXNzZWQgYXJ0aWNsZSB0byBmYXZcbiAgICAgICAgLy8vIE9ubHkgZm9yIGF1dGggdXNlcnNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFkZFRvRmF2b3VyaXRlKEFydGljbGUgYXJ0aWNsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLklzTG9nZ2VkLlNlbGYoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgc2luZ2xlQXJ0aWNsZSA9IGFydGljbGUuRmF2b3JpdGVkID8gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5VbkZhdm9yaXRlKGFydGljbGUuU2x1ZykgOiBcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkZhdm9yaXRlKGFydGljbGUuU2x1Zyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLkFydGljbGVzLnJlcGxhY2UoYXJ0aWNsZSxzaW5nbGVBcnRpY2xlLkFydGljbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRm9sbG93IC8gdW5mb2xsb3dcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRm9sbG93KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gdGhpcy5Qcm9maWxlTW9kZWwuVXNlcm5hbWUuU2VsZigpO1xuICAgICAgICAgICAgdmFyIGZvbGxvdyA9IHRoaXMuUHJvZmlsZU1vZGVsLkZvbGxvd2luZy5TZWxmKCkgPyBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2UuVW5Gb2xsb3codXNlcm5hbWUpIFxuICAgICAgICAgICAgICAgIDogYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlLkZvbGxvdyh1c2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5Gb2xsb3dpbmcuU2VsZihmb2xsb3cuUHJvZmlsZS5Gb2xsb3dpbmcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byB1c2VyIGRldGFpbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgR29Ub1VzZXIoQXJ0aWNsZSBhcnRpY2xlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Qcm9maWxlSWQsIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInVzZXJuYW1lXCIsYXJ0aWNsZS5BdXRob3IuVXNlcm5hbWUpO3JldHVybiBfbzE7fSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byBhcnRpY2xlIGRldGFpbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgR29Ub0FydGljbGUoQXJ0aWNsZSBhcnRpY2xlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU2hvdyB1c2VyIGFydGljbGVzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dBcnRpY2xlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigwKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlNob3dBcnRpY2xlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU2hvdyBmYXZzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dGYXZvdXJpdGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKDEpO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuU2hvd0Zhdm91cml0ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgdXNlciBkYXRhXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInVzZXJuYW1lXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRVc2VyKHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHByb2ZpbGVSZXNwb25zZSA9IGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZS5HZXQodXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuTWFwTWUocHJvZmlsZVJlc3BvbnNlLlByb2ZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZEFydGljbGVzKHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFydGljbGVzID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCg1KVxuICAgICAgICAgICAgICAgIC5PZkF1dGhvcih1c2VybmFtZSkpO1xuXG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5Vc2VyQXJ0aWNsZXMgPSBhcnRpY2xlcy5BcnRpY2xlcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlcyBGYXZvcml0ZXNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRGYXZvdXJpdGVzQXJ0aWNsZXMoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KDUpXG4gICAgICAgICAgICAgICAgLk9mRmF2b3JpdGUodXNlcm5hbWUpKTtcblxuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuRmF2b3VydGl0ZXMgPSBhcnRpY2xlcy5BcnRpY2xlcztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIGNsYXNzIFByb2ZpbGVNb2RlbFxuICAgIHtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+SW1hZ2UgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Vc2VybmFtZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkJpbyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Gb2xsb3dpbmcgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxBcnRpY2xlPkFydGljbGVzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8QXJ0aWNsZT4gVXNlckFydGljbGVzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIElFbnVtZXJhYmxlPEFydGljbGU+IEZhdm91cnRpdGVzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUHJvZmlsZU1vZGVsKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5JbWFnZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkJpbyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRm9sbG93aW5nID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPEFydGljbGU+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBNYXBNZSAoUHJvZmlsZSBwcm9maWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkltYWdlLlNlbGYocHJvZmlsZS5JbWFnZSk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lLlNlbGYocHJvZmlsZS5Vc2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLkJpby5TZWxmKHByb2ZpbGUuQmlvKTtcbiAgICAgICAgICAgIHRoaXMuRm9sbG93aW5nLlNlbGYocHJvZmlsZS5Gb2xsb3dpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0FydGljbGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8QXJ0aWNsZT4odGhpcy5Vc2VyQXJ0aWNsZXMpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0Zhdm91cml0ZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxBcnRpY2xlPih0aGlzLkZhdm91cnRpdGVzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5Jb2Ncclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEltcGxlbWVudGF0aW9uIG9mIElJb2NcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQnJpZGdlSW9jIDogSUlvY1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRGljdGlvbmFyeTxUeXBlLCBJUmVzb2x2ZXI+IF9yZXNvbHZlcnMgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBJUmVzb2x2ZXI+KCk7XHJcblxyXG4gICAgICAgICNyZWdpb24gUkVHSVNUUkFUSU9OXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyKFR5cGUgdHlwZSwgSVJlc29sdmVyIHJlc29sdmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQodHlwZSk7XHJcbiAgICAgICAgICAgIF9yZXNvbHZlcnMuQWRkKHR5cGUsIHJlc29sdmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyKFR5cGUgdHlwZSwgVHlwZSBpbXBsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBuZXcgVHJhbnNpZW50UmVzb2x2ZXIodGhpcywgaW1wbCk7XHJcbiAgICAgICAgICAgIF9yZXNvbHZlcnMuQWRkKHR5cGUsIHJlc29sdmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyPFRUeXBlLCBUSW1wbGVtZW50YXRpb24+KCkgd2hlcmUgVEltcGxlbWVudGF0aW9uIDogY2xhc3MsIFRUeXBlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWdpc3Rlcih0eXBlb2YoVFR5cGUpLCB0eXBlb2YoVEltcGxlbWVudGF0aW9uKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlcihUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWdpc3Rlcih0eXBlLCB0eXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyPFRUeXBlPigpIHdoZXJlIFRUeXBlIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyKHR5cGVvZihUVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZShUeXBlIHR5cGUsIFR5cGUgaW1wbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc29sdmVyID0gbmV3IFNpbmdsZUluc3RhbmNlUmVzb2x2ZXIodGhpcywgaW1wbCk7XHJcbiAgICAgICAgICAgIF9yZXNvbHZlcnMuQWRkKHR5cGUsIHJlc29sdmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8VFR5cGUsIFRJbXBsZW1lbnRhdGlvbj4oKSB3aGVyZSBUSW1wbGVtZW50YXRpb24gOiBjbGFzcywgVFR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UodHlwZW9mKFRUeXBlKSwgdHlwZW9mKFRJbXBsZW1lbnRhdGlvbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZShUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWdpc3RlclNpbmdsZUluc3RhbmNlKHR5cGUsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxUVHlwZT4oKSB3aGVyZSBUVHlwZSA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWdpc3RlclNpbmdsZUluc3RhbmNlKHR5cGVvZihUVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJGdW5jPFRUeXBlPihGdW5jPFRUeXBlPiBmdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQ8VFR5cGU+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBuZXcgRnVuY1Jlc29sdmVyPFRUeXBlPihmdW5jKTtcclxuICAgICAgICAgICAgX3Jlc29sdmVycy5BZGQodHlwZW9mKFRUeXBlKSwgcmVzb2x2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJJbnN0YW5jZShUeXBlIHR5cGUsIG9iamVjdCBpbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc29sdmVyID0gbmV3IEluc3RhbmNlUmVzb2x2ZXIoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBfcmVzb2x2ZXJzLkFkZCh0eXBlLCByZXNvbHZlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckluc3RhbmNlKG9iamVjdCBpbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UuR2V0VHlwZSgpLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckluc3RhbmNlPFRUeXBlPihUVHlwZSBpbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVySW5zdGFuY2UodHlwZW9mKFRUeXBlKSwgaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFJFU09MVkVcclxuICAgICAgICBwdWJsaWMgVFR5cGUgUmVzb2x2ZTxUVHlwZT4oKSB3aGVyZSBUVHlwZSA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja05vdFJlZ2lzdGVyZWQ8VFR5cGU+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBfcmVzb2x2ZXJzW3R5cGVvZihUVHlwZSldO1xyXG4gICAgICAgICAgICByZXR1cm4gKFRUeXBlKXJlc29sdmVyLlJlc29sdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvYmplY3QgUmVzb2x2ZShUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja05vdFJlZ2lzdGVyZWQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBfcmVzb2x2ZXJzW3R5cGVdO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZXIuUmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFBSSVZBVEVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrQWxyZWFkeUFkZGVkKFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfcmVzb2x2ZXJzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiezB9IGlzIGFscmVhZHkgcmVnaXN0ZXJlZCFcIix0eXBlLkZ1bGxOYW1lKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hlY2tBbHJlYWR5QWRkZWQ8VFR5cGU+KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGVvZihUVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrTm90UmVnaXN0ZXJlZChUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIV9yZXNvbHZlcnMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJDYW5ub3QgcmVzb2x2ZSB7MH0sIGl0J3Mgbm90IHJlZ2lzdGVyZWQhXCIsdHlwZS5GdWxsTmFtZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrTm90UmVnaXN0ZXJlZDxUVHlwZT4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tOb3RSZWdpc3RlcmVkKHR5cGVvZihUVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5Jb2Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEZ1bmNSZXNvbHZlcjxUPiA6IElSZXNvbHZlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBGdW5jPG9iamVjdD4gUmVzb2x2ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGdW5jUmVzb2x2ZXIoRnVuYzxUPiByZXNvbHZlRnVuYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVzb2x2ZSA9ICgpID0+IHJlc29sdmVGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5Jb2Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEluc3RhbmNlUmVzb2x2ZXIgOiBJUmVzb2x2ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRnVuYzxvYmplY3Q+IFJlc29sdmUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5zdGFuY2VSZXNvbHZlcihvYmplY3QgcmVzb2x2ZWRPYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZXNvbHZlID0gKCkgPT4gcmVzb2x2ZWRPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBJbnN0YW5jZVJlc29sdmVyPFQ+IDogSW5zdGFuY2VSZXNvbHZlclxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgSW5zdGFuY2VSZXNvbHZlcihUIHJlc29sdmVkT2JqKSA6IGJhc2UocmVzb2x2ZWRPYmopXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLklvY1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2luZ2xlSW5zdGFuY2VSZXNvbHZlciA6IElSZXNvbHZlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0IF9zaW5nbGVJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgcHVibGljIEZ1bmM8b2JqZWN0PiBSZXNvbHZlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFNpbmdsZUluc3RhbmNlUmVzb2x2ZXIoSUlvYyBpb2MsIFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlc29sdmUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaXJzdCByZXNvbHZlLiBVc2luZyB0cmFuc2llbnQgcmVzb2x2ZXJcclxuICAgICAgICAgICAgICAgIGlmIChfc2luZ2xlSW5zdGFuY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpZW50UmVzb2x2ZXIgPSBuZXcgVHJhbnNpZW50UmVzb2x2ZXIoaW9jLCB0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfc2luZ2xlSW5zdGFuY2UgPSB0cmFuc2llbnRSZXNvbHZlci5SZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zaW5nbGVJbnN0YW5jZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFNpbmdsZUluc3RhbmNlUmVzb2x2ZXI8VD4gOiBTaW5nbGVJbnN0YW5jZVJlc29sdmVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTaW5nbGVJbnN0YW5jZVJlc29sdmVyKElJb2MgaW9jKSA6IGJhc2UoaW9jLCB0eXBlb2YoVCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuSW9jXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUcmFuc2llbnRSZXNvbHZlciA6IElSZXNvbHZlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBGdW5jPG9iamVjdD4gUmVzb2x2ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUcmFuc2llbnRSZXNvbHZlcihJSW9jIGlvYywgVHlwZSB0b3Jlc29sdmVUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXNvbHZlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGN0b3JcclxuICAgICAgICAgICAgICAgIHZhciBjdG9yID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxTeXN0ZW0uUmVmbGVjdGlvbi5Db25zdHJ1Y3RvckluZm8+KHRvcmVzb2x2ZVR5cGUuR2V0Q29uc3RydWN0b3JzKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN0b3IgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJObyBjdG9yIGZvdW5kIGZvciB0eXBlIHswfSFcIix0b3Jlc29sdmVUeXBlLkZ1bGxOYW1lKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGN0b3IgcGFyYW1zXHJcbiAgICAgICAgICAgICAgICB2YXIgY3RvclBhcmFtcyA9IGN0b3IuR2V0UGFyYW1ldGVycygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxTeXN0ZW0uUmVmbGVjdGlvbi5QYXJhbWV0ZXJJbmZvPihjdG9yUGFyYW1zKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQWN0aXZhdG9yLkNyZWF0ZUluc3RhbmNlKHRvcmVzb2x2ZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZSByZXNvbHZlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBuZXcgTGlzdDxvYmplY3Q+KGN0b3JQYXJhbXMuTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBhcmFtZXRlckluZm8gaW4gY3RvclBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycy5BZGQoaW9jLlJlc29sdmUocGFyYW1ldGVySW5mby5QYXJhbWV0ZXJUeXBlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdG9yLkludm9rZShwYXJhbWV0ZXJzLlRvQXJyYXkoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUcmFuc2llbnRSZXNvbHZlcjxUPiA6IFRyYW5zaWVudFJlc29sdmVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUcmFuc2llbnRSZXNvbHZlcihJSW9jIGlvYykgOiBiYXNlKGlvYywgdHlwZW9mKFQpKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuTWVzc2VuZ2VyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNZXNzZW5nZXIgOiBJTWVzc2VuZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seVxyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5PFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4sIExpc3Q8VHVwbGU8b2JqZWN0LCBBY3Rpb248b2JqZWN0LCBvYmplY3Q+Pj4+IF9jYWxscyA9XHJcbiAgICAgICAgICAgICAgICBuZXcgRGljdGlvbmFyeTxUdXBsZTxzdHJpbmcsIFR5cGUsIFR5cGU+LCBMaXN0PFR1cGxlPG9iamVjdCwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+PigpO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNlbmQgTWVzc2FnZSB3aXRoIGFyZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU2VuZGVyXCI+VFNlbmRlcjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUQXJnc1wiPlRNZXNzYWdlQXJnczwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlbmRlclwiPlNlbmRlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFyZ3NcIj5BcmdzPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZW5kPFRTZW5kZXIsIFRBcmdzPihUU2VuZGVyIHNlbmRlciwgc3RyaW5nIG1lc3NhZ2UsIFRBcmdzIGFyZ3MpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHNlbmRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbmRlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5Jbm5lclNlbmQobWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCB0eXBlb2YoVEFyZ3MpLCBzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTZW5kIE1lc3NhZ2Ugd2l0aG91dCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZW5kZXJcIj5TZW5kZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZW5kPFRTZW5kZXI+KFRTZW5kZXIgc2VuZGVyLCBzdHJpbmcgbWVzc2FnZSkgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc2VuZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2VuZGVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLklubmVyU2VuZChtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIG51bGwsIHNlbmRlciwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN1YnNjcmliZSBNZXNzYWdlIHdpdGggYXJnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRBcmdzXCI+VEFyZ3M8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdWJzY3JpYmVyXCI+U3Vic2NyaWJlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCI+QWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzb3VyY2VcIj5zb3VyY2U8L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN1YnNjcmliZTxUU2VuZGVyLCBUQXJncz4ob2JqZWN0IHN1YnNjcmliZXIsIHN0cmluZyBtZXNzYWdlLCBBY3Rpb248VFNlbmRlciwgVEFyZ3M+IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICBUU2VuZGVyIHNvdXJjZSA9IG51bGwpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzdWJzY3JpYmVyXCIpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJjYWxsYmFja1wiKTtcclxuXHJcbiAgICAgICAgICAgIEFjdGlvbjxvYmplY3QsIG9iamVjdD4gd3JhcCA9IChzZW5kZXIsIGFyZ3MpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZW5kID0gKFRTZW5kZXIpc2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSA9PSBudWxsIHx8IHNlbmQgPT0gc291cmNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKChUU2VuZGVyKXNlbmRlciwgKFRBcmdzKWFyZ3MpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Jbm5lclN1YnNjcmliZShzdWJzY3JpYmVyLCBtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIHR5cGVvZihUQXJncyksIChBY3Rpb248b2JqZWN0LG9iamVjdD4pd3JhcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN1YnNjcmliZSBNZXNzYWdlIHdpdGhvdXQgYXJnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3Vic2NyaWJlclwiPlN1YnNjcmliZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiPkFjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic291cmNlXCI+c291cmNlPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdWJzY3JpYmU8VFNlbmRlcj4ob2JqZWN0IHN1YnNjcmliZXIsIHN0cmluZyBtZXNzYWdlLCBBY3Rpb248VFNlbmRlcj4gY2FsbGJhY2ssXHJcbiAgICAgICAgICAgIFRTZW5kZXIgc291cmNlID0gbnVsbCkgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInN1YnNjcmliZXJcIik7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImNhbGxiYWNrXCIpO1xyXG5cclxuICAgICAgICAgICAgQWN0aW9uPG9iamVjdCwgb2JqZWN0PiB3cmFwID0gKHNlbmRlciwgYXJncykgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbmQgPSAoVFNlbmRlcilzZW5kZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09IG51bGwgfHwgc2VuZCA9PSBzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKFRTZW5kZXIpc2VuZGVyKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuSW5uZXJTdWJzY3JpYmUoc3Vic2NyaWJlciwgbWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCBudWxsLCAoQWN0aW9uPG9iamVjdCxvYmplY3Q+KXdyYXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBVbnN1YnNjcmliZSBhY3Rpb24gd2l0aCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVEFyZ3NcIj5UQXJnczwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN1YnNjcmliZXJcIj5TdWJzY3JpYmVyPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgVW5zdWJzY3JpYmU8VFNlbmRlciwgVEFyZ3M+KG9iamVjdCBzdWJzY3JpYmVyLCBzdHJpbmcgbWVzc2FnZSkgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLklubmVyVW5zdWJzY3JpYmUobWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCB0eXBlb2YoVEFyZ3MpLCBzdWJzY3JpYmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVW5zdWJzY3JpYmUgYWN0aW9uIHdpdGhvdXQgYXJnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3Vic2NyaWJlclwiPlN1YnNjcmliZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVbnN1YnNjcmliZTxUU2VuZGVyPihvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Jbm5lclVuc3Vic2NyaWJlKG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgbnVsbCwgc3Vic2NyaWJlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbW92ZSBhbGwgY2FsbGJhY2tzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldE1lc3NlbmdlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxscy5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIElubmVyU2VuZChzdHJpbmcgbWVzc2FnZSwgVHlwZSBzZW5kZXJUeXBlLCBUeXBlIGFyZ1R5cGUsIG9iamVjdCBzZW5kZXIsIG9iamVjdCBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJtZXNzYWdlXCIpO1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gbmV3IFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4obWVzc2FnZSwgc2VuZGVyVHlwZSwgYXJnVHlwZSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbHMuQ29udGFpbnNLZXkoa2V5KSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLl9jYWxsc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9ucyA9PSBudWxsIHx8ICFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxUdXBsZTxvYmplY3QsQWN0aW9uPG9iamVjdCxvYmplY3Q+Pj4oYWN0aW9ucykpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uc0NvcHkgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxUdXBsZTxvYmplY3QsQWN0aW9uPG9iamVjdCxvYmplY3Q+Pj4oYWN0aW9ucyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhY3Rpb24gaW4gYWN0aW9uc0NvcHkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLkNvbnRhaW5zKGFjdGlvbikpXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLkl0ZW0yKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbm5lclN1YnNjcmliZShvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UsIFR5cGUgc2VuZGVyVHlwZSwgVHlwZSBhcmdUeXBlLFxyXG4gICAgICAgICAgICBBY3Rpb248b2JqZWN0LCBvYmplY3Q+IGNhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJtZXNzYWdlXCIpO1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gbmV3IFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4obWVzc2FnZSwgc2VuZGVyVHlwZSwgYXJnVHlwZSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG5ldyBUdXBsZTxvYmplY3QsIEFjdGlvbjxvYmplY3QsIG9iamVjdD4+KHN1YnNjcmliZXIsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxzLkNvbnRhaW5zS2V5KGtleSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxzW2tleV0uQWRkKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IExpc3Q8VHVwbGU8b2JqZWN0LCBBY3Rpb248b2JqZWN0LCBvYmplY3Q+Pj4oKSwoX28xKT0+e19vMS5BZGQodmFsdWUpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsc1trZXldID0gbGlzdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIElubmVyVW5zdWJzY3JpYmUoc3RyaW5nIG1lc3NhZ2UsIFR5cGUgc2VuZGVyVHlwZSwgVHlwZSBhcmdUeXBlLCBvYmplY3Qgc3Vic2NyaWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic3Vic2NyaWJlclwiKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJtZXNzYWdlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGtleSA9IG5ldyBUdXBsZTxzdHJpbmcsIFR5cGUsIFR5cGU+KG1lc3NhZ2UsIHNlbmRlclR5cGUsIGFyZ1R5cGUpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhbGxzLkNvbnRhaW5zS2V5KGtleSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9yZW1vdmUgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPFR1cGxlPG9iamVjdCxBY3Rpb248b2JqZWN0LG9iamVjdD4+Pih0aGlzLl9jYWxsc1trZXldLChGdW5jPFR1cGxlPG9iamVjdCxBY3Rpb248b2JqZWN0LG9iamVjdD4+LGJvb2w+KSh0dXBsZSA9PiB0dXBsZS5JdGVtMSA9PSBzdWJzY3JpYmVyKSkuVG9MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdHVwbGUgaW4gdG9yZW1vdmUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsc1trZXldLlJlbW92ZSh0dXBsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PFR1cGxlPG9iamVjdCxBY3Rpb248b2JqZWN0LG9iamVjdD4+Pih0aGlzLl9jYWxsc1trZXldKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxzLlJlbW92ZShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIElOYXZpZ2F0b3IgaW1wbGVtZW50YXRpb25cbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIHB1YmxpYyBjbGFzcyBCcmlkZ2VOYXZpZ2F0b3IgOiBJTmF2aWdhdG9yXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBJQW1Mb2FkYWJsZSBfYWN0dWFsQ29udHJvbGxlcjtcblxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBDb25maWd1cmF0aW9uO1xuICAgICAgICBwdWJsaWMgQnJpZGdlTmF2aWdhdG9yKElOYXZpZ2F0b3JDb25maWd1cmF0b3IgY29uZmlndXJhdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgQ29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBFbmFibGVTcGFmQW5jaG9ycygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhbGxBbmNob3JzID0galF1ZXJ5LlNlbGVjdChcImFcIik7XG4gICAgICAgICAgICBhbGxBbmNob3JzLk9mZihFdmVudFR5cGUuQ2xpY2suVG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBhbGxBbmNob3JzLkNsaWNrKChBY3Rpb248alF1ZXJ5TW91c2VFdmVudD4pKGV2ID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGNsaWNrZWRFbGVtZW50ID0gZXYuVGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRFbGVtZW50LkdldFR5cGUoKSAhPSB0eXBlb2YoSFRNTEFuY2hvckVsZW1lbnQpKVxuICAgICAgICAgICAgICAgICAgICBjbGlja2VkRWxlbWVudCA9IGpRdWVyeS5FbGVtZW50KGV2LlRhcmdldCkuUGFyZW50cyhcImFcIikuR2V0KDApO1xuXG4gICAgICAgICAgICAgICAgdmFyIGhyZWYgPSBjbGlja2VkRWxlbWVudC5HZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KGhyZWYpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNNeUhyZWYgPSBocmVmLlN0YXJ0c1dpdGgoXCJzcGFmOlwiKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGlzIG15IGhyZWZcbiAgICAgICAgICAgICAgICBpZiAoaXNNeUhyZWYpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBldi5QcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZUlkID0gaHJlZi5SZXBsYWNlKFwic3BhZjpcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGUocGFnZUlkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhbmNob3IgZGVmYXVsdCBiZWhhdmlvdXJcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGEgcGFnZSBJRC5cbiAgICAgICAgLy8vIFRoZSBJRCBtdXN0IGJlIHJlZ2lzdGVyZWQuXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2VJZFwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTmF2aWdhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLkNvbmZpZ3VyYXRpb24uR2V0UGFnZURlc2NyaXB0b3JCeUtleShwYWdlSWQpO1xuICAgICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiUGFnZSBub3QgZm91bmQgd2l0aCBJRCB7MH1cIixwYWdlSWQpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3QgcnVsZVxuICAgICAgICAgICAgdmFyIHJlZGlyZWN0S2V5ID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixwYWdlLlJlZGlyZWN0UnVsZXMpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxGdW5jPHN0cmluZz4+KFwia2V5MVwiKS5JbnZva2UoKTooc3RyaW5nKW51bGw7XG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHJlZGlyZWN0S2V5KSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlKHJlZGlyZWN0S2V5LHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGJvZHkgPSB0aGlzLkNvbmZpZ3VyYXRpb24uQm9keTtcbiAgICAgICAgICAgIGlmKGJvZHkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiQ2Fubm90IGZpbmQgbmF2aWdhdGlvbiBib2R5IGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBsZWF2ZSBhY3R1YWwgY29udHJvbGVsclxuICAgICAgICAgICAgaWYgKHRoaXMuTGFzdE5hdmlnYXRlQ29udHJvbGxlciAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHRoaXMuTGFzdE5hdmlnYXRlQ29udHJvbGxlci5PbkxlYXZlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuQ29uZmlndXJhdGlvbi5Cb2R5LkxvYWQocGFnZS5IdG1sTG9jYXRpb24uSW52b2tlKCksbnVsbCwgKEFjdGlvbjxzdHJpbmcsc3RyaW5nLGpxWEhSPikoYXN5bmMgKG8scyxhKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGxvYWQgZGVwZW5kZW5jaWVzXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UuRGVwZW5kZW5jaWVzU2NyaXB0cyAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmlwdHMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxzdHJpbmc+KChwYWdlLkRlcGVuZGVuY2llc1NjcmlwdHMuSW52b2tlKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYocGFnZS5TZXF1ZW50aWFsRGVwZW5kZW5jaWVzU2NyaXB0TG9hZClcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxpdHkuU2VxdWVudGlhbFNjcmlwdExvYWQoc2NyaXB0cyk7XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmFsbGVsIGxvYWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY3JpcHRzVGFzayA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PHN0cmluZyxUYXNrPG9iamVjdFtdPj4oc2NyaXB0cywoRnVuYzxzdHJpbmcsVGFzazxvYmplY3RbXT4+KSh1cmwgPT4gVGFzay5Gcm9tUHJvbWlzZShqUXVlcnkuR2V0U2NyaXB0KHVybCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGw8b2JqZWN0W10+KHNjcmlwdHNUYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gcHJlcGFyZSBwYWdlXG4gICAgICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIixwYWdlLlByZXBhcmVQYWdlKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEFjdGlvbj4oXCJrZXkyXCIpLkludm9rZSgpKTpudWxsO1xuXG4gICAgICAgICAgICAgICAgLy8gYXV0byBlbmFibGUgc3BhZiBhbmNob3JzXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLkNvbmZpZ3VyYXRpb24uRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5hYmxlQW5jaG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkzXCIscGFnZS5BdXRvRW5hYmxlU3BhZkFuY2hvcnMpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxGdW5jPGJvb2w+PihcImtleTNcIikuSW52b2tlKCk6KGJvb2w/KW51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVuYWJsZUFuY2hvcnMuSGFzVmFsdWUgJiYgZW5hYmxlQW5jaG9ycy5WYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5hYmxlU3BhZkFuY2hvcnMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGFnZS5QYWdlQ29udHJvbGxlciAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbG9hZCBuZXcgY29udHJvbGxlclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IHBhZ2UuUGFnZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5PbkxvYWQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgICAgICAgICAgX2FjdHVhbENvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Pbk5hdmlnYXRlZCE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+dGhpcy5Pbk5hdmlnYXRlZC5JbnZva2UodGhpcyxjb250cm9sbGVyKSk6bnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlcjxJQW1Mb2FkYWJsZT4gT25OYXZpZ2F0ZWQ7XG5wdWJsaWMgSUFtTG9hZGFibGUgTGFzdE5hdmlnYXRlQ29udHJvbGxlclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2FjdHVhbENvbnRyb2xsZXI7XHJcbiAgICB9XHJcbn1cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU3Vic2NyaWJlIHRvIGFuY2hvcnMgY2xpY2tcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBJbml0TmF2aWdhdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuRW5hYmxlU3BhZkFuY2hvcnMoKTtcblxuICAgICAgICAgICAgLy8gZ28gaG9tZVxuICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZSh0aGlzLkNvbmZpZ3VyYXRpb24uSG9tZUlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBJTmF2aWdhdG9yQ29uZmlndXJhdG9yIEltcGxlbWVudGF0aW9uLiBNdXN0IGJlIGV4dGVuZGVkLlxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UgOiBJTmF2aWdhdG9yQ29uZmlndXJhdG9yXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElMaXN0PElQYWdlRGVzY3JpcHRvcj4gX3JvdXRlcztcblxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgSUxpc3Q8SVBhZ2VEZXNjcmlwdG9yPiBDcmVhdGVSb3V0ZXMoKTtcbiAgICAgICAgcHVibGljIGFic3RyYWN0IGpRdWVyeSBCb2R5IHsgZ2V0OyB9XG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgSG9tZUlkIHsgZ2V0OyB9XG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBib29sIERpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlIHsgZ2V0OyB9XG5cblxuXG4gICAgICAgIHByb3RlY3RlZCBCcmlkZ2VOYXZpZ2F0b3JDb25maWdCYXNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzID0gdGhpcy5DcmVhdGVSb3V0ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBJUGFnZURlc2NyaXB0b3IgR2V0UGFnZURlc2NyaXB0b3JCeUtleShzdHJpbmcga2V5KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TaW5nbGVPckRlZmF1bHQ8SVBhZ2VEZXNjcmlwdG9yPih0aGlzLl9yb3V0ZXMsKEZ1bmM8SVBhZ2VEZXNjcmlwdG9yLGJvb2w+KShzPT4gc3RyaW5nLkVxdWFscyhzLktleSwga2V5LCBTdHJpbmdDb21wYXJpc29uLkN1cnJlbnRDdWx0dXJlSWdub3JlQ2FzZSkpKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb24uTW9kZWw7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBjbGFzcyBDb21wbGV4T2JqZWN0TmF2aWdhdGlvbkhpc3RvcnkgOiBJQnJvd3Nlckhpc3RvcnlNYW5hZ2VyXG4gICAge1xuICAgICAgICBwdWJsaWMgdm9pZCBQdXNoU3RhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBiYXNlVXJsID0gTmF2aWdhdGlvblV0aWxpdHkuQnVpbGRCYXNlVXJsKHBhZ2VJZCk7XG5cbiAgICAgICAgICAgIFdpbmRvdy5IaXN0b3J5LlB1c2hTdGF0ZShudWxsLCBzdHJpbmcuRW1wdHksXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8gc3RyaW5nLkZvcm1hdChcInswfT17MX1cIixiYXNlVXJsLEdsb2JhbC5CdG9hKEpTT04uU3RyaW5naWZ5KHBhcmFtZXRlcnMpKSk6IGJhc2VVcmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFVybERlc2NyaXB0b3IgUGFyc2VVcmwoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVzID0gbmV3IFVybERlc2NyaXB0b3IoKTtcblxuICAgICAgICAgICAgdmFyIGhhc2ggPSBXaW5kb3cuTG9jYXRpb24uSGFzaDtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLlJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoaGFzaCkpIHJldHVybiByZXM7XG5cbiAgICAgICAgICAgIHZhciBlcXVhbEluZGV4ID0gaGFzaC5JbmRleE9mKCc9Jyk7XG4gICAgICAgICAgICBpZiAoZXF1YWxJbmRleCA9PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXMuUGFnZUlkID0gaGFzaDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXMuUGFnZUlkID0gaGFzaC5TdWJzdHJpbmcoMCwgZXF1YWxJbmRleCk7ICBcblxuICAgICAgICAgICAgdmFyIGRvdWJsZVBvaW50c0luZHggPSBlcXVhbEluZGV4ICsgMTtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gaGFzaC5TdWJzdHJpbmcoZG91YmxlUG9pbnRzSW5keCwgaGFzaC5MZW5ndGggLSBkb3VibGVQb2ludHNJbmR4KTtcblxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KHBhcmFtZXRlcnMpKSByZXR1cm4gcmVzOyAvLyBubyBwYXJhbWV0ZXJzXG5cbiAgICAgICAgICAgIHZhciBkZWNvZGVkID0gR2xvYmFsLkF0b2IocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB2YXIgZGVzZXJpYWxpemVkID0gSlNPTi5QYXJzZTxEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0Pj4oZGVjb2RlZCk7XG5cbiAgICAgICAgICAgIHJlcy5QYXJhbWV0ZXJzID0gZGVzZXJpYWxpemVkO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBjbGFzcyBQYWdlRGVzY3JpcHRvciA6IElQYWdlRGVzY3JpcHRvclxuICAgIHtcbiAgICAgICAgcHVibGljIFBhZ2VEZXNjcmlwdG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BdXRvRW5hYmxlU3BhZkFuY2hvcnMgPSAoKSA9PiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBLZXkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgRnVuYzxzdHJpbmc+IEh0bWxMb2NhdGlvbiB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPElBbUxvYWRhYmxlPiBQYWdlQ29udHJvbGxlciB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPGJvb2w+IENhbkJlRGlyZWN0TG9hZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBBY3Rpb24gUHJlcGFyZVBhZ2UgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgYm9vbCBTZXF1ZW50aWFsRGVwZW5kZW5jaWVzU2NyaXB0TG9hZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPHN0cmluZz4gUmVkaXJlY3RSdWxlcyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPGJvb2w+IEF1dG9FbmFibGVTcGFmQW5jaG9ycyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPElFbnVtZXJhYmxlPHN0cmluZz4+IERlcGVuZGVuY2llc1NjcmlwdHMgeyBnZXQ7IHNldDsgfVxuICAgIH1cblxuICAgIFxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGV4dDtcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uLk1vZGVsO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICBwdWJsaWMgY2xhc3MgUXVlcnlQYXJhbWV0ZXJOYXZpZ2F0aW9uSGlzdG9yeSA6IElCcm93c2VySGlzdG9yeU1hbmFnZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyB2b2lkIFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSBOYXZpZ2F0aW9uVXRpbGl0eS5CdWlsZEJhc2VVcmwocGFnZUlkKTtcblxuICAgICAgICAgICAgV2luZG93Lkhpc3RvcnkuUHVzaFN0YXRlKG51bGwsIHN0cmluZy5FbXB0eSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9ezF9XCIsYmFzZVVybCxCdWlsZFF1ZXJ5UGFyYW1ldGVyKHBhcmFtZXRlcnMpKTogYmFzZVVybCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVXJsRGVzY3JpcHRvciBQYXJzZVVybCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBuZXcgVXJsRGVzY3JpcHRvcigpO1xuICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKTtcblxuICAgICAgICAgICAgdmFyIGhhc2ggPSBXaW5kb3cuTG9jYXRpb24uSGFzaDtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLlJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoaGFzaCkpIHJldHVybiByZXM7XG5cbiAgICAgICAgICAgIHZhciBlcXVhbEluZGV4ID0gaGFzaC5JbmRleE9mKCc/Jyk7XG4gICAgICAgICAgICBpZiAoZXF1YWxJbmRleCA9PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXMuUGFnZUlkID0gaGFzaDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXMuUGFnZUlkID0gaGFzaC5TdWJzdHJpbmcoMCwgZXF1YWxJbmRleCk7ICBcblxuICAgICAgICAgICAgdmFyIGRvdWJsZVBvaW50c0luZHggPSBlcXVhbEluZGV4ICsgMTtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gaGFzaC5TdWJzdHJpbmcoZG91YmxlUG9pbnRzSW5keCwgaGFzaC5MZW5ndGggLSBkb3VibGVQb2ludHNJbmR4KTtcblxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KHBhcmFtZXRlcnMpKSByZXR1cm4gcmVzOyAvLyBubyBwYXJhbWV0ZXJzXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNwbGl0dGVkQnlEb3VibGVBbmQgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxzdHJpbmc+KHBhcmFtZXRlcnMuU3BsaXQoXCImXCIpKTtcbiAgICAgICAgICAgIHNwbGl0dGVkQnlEb3VibGVBbmQuRm9yRWFjaCgoU3lzdGVtLkFjdGlvbjxzdHJpbmc+KShmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0dGVkID0gZi5TcGxpdChcIj1cIik7XG4gICAgICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMuQWRkKHNwbGl0dGVkWzBdLEdsb2JhbC5EZWNvZGVVUklDb21wb25lbnQoc3BsaXR0ZWRbMV0pKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEJ1aWxkUXVlcnlQYXJhbWV0ZXIoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMgPT0gbnVsbCB8fCAhU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8S2V5VmFsdWVQYWlyPHN0cmluZyxvYmplY3Q+PihwYXJhbWV0ZXJzKSkgcmV0dXJuIHN0cmluZy5FbXB0eTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHN0ckJ1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcihcIj9cIik7XG4gICAgICAgICAgICBmb3JlYWNoICh2YXIga2V5VmFsdWVQYWlyIGluIHBhcmFtZXRlcnMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RyQnVpbGRlci5BcHBlbmQoR2xvYmFsLkVuY29kZVVSSUNvbXBvbmVudChrZXlWYWx1ZVBhaXIuS2V5KSk7XG4gICAgICAgICAgICAgICAgc3RyQnVpbGRlci5BcHBlbmQoXCI9XCIpO1xuICAgICAgICAgICAgICAgIHN0ckJ1aWxkZXIuQXBwZW5kKEdsb2JhbC5FbmNvZGVVUklDb21wb25lbnQoa2V5VmFsdWVQYWlyLlZhbHVlLlRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICBzdHJCdWlsZGVyLkFwcGVuZChcIiZcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXMgPSBzdHJCdWlsZGVyLlRvU3RyaW5nKCkuVHJpbUVuZCgnJicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuXG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIExvYWRhYmxlVmlld01vZGVsIDogVmlld01vZGVsQmFzZSwgSUFtTG9hZGFibGVcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgTGlzdDxJVmlld01vZGVsTGlmZUN5Y2xlPiBQYXJ0aWFscyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFwcGx5QmluZGluZ3MoKTtcclxuICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIix0aGlzLlBhcnRpYWxzKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPExpc3Q8SVZpZXdNb2RlbExpZmVDeWNsZT4+KFwia2V5MVwiKS5Gb3JFYWNoKChTeXN0ZW0uQWN0aW9uPElWaWV3TW9kZWxMaWZlQ3ljbGU+KShmPT4gZi5Jbml0KHBhcmFtZXRlcnMpKSkpOm51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE9uTGVhdmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIix0aGlzLlBhcnRpYWxzKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPExpc3Q8SVZpZXdNb2RlbExpZmVDeWNsZT4+KFwia2V5MlwiKS5Gb3JFYWNoKChTeXN0ZW0uQWN0aW9uPElWaWV3TW9kZWxMaWZlQ3ljbGU+KShmPT5mLkRlSW5pdCgpKSkpOm51bGw7XHJcbiAgICAgICAgICAgIGJhc2UuUmVtb3ZlQmluZGluZ3MoKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBMaXN0PElWaWV3TW9kZWxMaWZlQ3ljbGU+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19QYXJ0aWFscz1uZXcgTGlzdDxJVmlld01vZGVsTGlmZUN5Y2xlPigpO31cclxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyBSZXR5cGVkO1xuXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcbntcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgUGFydGlhbE1vZGVsIDogIElWaWV3TW9kZWxMaWZlQ3ljbGVcbiAgICB7XG4gICAgICAgIHByaXZhdGUgZG9tLkhUTUxEaXZFbGVtZW50IF9wYXJ0aWFsRWxlbWVudDtcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBFbGVtZW50IGlkIG9mIHRoZSBwYWdlIFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc3RyaW5nIEVsZW1lbnRJZCgpO1xuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gSHRtbExvY2F0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBzdHJpbmcgSHRtbFVybCB7IGdldDsgfVxuXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gSW5pdCBwYXJ0aWFsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtZXRlcnNcIj5kYXRhIGZvciBpbml0IHRoZSBwYXJ0aWFsczwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgSW5pdChEaWN0aW9uYXJ5PHN0cmluZyxvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgalF1ZXJ5LkdldCh0aGlzLkh0bWxVcmwsIG51bGwsIChBY3Rpb248b2JqZWN0LHN0cmluZyxqcVhIUj4pKChvLCBzLCBhcmczKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpYWxFbGVtZW50ID0gbmV3IGRvbS5IVE1MRGl2RWxlbWVudFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MID0gby5Ub1N0cmluZygpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChFbGVtZW50SWQoKSk7XG4gICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZDxkb20uSFRNTERpdkVsZW1lbnQ+KHRoaXMuX3BhcnRpYWxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBrbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHRoaXMsIHRoaXMuX3BhcnRpYWxFbGVtZW50KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgRGVJbml0KClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYga28gY29udGFpbnMgdGhpcyBub2RlXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGlhbEVsZW1lbnQgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBrbm9ja291dC5rby5kYXRhRm9yKHRoaXMuX3BhcnRpYWxFbGVtZW50KTtcbiAgICAgICAgICAgIGlmIChkYXRhID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAga25vY2tvdXQua28ucmVtb3ZlTm9kZSh0aGlzLl9wYXJ0aWFsRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW50ZXJmYWNlIElWaWV3TW9kZWxMaWZlQ3ljbGVcbiAgICB7XG4gICAgICAgIHZvaWQgSW5pdChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKTtcbiAgICAgICAgdm9pZCBEZUluaXQoKTtcbiAgICB9XG59XG5cblxuXG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UgOiBSZXNvdXJjZUJhc2VcbiAgICB7XG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBJVXNlclNlcnZpY2UgVXNlclNlcnZpY2U7XG5cbiAgICAgICAgcHJvdGVjdGVkIEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBVc2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmljIEF3YWl0YWJsZSBhamF4IGNhbGxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByb3RlY3RlZCBUYXNrPFQ+IE1ha2VBdXRob3JpemVkQ2FsbDxUPihBamF4T3B0aW9ucyBvcHRpb25zKSBcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoIXRoaXMuVXNlclNlcnZpY2UuSXNMb2dnZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIllvdSBtdXN0IGJlIGxvZ2dlZCB0byB1c2UgdGhpcyByZXNvdXJjZVwiKTtcblxuICAgICAgICAgICAgb3B0aW9ucy5CZWZvcmVTZW5kID0gKHhociwgbykgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4aHIuU2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgc3RyaW5nLkZvcm1hdChcIlRva2VuIHswfVwiLHRoaXMuVXNlclNlcnZpY2UuTG9nZ2VkVXNlci5Ub2tlbikpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFQ+KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5IDogSVJlcG9zaXRvcnlcbiAgICB7XG4gICAgICAgIHByaXZhdGUgY29uc3Qgc3RyaW5nIFRva2VuS2V5ID0gXCJ0b2tlblwiO1xuICAgICAgICBwcml2YXRlIFN0b3JhZ2UgX3N0b3JhZ2U7XG5cbiAgICAgICAgcHVibGljIExvY2FsU3RvcmFnZVJlcG9zaXRvcnkoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlID0gV2luZG93LkxvY2FsU3RvcmFnZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHZvaWQgU2F2ZVRva2VuKHN0cmluZyB0b2tlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5TZXRJdGVtKFRva2VuS2V5LHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0VG9rZW5JZkV4aXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5fc3RvcmFnZS5HZXRJdGVtKFRva2VuS2V5KTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbiE9bnVsbD90b2tlbi5Ub1N0cmluZygpOihzdHJpbmcpbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZVRva2VuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5SZW1vdmVJdGVtKFRva2VuS2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBVc2VyUmVzb3VyY2VzIDogUmVzb3VyY2VCYXNlLCBJVXNlclJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBVc2VyUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IExvZ2luKFNpZ25SZXF1ZXN0IGxvZ2luUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJzL2xvZ2luXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobG9naW5SZXF1ZXN0KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2lnblJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gUmVnaXN0ZXIoU2lnblJlcXVlc3QgbG9naW5SZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlcnNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChsb2dpblJlcXVlc3QpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBHZXRDdXJyZW50VXNlcihzdHJpbmcgdG9rZW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2VyXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIEJlZm9yZVNlbmQgPSAoeGhyLCBvKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLlNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIHN0cmluZy5Gb3JtYXQoXCJUb2tlbiB7MH1cIix0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBwdWJsaWMgY2xhc3MgVXNlclNlcnZpY2UgOiBJVXNlclNlcnZpY2VcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJSZXNvdXJjZXMgX3VzZXJSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElSZXBvc2l0b3J5IF9yZXBvc2l0b3J5O1xuXG4gICAgICAgIHB1YmxpYyBVc2VyU2VydmljZShJVXNlclJlc291cmNlcyB1c2VyUmVzb3VyY2VzLCBJTWVzc2VuZ2VyIG1lc3NlbmdlciwgSVJlcG9zaXRvcnkgcmVwb3NpdG9yeSlcbiAgICAgICAge1xuICAgICAgICAgICAgX3VzZXJSZXNvdXJjZXMgPSB1c2VyUmVzb3VyY2VzO1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5ID0gcmVwb3NpdG9yeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBVc2VyIExvZ2dlZFVzZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5wdWJsaWMgYm9vbCBJc0xvZ2dlZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Mb2dnZWRVc2VyICE9IG51bGw7XHJcbiAgICB9XHJcbn1cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgTG9naW4oc3RyaW5nIG1haWwsIHN0cmluZyBwYXNzd29yZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl91c2VyUmVzb3VyY2VzLkxvZ2luKG5ldyBTaWduUmVxdWVzdFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVzZXIgPSBuZXcgVXNlclJlcXVlc3RcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEVtYWlsID0gbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgUGFzc3dvcmQgPSBwYXNzd29yZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLkxvZ2dlZFVzZXIgPSBsb2dpblJlc3BvbnNlLlVzZXI7XG4gICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LlNhdmVUb2tlbihsb2dpblJlc3BvbnNlLlVzZXIuVG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlNlbmQ8VXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVnaXN0ZXIoc3RyaW5nIHVzZXJuYW1lLCBzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuUmVnaXN0ZXIobmV3IFNpZ25SZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXNlciA9IG5ldyBVc2VyUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSBtYWlsLFxuICAgICAgICAgICAgICAgICAgICBQYXNzd29yZCA9IHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICBVc2VybmFtZSA9IHVzZXJuYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxVc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBUcnlBdXRvTG9naW5XaXRoU3RvcmVkVG9rZW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RvcmVkVG9rZW4gPSB0aGlzLl9yZXBvc2l0b3J5LkdldFRva2VuSWZFeGlzdCgpO1xuICAgICAgICAgICAgaWYgKHN0b3JlZFRva2VuID09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl91c2VyUmVzb3VyY2VzLkdldEN1cnJlbnRVc2VyKHN0b3JlZFRva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLkxvZ2dlZFVzZXIgPSBsb2dpblJlc3BvbnNlLlVzZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5TYXZlVG9rZW4obG9naW5SZXNwb25zZS5Vc2VyLlRva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxVc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5EZWxldGVUb2tlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uLk1vZGVsO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICBwdWJsaWMgY2xhc3MgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmcgOiBCcmlkZ2VOYXZpZ2F0b3JcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUJyb3dzZXJIaXN0b3J5TWFuYWdlciBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyO1xuXG4gICAgICAgIHB1YmxpYyBCcmlkZ2VOYXZpZ2F0b3JXaXRoUm91dGluZyhJTmF2aWdhdG9yQ29uZmlndXJhdG9yIGNvbmZpZ3VyYXRpb24sIElCcm93c2VySGlzdG9yeU1hbmFnZXIgYnJvd3Nlckhpc3RvcnlNYW5hZ2VyKSA6IGJhc2UoY29uZmlndXJhdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgX2Jyb3dzZXJIaXN0b3J5TWFuYWdlciA9IGJyb3dzZXJIaXN0b3J5TWFuYWdlcjtcbiAgICAgICAgICAgIFdpbmRvdy5PblBvcFN0YXRlICs9IGUgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdXJsSW5mbyA9IF9icm93c2VySGlzdG9yeU1hbmFnZXIuUGFyc2VVcmwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZShzdHJpbmcuSXNOdWxsT3JFbXB0eSh1cmxJbmZvLlBhZ2VJZCkgPyBjb25maWd1cmF0aW9uLkhvbWVJZCA6IHVybEluZm8uUGFnZUlkLCB1cmxJbmZvLlBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBOYXZpZ2F0ZVdpdGhvdXRQdXNoU3RhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuTmF2aWdhdGUocGFnZUlkLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBOYXZpZ2F0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgX2Jyb3dzZXJIaXN0b3J5TWFuYWdlci5QdXNoU3RhdGUocGFnZUlkLHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgYmFzZS5OYXZpZ2F0ZShwYWdlSWQsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgSW5pdE5hdmlnYXRpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcGFyc2VkID0gX2Jyb3dzZXJIaXN0b3J5TWFuYWdlci5QYXJzZVVybCgpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyc2VkLlBhZ2VJZCkpXG4gICAgICAgICAgICAgICAgYmFzZS5Jbml0TmF2aWdhdGlvbigpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJhc2UuRW5hYmxlU3BhZkFuY2hvcnMoKTtcblxuICAgICAgICAgICAgICAgIHZhciBwYWdlID0gdGhpcy5Db25maWd1cmF0aW9uLkdldFBhZ2VEZXNjcmlwdG9yQnlLZXkocGFyc2VkLlBhZ2VJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiUGFnZSBub3QgZm91bmQgd2l0aCBJRCB7MH1cIixwYXJzZWQuUGFnZUlkKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBub3QgbnVsbCBhbmQgZXZhbHVhdGlvbiBpcyBmYWxzZSBmYWxsYmFjayB0byBob21lXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UuQ2FuQmVEaXJlY3RMb2FkICE9IG51bGwgJiYgIXBhZ2UuQ2FuQmVEaXJlY3RMb2FkLkludm9rZSgpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgX2Jyb3dzZXJIaXN0b3J5TWFuYWdlci5QdXNoU3RhdGUodGhpcy5Db25maWd1cmF0aW9uLkhvbWVJZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGVXaXRob3V0UHVzaFN0YXRlKHRoaXMuQ29uZmlndXJhdGlvbi5Ib21lSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGUocGFyc2VkLlBhZ2VJZCxwYXJzZWQuUGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgXG4gICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVscztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBjbGFzcyBDdXN0b21Sb3V0ZXNDb25maWcgOiBCcmlkZ2VOYXZpZ2F0b3JDb25maWdCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xyXG4gICAgICAgIHB1YmxpYyBDdXN0b21Sb3V0ZXNDb25maWcoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIERpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIElMaXN0PElQYWdlRGVzY3JpcHRvcj4gQ3JlYXRlUm91dGVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgTGlzdDxJUGFnZURlc2NyaXB0b3I+KCksKF9vMSk9PntfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvaG9tZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Ib21lSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEhvbWVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9sb2dpbi5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Mb2dpbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxMb2dpblZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL3JlZ2lzdGVyLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlJlZ2lzdGVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPFJlZ2lzdGVyVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvcHJvZmlsZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Qcm9maWxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPFByb2ZpbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvc2V0dGluZ3MuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuU2V0dGluZ3NJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8U2V0dGluZ3NWaWV3TW9kZWw+KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT5mYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL2VkaXRBcnRpY2xlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkVkaXRBcnRpY2xlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEVkaXRBcnRpY2xlVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvYXJ0aWNsZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5BcnRpY2xlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEFydGljbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgalF1ZXJ5IEJvZHkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgSG9tZUlkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxucHJpdmF0ZSBzdHJpbmcgVmlydHVhbERpcmVjdG9yeVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nLklzTnVsbE9yRW1wdHkoTmF2aWdhdGlvblV0aWxpdHkuVmlydHVhbERpcmVjdG9yeSkgPyBzdHJpbmcuRW1wdHkgOiBzdHJpbmcuRm9ybWF0KFwiezB9L1wiLE5hdmlnYXRpb25VdGlsaXR5LlZpcnR1YWxEaXJlY3RvcnkpO1xyXG4gICAgfVxyXG59XG5cclxuICAgIFxucHJpdmF0ZSBib29sIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19EaXNhYmxlQXV0b1NwYWZBbmNob3JzT25OYXZpZ2F0ZT1mYWxzZTtwcml2YXRlIGpRdWVyeSBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQm9keT1qUXVlcnkuU2VsZWN0KFwiI3BhZ2VCb2R5XCIpO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Ib21lSWQ9U3BhZkFwcC5Ib21lSWQ7fVxyXG5cclxuICAgXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xyXG5cclxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFydGljbGVSZXNvdXJjZXMgOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJQXJ0aWNsZVJlc291cmNlc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcclxuXHJcbiAgICAgICAgcHVibGljIEFydGljbGVSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpIDogYmFzZSh1c2VyU2VydmljZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBHZXRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgYnVpbGRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLGJ1aWxkZXIuQnVpbGQoKSksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Vc2VyU2VydmljZS5Jc0xvZ2dlZFxyXG4gICAgICAgICAgICAgICAgPyBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuTWFrZUNhbGw8QXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFRhZ3NSZXNwb25zZT4gR2V0VGFncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3RhZ3NcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxUYWdzUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBHZXRBcnRpY2xlKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IEZhdm9yaXRlKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vZmF2b3JpdGVcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IFVuRmF2b3JpdGUoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9mYXZvcml0ZVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBDcmVhdGUoTmV3QXJ0aWNsZVJlcXVlc3QgbmV3QXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KG5ld0FydGljbGUpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPENvbW1lbnRzUmVzcG9uc2U+IEdldEFydGljbGVDb21tZW50cyhzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2NvbW1lbnRzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxDb21tZW50c1Jlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUNvbW1lbnRSZXNwb25zZT4gQWRkQ29tbWVudChzdHJpbmcgc2x1Zywgc3RyaW5nIGNvbW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9jb21tZW50c1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChuZXcgQ29tbWVudFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEJvZHkgPSBjb21tZW50XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUNvbW1lbnRSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIEZlZWRSZXNvdXJjZXMgOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJRmVlZFJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IEdldEZlZWQoRmVlZFJlcXVlc3RCdWlsZGVyIGJ1aWxkZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksYnVpbGRlci5CdWlsZCgpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgUHJvZmlsZVJlc291cmNlcyA6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElQcm9maWxlUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIFByb2ZpbGVSZXNvdXJjZXMoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBJU2V0dGluZ3Mgc2V0dGluZ3MpIDogYmFzZSh1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxGb2xsb3dSZXNwb25zZT4gRm9sbG93KHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3Byb2ZpbGVzL3sxfS9mb2xsb3dcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksdXNlcm5hbWUpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxGb2xsb3dSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxGb2xsb3dSZXNwb25zZT4gVW5Gb2xsb3coc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vcHJvZmlsZXMvezF9L2ZvbGxvd1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSx1c2VybmFtZSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiREVMRVRFXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8Rm9sbG93UmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8UHJvZmlsZVJlc3BvbnNlPiBHZXQoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vcHJvZmlsZXMvezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHVzZXJuYW1lKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5Vc2VyU2VydmljZS5Jc0xvZ2dlZCA/IGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFByb2ZpbGVSZXNwb25zZT4ob3B0aW9ucykgOiBiYXNlLk1ha2VDYWxsPFByb2ZpbGVSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4gIiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgU2V0dGluZ3NSZXNvdXJjZXM6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElTZXR0aW5nc1Jlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBTZXR0aW5nc1Jlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2V0dGluZ3NSZXNwb25zZT4gVXBkYXRlU2V0dGluZ3MoU2V0dGluZ3NSZXF1ZXN0IHNldHRpbmdzUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBVVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KHNldHRpbmdzUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTZXR0aW5nc1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG51c2luZyBDb21tZW50ID0gcmVhbHdvcmxkLnNwYWYuTW9kZWxzLkNvbW1lbnQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgQXJ0aWNsZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5BcnRpY2xlSWQ7XHJcbn1cbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUHJvZmlsZVJlc291cmNlcyBfcHJvZmlsZVJlc291cmNlcztcblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZSBBcnRpY2xlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPENvbW1lbnQ+Q29tbWVudHMgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Db21tZW50IHsgZ2V0OyBzZXQ7IH1cbnB1YmxpYyBib29sIElzTG9nZ2VkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZDtcclxuICAgIH1cclxufXB1YmxpYyBVc2VyIExvZ2dlZFVzZXJcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2dlZFVzZXI7XHJcbiAgICB9XHJcbn1cbiAgICAgICAgcHVibGljIEFydGljbGVWaWV3TW9kZWwoSUFydGljbGVSZXNvdXJjZXMgYXJ0aWNsZVJlc291cmNlcywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBcbiAgICAgICAgICAgIElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJUHJvZmlsZVJlc291cmNlcyBwcm9maWxlUmVzb3VyY2VzKVxuICAgICAgICB7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfcHJvZmlsZVJlc291cmNlcyA9IHByb2ZpbGVSZXNvdXJjZXM7XG5cbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZSA9IG5ldyBBcnRpY2xlKCk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnRzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxDb21tZW50PigpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB2YXIgc2x1ZyA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJzbHVnXCIpO1xuICAgICAgICAgICAgaWYoc3RyaW5nLklzTnVsbE9yRW1wdHkoc2x1ZykpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIkFydGljbGUgcGFnZSBuZWVkIHNsdWcgcGFyYW1ldGVyXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVRhc2sgPSB0aGlzLkxvYWRBcnRpY2xlKHNsdWcpO1xuICAgICAgICAgICAgdmFyIGNvbW1lbnRzVGFzayA9IHRoaXMuTG9hZENvbW1lbnRzKHNsdWcpO1xuICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsKGFydGljbGVUYXNrLGNvbW1lbnRzVGFzayk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaEJpbmRpbmcoKTsgLy8gbWFudWFsIHJlZnJlc2ggZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuRW5hYmxlU3BhZkFuY2hvcnMoKTsgLy8gdG9kbyBjaGVjayB3aHkgbm90IGF1dG8gZW5hYmxlZFxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQWRkIGNvbW1lbnQgdG8gYXJ0aWNsZVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRDb21tZW50KClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLklzTG9nZ2VkKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBjb21tZW50UmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkFkZENvbW1lbnQodGhpcy5BcnRpY2xlLlNsdWcsIHRoaXMuQ29tbWVudC5TZWxmKCkpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50LlNlbGYoc3RyaW5nLkVtcHR5KTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMucHVzaChjb21tZW50UmVzcG9uc2UuQ29tbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBGb2xsb3cgQXJ0aWNsZSBBdXRob3JcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRm9sbG93QXV0aG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlcy5Gb2xsb3codGhpcy5BcnRpY2xlLkF1dGhvci5Vc2VybmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE1hbnVhbCByZXZhbHVhdGUgYmluZGluZ1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwcml2YXRlIHZvaWQgUmVmcmVzaEJpbmRpbmcoKVxuICAgICAgICB7XG4gICAgICAgICAgICBSZXR5cGVkLmtub2Nrb3V0LmtvLmNsZWFuTm9kZSh0aGlzLlBhZ2VOb2RlKTtcbiAgICAgICAgICAgIGJhc2UuQXBwbHlCaW5kaW5ncygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBjb21tZW50c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzbHVnXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRDb21tZW50cyhzdHJpbmcgc2x1ZylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGVDb21tZW50cyhzbHVnKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMucHVzaChjb21tZW50LkNvbW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgQXJ0aWNsZSBpbmZvXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNsdWdcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZEFydGljbGUoc3RyaW5nIHNsdWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlKHNsdWcpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlID0gYXJ0aWNsZS5BcnRpY2xlO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBSZXR5cGVkO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIEVkaXRBcnRpY2xlVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5FZGl0QXJ0aWNsZUlkO1xyXG59XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlRpdGxlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+Qm9keSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkRlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VGFncyB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgRWRpdEFydGljbGVWaWV3TW9kZWwoSUFydGljbGVSZXNvdXJjZXMgYXJ0aWNsZVJlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9hcnRpY2xlUmVzb3VyY2VzID0gYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICB0aGlzLlRpdGxlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Cb2R5ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5EZXNjcmlwdGlvbiA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuVGFncyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuXG4vLyAgICAgICAgICAgIHZhciBhcnRpY2xlU2x1ZyA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJzbHVnXCIpO1xuLy8gICAgICAgICAgICBpZihzdHJpbmcuSXNOdWxsT3JFbXB0eShhcnRpY2xlU2x1ZykpXG4vLyAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiU2x1ZyBtaXNzaW5nIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBDcmVhdGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB0b2RvIHZhbGlkYXRpb25zXG4gICAgICAgICAgICB2YXIgbmV3QXJ0aWNlbCA9IG5ldyBOZXdBcnRpY2xlUmVxdWVzdFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEFydGljbGUgPSBuZXcgTmV3QXJ0aWNsZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSB0aGlzLlRpdGxlLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgQm9keSA9IHRoaXMuQm9keS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uID0gdGhpcy5EZXNjcmlwdGlvbi5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIFRhZ0xpc3QgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPih0aGlzLlRhZ3MuU2VsZigpLlNwbGl0KCcsJykpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGFydGljbGUgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkNyZWF0ZShuZXdBcnRpY2VsKTtcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkFydGljbGVJZCxnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJzbHVnXCIsYXJ0aWNsZS5BcnRpY2xlLlNsdWcpO3JldHVybiBfbzE7fSkpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWY7XHJcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXHJcbntcclxuICAgIGNsYXNzIEhvbWVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxyXG4gICAge1xyXG5wdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpXHJcbntcclxuICAgIHJldHVybiBTcGFmQXBwLkhvbWVJZDtcclxufVxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90YWdGaWx0ZXIgPSBudWxsOyAvLyB0YWcgZmlsdGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfcmVzb3VyY2VzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJRmVlZFJlc291cmNlcyBfZmVlZFJlc291cmNlcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBLTk9DS09VVEpTXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPEFydGljbGU+QXJ0aWNsZXM7IC8vIGFydGljbGVzXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPFBhZ2luYXRvcj5QYWdlczsgLy8gcGFnaW5hdG9yIGhlbHBlclxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+VGFnczsgLy8gdGFnc1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkFjdGl2ZVRhYkluZGV4OyAvLyB0YWIgYWN0aXZlIGluZGV4XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5UYWJzO1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZDtcclxuICAgICAgICBcclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgSG9tZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyByZXNvdXJjZXMsIElTZXR0aW5ncyBzZXR0aW5ncywgSU1lc3NlbmdlciBtZXNzZW5nZXIsXHJcbiAgICAgICAgICAgIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSUZlZWRSZXNvdXJjZXMgZmVlZFJlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVzb3VyY2VzID0gcmVzb3VyY2VzO1xyXG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcclxuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XHJcbiAgICAgICAgICAgIF9mZWVkUmVzb3VyY2VzID0gZmVlZFJlc291cmNlcztcclxuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8QXJ0aWNsZT4oKTtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8UGFnaW5hdG9yPigpO1xyXG4gICAgICAgICAgICB0aGlzLlRhZ3MgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcclxuICAgICAgICAgICAgdGhpcy5UYWJzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPih0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXggPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KC0xKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpOyAvLyBhbHdheXMgY2FsbCBiYXNlICh3aGVyZSBhcHBseWJpbmRpbmcpXHJcblxyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXNUYXNrID0gdGhpcy5Mb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSkpOyAvLyBsb2FkIGFydGljbGUgdGFza1xyXG4gICAgICAgICAgICB2YXIgbG9hZFRhZ3NUYXNrID0gdGhpcy5Mb2FkVGFncygpO1xyXG4gICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGwoYXJ0aWNsZXNUYXNrLGxvYWRUYWdzVGFzayk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlc1Rhc2suUmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE9uTGVhdmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5PbkxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5VbnN1YnNjcmliZTxVc2VyU2VydmljZT4odGhpcywgU3BhZkFwcC5Mb2dpbklkKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIEtOT0NLT1VUIE1FVEhPRFNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byB1c2VyIGRldGFpbFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgR29Ub1VzZXIoQXJ0aWNsZSBhcnRpY2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuUHJvZmlsZUlkLCBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJ1c2VybmFtZVwiLGFydGljbGUuQXV0aG9yLlVzZXJuYW1lKTtyZXR1cm4gX28xO30pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byBhcnRpY2xlIGRldGFpbFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgR29Ub0FydGljbGUoQXJ0aWNsZSBhcnRpY2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuQXJ0aWNsZUlkLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInNsdWdcIixhcnRpY2xlLlNsdWcpO3JldHVybiBfbzE7fSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBZGQgcGFzc2VkIGFydGljbGUgdG8gZmF2XHJcbiAgICAgICAgLy8vIE9ubHkgZm9yIGF1dGggdXNlcnNcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQWRkVG9GYXZvdXJpdGUoQXJ0aWNsZSBhcnRpY2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzTG9nZ2VkLlNlbGYoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNpbmdsZUFydGljbGUgPSBhcnRpY2xlLkZhdm9yaXRlZCA/IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5VbkZhdm9yaXRlKGFydGljbGUuU2x1ZykgOiBcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Jlc291cmNlcy5GYXZvcml0ZShhcnRpY2xlLlNsdWcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZXBsYWNlKGFydGljbGUsc2luZ2xlQXJ0aWNsZS5BcnRpY2xlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR28gdG8gdXNlciBmZWVkXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlc2V0VGFic0ZvckZlZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKC0yKTtcclxuICAgICAgICAgICAgdGhpcy5UYWJzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl90YWdGaWx0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5Mb2FkRmVlZChGZWVkUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlUmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlc2V0IFRhYlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSZXNldFRhYnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKC0xKTtcclxuICAgICAgICAgICAgdGhpcy5UYWJzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl90YWdGaWx0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5Mb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSkpO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZVJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR28gdG8gcGFnZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFnaW5hdG9yXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEdvVG9QYWdlKFBhZ2luYXRvciBwYWdpbmF0b3IpXHJcbiAgICAgICAge1xyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNpbmdsZTxQYWdpbmF0b3I+KCAgICAgICAgICAgIHRoaXMuUGFnZXMuU2VsZigpLChGdW5jPFBhZ2luYXRvcixib29sPikocyA9PiBzLkFjdGl2ZS5TZWxmKCkpKS5BY3RpdmUuU2VsZihmYWxzZSk7XHJcbiAgICAgICAgICAgIHBhZ2luYXRvci5BY3RpdmUuU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgLldpdGhPZmZTZXQoKHBhZ2luYXRvci5QYWdlLTEpKnRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpXHJcbiAgICAgICAgICAgICAgICAuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl90YWdGaWx0ZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuV2l0aFRhZyh0aGlzLl90YWdGaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5Mb2FkQXJ0aWNsZXMocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEZpbHRlciBhcnRpY2xlcyBieSB0YWdcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhZ1wiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGaWx0ZXJCeVRhZyhzdHJpbmcgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhYk5hbWUgPSBzdHJpbmcuRm9ybWF0KFwiI3swfVwiLHRhZyk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuQXJ0aWNsZXNGb3JUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgYXJ0aWNsZXMgZm9yIHBhc3NlZCB0YWJcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhYlwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBcnRpY2xlc0ZvclRhYihzdHJpbmcgdGFiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSB0YWIuVHJpbVN0YXJ0KCcjJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IHRhZ05hbWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0dWFsSW5kZXggPSB0aGlzLlRhYnMuU2VsZigpLkluZGV4T2YodGFiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGFjdHVhbEluZGV4ID09IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UYWJzLnB1c2godGFiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZih0aGlzLlRhYnMuU2VsZigpLkluZGV4T2YodGFiKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAuV2l0aFRhZyh0YWdOYW1lKVxyXG4gICAgICAgICAgICAgICAgLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQUklWQVRFIE1FVEhPRFNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGFydGljbGVzXHJcbiAgICAgICAgLy8vIENsZWFyIGxpc3QgYW5kIHJlbG9hZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBMb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIHJlcXVlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVJlc29SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5HZXRBcnRpY2xlcyhyZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZVJlc29SZXNwb25zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGZlZWRcclxuICAgICAgICAvLy8gQ2xlYXIgbGlzdCBhbmQgcmVsb2FkXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IExvYWRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlciByZXF1ZXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZlZWRSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2ZlZWRSZXNvdXJjZXMuR2V0RmVlZChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKGZlZWRSZXNwb25zZS5BcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZWVkUmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbG9hZCB0YWdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkVGFncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFncyA9IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5HZXRUYWdzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFncy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5UYWdzLnB1c2godGFncy5UYWdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBXaGVuIHVwZGF0ZSBhcnRpY2xlcyByZWJ1aWxkIHBhZ2luYXRvclxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVJlc29SZXNwb25zZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlZnJlc2hQYWdpbmF0b3IoQXJ0aWNsZVJlc3BvbnNlIGFydGljbGVSZXNvUmVzcG9uc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBhZ2VzLnJlbW92ZUFsbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxBcnRpY2xlPihhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzKSkgcmV0dXJuOyAvLyBubyBhcnRpY2xlc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHBhZ2VzQ291bnQgPSAoaW50KSAoYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlc0NvdW50IC8gYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlcy5MZW5ndGgpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBFbnVtZXJhYmxlLlJhbmdlKDEsIHBhZ2VzQ291bnQpO1xyXG4gICAgICAgICAgICB2YXIgcGFnZXMgPSByYW5nZS5TZWxlY3Q8UGFnaW5hdG9yPigoRnVuYzxpbnQsUGFnaW5hdG9yPikocyA9PiBuZXcgUGFnaW5hdG9yXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFBhZ2UgPSBzXHJcbiAgICAgICAgICAgIH0pKS5Ub0FycmF5KCk7XHJcbiAgICAgICAgICAgIHBhZ2VzWzBdLkFjdGl2ZS5TZWxmKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLlBhZ2VzLnB1c2gocGFnZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgICAgXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBwdWJsaWMgY2xhc3MgTG9naW5WaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbnB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKClcclxue1xyXG4gICAgcmV0dXJuIFNwYWZBcHAuTG9naW5JZDtcclxufVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5FbWFpbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlBhc3N3b3JkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzQnVzeSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+RXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgTG9naW5WaWV3TW9kZWwoSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLkVtYWlsID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5QYXNzd29yZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuSXNCdXN5ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBUYXNrIExvZ2luKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5Jc0J1c3kuU2VsZih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2luKHRoaXMuRW1haWwuU2VsZigpLCB0aGlzLlBhc3N3b3JkLlNlbGYoKSkuQ29udGludWVXaXRoKChBY3Rpb248VGFzaz4pKGMgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLklzQnVzeS5TZWxmKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChjLklzRmF1bHRlZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdEV4Y2VwdGlvbiA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8RXhjZXB0aW9uPihjLkV4Y2VwdGlvbi5Jbm5lckV4Y2VwdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdEV4Y2VwdGlvbiBpcyBQcm9taXNlRXhjZXB0aW9uKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IChQcm9taXNlRXhjZXB0aW9uKVN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8RXhjZXB0aW9uPihjLkV4Y2VwdGlvbi5Jbm5lckV4Y2VwdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IGUuR2V0VmFsaWRhdGlvbkVycm9ycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zaWVudCBcIm5vdCBjb21wbGV0ZWQgdGFza1wiIGNhdXNlZCBieSBicmlkZ2UgdmVyc2lvbiAoaW4gZml4KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgUmVnaXN0ZXJWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbnB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKClcclxue1xyXG4gICAgcmV0dXJuIFNwYWZBcHAuUmVnaXN0ZXJJZDtcclxufVxuICAgICAgICBwdWJsaWMga25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlPHN0cmluZz4gVXNlcm5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMga25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlPHN0cmluZz4gRW1haWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMga25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlPHN0cmluZz4gUGFzc3dvcmQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMga25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXk8c3RyaW5nPiBFcnJvcnMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBSZWdpc3RlclZpZXdNb2RlbChJTmF2aWdhdG9yIG5hdmlnYXRvciwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FbWFpbCA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlBhc3N3b3JkID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSZWdpc3RlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLlJlZ2lzdGVyKHRoaXMuVXNlcm5hbWUuU2VsZigpLCB0aGlzLkVtYWlsLlNlbGYoKSwgdGhpcy5QYXNzd29yZC5TZWxmKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkhvbWVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhdGNoIChQcm9taXNlRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IGUuR2V0VmFsaWRhdGlvbkVycm9ycygpO1xuICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oZXJyb3JzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIFNldHRpbmdzVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3NSZXNvdXJjZXMgX3NldHRpbmdzUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbnB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKClcclxue1xyXG4gICAgcmV0dXJuIFNwYWZBcHAuU2V0dGluZ3NJZDtcclxufVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5JbWFnZVVyaSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlVzZXJuYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+QmlvZ3JhcGh5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+RW1haWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5OZXdQYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+RXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIHB1YmxpYyBTZXR0aW5nc1ZpZXdNb2RlbChJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIElTZXR0aW5nc1Jlc291cmNlcyBzZXR0aW5nc1Jlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1Jlc291cmNlcyA9IHNldHRpbmdzUmVzb3VyY2VzO1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuXG4gICAgICAgICAgICB0aGlzLkltYWdlVXJpID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuQmlvZ3JhcGh5ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FbWFpbCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuTmV3UGFzc3dvcmQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xuXG4gICAgICAgICAgICB0aGlzLlBvcHVsYXRlRW50cmllcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFBvcHVsYXRlRW50cmllcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gdGhpcy5fdXNlclNlcnZpY2UuTG9nZ2VkVXNlcjtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUuU2VsZih1c2VyLlVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuRW1haWwuU2VsZih1c2VyLkVtYWlsKTtcbiAgICAgICAgICAgIHRoaXMuSW1hZ2VVcmkuU2VsZih1c2VyLkltYWdlKTtcbiAgICAgICAgICAgIHRoaXMuQmlvZ3JhcGh5LlNlbGYodXNlci5CaW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIFVwZGF0ZVNldHRpbmdzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzUmVxdWVzdCA9IG5ldyBTZXR0aW5nc1JlcXVlc3RcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFVzZXJuYW1lID0gdGhpcy5Vc2VybmFtZS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIE5ld1Bhc3N3b3JkID0gdGhpcy5OZXdQYXNzd29yZC5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEJpb2dyYXBoeSA9IHRoaXMuQmlvZ3JhcGh5LlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSB0aGlzLkVtYWlsLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VVcmkgPSB0aGlzLkltYWdlVXJpLlNlbGYoKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgdXNlclVwZGF0ZWQgPSBhd2FpdCB0aGlzLl9zZXR0aW5nc1Jlc291cmNlcy5VcGRhdGVTZXR0aW5ncyhzZXR0aW5nc1JlcXVlc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLlByb2ZpbGVJZCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChQcm9taXNlRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IGUuR2V0VmFsaWRhdGlvbkVycm9ycygpO1xuICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oZXJyb3JzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXQp9Cg==
