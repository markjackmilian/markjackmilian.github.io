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
                    return "realworld.spaf/";
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQ3VzdG9tUm91dGVzQ29uZmlnLmNzIiwiU3BhZkFwcC5jcyIsIkNsYXNzZXMvRXh0ZW5zaW9ucy5jcyIsIkNsYXNzZXMvRmVlZFJlcXVlc3RCdWlsZGVyLmNzIiwiTW9kZWxzL0FydGljbGUuY3MiLCJNb2RlbHMvQ29tbWVudC5jcyIsIk1vZGVscy9QYWdpbmF0b3IuY3MiLCJDbGFzc2VzL0FydGljbGVSZXF1ZXN0QnVpbGRlci5jcyIsIlNlcnZpY2VzL2ltcGwvUmVzb3VyY2VCYXNlLmNzIiwiVmlld01vZGVscy9BcnRpY2xlVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9FZGl0QXJ0aWNsZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvSG9tZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvTG9naW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL01haW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1Byb2ZpbGVWaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1JlZ2lzdGVyVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9TZXR0aW5nc1ZpZXdNb2RlbC5jcyIsIlNlcnZpY2VzL2ltcGwvQXV0aG9yaXplZFJlc291cmNlQmFzZS5jcyIsIlNlcnZpY2VzL2ltcGwvTG9jYWxTdG9yYWdlUmVwb3NpdG9yeS5jcyIsIlNlcnZpY2VzL2ltcGwvVXNlclJlc291cmNlcy5jcyIsIlNlcnZpY2VzL2ltcGwvVXNlclNlcnZpY2UuY3MiLCJTZXJ2aWNlcy9pbXBsL0FydGljbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL0ZlZWRSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1Byb2ZpbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1NldHRpbmdzUmVzb3VyY2VzLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7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VUFBb0JBOztvRkFBaUNBO2dCQUUxRUEsaUJBQWlCQTs7OztzQ0FHd0JBO2dCQUV6Q0EsY0FBY0EsT0FFSkEsa0NBQXlCQSxpSUFJeEJBLDRDQUE0QkE7O2dCQUd2Q0EsT0FBT0EseUVBQTBDQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVscztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBjbGFzcyBDdXN0b21Sb3V0ZXNDb25maWcgOiBCcmlkZ2VOYXZpZ2F0b3JDb25maWdCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xyXG4gICAgICAgIHB1YmxpYyBDdXN0b21Sb3V0ZXNDb25maWcoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIERpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIElMaXN0PElQYWdlRGVzY3JpcHRvcj4gQ3JlYXRlUm91dGVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgTGlzdDxJUGFnZURlc2NyaXB0b3I+KCksKF9vMSk9PntfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvaG9tZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Ib21lSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEhvbWVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9sb2dpbi5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Mb2dpbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxMb2dpblZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL3JlZ2lzdGVyLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlJlZ2lzdGVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPFJlZ2lzdGVyVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvcHJvZmlsZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Qcm9maWxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPFByb2ZpbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvc2V0dGluZ3MuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuU2V0dGluZ3NJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8U2V0dGluZ3NWaWV3TW9kZWw+KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT5mYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL2VkaXRBcnRpY2xlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkVkaXRBcnRpY2xlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEVkaXRBcnRpY2xlVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvYXJ0aWNsZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5BcnRpY2xlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEFydGljbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgalF1ZXJ5IEJvZHkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgSG9tZUlkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXHJcblxyXG4jaWYgREVCVUdcclxuICAgICAgICAgICAgcHJpdmF0ZSBzdHJpbmcgVmlydHVhbERpcmVjdG9yeSA9PiBzdHJpbmcuRW1wdHk7XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIHByaXZhdGUgc3RyaW5nIFZpcnR1YWxEaXJlY3Rvcnkge2dldHtyZXR1cm4gXCJyZWFsd29ybGQuc3BhZi9cIjt9fVxyXG5cbiNlbmRpZlxyXG4gICAgXG5wcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0Rpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlPWZhbHNlO3ByaXZhdGUgalF1ZXJ5IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2R5PWpRdWVyeS5TZWxlY3QoXCIjcGFnZUJvZHlcIik7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0hvbWVJZD1TcGFmQXBwLkhvbWVJZDt9XHJcblxyXG4gICBcclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSW9jO1xyXG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWYuQXR0cmlidXRlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHM7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNwYWZBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIElJb2MgQ29udGFpbmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAjaWYgIURFQlVHXHJcbiAgICAgICAgICAgIE5hdmlnYXRpb25VdGlsaXR5LlZpcnR1YWxEaXJlY3RvcnkgPSBcInJlYWx3b3JsZC5zcGFmXCI7XHJcbiAgICAgICAgICAgICNlbmRpZlxyXG5cclxuICAgICAgICAgICAgQ29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xyXG4gICAgICAgICAgICBDb250YWluZXJDb25maWcoKTsgLy8gY29uZmlnIGNvbnRhaW5lclxyXG4gICAgICAgICAgICB2YXIgbWFpblZtID0gQ29udGFpbmVyLlJlc29sdmU8TWFpblZpZXdNb2RlbD4oKTtcclxuICAgICAgICAgICAgbWFpblZtLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVzb2x2ZTxJTmF2aWdhdG9yPigpLkluaXROYXZpZ2F0aW9uKCk7IC8vIGluaXQgbmF2aWdhdGlvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBDb250YWluZXJDb25maWcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbmF2aWdhdG9yXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElOYXZpZ2F0b3IsIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SU5hdmlnYXRvckNvbmZpZ3VyYXRvciwgQ3VzdG9tUm91dGVzQ29uZmlnPigpOyBcclxuXHJcbiAgICAgICAgICAgIC8vIG1lc3NlbmdlclxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJTWVzc2VuZ2VyLCBNZXNzZW5nZXIuTWVzc2VuZ2VyPigpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmlld21vZGVsc1xyXG4gICAgICAgICAgICBSZWdpc3RlckFsbFZpZXdNb2RlbHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGN1c3RvbSByZXNvdXJjZSwgc2VydmljZXMuLlxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJU2V0dGluZ3MsIFNldHRpbmdzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJVXNlclNlcnZpY2UsIFVzZXJTZXJ2aWNlPigpO1xyXG5cclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElBcnRpY2xlUmVzb3VyY2VzLEFydGljbGVSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJVXNlclJlc291cmNlcyxVc2VyUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SUZlZWRSZXNvdXJjZXMsRmVlZFJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElQcm9maWxlUmVzb3VyY2VzLFByb2ZpbGVSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVJlcG9zaXRvcnksTG9jYWxTdG9yYWdlUmVwb3NpdG9yeT4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElTZXR0aW5nc1Jlc291cmNlcyxTZXR0aW5nc1Jlc291cmNlcz4oKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjcmVnaW9uIFBBR0VTIElEU1xyXG4gICAgICAgIC8vIHN0YXRpYyBwYWdlcyBpZFxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgSG9tZUlkIHtnZXR7cmV0dXJuIFwiaG9tZVwiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgTG9naW5JZCB7Z2V0e3JldHVybiBcImxvZ2luXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBSZWdpc3RlcklkIHtnZXR7cmV0dXJuIFwicmVnaXN0ZXJcIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIFByb2ZpbGVJZCB7Z2V0e3JldHVybiBcInByb2ZpbGVcIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIFNldHRpbmdzSWQge2dldHtyZXR1cm4gXCJzZXR0aW5nc1wiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgRWRpdEFydGljbGVJZCB7Z2V0e3JldHVybiBcImVkaXRBcnRpY2xlXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBBcnRpY2xlSWQge2dldHtyZXR1cm4gXCJhcnRpY2xlXCI7fX1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1FU1NBR0VTXHJcbiAgICAgICAgLy8gbWVzc2VuZ2VyIGhlbHBlciBmb3IgZ2xvYmFsIG1lc3NhZ2VzIGFuZCBtZXNzYWdlcyBpZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjbGFzcyBNZXNzYWdlc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEdsb2JhbFNlbmRlciB7IH07XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEdsb2JhbFNlbmRlciBTZW5kZXIgPSBuZXcgR2xvYmFsU2VuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBMb2dpbkRvbmUge2dldHtyZXR1cm4gXCJMb2dpbkRvbmVcIjt9fVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVnaXN0ZXIgYWxsIHR5cGVzIHRoYXQgZW5kIHdpdGggXCJ2aWV3bW9kZWxcIi5cclxuICAgICAgICAvLy8gWW91IGNhbiByZWdpc3RlciBhIHZpZXdtb2RlIGFzIFNpbmdsciBJbnN0YW5jZSBhZGRpbmcgXCJTaW5nbGVJbnN0YW5jZUF0dHJpYnV0ZVwiIHRvIHRoZSBjbGFzc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZWdpc3RlckFsbFZpZXdNb2RlbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGVzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3RNYW55PGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uQXNzZW1ibHksZ2xvYmFsOjpTeXN0ZW0uVHlwZT4oQXBwRG9tYWluLkN1cnJlbnREb21haW4uR2V0QXNzZW1ibGllcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uQXNzZW1ibHksIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8Z2xvYmFsOjpTeXN0ZW0uVHlwZT4+KShzID0+IHMuR2V0VHlwZXMoKSkpXHJcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHcgPT4gdy5OYW1lLlRvTG93ZXIoKS5FbmRzV2l0aChcInZpZXdtb2RlbFwiKSkpLlRvTGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgdHlwZXMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlR5cGU+KShmID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gZi5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihTaW5nbGVJbnN0YW5jZUF0dHJpYnV0ZSksIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KGF0dHJpYnV0ZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlKGYpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcihmKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5DbGFzc2VzXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25zXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBEZXNlcmlhbGl6ZSByZWFsd29ybGQgcHJvbWlzZSBleGNlcHRpb24gdG8gZ2V0IGVycm9yc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleGNlcHRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIERpY3Rpb25hcnk8c3RyaW5nLHN0cmluZ1tdPiBHZXRWYWxpZGF0aW9uRXJyb3JSZXNwb25zZSh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gKEVycm9yUmVzcG9uc2UpSnNvbkNvbnZlcnQuRGVzZXJpYWxpemVPYmplY3Q8RXJyb3JSZXNwb25zZT4oZXhjZXB0aW9uLkFyZ3VtZW50c1swXS5Ub0R5bmFtaWMoKS5yZXNwb25zZUpTT04pO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9ycy5FcnJvcnM7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgcmVhZGFibGUgZXJyb3IgbGlzdFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleGNlcHRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIElFbnVtZXJhYmxlPHN0cmluZz4gR2V0VmFsaWRhdGlvbkVycm9ycyh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gZXhjZXB0aW9uLkdldFZhbGlkYXRpb25FcnJvclJlc3BvbnNlKCk7XG5cbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlcnJvciBpbiBlcnJvcnMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGVycm9yRGVzY3JpcHRpb24gaW4gZXJyb3IuVmFsdWUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCByZXR1cm4gc3RyaW5nLkZvcm1hdChcInswfSB7MX1cIixlcnJvci5LZXksZXJyb3JEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IGVycm9yIGZvciBodG1sZXJyb3Jjb2RlXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImVycm9yQ29kZVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEdldEVycm9yRm9yQ29kZShpbnQgZXJyb3JDb2RlKVxuICAgICAgICB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVycm9yQ29kZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXNlIDQwMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiVW5hdXRob3JpemVkXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkZvcmJpZGRlblwiO1xuICAgICAgICAgICAgICAgIGNhc2UgNDA0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOb3QgRm91bmRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDQyMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiVmFsaWRhdGlvbiBFcnJvclwiO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkdlbmVyaWMgRXJyb3JcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdldCBlcnJvciBjb2RlIGZvciBwcm9taXNlIGV4Y2VwdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleGNlcHRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBFcnJvckNvZGUodGhpcyBQcm9taXNlRXhjZXB0aW9uIGV4Y2VwdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVycm9yQ29kZSA9IChpbnQpZXhjZXB0aW9uLkFyZ3VtZW50c1swXS5Ub0R5bmFtaWMoKS5zdGF0dXM7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JDb2RlO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuQ2xhc3Nlc1xue1xuICAgIHB1YmxpYyBjbGFzcyBGZWVkUmVxdWVzdEJ1aWxkZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgaW50IF9vZmZzZXQ7XG4gICAgICAgIHByaXZhdGUgaW50IF9saW1pdDtcblxuXG4gICAgICAgIHByaXZhdGUgRmVlZFJlcXVlc3RCdWlsZGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSAyMDtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIEZlZWRSZXF1ZXN0QnVpbGRlciBEZWZhdWx0KClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZWVkUmVxdWVzdEJ1aWxkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVxdWVzdEJ1aWxkZXIgV2l0aE9mZlNldChpbnQgb2Zmc2V0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVxdWVzdEJ1aWxkZXIgV2l0aExpbWl0KGludCBsaW1pdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSBsaW1pdDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJ1aWxkKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcihcImFydGljbGVzL2ZlZWRcIik7XG5cbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCI/bGltaXQ9ezB9XCIsdGhpcy5fbGltaXQpKTtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJm9mZnNldD17MH1cIix0aGlzLl9vZmZzZXQpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG5cclxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXJ0aWNsZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQXV0aG9yID0gbmV3IEF1dGhvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidGl0bGVcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUaXRsZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJzbHVnXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2x1ZyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJib2R5XCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQm9keSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJjcmVhdGVkQXRcIildXHJcbiAgICAgICAgcHVibGljIERhdGVUaW1lPyBDcmVhdGVkQXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidXBkYXRlZEF0XCIpXVxyXG4gICAgICAgIHB1YmxpYyBEYXRlVGltZT8gVXBkYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInRhZ0xpc3RcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIFRhZ0xpc3QgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiZGVzY3JpcHRpb25cIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJhdXRob3JcIildXHJcbiAgICAgICAgcHVibGljIEF1dGhvciBBdXRob3IgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiZmF2b3JpdGVkXCIpXVxyXG4gICAgICAgIHB1YmxpYyBib29sIEZhdm9yaXRlZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJmYXZvcml0ZXNDb3VudFwiKV1cclxuICAgICAgICBwdWJsaWMgbG9uZyBGYXZvcml0ZXNDb3VudCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ3JlYXRlIHtnZXR7cmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsdGhpcy5DcmVhdGVkQXQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxEYXRlVGltZT4oXCJrZXkxXCIpLlRvU3RyaW5nKFwiTU1NTSBkZFwiKTooc3RyaW5nKW51bGw7fX1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5Nb2RlbHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQ29tbWVudFxuICAgIHtcbiAgICAgICAgcHVibGljIENvbW1lbnQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkF1dGhvciA9IG5ldyBBdXRob3IoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImlkXCIpXVxuICAgICAgICBwdWJsaWMgbG9uZyBJZCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImNyZWF0ZWRBdFwiKV1cbiAgICAgICAgcHVibGljIERhdGVUaW1lIENyZWF0ZWRBdCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInVwZGF0ZWRBdFwiKV1cbiAgICAgICAgcHVibGljIERhdGVUaW1lIFVwZGF0ZWRBdCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImJvZHlcIildXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQm9keSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImF1dGhvclwiKV1cbiAgICAgICAgcHVibGljIEF1dGhvciBBdXRob3IgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHN0cmluZyBDcmVhdGUge2dldHtyZXR1cm4gdGhpcy5DcmVhdGVkQXQuVG9TdHJpbmcoXCJNTU1NIGRkXCIpO319XG5cbiAgICB9XG59IiwiXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXG57XG4gICAgcHVibGljIGNsYXNzIFBhZ2luYXRvclxuICAgIHtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPkFjdGl2ZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBpbnQgUGFnZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFBhZ2luYXRvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90YWc7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9hdXRob3I7XG4gICAgICAgIHByaXZhdGUgaW50IF9vZmZzZXQ7XG4gICAgICAgIHByaXZhdGUgaW50IF9saW1pdDtcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3VzZXI7XG5cblxuICAgICAgICBwcml2YXRlIEFydGljbGVSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gMjA7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgRGVmYXVsdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhPZmZTZXQoaW50IG9mZnNldClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhMaW1pdChpbnQgbGltaXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgT2ZBdXRob3Ioc3RyaW5nIGF1dGhvcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fYXV0aG9yID0gYXV0aG9yO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhUYWcoc3RyaW5nIHRhZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdGFnID0gdGFnO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgT2ZGYXZvcml0ZShzdHJpbmcgdXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdXNlciA9IHVzZXI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHN0cmluZyBCdWlsZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoXCJhcnRpY2xlc1wiKTtcblxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIj9saW1pdD17MH1cIix0aGlzLl9saW1pdCkpO1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmb2Zmc2V0PXswfVwiLHRoaXMuX29mZnNldCkpO1xuXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3RhZykpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmdGFnPXswfVwiLHRoaXMuX3RhZykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX2F1dGhvcikpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmYXV0aG9yPXswfVwiLHRoaXMuX2F1dGhvcikpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3VzZXIpKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJmZhdm9yaXRlZD17MH1cIix0aGlzLl91c2VyKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGFic3RyYWN0IGNsYXNzIFJlc291cmNlQmFzZVxuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2VuZXJpYyBBd2FpdGFibGUgYWpheCBjYWxsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBUYXNrPFQ+IE1ha2VDYWxsPFQ+KEFqYXhPcHRpb25zIG9wdGlvbnMpIFxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gVGFzay5Gcm9tUHJvbWlzZTxUPihqUXVlcnkuQWpheChvcHRpb25zKVxuICAgICAgICAgICAgICAgICwgKEZ1bmM8b2JqZWN0LCBzdHJpbmcsIGpxWEhSLCBUPikgKChyZXNPYmosIHN1Y2Nlc3MsIGpxWGhyKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLlN0cmluZ2lmeShyZXNPYmopO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gSnNvbkNvbnZlcnQuRGVzZXJpYWxpemVPYmplY3Q8VD4oanNvbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBSZXR5cGVkO1xudXNpbmcgQ29tbWVudCA9IHJlYWx3b3JsZC5zcGFmLk1vZGVscy5Db21tZW50O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIEFydGljbGVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuQXJ0aWNsZUlkO31cblxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcnRpY2xlUmVzb3VyY2VzIF9hcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElQcm9maWxlUmVzb3VyY2VzIF9wcm9maWxlUmVzb3VyY2VzO1xuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlIEFydGljbGUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQ29tbWVudD5Db21tZW50cyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkNvbW1lbnQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIGJvb2wgSXNMb2dnZWQge2dldHtyZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQ7fX1cbiAgICAgICAgcHVibGljIFVzZXIgTG9nZ2VkVXNlciB7Z2V0e3JldHVybiB0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyO319XG5cbiAgICAgICAgcHVibGljIEFydGljbGVWaWV3TW9kZWwoSUFydGljbGVSZXNvdXJjZXMgYXJ0aWNsZVJlc291cmNlcywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBcbiAgICAgICAgICAgIElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJUHJvZmlsZVJlc291cmNlcyBwcm9maWxlUmVzb3VyY2VzKVxuICAgICAgICB7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfcHJvZmlsZVJlc291cmNlcyA9IHByb2ZpbGVSZXNvdXJjZXM7XG5cbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZSA9IG5ldyBBcnRpY2xlKCk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnRzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxDb21tZW50PigpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB2YXIgc2x1ZyA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJzbHVnXCIpO1xuICAgICAgICAgICAgaWYoc3RyaW5nLklzTnVsbE9yRW1wdHkoc2x1ZykpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIkFydGljbGUgcGFnZSBuZWVkIHNsdWcgcGFyYW1ldGVyXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVRhc2sgPSB0aGlzLkxvYWRBcnRpY2xlKHNsdWcpO1xuICAgICAgICAgICAgdmFyIGNvbW1lbnRzVGFzayA9IHRoaXMuTG9hZENvbW1lbnRzKHNsdWcpO1xuICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsKGFydGljbGVUYXNrLGNvbW1lbnRzVGFzayk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaEJpbmRpbmcoKTsgLy8gbWFudWFsIHJlZnJlc2ggZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuRW5hYmxlU3BhZkFuY2hvcnMoKTsgLy8gdG9kbyBjaGVjayB3aHkgbm90IGF1dG8gZW5hYmxlZFxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQWRkIGNvbW1lbnQgdG8gYXJ0aWNsZVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRDb21tZW50KClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLklzTG9nZ2VkKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBjb21tZW50UmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkFkZENvbW1lbnQodGhpcy5BcnRpY2xlLlNsdWcsIHRoaXMuQ29tbWVudC5TZWxmKCkpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50LlNlbGYoc3RyaW5nLkVtcHR5KTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMucHVzaChjb21tZW50UmVzcG9uc2UuQ29tbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBGb2xsb3cgQXJ0aWNsZSBBdXRob3JcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRm9sbG93QXV0aG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlcy5Gb2xsb3codGhpcy5BcnRpY2xlLkF1dGhvci5Vc2VybmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE1hbnVhbCByZXZhbHVhdGUgYmluZGluZ1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwcml2YXRlIHZvaWQgUmVmcmVzaEJpbmRpbmcoKVxuICAgICAgICB7XG4gICAgICAgICAgICBSZXR5cGVkLmtub2Nrb3V0LmtvLmNsZWFuTm9kZSh0aGlzLlBhZ2VOb2RlKTtcbiAgICAgICAgICAgIGJhc2UuQXBwbHlCaW5kaW5ncygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBjb21tZW50c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzbHVnXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRDb21tZW50cyhzdHJpbmcgc2x1ZylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGVDb21tZW50cyhzbHVnKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMucHVzaChjb21tZW50LkNvbW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgQXJ0aWNsZSBpbmZvXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNsdWdcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZEFydGljbGUoc3RyaW5nIHNsdWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlKHNsdWcpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlID0gYXJ0aWNsZS5BcnRpY2xlO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBSZXR5cGVkO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIEVkaXRBcnRpY2xlVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5FZGl0QXJ0aWNsZUlkO31cblxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5UaXRsZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkJvZHkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5EZXNjcmlwdGlvbiB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlRhZ3MgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIEVkaXRBcnRpY2xlVmlld01vZGVsKElBcnRpY2xlUmVzb3VyY2VzIGFydGljbGVSZXNvdXJjZXMsIElOYXZpZ2F0b3IgbmF2aWdhdG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgdGhpcy5UaXRsZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuQm9keSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRGVzY3JpcHRpb24gPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlRhZ3MgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk9uTG9hZChwYXJhbWV0ZXJzKTtcblxuLy8gICAgICAgICAgICB2YXIgYXJ0aWNsZVNsdWcgPSBwYXJhbWV0ZXJzLkdldFBhcmFtZXRlcjxzdHJpbmc+KFwic2x1Z1wiKTtcbi8vICAgICAgICAgICAgaWYoc3RyaW5nLklzTnVsbE9yRW1wdHkoYXJ0aWNsZVNsdWcpKVxuLy8gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlNsdWcgbWlzc2luZyFcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQ3JlYXRlKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gdG9kbyB2YWxpZGF0aW9uc1xuICAgICAgICAgICAgdmFyIG5ld0FydGljZWwgPSBuZXcgTmV3QXJ0aWNsZVJlcXVlc3RcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBBcnRpY2xlID0gbmV3IE5ld0FydGljbGVcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFRpdGxlID0gdGhpcy5UaXRsZS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEJvZHkgPSB0aGlzLkJvZHkuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbiA9IHRoaXMuRGVzY3JpcHRpb24uU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBUYWdMaXN0ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4odGhpcy5UYWdzLlNlbGYoKS5TcGxpdCgnLCcpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBhcnRpY2xlID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5DcmVhdGUobmV3QXJ0aWNlbCk7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuQXJ0aWNsZS5TbHVnKTtyZXR1cm4gX28xO30pKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIEJyaWRnZS5TcGFmO1xyXG51c2luZyBCcmlkZ2UuU3BhZi5BdHRyaWJ1dGVzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xyXG57XHJcbiAgICBjbGFzcyBIb21lVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5Ib21lSWQ7fVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfdGFnRmlsdGVyID0gbnVsbDsgLy8gdGFnIGZpbHRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX3Jlc291cmNlcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVzc2VuZ2VyIF9tZXNzZW5nZXI7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUZlZWRSZXNvdXJjZXMgX2ZlZWRSZXNvdXJjZXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XHJcblxyXG4gICAgICAgICNyZWdpb24gS05PQ0tPVVRKU1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5BcnRpY2xlPkFydGljbGVzOyAvLyBhcnRpY2xlc1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5QYWdpbmF0b3I+UGFnZXM7IC8vIHBhZ2luYXRvciBoZWxwZXJcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8c3RyaW5nPlRhZ3M7IC8vIHRhZ3NcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5BY3RpdmVUYWJJbmRleDsgLy8gdGFiIGFjdGl2ZSBpbmRleFxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+VGFicztcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SXNMb2dnZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIEhvbWVWaWV3TW9kZWwoSUFydGljbGVSZXNvdXJjZXMgcmVzb3VyY2VzLCBJU2V0dGluZ3Mgc2V0dGluZ3MsIElNZXNzZW5nZXIgbWVzc2VuZ2VyLFxyXG4gICAgICAgICAgICBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIElGZWVkUmVzb3VyY2VzIGZlZWRSZXNvdXJjZXMsIElOYXZpZ2F0b3IgbmF2aWdhdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jlc291cmNlcyA9IHJlc291cmNlcztcclxuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIF9tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XHJcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xyXG4gICAgICAgICAgICBfZmVlZFJlc291cmNlcyA9IGZlZWRSZXNvdXJjZXM7XHJcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPEFydGljbGU+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGFnZXMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPFBhZ2luYXRvcj4oKTtcclxuICAgICAgICAgICAgdGhpcy5UYWdzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFicyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4odGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQpO1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigtMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbC5Vc2VyU2VydmljZT4pKHNlcnZpY2UgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZC5TZWxmKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyByZWxvYWQgYXJ0aWNsZXMgZm9yIHNlZSBmYXZvcml0ZXNcclxuICAgICAgICAgICAgICAgIHZhciBhcnRpY2xlc1Rhc2sgPSB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7IC8vIGxvYWQgYXJ0aWNsZSB0YXNrXHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZXNUYXNrLlJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7IC8vIGFsd2F5cyBjYWxsIGJhc2UgKHdoZXJlIGFwcGx5YmluZGluZylcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlc1Rhc2sgPSB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7IC8vIGxvYWQgYXJ0aWNsZSB0YXNrXHJcbiAgICAgICAgICAgIHZhciBsb2FkVGFnc1Rhc2sgPSB0aGlzLkxvYWRUYWdzKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbChhcnRpY2xlc1Rhc2ssbG9hZFRhZ3NUYXNrKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVzVGFzay5SZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25MZWF2ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uTGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlVuc3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLCBTcGFmQXBwLkxvZ2luSWQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gS05PQ0tPVVQgTUVUSE9EU1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIHVzZXIgZGV0YWlsXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvVXNlcihBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Qcm9maWxlSWQsIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInVzZXJuYW1lXCIsYXJ0aWNsZS5BdXRob3IuVXNlcm5hbWUpO3JldHVybiBfbzE7fSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGFydGljbGUgZGV0YWlsXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvQXJ0aWNsZShBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFkZCBwYXNzZWQgYXJ0aWNsZSB0byBmYXZcclxuICAgICAgICAvLy8gT25seSBmb3IgYXV0aCB1c2Vyc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRUb0Zhdm91cml0ZShBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQuU2VsZigpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgc2luZ2xlQXJ0aWNsZSA9IGFydGljbGUuRmF2b3JpdGVkID8gYXdhaXQgdGhpcy5fcmVzb3VyY2VzLlVuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKSA6IFxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVzb3VyY2VzLkZhdm9yaXRlKGFydGljbGUuU2x1Zyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlcGxhY2UoYXJ0aWNsZSxzaW5nbGVBcnRpY2xlLkFydGljbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHbyB0byB1c2VyIGZlZWRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVzZXRUYWJzRm9yRmVlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoLTIpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLkxvYWRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVzZXQgVGFiXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlc2V0VGFicygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoLTEpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlUmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHbyB0byBwYWdlXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdpbmF0b3JcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgR29Ub1BhZ2UoUGFnaW5hdG9yIHBhZ2luYXRvcilcclxuICAgICAgICB7XHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2luZ2xlPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj4oICAgICAgICAgICAgdGhpcy5QYWdlcy5TZWxmKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yLCBib29sPikocyA9PiBzLkFjdGl2ZS5TZWxmKCkpKS5BY3RpdmUuU2VsZihmYWxzZSk7XHJcbiAgICAgICAgICAgIHBhZ2luYXRvci5BY3RpdmUuU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgLldpdGhPZmZTZXQoKHBhZ2luYXRvci5QYWdlLTEpKnRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpXHJcbiAgICAgICAgICAgICAgICAuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl90YWdGaWx0ZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuV2l0aFRhZyh0aGlzLl90YWdGaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5Mb2FkQXJ0aWNsZXMocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEZpbHRlciBhcnRpY2xlcyBieSB0YWdcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhZ1wiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGaWx0ZXJCeVRhZyhzdHJpbmcgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhYk5hbWUgPSBzdHJpbmcuRm9ybWF0KFwiI3swfVwiLHRhZyk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuQXJ0aWNsZXNGb3JUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgYXJ0aWNsZXMgZm9yIHBhc3NlZCB0YWJcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhYlwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBcnRpY2xlc0ZvclRhYihzdHJpbmcgdGFiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSB0YWIuVHJpbVN0YXJ0KCcjJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IHRhZ05hbWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0dWFsSW5kZXggPSB0aGlzLlRhYnMuU2VsZigpLkluZGV4T2YodGFiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGFjdHVhbEluZGV4ID09IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UYWJzLnB1c2godGFiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZih0aGlzLlRhYnMuU2VsZigpLkluZGV4T2YodGFiKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAuV2l0aFRhZyh0YWdOYW1lKVxyXG4gICAgICAgICAgICAgICAgLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQUklWQVRFIE1FVEhPRFNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGFydGljbGVzXHJcbiAgICAgICAgLy8vIENsZWFyIGxpc3QgYW5kIHJlbG9hZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBMb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIHJlcXVlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVJlc29SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5HZXRBcnRpY2xlcyhyZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZVJlc29SZXNwb25zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGZlZWRcclxuICAgICAgICAvLy8gQ2xlYXIgbGlzdCBhbmQgcmVsb2FkXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IExvYWRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlciByZXF1ZXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZlZWRSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2ZlZWRSZXNvdXJjZXMuR2V0RmVlZChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKGZlZWRSZXNwb25zZS5BcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZWVkUmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbG9hZCB0YWdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkVGFncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFncyA9IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5HZXRUYWdzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFncy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5UYWdzLnB1c2godGFncy5UYWdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBXaGVuIHVwZGF0ZSBhcnRpY2xlcyByZWJ1aWxkIHBhZ2luYXRvclxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVJlc29SZXNwb25zZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlZnJlc2hQYWdpbmF0b3IoQXJ0aWNsZVJlc3BvbnNlIGFydGljbGVSZXNvUmVzcG9uc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBhZ2VzLnJlbW92ZUFsbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5BcnRpY2xlPihhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzKSkgcmV0dXJuOyAvLyBubyBhcnRpY2xlc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHBhZ2VzQ291bnQgPSAoaW50KSAoYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlc0NvdW50IC8gYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlcy5MZW5ndGgpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBFbnVtZXJhYmxlLlJhbmdlKDEsIHBhZ2VzQ291bnQpO1xyXG4gICAgICAgICAgICB2YXIgcGFnZXMgPSByYW5nZS5TZWxlY3Q8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yPigoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxpbnQsIGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj4pKHMgPT4gbmV3IFBhZ2luYXRvclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQYWdlID0gc1xyXG4gICAgICAgICAgICB9KSkuVG9BcnJheSgpO1xyXG4gICAgICAgICAgICBwYWdlc1swXS5BY3RpdmUuU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcy5wdXNoKHBhZ2VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgTG9naW5WaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuTG9naW5JZDt9XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+RW1haWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5QYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0J1c3kgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8c3RyaW5nPkVycm9ycyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIExvZ2luVmlld01vZGVsKElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcblxuICAgICAgICAgICAgdGhpcy5FbWFpbCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc3dvcmQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLklzQnVzeSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBMb2dpbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuSXNCdXN5LlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuTG9naW4odGhpcy5FbWFpbC5TZWxmKCksIHRoaXMuUGFzc3dvcmQuU2VsZigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLklzQnVzeS5TZWxmKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgQnJpZGdlLlNwYWYuQXR0cmlidXRlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBbU2luZ2xlSW5zdGFuY2VdXG4gICAgcHVibGljIGNsYXNzIE1haW5WaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzTG9nZ2VkIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgTWFpblZpZXdNb2RlbChJTWVzc2VuZ2VyIG1lc3NlbmdlciwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPihmYWxzZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsLlVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZC5TZWxmKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFwcGx5IGJpbmRpbmcgdG8gbWFpbm1vZGVsXG4gICAgICAgIC8vLyB0cnkgYXV0byBsb2dpblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJldHlwZWQua25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLlRyeUF1dG9Mb2dpbldpdGhTdG9yZWRUb2tlbigpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgUHJvZmlsZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5Qcm9maWxlSWQ7fVxuXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVByb2ZpbGVSZXNvdXJjZXMgX3Byb2ZpbGVSZXNvdXJjZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcnRpY2xlUmVzb3VyY2VzIF9hcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVzc2VuZ2VyIF9tZXNzZW5nZXI7XG5cbiAgICAgICAgcHVibGljIFByb2ZpbGVNb2RlbCBQcm9maWxlTW9kZWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5BY3RpdmVUYWJJbmRleDsgLy8gdGFiIGFjdGl2ZSBpbmRleFxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SXNMb2dnZWQgeyBnZXQ7IHNldDsgfVxuXG5cbiAgICAgICAgcHVibGljIFByb2ZpbGVWaWV3TW9kZWwoSVByb2ZpbGVSZXNvdXJjZXMgcHJvZmlsZVJlc291cmNlLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIFxuICAgICAgICAgICAgSUFydGljbGVSZXNvdXJjZXMgYXJ0aWNsZVJlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElNZXNzZW5nZXIgbWVzc2VuZ2VyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbCA9IG5ldyBQcm9maWxlTW9kZWwoKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2ZpbGVSZXNvdXJjZSA9IHByb2ZpbGVSZXNvdXJjZTtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICAgICAgX2FydGljbGVSZXNvdXJjZXMgPSBhcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF9tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XG5cbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXggPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KDApO1xuICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KHRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlN1YnNjcmliZTxVc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGwuVXNlclNlcnZpY2U+KShzZXJ2aWNlID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZC5TZWxmKHRydWUpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBzdHJpbmcuRW1wdHk7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJ1c2VybmFtZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTm8gdXNlcm5hbWUgcGFzc2VkIGFuZCB5b3UgYXJlIG5vdCBsb2dnZWQhXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gdGhpcy5fdXNlclNlcnZpY2UuTG9nZ2VkVXNlci5Vc2VybmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHVzZXJUYXNrID0gdGhpcy5Mb2FkVXNlcih1c2VybmFtZSk7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVRhc2sgPSB0aGlzLkxvYWRBcnRpY2xlcyh1c2VybmFtZSk7XG4gICAgICAgICAgICB2YXIgZmF2b3VyaXRlVGFzayA9IHRoaXMuTG9hZEZhdm91cml0ZXNBcnRpY2xlcyh1c2VybmFtZSk7XG5cbiAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbCh1c2VyVGFzaywgYXJ0aWNsZVRhc2ssIGZhdm91cml0ZVRhc2spO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuU2hvd0FydGljbGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPbkxlYXZlKClcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxlYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuVW5zdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsIFNwYWZBcHAuTG9naW5JZCk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQWRkIHBhc3NlZCBhcnRpY2xlIHRvIGZhdlxuICAgICAgICAvLy8gT25seSBmb3IgYXV0aCB1c2Vyc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQWRkVG9GYXZvdXJpdGUoQXJ0aWNsZSBhcnRpY2xlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQuU2VsZigpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBzaW5nbGVBcnRpY2xlID0gYXJ0aWNsZS5GYXZvcml0ZWQgPyBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLlVuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKSA6IFxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuQXJ0aWNsZXMucmVwbGFjZShhcnRpY2xlLHNpbmdsZUFydGljbGUuQXJ0aWNsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBGb2xsb3cgLyB1bmZvbGxvd1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGb2xsb3coKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSB0aGlzLlByb2ZpbGVNb2RlbC5Vc2VybmFtZS5TZWxmKCk7XG4gICAgICAgICAgICB2YXIgZm9sbG93ID0gdGhpcy5Qcm9maWxlTW9kZWwuRm9sbG93aW5nLlNlbGYoKSA/IGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZS5VbkZvbGxvdyh1c2VybmFtZSkgXG4gICAgICAgICAgICAgICAgOiBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2UuRm9sbG93KHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLkZvbGxvd2luZy5TZWxmKGZvbGxvdy5Qcm9maWxlLkZvbGxvd2luZyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIHVzZXIgZGV0YWlsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvVXNlcihBcnRpY2xlIGFydGljbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLlByb2ZpbGVJZCwgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwidXNlcm5hbWVcIixhcnRpY2xlLkF1dGhvci5Vc2VybmFtZSk7cmV0dXJuIF9vMTt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGFydGljbGUgZGV0YWlsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvQXJ0aWNsZShBcnRpY2xlIGFydGljbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkFydGljbGVJZCxnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJzbHVnXCIsYXJ0aWNsZS5TbHVnKTtyZXR1cm4gX28xO30pKTtcbiAgICAgICAgfVxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBTaG93IHVzZXIgYXJ0aWNsZXNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0FydGljbGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKDApO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuU2hvd0FydGljbGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBTaG93IGZhdnNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0Zhdm91cml0ZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoMSk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5TaG93RmF2b3VyaXRlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCB1c2VyIGRhdGFcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidXNlcm5hbWVcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZFVzZXIoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcHJvZmlsZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlLkdldCh1c2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5NYXBNZShwcm9maWxlUmVzcG9uc2UuUHJvZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIEFydGljbGVzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkQXJ0aWNsZXMoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KDUpXG4gICAgICAgICAgICAgICAgLk9mQXV0aG9yKHVzZXJuYW1lKSk7XG5cbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlVzZXJBcnRpY2xlcyA9IGFydGljbGVzLkFydGljbGVzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIEFydGljbGVzIEZhdm9yaXRlc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZEZhdm91cml0ZXNBcnRpY2xlcyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlcyA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQoNSlcbiAgICAgICAgICAgICAgICAuT2ZGYXZvcml0ZSh1c2VybmFtZSkpO1xuXG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5GYXZvdXJ0aXRlcyA9IGFydGljbGVzLkFydGljbGVzO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3MgUHJvZmlsZU1vZGVsXG4gICAge1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5JbWFnZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlVzZXJuYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+QmlvIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPkZvbGxvd2luZyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkFydGljbGU+QXJ0aWNsZXMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxBcnRpY2xlPiBVc2VyQXJ0aWNsZXMgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8QXJ0aWNsZT4gRmF2b3VydGl0ZXMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlTW9kZWwoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkltYWdlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuQmlvID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Gb2xsb3dpbmcgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPigpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8QXJ0aWNsZT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIE1hcE1lIChQcm9maWxlIHByb2ZpbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuSW1hZ2UuU2VsZihwcm9maWxlLkltYWdlKTtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUuU2VsZihwcm9maWxlLlVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuQmlvLlNlbGYocHJvZmlsZS5CaW8pO1xuICAgICAgICAgICAgdGhpcy5Gb2xsb3dpbmcuU2VsZihwcm9maWxlLkZvbGxvd2luZyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93QXJ0aWNsZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5BcnRpY2xlPih0aGlzLlVzZXJBcnRpY2xlcykpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93RmF2b3VyaXRlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkFydGljbGU+KHRoaXMuRmF2b3VydGl0ZXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgUmV0eXBlZDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBSZWdpc3RlclZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5SZWdpc3RlcklkO31cblxuICAgICAgICBwdWJsaWMga25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlPHN0cmluZz4gVXNlcm5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMga25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlPHN0cmluZz4gRW1haWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMga25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlPHN0cmluZz4gUGFzc3dvcmQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMga25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXk8c3RyaW5nPiBFcnJvcnMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBSZWdpc3RlclZpZXdNb2RlbChJTmF2aWdhdG9yIG5hdmlnYXRvciwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FbWFpbCA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlBhc3N3b3JkID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSZWdpc3RlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLlJlZ2lzdGVyKHRoaXMuVXNlcm5hbWUuU2VsZigpLCB0aGlzLkVtYWlsLlNlbGYoKSwgdGhpcy5QYXNzd29yZC5TZWxmKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkhvbWVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhdGNoIChQcm9taXNlRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IGUuR2V0VmFsaWRhdGlvbkVycm9ycygpO1xuICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oZXJyb3JzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIFNldHRpbmdzVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3NSZXNvdXJjZXMgX3NldHRpbmdzUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcblxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5TZXR0aW5nc0lkO31cblxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5JbWFnZVVyaSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlVzZXJuYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+QmlvZ3JhcGh5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+RW1haWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5OZXdQYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+RXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIHB1YmxpYyBTZXR0aW5nc1ZpZXdNb2RlbChJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIElTZXR0aW5nc1Jlc291cmNlcyBzZXR0aW5nc1Jlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1Jlc291cmNlcyA9IHNldHRpbmdzUmVzb3VyY2VzO1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuXG4gICAgICAgICAgICB0aGlzLkltYWdlVXJpID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuQmlvZ3JhcGh5ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FbWFpbCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuTmV3UGFzc3dvcmQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xuXG4gICAgICAgICAgICB0aGlzLlBvcHVsYXRlRW50cmllcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFBvcHVsYXRlRW50cmllcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gdGhpcy5fdXNlclNlcnZpY2UuTG9nZ2VkVXNlcjtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUuU2VsZih1c2VyLlVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuRW1haWwuU2VsZih1c2VyLkVtYWlsKTtcbiAgICAgICAgICAgIHRoaXMuSW1hZ2VVcmkuU2VsZih1c2VyLkltYWdlKTtcbiAgICAgICAgICAgIHRoaXMuQmlvZ3JhcGh5LlNlbGYodXNlci5CaW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIFVwZGF0ZVNldHRpbmdzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzUmVxdWVzdCA9IG5ldyBTZXR0aW5nc1JlcXVlc3RcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFVzZXJuYW1lID0gdGhpcy5Vc2VybmFtZS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIE5ld1Bhc3N3b3JkID0gdGhpcy5OZXdQYXNzd29yZC5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEJpb2dyYXBoeSA9IHRoaXMuQmlvZ3JhcGh5LlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSB0aGlzLkVtYWlsLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VVcmkgPSB0aGlzLkltYWdlVXJpLlNlbGYoKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgdXNlclVwZGF0ZWQgPSBhd2FpdCB0aGlzLl9zZXR0aW5nc1Jlc291cmNlcy5VcGRhdGVTZXR0aW5ncyhzZXR0aW5nc1JlcXVlc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLlByb2ZpbGVJZCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChQcm9taXNlRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IGUuR2V0VmFsaWRhdGlvbkVycm9ycygpO1xuICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oZXJyb3JzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgYWJzdHJhY3QgY2xhc3MgQXV0aG9yaXplZFJlc291cmNlQmFzZSA6IFJlc291cmNlQmFzZVxuICAgIHtcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IElVc2VyU2VydmljZSBVc2VyU2VydmljZTtcblxuICAgICAgICBwcm90ZWN0ZWQgQXV0aG9yaXplZFJlc291cmNlQmFzZShJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdlbmVyaWMgQXdhaXRhYmxlIGFqYXggY2FsbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJvdGVjdGVkIFRhc2s8VD4gTWFrZUF1dGhvcml6ZWRDYWxsPFQ+KEFqYXhPcHRpb25zIG9wdGlvbnMpIFxuICAgICAgICB7XG4gICAgICAgICAgICBpZighdGhpcy5Vc2VyU2VydmljZS5Jc0xvZ2dlZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiWW91IG11c3QgYmUgbG9nZ2VkIHRvIHVzZSB0aGlzIHJlc291cmNlXCIpO1xuXG4gICAgICAgICAgICBvcHRpb25zLkJlZm9yZVNlbmQgPSAoeGhyLCBvKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHhoci5TZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBzdHJpbmcuRm9ybWF0KFwiVG9rZW4gezB9XCIsdGhpcy5Vc2VyU2VydmljZS5Mb2dnZWRVc2VyLlRva2VuKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8VD4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIExvY2FsU3RvcmFnZVJlcG9zaXRvcnkgOiBJUmVwb3NpdG9yeVxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBzdHJpbmcgVG9rZW5LZXkgPSBcInRva2VuXCI7XG4gICAgICAgIHByaXZhdGUgU3RvcmFnZSBfc3RvcmFnZTtcblxuICAgICAgICBwdWJsaWMgTG9jYWxTdG9yYWdlUmVwb3NpdG9yeSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UgPSBXaW5kb3cuTG9jYWxTdG9yYWdlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdm9pZCBTYXZlVG9rZW4oc3RyaW5nIHRva2VuKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLlNldEl0ZW0oVG9rZW5LZXksdG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRUb2tlbklmRXhpc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLl9zdG9yYWdlLkdldEl0ZW0oVG9rZW5LZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuIT1udWxsP3Rva2VuLlRvU3RyaW5nKCk6KHN0cmluZyludWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgRGVsZXRlVG9rZW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLlJlbW92ZUl0ZW0oVG9rZW5LZXkpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFVzZXJSZXNvdXJjZXMgOiBSZXNvdXJjZUJhc2UsIElVc2VyUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIFVzZXJSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzKSBcbiAgICAgICAge1xuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gTG9naW4oU2lnblJlcXVlc3QgbG9naW5SZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlcnMvbG9naW5cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChsb2dpblJlcXVlc3QpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBSZWdpc3RlcihTaWduUmVxdWVzdCBsb2dpblJlcXVlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2Vyc1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KGxvZ2luUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpZ25SZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IEdldEN1cnJlbnRVc2VyKHN0cmluZyB0b2tlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQmVmb3JlU2VuZCA9ICh4aHIsIG8pID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4aHIuU2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgc3RyaW5nLkZvcm1hdChcIlRva2VuIHswfVwiLHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpZ25SZXNwb25zZT4ob3B0aW9ucyk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFVzZXJTZXJ2aWNlIDogSVVzZXJTZXJ2aWNlXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyUmVzb3VyY2VzIF91c2VyUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUmVwb3NpdG9yeSBfcmVwb3NpdG9yeTtcblxuICAgICAgICBwdWJsaWMgVXNlclNlcnZpY2UoSVVzZXJSZXNvdXJjZXMgdXNlclJlc291cmNlcywgSU1lc3NlbmdlciBtZXNzZW5nZXIsIElSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF91c2VyUmVzb3VyY2VzID0gdXNlclJlc291cmNlcztcbiAgICAgICAgICAgIF9tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XG4gICAgICAgICAgICBfcmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVXNlciBMb2dnZWRVc2VyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuICAgICAgICBwdWJsaWMgYm9vbCBJc0xvZ2dlZCB7Z2V0e3JldHVybiB0aGlzLkxvZ2dlZFVzZXIgIT0gbnVsbDt9fVxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIExvZ2luKHN0cmluZyBtYWlsLCBzdHJpbmcgcGFzc3dvcmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsb2dpblJlc3BvbnNlID0gYXdhaXQgdGhpcy5fdXNlclJlc291cmNlcy5Mb2dpbihuZXcgU2lnblJlcXVlc3RcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VyID0gbmV3IFVzZXJSZXF1ZXN0XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IG1haWwsXG4gICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkID0gcGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbG9naW5SZXNwb25zZS5Vc2VyO1xuICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5TYXZlVG9rZW4obG9naW5SZXNwb25zZS5Vc2VyLlRva2VuKTtcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TZW5kPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbC5Vc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSZWdpc3RlcihzdHJpbmcgdXNlcm5hbWUsIHN0cmluZyBtYWlsLCBzdHJpbmcgcGFzc3dvcmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsb2dpblJlc3BvbnNlID0gYXdhaXQgdGhpcy5fdXNlclJlc291cmNlcy5SZWdpc3RlcihuZXcgU2lnblJlcXVlc3RcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VyID0gbmV3IFVzZXJSZXF1ZXN0XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IG1haWwsXG4gICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkID0gcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIFVzZXJuYW1lID0gdXNlcm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbG9naW5SZXNwb25zZS5Vc2VyO1xuICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5TYXZlVG9rZW4obG9naW5SZXNwb25zZS5Vc2VyLlRva2VuKTtcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TZW5kPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbC5Vc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBUcnlBdXRvTG9naW5XaXRoU3RvcmVkVG9rZW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RvcmVkVG9rZW4gPSB0aGlzLl9yZXBvc2l0b3J5LkdldFRva2VuSWZFeGlzdCgpO1xuICAgICAgICAgICAgaWYgKHN0b3JlZFRva2VuID09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl91c2VyUmVzb3VyY2VzLkdldEN1cnJlbnRVc2VyKHN0b3JlZFRva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLkxvZ2dlZFVzZXIgPSBsb2dpblJlc3BvbnNlLlVzZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5TYXZlVG9rZW4obG9naW5SZXNwb25zZS5Vc2VyLlRva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGwuVXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuRGVsZXRlVG9rZW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLkxvZ2dlZFVzZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xyXG5cclxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcclxue1xyXG4gICAgY2xhc3MgQXJ0aWNsZVJlc291cmNlcyA6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElBcnRpY2xlUmVzb3VyY2VzXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xyXG5cclxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IEdldEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlciBidWlsZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksYnVpbGRlci5CdWlsZCgpKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlVzZXJTZXJ2aWNlLklzTG9nZ2VkXHJcbiAgICAgICAgICAgICAgICA/IGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEFydGljbGVSZXNwb25zZT4ob3B0aW9ucylcclxuICAgICAgICAgICAgICAgIDogdGhpcy5NYWtlQ2FsbDxBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8VGFnc1Jlc3BvbnNlPiBHZXRUYWdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdGFnc1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFRhZ3NSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IEdldEFydGljbGUoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gRmF2b3JpdGUoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9mYXZvcml0ZVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gVW5GYXZvcml0ZShzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2Zhdm9yaXRlXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IENyZWF0ZShOZXdBcnRpY2xlUmVxdWVzdCBuZXdBcnRpY2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlc1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobmV3QXJ0aWNsZSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8Q29tbWVudHNSZXNwb25zZT4gR2V0QXJ0aWNsZUNvbW1lbnRzKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vY29tbWVudHNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPENvbW1lbnRzUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQ29tbWVudFJlc3BvbnNlPiBBZGRDb21tZW50KHN0cmluZyBzbHVnLCBzdHJpbmcgY29tbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2NvbW1lbnRzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KG5ldyBDb21tZW50XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9keSA9IGNvbW1lbnRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQ29tbWVudFJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgRmVlZFJlc291cmNlcyA6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElGZWVkUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpIDogYmFzZSh1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBUYXNrPEFydGljbGVSZXNwb25zZT4gR2V0RmVlZChGZWVkUmVxdWVzdEJ1aWxkZXIgYnVpbGRlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxidWlsZGVyLkJ1aWxkKCkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8QXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBQcm9maWxlUmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSVByb2ZpbGVSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgUHJvZmlsZVJlc291cmNlcyhJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIElTZXR0aW5ncyBzZXR0aW5ncykgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPEZvbGxvd1Jlc3BvbnNlPiBGb2xsb3coc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vcHJvZmlsZXMvezF9L2ZvbGxvd1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSx1c2VybmFtZSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEZvbGxvd1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPEZvbGxvd1Jlc3BvbnNlPiBVbkZvbGxvdyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9wcm9maWxlcy97MX0vZm9sbG93XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHVzZXJuYW1lKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJERUxFVEVcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxGb2xsb3dSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxQcm9maWxlUmVzcG9uc2U+IEdldChzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9wcm9maWxlcy97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksdXNlcm5hbWUpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFByb2ZpbGVSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4gIiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgU2V0dGluZ3NSZXNvdXJjZXM6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElTZXR0aW5nc1Jlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBTZXR0aW5nc1Jlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2V0dGluZ3NSZXNwb25zZT4gVXBkYXRlU2V0dGluZ3MoU2V0dGluZ3NSZXF1ZXN0IHNldHRpbmdzUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBVVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KHNldHRpbmdzUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTZXR0aW5nc1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdCn0K
