/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("realworld.spaf", function ($asm, globals) {
    "use strict";

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

    Bridge.define("Bridge.Spaf.SpafApp", {
        main: function Main () {
            Bridge.Navigation.NavigationUtility.VirtualDirectory = "realworld.spaf";

            Bridge.Spaf.SpafApp.Container = new Bridge.Ioc.BridgeIoc();
            Bridge.Spaf.SpafApp.ContainerConfig(); // config container
            var mainVm = Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.MainViewModel);
            mainVm.Start();

            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(Bridge.Navigation.INavigator).Bridge$Navigation$INavigator$InitNavigation(); // init navigation
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
                    var types = System.Linq.Enumerable.from(System.AppDomain.getAssemblies()).selectMany(function (s) {
                            return Bridge.Reflection.getAssemblyTypes(s);
                        }).where(function (w) {
                        return System.String.endsWith(Bridge.Reflection.getTypeName(w).toLowerCase(), "viewmodel");
                    }).toList(Function);

                    types.forEach(function (f) {
                        var attributes = Bridge.Reflection.getAttributes(f, Bridge.Spaf.Attributes.SingleInstanceAttribute, true);

                        if (System.Linq.Enumerable.from(attributes).any()) {
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
                                    $task1.continueWith($asyncBody, true);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                    article, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        // todo validations
                                        newArticel = ($t = new realworld.spaf.Models.Request.NewArticleRequest(), $t.Article = ($t1 = new realworld.spaf.Models.NewArticle(), $t1.Title = this.Title(), $t1.Body = this.Body(), $t1.Description = this.Description(), $t1.TagList = System.Linq.Enumerable.from(System.String.split(this.Tags(), [44].map(function(i) {{ return String.fromCharCode(i); }}))).toArray(), $t1), $t);

                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$Create(newArticel);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        article = $taskResult1;
                                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ArticleId, function (_o1) {
                                            _o1.add("slug", article.Article.Slug);
                                            return _o1;
                                        }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
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

                this._messenger.Bridge$Messenger$IMessenger$Subscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone, Bridge.fn.bind(this, function (service) {
                    this.IsLogged(true);

                    // reload articles for see favorites
                    var articlesTask = this.LoadArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage)); // load article task
                    this.RefreshPaginator(articlesTask.getResult());
                }), void 0);
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
                                    $task1.continueWith($asyncBody, true);
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
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
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
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
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
                                        $task2.continueWith($asyncBody);
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
                                        $task3.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        System.Linq.Enumerable.from(this.Pages()).single(function (s) {
                                            return s.Active();
                                        }).Active(false);
                                        paginator.Active(true);

                                        request = realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithOffSet(Bridge.Int.mul((((paginator.Page - 1) | 0)), this._settings.realworld$spaf$Services$ISettings$ArticleInPage)).WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage);

                                        if (!System.String.isNullOrEmpty(this._tagFilter)) {
                                            request = request.WithTag(this._tagFilter);
                                        }

                                        $task1 = this.LoadArticles(request);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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

                if (!System.Linq.Enumerable.from(articleResoResponse.Articles).any()) {
                    return;
                } // no articles

                var pagesCount = System.Int64.clip32(articleResoResponse.ArticlesCount.div(System.Int64(articleResoResponse.Articles.length)));
                var range = System.Linq.Enumerable.range(1, pagesCount);
                var pages = range.select(function (s) {
                    var $t;
                    return ($t = new realworld.spaf.Models.Paginator(), $t.Page = s, $t);
                }).toArray(realworld.spaf.Models.Paginator);
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
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    e, 
                    errors, 
                    $async_e, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([1,2,3,4,5], $step);
                                switch ($step) {

                                    case 1: {
                                        this.IsBusy(true);
                                        this.Errors.removeAll();
                                        $task1 = this._userService.realworld$spaf$Services$IUserService$Login(this.Email(), this.Password());
                                        $step = 2;
                                        $task1.continueWith($asyncBody);
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
                                        this.Errors.push.apply(this.Errors, System.Linq.Enumerable.from(errors).toArray());
                                        $async_e = null;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
                                        this.IsBusy(false);

                                        if ($jumpFromFinally > -1) {
                                            $step = $jumpFromFinally;
                                            $jumpFromFinally = null;
                                        } else if ($async_e) {
                                            $tcs.setException($async_e);
                                            return;
                                        } else if (Bridge.isDefined($returnValue)) {
                                            $tcs.setResult($returnValue);
                                            return;
                                        }
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
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
                            if ($step >= 1 && $step <= 3) {
                                $step = 4;
                                $asyncBody();
                                return;
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.MainViewModel", {
        fields: {
            _messenger: null,
            _userService: null,
            IsLogged: null
        },
        ctors: {
            ctor: function (messenger, userService) {
                this.$initialize();
                this._messenger = messenger;
                this._userService = userService;

                this.IsLogged = ko.observable(false);

                this._messenger.Bridge$Messenger$IMessenger$Subscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone, Bridge.fn.bind(this, function (service) {
                    this.IsLogged(true);
                }), void 0);

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
             * @return  {void}
             */
            Start: function () {
                ko.applyBindings(this);
                this._userService.realworld$spaf$Services$IUserService$TryAutoLoginWithStoredToken();
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
                this.Articles.removeAll();
                this.Articles.push.apply(this.Articles, System.Linq.Enumerable.from(this.UserArticles).toArray());
            },
            ShowFavourites: function () {
                this.Articles.removeAll();
                this.Articles.push.apply(this.Articles, System.Linq.Enumerable.from(this.Favourtites).toArray());
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
                                    }
                                    catch ($e1) {
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
                                    $task1.continueWith($asyncBody, true);
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
                                        $task2.continueWith($asyncBody);
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
                                        $task3.continueWith($asyncBody);
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
                                        $task2.continueWith($asyncBody);
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
                                        $task3.continueWith($asyncBody);
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
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
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
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        $task1.continueWith($asyncBody);
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
                                        this.Errors.push.apply(this.Errors, System.Linq.Enumerable.from(errors).toArray());
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
                                        $task1.continueWith($asyncBody);
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
                                        this.Errors.push.apply(this.Errors, System.Linq.Enumerable.from(errors).toArray());
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
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;

                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
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
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;

                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
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
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;
                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
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

                return realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.ProfileResponse, options);
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQ3VzdG9tUm91dGVzQ29uZmlnLmNzIiwiU3BhZkFwcC5jcyIsIkNsYXNzZXMvRXh0ZW5zaW9ucy5jcyIsIkNsYXNzZXMvRmVlZFJlcXVlc3RCdWlsZGVyLmNzIiwiTW9kZWxzL0FydGljbGUuY3MiLCJNb2RlbHMvQ29tbWVudC5jcyIsIk1vZGVscy9QYWdpbmF0b3IuY3MiLCJDbGFzc2VzL0FydGljbGVSZXF1ZXN0QnVpbGRlci5jcyIsIlNlcnZpY2VzL2ltcGwvUmVzb3VyY2VCYXNlLmNzIiwiVmlld01vZGVscy9BcnRpY2xlVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9FZGl0QXJ0aWNsZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvSG9tZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvTG9naW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL01haW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1Byb2ZpbGVWaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1JlZ2lzdGVyVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9TZXR0aW5nc1ZpZXdNb2RlbC5jcyIsIlNlcnZpY2VzL2ltcGwvQXV0aG9yaXplZFJlc291cmNlQmFzZS5jcyIsIlNlcnZpY2VzL2ltcGwvTG9jYWxTdG9yYWdlUmVwb3NpdG9yeS5jcyIsIlNlcnZpY2VzL2ltcGwvVXNlclJlc291cmNlcy5jcyIsIlNlcnZpY2VzL2ltcGwvVXNlclNlcnZpY2UuY3MiLCJTZXJ2aWNlcy9pbXBsL0FydGljbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL0ZlZWRSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1Byb2ZpbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1NldHRpbmdzUmVzb3VyY2VzLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7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QSxPQUFPQSxrSUFBK0JBOzs7Ozs7Ozs7Ozs7NEJDdkNqQkEsVUFBb0JBOztvRkFBaUNBO2dCQUUxRUEsaUJBQWlCQTs7OztzQ0FHd0JBO2dCQUV6Q0EsY0FBY0EsT0FFSkEsa0NBQXlCQSxpSUFJeEJBLDRDQUE0QkE7O2dCQUd2Q0EsT0FBT0EseUVBQTBDQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVscztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBjbGFzcyBDdXN0b21Sb3V0ZXNDb25maWcgOiBCcmlkZ2VOYXZpZ2F0b3JDb25maWdCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xyXG4gICAgICAgIHB1YmxpYyBDdXN0b21Sb3V0ZXNDb25maWcoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIERpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIElMaXN0PElQYWdlRGVzY3JpcHRvcj4gQ3JlYXRlUm91dGVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgTGlzdDxJUGFnZURlc2NyaXB0b3I+KCksKF9vMSk9PntfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvaG9tZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Ib21lSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEhvbWVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9sb2dpbi5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Mb2dpbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxMb2dpblZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL3JlZ2lzdGVyLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlJlZ2lzdGVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPFJlZ2lzdGVyVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvcHJvZmlsZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Qcm9maWxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPFByb2ZpbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvc2V0dGluZ3MuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuU2V0dGluZ3NJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8U2V0dGluZ3NWaWV3TW9kZWw+KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT5mYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL2VkaXRBcnRpY2xlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkVkaXRBcnRpY2xlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEVkaXRBcnRpY2xlVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvYXJ0aWNsZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5BcnRpY2xlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEFydGljbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgalF1ZXJ5IEJvZHkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgSG9tZUlkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIFZpcnR1YWxEaXJlY3Rvcnkge2dldHtyZXR1cm4gc3RyaW5nLklzTnVsbE9yRW1wdHkoTmF2aWdhdGlvblV0aWxpdHkuVmlydHVhbERpcmVjdG9yeSlcclxuICAgICAgICAgICAgPyBzdHJpbmcuRW1wdHlcclxuICAgICAgICAgICAgOiBzdHJpbmcuRm9ybWF0KFwiezB9L1wiLE5hdmlnYXRpb25VdGlsaXR5LlZpcnR1YWxEaXJlY3RvcnkpO319XHJcblxuXHJcbiAgICBcbnByaXZhdGUgYm9vbCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGU9ZmFsc2U7cHJpdmF0ZSBqUXVlcnkgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0JvZHk9alF1ZXJ5LlNlbGVjdChcIiNwYWdlQm9keVwiKTtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fSG9tZUlkPVNwYWZBcHAuSG9tZUlkO31cclxuXHJcbiAgIFxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5Jb2M7XHJcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xyXG51c2luZyBCcmlkZ2UuU3BhZi5BdHRyaWJ1dGVzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVscztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU3BhZkFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUlvYyBDb250YWluZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICNpZiAhREVCVUdcclxuICAgICAgICAgICAgTmF2aWdhdGlvblV0aWxpdHkuVmlydHVhbERpcmVjdG9yeSA9IFwicmVhbHdvcmxkLnNwYWZcIjtcclxuICAgICAgICAgICAgI2VuZGlmXHJcblxyXG4gICAgICAgICAgICBDb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lckNvbmZpZygpOyAvLyBjb25maWcgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHZhciBtYWluVm0gPSBDb250YWluZXIuUmVzb2x2ZTxNYWluVmlld01vZGVsPigpO1xyXG4gICAgICAgICAgICBtYWluVm0uU3RhcnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZXNvbHZlPElOYXZpZ2F0b3I+KCkuSW5pdE5hdmlnYXRpb24oKTsgLy8gaW5pdCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvbnRhaW5lckNvbmZpZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBuYXZpZ2F0b3JcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SU5hdmlnYXRvciwgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmc+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJTmF2aWdhdG9yQ29uZmlndXJhdG9yLCBDdXN0b21Sb3V0ZXNDb25maWc+KCk7IFxyXG5cclxuICAgICAgICAgICAgLy8gbWVzc2VuZ2VyXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElNZXNzZW5nZXIsIE1lc3Nlbmdlci5NZXNzZW5nZXI+KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2aWV3bW9kZWxzXHJcbiAgICAgICAgICAgIFJlZ2lzdGVyQWxsVmlld01vZGVscygpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgY3VzdG9tIHJlc291cmNlLCBzZXJ2aWNlcy4uXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElTZXR0aW5ncywgU2V0dGluZ3M+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElVc2VyU2VydmljZSwgVXNlclNlcnZpY2U+KCk7XHJcblxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SUFydGljbGVSZXNvdXJjZXMsQXJ0aWNsZVJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElVc2VyUmVzb3VyY2VzLFVzZXJSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJRmVlZFJlc291cmNlcyxGZWVkUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVByb2ZpbGVSZXNvdXJjZXMsUHJvZmlsZVJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJUmVwb3NpdG9yeSxMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5PigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVNldHRpbmdzUmVzb3VyY2VzLFNldHRpbmdzUmVzb3VyY2VzPigpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNyZWdpb24gUEFHRVMgSURTXHJcbiAgICAgICAgLy8gc3RhdGljIHBhZ2VzIGlkXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBIb21lSWQge2dldHtyZXR1cm4gXCJob21lXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBMb2dpbklkIHtnZXR7cmV0dXJuIFwibG9naW5cIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIFJlZ2lzdGVySWQge2dldHtyZXR1cm4gXCJyZWdpc3RlclwiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgUHJvZmlsZUlkIHtnZXR7cmV0dXJuIFwicHJvZmlsZVwiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgU2V0dGluZ3NJZCB7Z2V0e3JldHVybiBcInNldHRpbmdzXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBFZGl0QXJ0aWNsZUlkIHtnZXR7cmV0dXJuIFwiZWRpdEFydGljbGVcIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEFydGljbGVJZCB7Z2V0e3JldHVybiBcImFydGljbGVcIjt9fVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTUVTU0FHRVNcclxuICAgICAgICAvLyBtZXNzZW5nZXIgaGVscGVyIGZvciBnbG9iYWwgbWVzc2FnZXMgYW5kIG1lc3NhZ2VzIGlkc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE1lc3NhZ2VzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgR2xvYmFsU2VuZGVyIHsgfTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgR2xvYmFsU2VuZGVyIFNlbmRlciA9IG5ldyBHbG9iYWxTZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIExvZ2luRG9uZSB7Z2V0e3JldHVybiBcIkxvZ2luRG9uZVwiO319XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZWdpc3RlciBhbGwgdHlwZXMgdGhhdCBlbmQgd2l0aCBcInZpZXdtb2RlbFwiLlxyXG4gICAgICAgIC8vLyBZb3UgY2FuIHJlZ2lzdGVyIGEgdmlld21vZGUgYXMgU2luZ2xyIEluc3RhbmNlIGFkZGluZyBcIlNpbmdsZUluc3RhbmNlQXR0cmlidXRlXCIgdG8gdGhlIGNsYXNzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlZ2lzdGVyQWxsVmlld01vZGVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcclxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodyA9PiB3Lk5hbWUuVG9Mb3dlcigpLkVuZHNXaXRoKFwidmlld21vZGVsXCIpKSkuVG9MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uVHlwZT4pKGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFNpbmdsZUluc3RhbmNlQXR0cmlidXRlKSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4oYXR0cmlidXRlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UoZik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyKGYpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERlc2VyaWFsaXplIHJlYWx3b3JsZCBwcm9taXNlIGV4Y2VwdGlvbiB0byBnZXQgZXJyb3JzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRGljdGlvbmFyeTxzdHJpbmcsc3RyaW5nW10+IEdldFZhbGlkYXRpb25FcnJvclJlc3BvbnNlKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSAoRXJyb3JSZXNwb25zZSlKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxFcnJvclJlc3BvbnNlPihleGNlcHRpb24uQXJndW1lbnRzWzBdLlRvRHluYW1pYygpLnJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLkVycm9ycztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdldCByZWFkYWJsZSBlcnJvciBsaXN0XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8c3RyaW5nPiBHZXRWYWxpZGF0aW9uRXJyb3JzKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBleGNlcHRpb24uR2V0VmFsaWRhdGlvbkVycm9yUmVzcG9uc2UoKTtcblxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGVycm9yIGluIGVycm9ycylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZXJyb3JEZXNjcmlwdGlvbiBpbiBlcnJvci5WYWx1ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiezB9IHsxfVwiLGVycm9yLktleSxlcnJvckRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgZXJyb3IgZm9yIGh0bWxlcnJvcmNvZGVcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXJyb3JDb2RlXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgR2V0RXJyb3JGb3JDb2RlKGludCBlcnJvckNvZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyb3JDb2RlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJVbmF1dGhvcml6ZWRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRm9yYmlkZGVuXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5vdCBGb3VuZFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgNDIyOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJWYWxpZGF0aW9uIEVycm9yXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR2VuZXJpYyBFcnJvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IGVycm9yIGNvZGUgZm9yIHByb21pc2UgZXhjZXB0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVycm9yQ29kZSh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JDb2RlID0gKGludClleGNlcHRpb24uQXJndW1lbnRzWzBdLlRvRHluYW1pYygpLnN0YXR1cztcbiAgICAgICAgICAgIHJldHVybiBlcnJvckNvZGU7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5DbGFzc2VzXG57XG4gICAgcHVibGljIGNsYXNzIEZlZWRSZXF1ZXN0QnVpbGRlclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX29mZnNldDtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2xpbWl0O1xuXG5cbiAgICAgICAgcHJpdmF0ZSBGZWVkUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IDIwO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRmVlZFJlcXVlc3RCdWlsZGVyIERlZmF1bHQoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZlZWRSZXF1ZXN0QnVpbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXF1ZXN0QnVpbGRlciBXaXRoT2ZmU2V0KGludCBvZmZzZXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXF1ZXN0QnVpbGRlciBXaXRoTGltaXQoaW50IGxpbWl0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnVpbGQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKFwiYXJ0aWNsZXMvZmVlZFwiKTtcblxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIj9saW1pdD17MH1cIix0aGlzLl9saW1pdCkpO1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmb2Zmc2V0PXswfVwiLHRoaXMuX29mZnNldCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcblxyXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFydGljbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BdXRob3IgPSBuZXcgQXV0aG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ0aXRsZVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRpdGxlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInNsdWdcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTbHVnIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImJvZHlcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBCb2R5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImNyZWF0ZWRBdFwiKV1cclxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWU/IENyZWF0ZWRBdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ1cGRhdGVkQXRcIildXHJcbiAgICAgICAgcHVibGljIERhdGVUaW1lPyBVcGRhdGVkQXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidGFnTGlzdFwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gVGFnTGlzdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJkZXNjcmlwdGlvblwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImF1dGhvclwiKV1cclxuICAgICAgICBwdWJsaWMgQXV0aG9yIEF1dGhvciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJmYXZvcml0ZWRcIildXHJcbiAgICAgICAgcHVibGljIGJvb2wgRmF2b3JpdGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImZhdm9yaXRlc0NvdW50XCIpXVxyXG4gICAgICAgIHB1YmxpYyBsb25nIEZhdm9yaXRlc0NvdW50IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBDcmVhdGUge2dldHtyZXR1cm4gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIix0aGlzLkNyZWF0ZWRBdCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPERhdGVUaW1lPihcImtleTFcIikuVG9TdHJpbmcoXCJNTU1NIGRkXCIpOihzdHJpbmcpbnVsbDt9fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xue1xuICAgIHB1YmxpYyBjbGFzcyBDb21tZW50XG4gICAge1xuICAgICAgICBwdWJsaWMgQ29tbWVudCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXV0aG9yID0gbmV3IEF1dGhvcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbSnNvblByb3BlcnR5KFwiaWRcIildXG4gICAgICAgIHB1YmxpYyBsb25nIElkIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiY3JlYXRlZEF0XCIpXVxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgQ3JlYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwidXBkYXRlZEF0XCIpXVxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgVXBkYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYm9keVwiKV1cbiAgICAgICAgcHVibGljIHN0cmluZyBCb2R5IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYXV0aG9yXCIpXVxuICAgICAgICBwdWJsaWMgQXV0aG9yIEF1dGhvciB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgc3RyaW5nIENyZWF0ZSB7Z2V0e3JldHVybiB0aGlzLkNyZWF0ZWRBdC5Ub1N0cmluZyhcIk1NTU0gZGRcIik7fX1cblxuICAgIH1cbn0iLCJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5Nb2RlbHNcbntcbiAgICBwdWJsaWMgY2xhc3MgUGFnaW5hdG9yXG4gICAge1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+QWN0aXZlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGludCBQYWdlIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUGFnaW5hdG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BY3RpdmUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPigpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgcHVibGljIGNsYXNzIEFydGljbGVSZXF1ZXN0QnVpbGRlclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3RhZztcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2F1dGhvcjtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX29mZnNldDtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2xpbWl0O1xuICAgICAgICBwcml2YXRlIHN0cmluZyBfdXNlcjtcblxuXG4gICAgICAgIHByaXZhdGUgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSAyMDtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBEZWZhdWx0KClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgV2l0aE9mZlNldChpbnQgb2Zmc2V0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgV2l0aExpbWl0KGludCBsaW1pdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSBsaW1pdDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBPZkF1dGhvcihzdHJpbmcgYXV0aG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9hdXRob3IgPSBhdXRob3I7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgV2l0aFRhZyhzdHJpbmcgdGFnKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl90YWcgPSB0YWc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBPZkZhdm9yaXRlKHN0cmluZyB1c2VyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl91c2VyID0gdXNlcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJ1aWxkKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcihcImFydGljbGVzXCIpO1xuXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiP2xpbWl0PXswfVwiLHRoaXMuX2xpbWl0KSk7XG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZvZmZzZXQ9ezB9XCIsdGhpcy5fb2Zmc2V0KSk7XG5cbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkodGhpcy5fdGFnKSlcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZ0YWc9ezB9XCIsdGhpcy5fdGFnKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkodGhpcy5fYXV0aG9yKSlcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZhdXRob3I9ezB9XCIsdGhpcy5fYXV0aG9yKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkodGhpcy5fdXNlcikpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmZmF2b3JpdGVkPXswfVwiLHRoaXMuX3VzZXIpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgYWJzdHJhY3QgY2xhc3MgUmVzb3VyY2VCYXNlXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmljIEF3YWl0YWJsZSBhamF4IGNhbGxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIFRhc2s8VD4gTWFrZUNhbGw8VD4oQWpheE9wdGlvbnMgb3B0aW9ucykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBUYXNrLkZyb21Qcm9taXNlPFQ+KGpRdWVyeS5BamF4KG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLCAoRnVuYzxvYmplY3QsIHN0cmluZywganFYSFIsIFQ+KSAoKHJlc09iaiwgc3VjY2VzcywganFYaHIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04uU3RyaW5naWZ5KHJlc09iaik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxUPihqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG51c2luZyBDb21tZW50ID0gcmVhbHdvcmxkLnNwYWYuTW9kZWxzLkNvbW1lbnQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgQXJ0aWNsZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5BcnRpY2xlSWQ7fVxuXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVByb2ZpbGVSZXNvdXJjZXMgX3Byb2ZpbGVSZXNvdXJjZXM7XG5cbiAgICAgICAgcHVibGljIEFydGljbGUgQXJ0aWNsZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5Db21tZW50PkNvbW1lbnRzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+Q29tbWVudCB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgYm9vbCBJc0xvZ2dlZCB7Z2V0e3JldHVybiB0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZDt9fVxuICAgICAgICBwdWJsaWMgVXNlciBMb2dnZWRVc2VyIHtnZXR7cmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2dlZFVzZXI7fX1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIFxuICAgICAgICAgICAgSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElQcm9maWxlUmVzb3VyY2VzIHByb2ZpbGVSZXNvdXJjZXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9hcnRpY2xlUmVzb3VyY2VzID0gYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF9wcm9maWxlUmVzb3VyY2VzID0gcHJvZmlsZVJlc291cmNlcztcblxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlID0gbmV3IEFydGljbGUoKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPENvbW1lbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIHZhciBzbHVnID0gcGFyYW1ldGVycy5HZXRQYXJhbWV0ZXI8c3RyaW5nPihcInNsdWdcIik7XG4gICAgICAgICAgICBpZihzdHJpbmcuSXNOdWxsT3JFbXB0eShzbHVnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiQXJ0aWNsZSBwYWdlIG5lZWQgc2x1ZyBwYXJhbWV0ZXJcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBhcnRpY2xlVGFzayA9IHRoaXMuTG9hZEFydGljbGUoc2x1Zyk7XG4gICAgICAgICAgICB2YXIgY29tbWVudHNUYXNrID0gdGhpcy5Mb2FkQ29tbWVudHMoc2x1Zyk7XG4gICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGwoYXJ0aWNsZVRhc2ssY29tbWVudHNUYXNrKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoQmluZGluZygpOyAvLyBtYW51YWwgcmVmcmVzaCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5FbmFibGVTcGFmQW5jaG9ycygpOyAvLyB0b2RvIGNoZWNrIHdoeSBub3QgYXV0byBlbmFibGVkXG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBZGQgY29tbWVudCB0byBhcnRpY2xlXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFkZENvbW1lbnQoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQpIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGNvbW1lbnRSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuQWRkQ29tbWVudCh0aGlzLkFydGljbGUuU2x1ZywgdGhpcy5Db21tZW50LlNlbGYoKSk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnQuU2VsZihzdHJpbmcuRW1wdHkpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50cy5wdXNoKGNvbW1lbnRSZXNwb25zZS5Db21tZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEZvbGxvdyBBcnRpY2xlIEF1dGhvclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGb2xsb3dBdXRob3IoKVxuICAgICAgICB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2VzLkZvbGxvdyh0aGlzLkFydGljbGUuQXV0aG9yLlVzZXJuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTWFudWFsIHJldmFsdWF0ZSBiaW5kaW5nXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBSZWZyZXNoQmluZGluZygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJldHlwZWQua25vY2tvdXQua28uY2xlYW5Ob2RlKHRoaXMuUGFnZU5vZGUpO1xuICAgICAgICAgICAgYmFzZS5BcHBseUJpbmRpbmdzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIGNvbW1lbnRzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNsdWdcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZENvbW1lbnRzKHN0cmluZyBzbHVnKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29tbWVudCA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZUNvbW1lbnRzKHNsdWcpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50cy5wdXNoKGNvbW1lbnQuQ29tbWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlIGluZm9cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2x1Z1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkQXJ0aWNsZShzdHJpbmcgc2x1ZylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFydGljbGUgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGUoc2x1Zyk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGUgPSBhcnRpY2xlLkFydGljbGU7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgRWRpdEFydGljbGVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLkVkaXRBcnRpY2xlSWQ7fVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlRpdGxlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+Qm9keSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkRlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VGFncyB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgRWRpdEFydGljbGVWaWV3TW9kZWwoSUFydGljbGVSZXNvdXJjZXMgYXJ0aWNsZVJlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9hcnRpY2xlUmVzb3VyY2VzID0gYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICB0aGlzLlRpdGxlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Cb2R5ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5EZXNjcmlwdGlvbiA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuVGFncyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuXG4vLyAgICAgICAgICAgIHZhciBhcnRpY2xlU2x1ZyA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJzbHVnXCIpO1xuLy8gICAgICAgICAgICBpZihzdHJpbmcuSXNOdWxsT3JFbXB0eShhcnRpY2xlU2x1ZykpXG4vLyAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiU2x1ZyBtaXNzaW5nIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBDcmVhdGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB0b2RvIHZhbGlkYXRpb25zXG4gICAgICAgICAgICB2YXIgbmV3QXJ0aWNlbCA9IG5ldyBOZXdBcnRpY2xlUmVxdWVzdFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEFydGljbGUgPSBuZXcgTmV3QXJ0aWNsZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSB0aGlzLlRpdGxlLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgQm9keSA9IHRoaXMuQm9keS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uID0gdGhpcy5EZXNjcmlwdGlvbi5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIFRhZ0xpc3QgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPih0aGlzLlRhZ3MuU2VsZigpLlNwbGl0KCcsJykpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGFydGljbGUgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkNyZWF0ZShuZXdBcnRpY2VsKTtcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkFydGljbGVJZCxnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJzbHVnXCIsYXJ0aWNsZS5BcnRpY2xlLlNsdWcpO3JldHVybiBfbzE7fSkpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWY7XHJcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXHJcbntcclxuICAgIGNsYXNzIEhvbWVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLkhvbWVJZDt9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90YWdGaWx0ZXIgPSBudWxsOyAvLyB0YWcgZmlsdGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfcmVzb3VyY2VzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJRmVlZFJlc291cmNlcyBfZmVlZFJlc291cmNlcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBLTk9DS09VVEpTXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkFydGljbGU+QXJ0aWNsZXM7IC8vIGFydGljbGVzXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj5QYWdlczsgLy8gcGFnaW5hdG9yIGhlbHBlclxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+VGFnczsgLy8gdGFnc1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkFjdGl2ZVRhYkluZGV4OyAvLyB0YWIgYWN0aXZlIGluZGV4XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5UYWJzO1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZDtcclxuICAgICAgICBcclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgSG9tZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyByZXNvdXJjZXMsIElTZXR0aW5ncyBzZXR0aW5ncywgSU1lc3NlbmdlciBtZXNzZW5nZXIsXHJcbiAgICAgICAgICAgIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSUZlZWRSZXNvdXJjZXMgZmVlZFJlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVzb3VyY2VzID0gcmVzb3VyY2VzO1xyXG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcclxuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XHJcbiAgICAgICAgICAgIF9mZWVkUmVzb3VyY2VzID0gZmVlZFJlc291cmNlcztcclxuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8QXJ0aWNsZT4oKTtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8UGFnaW5hdG9yPigpO1xyXG4gICAgICAgICAgICB0aGlzLlRhZ3MgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcclxuICAgICAgICAgICAgdGhpcy5UYWJzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPih0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXggPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KC0xKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsLlVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklzTG9nZ2VkLlNlbGYodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIHJlbG9hZCBhcnRpY2xlcyBmb3Igc2VlIGZhdm9yaXRlc1xyXG4gICAgICAgICAgICAgICAgdmFyIGFydGljbGVzVGFzayA9IHRoaXMuTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTsgLy8gbG9hZCBhcnRpY2xlIHRhc2tcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlc1Rhc2suUmVzdWx0KTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uTG9hZChwYXJhbWV0ZXJzKTsgLy8gYWx3YXlzIGNhbGwgYmFzZSAod2hlcmUgYXBwbHliaW5kaW5nKVxyXG5cclxuICAgICAgICAgICAgdmFyIGFydGljbGVzVGFzayA9IHRoaXMuTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTsgLy8gbG9hZCBhcnRpY2xlIHRhc2tcclxuICAgICAgICAgICAgdmFyIGxvYWRUYWdzVGFzayA9IHRoaXMuTG9hZFRhZ3MoKTtcclxuICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsKGFydGljbGVzVGFzayxsb2FkVGFnc1Rhc2spO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZXNUYXNrLlJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPbkxlYXZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25MZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuVW5zdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsIFNwYWZBcHAuTG9naW5JZCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBLTk9DS09VVCBNRVRIT0RTXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gdXNlciBkZXRhaWxcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9Vc2VyKEFydGljbGUgYXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLlByb2ZpbGVJZCwgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwidXNlcm5hbWVcIixhcnRpY2xlLkF1dGhvci5Vc2VybmFtZSk7cmV0dXJuIF9vMTt9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gYXJ0aWNsZSBkZXRhaWxcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9BcnRpY2xlKEFydGljbGUgYXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkFydGljbGVJZCxnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJzbHVnXCIsYXJ0aWNsZS5TbHVnKTtyZXR1cm4gX28xO30pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQWRkIHBhc3NlZCBhcnRpY2xlIHRvIGZhdlxyXG4gICAgICAgIC8vLyBPbmx5IGZvciBhdXRoIHVzZXJzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFkZFRvRmF2b3VyaXRlKEFydGljbGUgYXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0xvZ2dlZC5TZWxmKCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBzaW5nbGVBcnRpY2xlID0gYXJ0aWNsZS5GYXZvcml0ZWQgPyBhd2FpdCB0aGlzLl9yZXNvdXJjZXMuVW5GYXZvcml0ZShhcnRpY2xlLlNsdWcpIDogXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZXNvdXJjZXMuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVwbGFjZShhcnRpY2xlLHNpbmdsZUFydGljbGUuQXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdvIHRvIHVzZXIgZmVlZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSZXNldFRhYnNGb3JGZWVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigtMik7XHJcbiAgICAgICAgICAgIHRoaXMuVGFicy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5fdGFnRmlsdGVyID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGFydGljbGVSZXNwb25zZSA9IGF3YWl0IHRoaXMuTG9hZEZlZWQoRmVlZFJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSkpO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZVJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXNldCBUYWJcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVzZXRUYWJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigtMSk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFicy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5fdGFnRmlsdGVyID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGFydGljbGVSZXNwb25zZSA9IGF3YWl0IHRoaXMuTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdvIHRvIHBhZ2VcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2luYXRvclwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBHb1RvUGFnZShQYWdpbmF0b3IgcGFnaW5hdG9yKVxyXG4gICAgICAgIHtcclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TaW5nbGU8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yPiggICAgICAgICAgICB0aGlzLlBhZ2VzLlNlbGYoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5QYWdpbmF0b3IsIGJvb2w+KShzID0+IHMuQWN0aXZlLlNlbGYoKSkpLkFjdGl2ZS5TZWxmKGZhbHNlKTtcclxuICAgICAgICAgICAgcGFnaW5hdG9yLkFjdGl2ZS5TZWxmKHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAuV2l0aE9mZlNldCgocGFnaW5hdG9yLlBhZ2UtMSkqdGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSlcclxuICAgICAgICAgICAgICAgIC5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3RhZ0ZpbHRlcikpXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gcmVxdWVzdC5XaXRoVGFnKHRoaXMuX3RhZ0ZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhyZXF1ZXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRmlsdGVyIGFydGljbGVzIGJ5IHRhZ1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidGFnXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEZpbHRlckJ5VGFnKHN0cmluZyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFiTmFtZSA9IHN0cmluZy5Gb3JtYXQoXCIjezB9XCIsdGFnKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5BcnRpY2xlc0ZvclRhYih0YWJOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBhcnRpY2xlcyBmb3IgcGFzc2VkIHRhYlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidGFiXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFydGljbGVzRm9yVGFiKHN0cmluZyB0YWIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFnTmFtZSA9IHRhYi5UcmltU3RhcnQoJyMnKTtcclxuICAgICAgICAgICAgdGhpcy5fdGFnRmlsdGVyID0gdGFnTmFtZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3R1YWxJbmRleCA9IHRoaXMuVGFicy5TZWxmKCkuSW5kZXhPZih0YWIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoYWN0dWFsSW5kZXggPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRhYnMucHVzaCh0YWIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKHRoaXMuVGFicy5TZWxmKCkuSW5kZXhPZih0YWIpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlcyA9IGF3YWl0IHRoaXMuTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KClcclxuICAgICAgICAgICAgICAgIC5XaXRoVGFnKHRhZ05hbWUpXHJcbiAgICAgICAgICAgICAgICAuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFBSSVZBVEUgTUVUSE9EU1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgYXJ0aWNsZXNcclxuICAgICAgICAvLy8gQ2xlYXIgbGlzdCBhbmQgcmVsb2FkXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IExvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgcmVxdWVzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzb1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5fcmVzb3VyY2VzLkdldEFydGljbGVzKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnB1c2goYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnRpY2xlUmVzb1Jlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgZmVlZFxyXG4gICAgICAgIC8vLyBDbGVhciBsaXN0IGFuZCByZWxvYWRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrPEFydGljbGVSZXNwb25zZT4gTG9hZEZlZWQoRmVlZFJlcXVlc3RCdWlsZGVyIHJlcXVlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmVlZFJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZmVlZFJlc291cmNlcy5HZXRGZWVkKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnB1c2goZmVlZFJlc3BvbnNlLkFydGljbGVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZlZWRSZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVsb2FkIHRhZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRUYWdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YWdzID0gYXdhaXQgdGhpcy5fcmVzb3VyY2VzLkdldFRhZ3MoKTtcclxuICAgICAgICAgICAgdGhpcy5UYWdzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLlRhZ3MucHVzaCh0YWdzLlRhZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFdoZW4gdXBkYXRlIGFydGljbGVzIHJlYnVpbGQgcGFnaW5hdG9yXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlUmVzb1Jlc3BvbnNlXCI+PC9wYXJhbT5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVmcmVzaFBhZ2luYXRvcihBcnRpY2xlUmVzcG9uc2UgYXJ0aWNsZVJlc29SZXNwb25zZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGFnZXMucmVtb3ZlQWxsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkFydGljbGU+KGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXMpKSByZXR1cm47IC8vIG5vIGFydGljbGVzXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcGFnZXNDb3VudCA9IChpbnQpIChhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzQ291bnQgLyBhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzLkxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZhciByYW5nZSA9IEVudW1lcmFibGUuUmFuZ2UoMSwgcGFnZXNDb3VudCk7XHJcbiAgICAgICAgICAgIHZhciBwYWdlcyA9IHJhbmdlLlNlbGVjdDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5QYWdpbmF0b3I+KChnbG9iYWw6OlN5c3RlbS5GdW5jPGludCwgZ2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yPikocyA9PiBuZXcgUGFnaW5hdG9yXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFBhZ2UgPSBzXHJcbiAgICAgICAgICAgIH0pKS5Ub0FycmF5KCk7XHJcbiAgICAgICAgICAgIHBhZ2VzWzBdLkFjdGl2ZS5TZWxmKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLlBhZ2VzLnB1c2gocGFnZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgICAgXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBMb2dpblZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5Mb2dpbklkO31cblxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5FbWFpbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlBhc3N3b3JkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzQnVzeSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+RXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgTG9naW5WaWV3TW9kZWwoSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLkVtYWlsID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5QYXNzd29yZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuSXNCdXN5ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIExvZ2luKClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5Jc0J1c3kuU2VsZih0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5Mb2dpbih0aGlzLkVtYWlsLlNlbGYoKSwgdGhpcy5QYXNzd29yZC5TZWxmKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkhvbWVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBlLkdldFZhbGlkYXRpb25FcnJvcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KGVycm9ycykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuSXNCdXN5LlNlbGYoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyBCcmlkZ2UuU3BhZi5BdHRyaWJ1dGVzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIFtTaW5nbGVJbnN0YW5jZV1cbiAgICBwdWJsaWMgY2xhc3MgTWFpblZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVzc2VuZ2VyIF9tZXNzZW5nZXI7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcblxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SXNMb2dnZWQgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBNYWluVmlld01vZGVsKElNZXNzZW5nZXIgbWVzc2VuZ2VyLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcblxuICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KGZhbHNlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlN1YnNjcmliZTxVc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGwuVXNlclNlcnZpY2U+KShzZXJ2aWNlID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLklzTG9nZ2VkLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXBwbHkgYmluZGluZyB0byBtYWlubW9kZWxcbiAgICAgICAgLy8vIHRyeSBhdXRvIGxvZ2luXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFN0YXJ0KClcbiAgICAgICAge1xuICAgICAgICAgICAgUmV0eXBlZC5rbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UuVHJ5QXV0b0xvZ2luV2l0aFN0b3JlZFRva2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBQcm9maWxlVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLlByb2ZpbGVJZDt9XG5cbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUHJvZmlsZVJlc291cmNlcyBfcHJvZmlsZVJlc291cmNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcblxuICAgICAgICBwdWJsaWMgUHJvZmlsZU1vZGVsIFByb2ZpbGVNb2RlbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkFjdGl2ZVRhYkluZGV4OyAvLyB0YWIgYWN0aXZlIGluZGV4XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZCB7IGdldDsgc2V0OyB9XG5cblxuICAgICAgICBwdWJsaWMgUHJvZmlsZVZpZXdNb2RlbChJUHJvZmlsZVJlc291cmNlcyBwcm9maWxlUmVzb3VyY2UsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgXG4gICAgICAgICAgICBJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvciwgSU1lc3NlbmdlciBtZXNzZW5nZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsID0gbmV3IFByb2ZpbGVNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZmlsZVJlc291cmNlID0gcHJvZmlsZVJlc291cmNlO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcblxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oMCk7XG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4odGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbC5Vc2VyU2VydmljZT4pKHNlcnZpY2UgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLklzTG9nZ2VkLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk9uTG9hZChwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IHN0cmluZy5FbXB0eTtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gcGFyYW1ldGVycy5HZXRQYXJhbWV0ZXI8c3RyaW5nPihcInVzZXJuYW1lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2hcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJObyB1c2VybmFtZSBwYXNzZWQgYW5kIHlvdSBhcmUgbm90IGxvZ2dlZCFcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSB0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyLlVzZXJuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdXNlclRhc2sgPSB0aGlzLkxvYWRVc2VyKHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlVGFzayA9IHRoaXMuTG9hZEFydGljbGVzKHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHZhciBmYXZvdXJpdGVUYXNrID0gdGhpcy5Mb2FkRmF2b3VyaXRlc0FydGljbGVzKHVzZXJuYW1lKTtcblxuICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsKHVzZXJUYXNrLCBhcnRpY2xlVGFzaywgZmF2b3VyaXRlVGFzayk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5TaG93QXJ0aWNsZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE9uTGVhdmUoKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk9uTGVhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5VbnN1YnNjcmliZTxVc2VyU2VydmljZT4odGhpcywgU3BhZkFwcC5Mb2dpbklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBZGQgcGFzc2VkIGFydGljbGUgdG8gZmF2XG4gICAgICAgIC8vLyBPbmx5IGZvciBhdXRoIHVzZXJzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRUb0Zhdm91cml0ZShBcnRpY2xlIGFydGljbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0xvZ2dlZC5TZWxmKCkpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIHNpbmdsZUFydGljbGUgPSBhcnRpY2xlLkZhdm9yaXRlZCA/IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuVW5GYXZvcml0ZShhcnRpY2xlLlNsdWcpIDogXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5GYXZvcml0ZShhcnRpY2xlLlNsdWcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5BcnRpY2xlcy5yZXBsYWNlKGFydGljbGUsc2luZ2xlQXJ0aWNsZS5BcnRpY2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEZvbGxvdyAvIHVuZm9sbG93XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEZvbGxvdygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IHRoaXMuUHJvZmlsZU1vZGVsLlVzZXJuYW1lLlNlbGYoKTtcbiAgICAgICAgICAgIHZhciBmb2xsb3cgPSB0aGlzLlByb2ZpbGVNb2RlbC5Gb2xsb3dpbmcuU2VsZigpID8gYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlLlVuRm9sbG93KHVzZXJuYW1lKSBcbiAgICAgICAgICAgICAgICA6IGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZS5Gb2xsb3codXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuRm9sbG93aW5nLlNlbGYoZm9sbG93LlByb2ZpbGUuRm9sbG93aW5nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gdXNlciBkZXRhaWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9Vc2VyKEFydGljbGUgYXJ0aWNsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuUHJvZmlsZUlkLCBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJ1c2VybmFtZVwiLGFydGljbGUuQXV0aG9yLlVzZXJuYW1lKTtyZXR1cm4gX28xO30pKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gYXJ0aWNsZSBkZXRhaWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9BcnRpY2xlKEFydGljbGUgYXJ0aWNsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuQXJ0aWNsZUlkLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInNsdWdcIixhcnRpY2xlLlNsdWcpO3JldHVybiBfbzE7fSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFNob3cgdXNlciBhcnRpY2xlc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93QXJ0aWNsZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoMCk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5TaG93QXJ0aWNsZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFNob3cgZmF2c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93RmF2b3VyaXRlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigxKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlNob3dGYXZvdXJpdGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIHVzZXIgZGF0YVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ1c2VybmFtZVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkVXNlcihzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBwcm9maWxlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2UuR2V0KHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLk1hcE1lKHByb2ZpbGVSZXNwb25zZS5Qcm9maWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgQXJ0aWNsZXNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRBcnRpY2xlcyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlcyA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQoNSlcbiAgICAgICAgICAgICAgICAuT2ZBdXRob3IodXNlcm5hbWUpKTtcblxuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuVXNlckFydGljbGVzID0gYXJ0aWNsZXMuQXJ0aWNsZXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgQXJ0aWNsZXMgRmF2b3JpdGVzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkRmF2b3VyaXRlc0FydGljbGVzKHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFydGljbGVzID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCg1KVxuICAgICAgICAgICAgICAgIC5PZkZhdm9yaXRlKHVzZXJuYW1lKSk7XG5cbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLkZhdm91cnRpdGVzID0gYXJ0aWNsZXMuQXJ0aWNsZXM7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBjbGFzcyBQcm9maWxlTW9kZWxcbiAgICB7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkltYWdlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VXNlcm5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5CaW8geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+Rm9sbG93aW5nIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQXJ0aWNsZT5BcnRpY2xlcyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIElFbnVtZXJhYmxlPEFydGljbGU+IFVzZXJBcnRpY2xlcyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxBcnRpY2xlPiBGYXZvdXJ0aXRlcyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFByb2ZpbGVNb2RlbCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuSW1hZ2UgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5CaW8gPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkZvbGxvd2luZyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxBcnRpY2xlPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgTWFwTWUgKFByb2ZpbGUgcHJvZmlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5JbWFnZS5TZWxmKHByb2ZpbGUuSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZS5TZWxmKHByb2ZpbGUuVXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5CaW8uU2VsZihwcm9maWxlLkJpbyk7XG4gICAgICAgICAgICB0aGlzLkZvbGxvd2luZy5TZWxmKHByb2ZpbGUuRm9sbG93aW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dBcnRpY2xlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkFydGljbGU+KHRoaXMuVXNlckFydGljbGVzKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dGYXZvdXJpdGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQXJ0aWNsZT4odGhpcy5GYXZvdXJ0aXRlcykpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBSZXR5cGVkO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIFJlZ2lzdGVyVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLlJlZ2lzdGVySWQ7fVxuXG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBVc2VybmFtZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBFbWFpbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBQYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheTxzdHJpbmc+IEVycm9ycyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFJlZ2lzdGVyVmlld01vZGVsKElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcblxuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZSA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc3dvcmQgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlZ2lzdGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuUmVnaXN0ZXIodGhpcy5Vc2VybmFtZS5TZWxmKCksIHRoaXMuRW1haWwuU2VsZigpLCB0aGlzLlBhc3N3b3JkLlNlbGYoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgU2V0dGluZ3NWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5nc1Jlc291cmNlcyBfc2V0dGluZ3NSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLlNldHRpbmdzSWQ7fVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkltYWdlVXJpIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VXNlcm5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5CaW9ncmFwaHkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5FbWFpbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPk5ld1Bhc3N3b3JkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5FcnJvcnMgeyBnZXQ7IHNldDsgfVxuXG5cbiAgICAgICAgcHVibGljIFNldHRpbmdzVmlld01vZGVsKElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSVNldHRpbmdzUmVzb3VyY2VzIHNldHRpbmdzUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzUmVzb3VyY2VzID0gc2V0dGluZ3NSZXNvdXJjZXM7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG5cbiAgICAgICAgICAgIHRoaXMuSW1hZ2VVcmkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5CaW9ncmFwaHkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5OZXdQYXNzd29yZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG5cbiAgICAgICAgICAgIHRoaXMuUG9wdWxhdGVFbnRyaWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHZvaWQgUG9wdWxhdGVFbnRyaWVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZS5TZWxmKHVzZXIuVXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5FbWFpbC5TZWxmKHVzZXIuRW1haWwpO1xuICAgICAgICAgICAgdGhpcy5JbWFnZVVyaS5TZWxmKHVzZXIuSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5CaW9ncmFwaHkuU2VsZih1c2VyLkJpbyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgVXBkYXRlU2V0dGluZ3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZ3NSZXF1ZXN0ID0gbmV3IFNldHRpbmdzUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWUgPSB0aGlzLlVzZXJuYW1lLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgTmV3UGFzc3dvcmQgPSB0aGlzLk5ld1Bhc3N3b3JkLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgQmlvZ3JhcGh5ID0gdGhpcy5CaW9ncmFwaHkuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IHRoaXMuRW1haWwuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBJbWFnZVVyaSA9IHRoaXMuSW1hZ2VVcmkuU2VsZigpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciB1c2VyVXBkYXRlZCA9IGF3YWl0IHRoaXMuX3NldHRpbmdzUmVzb3VyY2VzLlVwZGF0ZVNldHRpbmdzKHNldHRpbmdzUmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuUHJvZmlsZUlkKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBhYnN0cmFjdCBjbGFzcyBBdXRob3JpemVkUmVzb3VyY2VCYXNlIDogUmVzb3VyY2VCYXNlXG4gICAge1xuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIFVzZXJTZXJ2aWNlO1xuXG4gICAgICAgIHByb3RlY3RlZCBBdXRob3JpemVkUmVzb3VyY2VCYXNlKElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgVXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2VuZXJpYyBBd2FpdGFibGUgYWpheCBjYWxsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcm90ZWN0ZWQgVGFzazxUPiBNYWtlQXV0aG9yaXplZENhbGw8VD4oQWpheE9wdGlvbnMgb3B0aW9ucykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLlVzZXJTZXJ2aWNlLklzTG9nZ2VkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJZb3UgbXVzdCBiZSBsb2dnZWQgdG8gdXNlIHRoaXMgcmVzb3VyY2VcIik7XG5cbiAgICAgICAgICAgIG9wdGlvbnMuQmVmb3JlU2VuZCA9ICh4aHIsIG8pID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeGhyLlNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIHN0cmluZy5Gb3JtYXQoXCJUb2tlbiB7MH1cIix0aGlzLlVzZXJTZXJ2aWNlLkxvZ2dlZFVzZXIuVG9rZW4pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxUPihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgTG9jYWxTdG9yYWdlUmVwb3NpdG9yeSA6IElSZXBvc2l0b3J5XG4gICAge1xuICAgICAgICBwcml2YXRlIGNvbnN0IHN0cmluZyBUb2tlbktleSA9IFwidG9rZW5cIjtcbiAgICAgICAgcHJpdmF0ZSBTdG9yYWdlIF9zdG9yYWdlO1xuXG4gICAgICAgIHB1YmxpYyBMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5KClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZSA9IFdpbmRvdy5Mb2NhbFN0b3JhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyB2b2lkIFNhdmVUb2tlbihzdHJpbmcgdG9rZW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UuU2V0SXRlbShUb2tlbktleSx0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldFRva2VuSWZFeGlzdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMuX3N0b3JhZ2UuR2V0SXRlbShUb2tlbktleSk7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW4hPW51bGw/dG9rZW4uVG9TdHJpbmcoKTooc3RyaW5nKW51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBEZWxldGVUb2tlbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UuUmVtb3ZlSXRlbShUb2tlbktleSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgVXNlclJlc291cmNlcyA6IFJlc291cmNlQmFzZSwgSVVzZXJSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgVXNlclJlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MpIFxuICAgICAgICB7XG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBMb2dpbihTaWduUmVxdWVzdCBsb2dpblJlcXVlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2Vycy9sb2dpblwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KGxvZ2luUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpZ25SZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IFJlZ2lzdGVyKFNpZ25SZXF1ZXN0IGxvZ2luUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobG9naW5SZXF1ZXN0KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2lnblJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gR2V0Q3VycmVudFVzZXIoc3RyaW5nIHRva2VuKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlclwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBCZWZvcmVTZW5kID0gKHhociwgbykgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5TZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBzdHJpbmcuRm9ybWF0KFwiVG9rZW4gezB9XCIsdG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2lnblJlc3BvbnNlPihvcHRpb25zKTtcblxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgVXNlclNlcnZpY2UgOiBJVXNlclNlcnZpY2VcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJSZXNvdXJjZXMgX3VzZXJSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElSZXBvc2l0b3J5IF9yZXBvc2l0b3J5O1xuXG4gICAgICAgIHB1YmxpYyBVc2VyU2VydmljZShJVXNlclJlc291cmNlcyB1c2VyUmVzb3VyY2VzLCBJTWVzc2VuZ2VyIG1lc3NlbmdlciwgSVJlcG9zaXRvcnkgcmVwb3NpdG9yeSlcbiAgICAgICAge1xuICAgICAgICAgICAgX3VzZXJSZXNvdXJjZXMgPSB1c2VyUmVzb3VyY2VzO1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5ID0gcmVwb3NpdG9yeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBVc2VyIExvZ2dlZFVzZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBib29sIElzTG9nZ2VkIHtnZXR7cmV0dXJuIHRoaXMuTG9nZ2VkVXNlciAhPSBudWxsO319XG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgTG9naW4oc3RyaW5nIG1haWwsIHN0cmluZyBwYXNzd29yZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl91c2VyUmVzb3VyY2VzLkxvZ2luKG5ldyBTaWduUmVxdWVzdFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVzZXIgPSBuZXcgVXNlclJlcXVlc3RcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEVtYWlsID0gbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgUGFzc3dvcmQgPSBwYXNzd29yZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLkxvZ2dlZFVzZXIgPSBsb2dpblJlc3BvbnNlLlVzZXI7XG4gICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LlNhdmVUb2tlbihsb2dpblJlc3BvbnNlLlVzZXIuVG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlNlbmQ8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsLlVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlZ2lzdGVyKHN0cmluZyB1c2VybmFtZSwgc3RyaW5nIG1haWwsIHN0cmluZyBwYXNzd29yZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl91c2VyUmVzb3VyY2VzLlJlZ2lzdGVyKG5ldyBTaWduUmVxdWVzdFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVzZXIgPSBuZXcgVXNlclJlcXVlc3RcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEVtYWlsID0gbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgUGFzc3dvcmQgPSBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWUgPSB1c2VybmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLkxvZ2dlZFVzZXIgPSBsb2dpblJlc3BvbnNlLlVzZXI7XG4gICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LlNhdmVUb2tlbihsb2dpblJlc3BvbnNlLlVzZXIuVG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlNlbmQ8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsLlVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFRyeUF1dG9Mb2dpbldpdGhTdG9yZWRUb2tlbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdG9yZWRUb2tlbiA9IHRoaXMuX3JlcG9zaXRvcnkuR2V0VG9rZW5JZkV4aXN0KCk7XG4gICAgICAgICAgICBpZiAoc3RvcmVkVG9rZW4gPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuR2V0Q3VycmVudFVzZXIoc3RvcmVkVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LlNhdmVUb2tlbihsb2dpblJlc3BvbnNlLlVzZXIuVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TZW5kPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbC5Vc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5EZWxldGVUb2tlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XHJcblxyXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxyXG57XHJcbiAgICBjbGFzcyBBcnRpY2xlUmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSUFydGljbGVSZXNvdXJjZXNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPEFydGljbGVSZXNwb25zZT4gR2V0QXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIGJ1aWxkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxidWlsZGVyLkJ1aWxkKCkpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVXNlclNlcnZpY2UuSXNMb2dnZWRcclxuICAgICAgICAgICAgICAgID8gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8QXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLk1ha2VDYWxsPEFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxUYWdzUmVzcG9uc2U+IEdldFRhZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS90YWdzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8VGFnc1Jlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gR2V0QXJ0aWNsZShzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBGYXZvcml0ZShzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2Zhdm9yaXRlXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBVbkZhdm9yaXRlKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vZmF2b3JpdGVcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJERUxFVEVcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gQ3JlYXRlKE5ld0FydGljbGVSZXF1ZXN0IG5ld0FydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChuZXdBcnRpY2xlKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxDb21tZW50c1Jlc3BvbnNlPiBHZXRBcnRpY2xlQ29tbWVudHMoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9jb21tZW50c1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8Q29tbWVudHNSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVDb21tZW50UmVzcG9uc2U+IEFkZENvbW1lbnQoc3RyaW5nIHNsdWcsIHN0cmluZyBjb21tZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vY29tbWVudHNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobmV3IENvbW1lbnRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBCb2R5ID0gY29tbWVudFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVDb21tZW50UmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBGZWVkUmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSUZlZWRSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgRmVlZFJlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBHZXRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlciBidWlsZGVyKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLGJ1aWxkZXIuQnVpbGQoKSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFByb2ZpbGVSZXNvdXJjZXMgOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJUHJvZmlsZVJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlUmVzb3VyY2VzKElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSVNldHRpbmdzIHNldHRpbmdzKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8Rm9sbG93UmVzcG9uc2U+IEZvbGxvdyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9wcm9maWxlcy97MX0vZm9sbG93XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHVzZXJuYW1lKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8Rm9sbG93UmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8Rm9sbG93UmVzcG9uc2U+IFVuRm9sbG93KHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3Byb2ZpbGVzL3sxfS9mb2xsb3dcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksdXNlcm5hbWUpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkRFTEVURVwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEZvbGxvd1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFByb2ZpbGVSZXNwb25zZT4gR2V0KHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3Byb2ZpbGVzL3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSx1c2VybmFtZSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8UHJvZmlsZVJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiAiLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBTZXR0aW5nc1Jlc291cmNlczogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSVNldHRpbmdzUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIFNldHRpbmdzUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTZXR0aW5nc1Jlc3BvbnNlPiBVcGRhdGVTZXR0aW5ncyhTZXR0aW5nc1JlcXVlc3Qgc2V0dGluZ3NSZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlclwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUFVUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3Qoc2V0dGluZ3NSZXF1ZXN0KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNldHRpbmdzUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0KfQo=
