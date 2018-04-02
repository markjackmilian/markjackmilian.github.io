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
            var $step = 0,
                $task1, 
                $jumpFromFinally, 
                mainVm, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1], $step);
                        switch ($step) {
                            case 0: {
                                Bridge.Navigation.NavigationUtility.VirtualDirectory = "realworld.spaf"; //  virtual dit for release environment

                                Bridge.Spaf.SpafApp.Container = new Bridge.Ioc.BridgeIoc();
                                Bridge.Spaf.SpafApp.ContainerConfig(); // config container
                                mainVm = Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.MainViewModel);
                                $task1 = mainVm.Start();
                                $step = 1;
                                $task1.continueWith($asyncBody, true);
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
                this.IsBusy(true);
                this.Errors.removeAll();
                this._userService.realworld$spaf$Services$IUserService$Login(this.Email(), this.Password()).continueWith(Bridge.fn.bind(this, function (c) {
                    this.IsBusy(false);

                    if (c.isFaulted()) {
                        var firstException = System.Linq.Enumerable.from(c.exception.innerExceptions).first();

                        if (Bridge.is(firstException, Bridge.PromiseException)) {
                            var e = Bridge.cast(System.Linq.Enumerable.from(c.exception.innerExceptions).first(), Bridge.PromiseException);
                            var errors = realworld.spaf.Classes.Extensions.GetValidationErrors(e);
                            this.Errors.push.apply(this.Errors, System.Linq.Enumerable.from(errors).toArray());
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQ3VzdG9tUm91dGVzQ29uZmlnLmNzIiwiU3BhZkFwcC5jcyIsIkNsYXNzZXMvRXh0ZW5zaW9ucy5jcyIsIkNsYXNzZXMvRmVlZFJlcXVlc3RCdWlsZGVyLmNzIiwiTW9kZWxzL0FydGljbGUuY3MiLCJNb2RlbHMvQ29tbWVudC5jcyIsIk1vZGVscy9QYWdpbmF0b3IuY3MiLCJDbGFzc2VzL0FydGljbGVSZXF1ZXN0QnVpbGRlci5jcyIsIlNlcnZpY2VzL2ltcGwvUmVzb3VyY2VCYXNlLmNzIiwiVmlld01vZGVscy9BcnRpY2xlVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9FZGl0QXJ0aWNsZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvSG9tZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvTG9naW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL01haW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1Byb2ZpbGVWaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1JlZ2lzdGVyVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9TZXR0aW5nc1ZpZXdNb2RlbC5jcyIsIlNlcnZpY2VzL2ltcGwvQXV0aG9yaXplZFJlc291cmNlQmFzZS5jcyIsIlNlcnZpY2VzL2ltcGwvTG9jYWxTdG9yYWdlUmVwb3NpdG9yeS5jcyIsIlNlcnZpY2VzL2ltcGwvVXNlclJlc291cmNlcy5jcyIsIlNlcnZpY2VzL2ltcGwvVXNlclNlcnZpY2UuY3MiLCJTZXJ2aWNlcy9pbXBsL0FydGljbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL0ZlZWRSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1Byb2ZpbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1NldHRpbmdzUmVzb3VyY2VzLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7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Z0NBR2RBO2dCQUVqQ0EsY0FBY0EsT0FFSkEsZ0RBQXdDQSx5REFBc0JBOztnQkFNeEVBLE9BQU9BLHVFQUF3Q0E7OzJCQUdsQkE7Z0JBRTdCQSxjQUFjQSxPQUVKQSx5Q0FBaUNBLHlEQUFzQkE7O2dCQU1qRUEsT0FBT0EsaUVBQTRCQSx3RUFBeUNBLFdBQVdBLGtJQUErQkE7Ozs7Ozs7Ozs7Ozs0QkN2Q2pHQSxVQUFvQkE7O29GQUFpQ0E7Z0JBRTFFQSxpQkFBaUJBOzs7O3NDQUd3QkE7Z0JBRXpDQSxjQUFjQSxPQUVKQSxrQ0FBeUJBLGlJQUl4QkEsNENBQTRCQTs7Z0JBR3ZDQSxPQUFPQSx5RUFBMENBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIGNsYXNzIEN1c3RvbVJvdXRlc0NvbmZpZyA6IEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XHJcbiAgICAgICAgcHVibGljIEN1c3RvbVJvdXRlc0NvbmZpZyhJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSUxpc3Q8SVBhZ2VEZXNjcmlwdG9yPiBDcmVhdGVSb3V0ZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PElQYWdlRGVzY3JpcHRvcj4oKSwoX28xKT0+e19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9ob21lLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkhvbWVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8SG9tZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL2xvZ2luLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkxvZ2luSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPExvZ2luVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvcmVnaXN0ZXIuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuUmVnaXN0ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8UmVnaXN0ZXJWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9wcm9maWxlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8UHJvZmlsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9zZXR0aW5ncy5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5TZXR0aW5nc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxTZXR0aW5nc1ZpZXdNb2RlbD4oKSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvZWRpdEFydGljbGUuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuRWRpdEFydGljbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8RWRpdEFydGljbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9hcnRpY2xlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkFydGljbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8QXJ0aWNsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBqUXVlcnkgQm9keSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBIb21lSWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgVmlydHVhbERpcmVjdG9yeSB7Z2V0e3JldHVybiBzdHJpbmcuSXNOdWxsT3JFbXB0eShOYXZpZ2F0aW9uVXRpbGl0eS5WaXJ0dWFsRGlyZWN0b3J5KVxyXG4gICAgICAgICAgICA/IHN0cmluZy5FbXB0eVxyXG4gICAgICAgICAgICA6IHN0cmluZy5Gb3JtYXQoXCJ7MH0vXCIsTmF2aWdhdGlvblV0aWxpdHkuVmlydHVhbERpcmVjdG9yeSk7fX1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBib29sIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19EaXNhYmxlQXV0b1NwYWZBbmNob3JzT25OYXZpZ2F0ZT1mYWxzZTtwcml2YXRlIGpRdWVyeSBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQm9keT1qUXVlcnkuU2VsZWN0KFwiI3BhZ2VCb2R5XCIpO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Ib21lSWQ9U3BhZkFwcC5Ib21lSWQ7fVxyXG5cclxuICAgXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLklvYztcclxudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcGFmQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBJSW9jIENvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhc3luYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgI2lmICFERUJVR1xyXG4gICAgICAgICAgICBOYXZpZ2F0aW9uVXRpbGl0eS5WaXJ0dWFsRGlyZWN0b3J5ID0gXCJyZWFsd29ybGQuc3BhZlwiOyAvLyAgdmlydHVhbCBkaXQgZm9yIHJlbGVhc2UgZW52aXJvbm1lbnRcclxuICAgICAgICAgICAgI2VuZGlmXHJcblxyXG4gICAgICAgICAgICBDb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lckNvbmZpZygpOyAvLyBjb25maWcgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHZhciBtYWluVm0gPSBDb250YWluZXIuUmVzb2x2ZTxNYWluVmlld01vZGVsPigpO1xyXG4gICAgICAgICAgICBhd2FpdCBtYWluVm0uU3RhcnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZXNvbHZlPElOYXZpZ2F0b3I+KCkuSW5pdE5hdmlnYXRpb24oKTsgLy8gaW5pdCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvbnRhaW5lckNvbmZpZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBuYXZpZ2F0b3JcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SU5hdmlnYXRvciwgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmc+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJTmF2aWdhdG9yQ29uZmlndXJhdG9yLCBDdXN0b21Sb3V0ZXNDb25maWc+KCk7IFxyXG5cclxuICAgICAgICAgICAgLy8gbWVzc2VuZ2VyXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElNZXNzZW5nZXIsIE1lc3Nlbmdlci5NZXNzZW5nZXI+KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2aWV3bW9kZWxzXHJcbiAgICAgICAgICAgIFJlZ2lzdGVyQWxsVmlld01vZGVscygpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgY3VzdG9tIHJlc291cmNlLCBzZXJ2aWNlcy4uXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElTZXR0aW5ncywgU2V0dGluZ3M+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElVc2VyU2VydmljZSwgVXNlclNlcnZpY2U+KCk7XHJcblxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SUFydGljbGVSZXNvdXJjZXMsQXJ0aWNsZVJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElVc2VyUmVzb3VyY2VzLFVzZXJSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJRmVlZFJlc291cmNlcyxGZWVkUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVByb2ZpbGVSZXNvdXJjZXMsUHJvZmlsZVJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJUmVwb3NpdG9yeSxMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5PigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVNldHRpbmdzUmVzb3VyY2VzLFNldHRpbmdzUmVzb3VyY2VzPigpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNyZWdpb24gUEFHRVMgSURTXHJcbiAgICAgICAgLy8gc3RhdGljIHBhZ2VzIGlkXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBIb21lSWQge2dldHtyZXR1cm4gXCJob21lXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBMb2dpbklkIHtnZXR7cmV0dXJuIFwibG9naW5cIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIFJlZ2lzdGVySWQge2dldHtyZXR1cm4gXCJyZWdpc3RlclwiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgUHJvZmlsZUlkIHtnZXR7cmV0dXJuIFwicHJvZmlsZVwiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgU2V0dGluZ3NJZCB7Z2V0e3JldHVybiBcInNldHRpbmdzXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBFZGl0QXJ0aWNsZUlkIHtnZXR7cmV0dXJuIFwiZWRpdEFydGljbGVcIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEFydGljbGVJZCB7Z2V0e3JldHVybiBcImFydGljbGVcIjt9fVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTUVTU0FHRVNcclxuICAgICAgICAvLyBtZXNzZW5nZXIgaGVscGVyIGZvciBnbG9iYWwgbWVzc2FnZXMgYW5kIG1lc3NhZ2VzIGlkc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE1lc3NhZ2VzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgR2xvYmFsU2VuZGVyIHsgfTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgR2xvYmFsU2VuZGVyIFNlbmRlciA9IG5ldyBHbG9iYWxTZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIExvZ2luRG9uZSB7Z2V0e3JldHVybiBcIkxvZ2luRG9uZVwiO319XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZWdpc3RlciBhbGwgdHlwZXMgdGhhdCBlbmQgd2l0aCBcInZpZXdtb2RlbFwiLlxyXG4gICAgICAgIC8vLyBZb3UgY2FuIHJlZ2lzdGVyIGEgdmlld21vZGUgYXMgU2luZ2xyIEluc3RhbmNlIGFkZGluZyBcIlNpbmdsZUluc3RhbmNlQXR0cmlidXRlXCIgdG8gdGhlIGNsYXNzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlZ2lzdGVyQWxsVmlld01vZGVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcclxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodyA9PiB3Lk5hbWUuVG9Mb3dlcigpLkVuZHNXaXRoKFwidmlld21vZGVsXCIpKSkuVG9MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uVHlwZT4pKGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFNpbmdsZUluc3RhbmNlQXR0cmlidXRlKSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4oYXR0cmlidXRlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UoZik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyKGYpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERlc2VyaWFsaXplIHJlYWx3b3JsZCBwcm9taXNlIGV4Y2VwdGlvbiB0byBnZXQgZXJyb3JzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRGljdGlvbmFyeTxzdHJpbmcsc3RyaW5nW10+IEdldFZhbGlkYXRpb25FcnJvclJlc3BvbnNlKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSAoRXJyb3JSZXNwb25zZSlKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxFcnJvclJlc3BvbnNlPihleGNlcHRpb24uQXJndW1lbnRzWzBdLlRvRHluYW1pYygpLnJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLkVycm9ycztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdldCByZWFkYWJsZSBlcnJvciBsaXN0XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8c3RyaW5nPiBHZXRWYWxpZGF0aW9uRXJyb3JzKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBleGNlcHRpb24uR2V0VmFsaWRhdGlvbkVycm9yUmVzcG9uc2UoKTtcblxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGVycm9yIGluIGVycm9ycylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZXJyb3JEZXNjcmlwdGlvbiBpbiBlcnJvci5WYWx1ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiezB9IHsxfVwiLGVycm9yLktleSxlcnJvckRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgZXJyb3IgZm9yIGh0bWxlcnJvcmNvZGVcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXJyb3JDb2RlXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgR2V0RXJyb3JGb3JDb2RlKGludCBlcnJvckNvZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyb3JDb2RlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJVbmF1dGhvcml6ZWRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRm9yYmlkZGVuXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5vdCBGb3VuZFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgNDIyOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJWYWxpZGF0aW9uIEVycm9yXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR2VuZXJpYyBFcnJvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IGVycm9yIGNvZGUgZm9yIHByb21pc2UgZXhjZXB0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVycm9yQ29kZSh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JDb2RlID0gKGludClleGNlcHRpb24uQXJndW1lbnRzWzBdLlRvRHluYW1pYygpLnN0YXR1cztcbiAgICAgICAgICAgIHJldHVybiBlcnJvckNvZGU7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5DbGFzc2VzXG57XG4gICAgcHVibGljIGNsYXNzIEZlZWRSZXF1ZXN0QnVpbGRlclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX29mZnNldDtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2xpbWl0O1xuXG5cbiAgICAgICAgcHJpdmF0ZSBGZWVkUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IDIwO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRmVlZFJlcXVlc3RCdWlsZGVyIERlZmF1bHQoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZlZWRSZXF1ZXN0QnVpbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXF1ZXN0QnVpbGRlciBXaXRoT2ZmU2V0KGludCBvZmZzZXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXF1ZXN0QnVpbGRlciBXaXRoTGltaXQoaW50IGxpbWl0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnVpbGQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKFwiYXJ0aWNsZXMvZmVlZFwiKTtcblxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIj9saW1pdD17MH1cIix0aGlzLl9saW1pdCkpO1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmb2Zmc2V0PXswfVwiLHRoaXMuX29mZnNldCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcblxyXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFydGljbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BdXRob3IgPSBuZXcgQXV0aG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ0aXRsZVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRpdGxlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInNsdWdcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTbHVnIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImJvZHlcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBCb2R5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImNyZWF0ZWRBdFwiKV1cclxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWU/IENyZWF0ZWRBdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ1cGRhdGVkQXRcIildXHJcbiAgICAgICAgcHVibGljIERhdGVUaW1lPyBVcGRhdGVkQXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidGFnTGlzdFwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gVGFnTGlzdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJkZXNjcmlwdGlvblwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImF1dGhvclwiKV1cclxuICAgICAgICBwdWJsaWMgQXV0aG9yIEF1dGhvciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJmYXZvcml0ZWRcIildXHJcbiAgICAgICAgcHVibGljIGJvb2wgRmF2b3JpdGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImZhdm9yaXRlc0NvdW50XCIpXVxyXG4gICAgICAgIHB1YmxpYyBsb25nIEZhdm9yaXRlc0NvdW50IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBDcmVhdGUge2dldHtyZXR1cm4gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIix0aGlzLkNyZWF0ZWRBdCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPERhdGVUaW1lPihcImtleTFcIikuVG9TdHJpbmcoXCJNTU1NIGRkXCIpOihzdHJpbmcpbnVsbDt9fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xue1xuICAgIHB1YmxpYyBjbGFzcyBDb21tZW50XG4gICAge1xuICAgICAgICBwdWJsaWMgQ29tbWVudCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXV0aG9yID0gbmV3IEF1dGhvcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbSnNvblByb3BlcnR5KFwiaWRcIildXG4gICAgICAgIHB1YmxpYyBsb25nIElkIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiY3JlYXRlZEF0XCIpXVxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgQ3JlYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwidXBkYXRlZEF0XCIpXVxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgVXBkYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYm9keVwiKV1cbiAgICAgICAgcHVibGljIHN0cmluZyBCb2R5IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYXV0aG9yXCIpXVxuICAgICAgICBwdWJsaWMgQXV0aG9yIEF1dGhvciB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgc3RyaW5nIENyZWF0ZSB7Z2V0e3JldHVybiB0aGlzLkNyZWF0ZWRBdC5Ub1N0cmluZyhcIk1NTU0gZGRcIik7fX1cblxuICAgIH1cbn0iLCJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5Nb2RlbHNcbntcbiAgICBwdWJsaWMgY2xhc3MgUGFnaW5hdG9yXG4gICAge1xuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+QWN0aXZlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGludCBQYWdlIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUGFnaW5hdG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BY3RpdmUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPigpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgcHVibGljIGNsYXNzIEFydGljbGVSZXF1ZXN0QnVpbGRlclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3RhZztcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2F1dGhvcjtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX29mZnNldDtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2xpbWl0O1xuICAgICAgICBwcml2YXRlIHN0cmluZyBfdXNlcjtcblxuXG4gICAgICAgIHByaXZhdGUgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSAyMDtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBEZWZhdWx0KClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgV2l0aE9mZlNldChpbnQgb2Zmc2V0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgV2l0aExpbWl0KGludCBsaW1pdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSBsaW1pdDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBPZkF1dGhvcihzdHJpbmcgYXV0aG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9hdXRob3IgPSBhdXRob3I7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgV2l0aFRhZyhzdHJpbmcgdGFnKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl90YWcgPSB0YWc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBPZkZhdm9yaXRlKHN0cmluZyB1c2VyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl91c2VyID0gdXNlcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJ1aWxkKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcihcImFydGljbGVzXCIpO1xuXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiP2xpbWl0PXswfVwiLHRoaXMuX2xpbWl0KSk7XG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZvZmZzZXQ9ezB9XCIsdGhpcy5fb2Zmc2V0KSk7XG5cbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkodGhpcy5fdGFnKSlcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZ0YWc9ezB9XCIsdGhpcy5fdGFnKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkodGhpcy5fYXV0aG9yKSlcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZhdXRob3I9ezB9XCIsdGhpcy5fYXV0aG9yKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkodGhpcy5fdXNlcikpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmZmF2b3JpdGVkPXswfVwiLHRoaXMuX3VzZXIpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgYWJzdHJhY3QgY2xhc3MgUmVzb3VyY2VCYXNlXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmljIEF3YWl0YWJsZSBhamF4IGNhbGxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIFRhc2s8VD4gTWFrZUNhbGw8VD4oQWpheE9wdGlvbnMgb3B0aW9ucykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBUYXNrLkZyb21Qcm9taXNlPFQ+KGpRdWVyeS5BamF4KG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLCAoRnVuYzxvYmplY3QsIHN0cmluZywganFYSFIsIFQ+KSAoKHJlc09iaiwgc3VjY2VzcywganFYaHIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04uU3RyaW5naWZ5KHJlc09iaik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxUPihqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG51c2luZyBDb21tZW50ID0gcmVhbHdvcmxkLnNwYWYuTW9kZWxzLkNvbW1lbnQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgQXJ0aWNsZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5BcnRpY2xlSWQ7fVxuXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVByb2ZpbGVSZXNvdXJjZXMgX3Byb2ZpbGVSZXNvdXJjZXM7XG5cbiAgICAgICAgcHVibGljIEFydGljbGUgQXJ0aWNsZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5Db21tZW50PkNvbW1lbnRzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+Q29tbWVudCB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgYm9vbCBJc0xvZ2dlZCB7Z2V0e3JldHVybiB0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZDt9fVxuICAgICAgICBwdWJsaWMgVXNlciBMb2dnZWRVc2VyIHtnZXR7cmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2dlZFVzZXI7fX1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIFxuICAgICAgICAgICAgSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElQcm9maWxlUmVzb3VyY2VzIHByb2ZpbGVSZXNvdXJjZXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9hcnRpY2xlUmVzb3VyY2VzID0gYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF9wcm9maWxlUmVzb3VyY2VzID0gcHJvZmlsZVJlc291cmNlcztcblxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlID0gbmV3IEFydGljbGUoKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPENvbW1lbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIHZhciBzbHVnID0gcGFyYW1ldGVycy5HZXRQYXJhbWV0ZXI8c3RyaW5nPihcInNsdWdcIik7XG4gICAgICAgICAgICBpZihzdHJpbmcuSXNOdWxsT3JFbXB0eShzbHVnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiQXJ0aWNsZSBwYWdlIG5lZWQgc2x1ZyBwYXJhbWV0ZXJcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBhcnRpY2xlVGFzayA9IHRoaXMuTG9hZEFydGljbGUoc2x1Zyk7XG4gICAgICAgICAgICB2YXIgY29tbWVudHNUYXNrID0gdGhpcy5Mb2FkQ29tbWVudHMoc2x1Zyk7XG4gICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGwoYXJ0aWNsZVRhc2ssY29tbWVudHNUYXNrKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoQmluZGluZygpOyAvLyBtYW51YWwgcmVmcmVzaCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5FbmFibGVTcGFmQW5jaG9ycygpOyAvLyB0b2RvIGNoZWNrIHdoeSBub3QgYXV0byBlbmFibGVkXG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBZGQgY29tbWVudCB0byBhcnRpY2xlXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFkZENvbW1lbnQoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQpIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGNvbW1lbnRSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuQWRkQ29tbWVudCh0aGlzLkFydGljbGUuU2x1ZywgdGhpcy5Db21tZW50LlNlbGYoKSk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnQuU2VsZihzdHJpbmcuRW1wdHkpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50cy5wdXNoKGNvbW1lbnRSZXNwb25zZS5Db21tZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEZvbGxvdyBBcnRpY2xlIEF1dGhvclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGb2xsb3dBdXRob3IoKVxuICAgICAgICB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2VzLkZvbGxvdyh0aGlzLkFydGljbGUuQXV0aG9yLlVzZXJuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTWFudWFsIHJldmFsdWF0ZSBiaW5kaW5nXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHByaXZhdGUgdm9pZCBSZWZyZXNoQmluZGluZygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJldHlwZWQua25vY2tvdXQua28uY2xlYW5Ob2RlKHRoaXMuUGFnZU5vZGUpO1xuICAgICAgICAgICAgYmFzZS5BcHBseUJpbmRpbmdzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIGNvbW1lbnRzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNsdWdcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZENvbW1lbnRzKHN0cmluZyBzbHVnKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29tbWVudCA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZUNvbW1lbnRzKHNsdWcpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50cy5wdXNoKGNvbW1lbnQuQ29tbWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlIGluZm9cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2x1Z1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkQXJ0aWNsZShzdHJpbmcgc2x1ZylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFydGljbGUgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGUoc2x1Zyk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGUgPSBhcnRpY2xlLkFydGljbGU7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgRWRpdEFydGljbGVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLkVkaXRBcnRpY2xlSWQ7fVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlRpdGxlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+Qm9keSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkRlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VGFncyB7IGdldDsgc2V0OyB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgRWRpdEFydGljbGVWaWV3TW9kZWwoSUFydGljbGVSZXNvdXJjZXMgYXJ0aWNsZVJlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9hcnRpY2xlUmVzb3VyY2VzID0gYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICB0aGlzLlRpdGxlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Cb2R5ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5EZXNjcmlwdGlvbiA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuVGFncyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuXG4vLyAgICAgICAgICAgIHZhciBhcnRpY2xlU2x1ZyA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJzbHVnXCIpO1xuLy8gICAgICAgICAgICBpZihzdHJpbmcuSXNOdWxsT3JFbXB0eShhcnRpY2xlU2x1ZykpXG4vLyAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiU2x1ZyBtaXNzaW5nIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBDcmVhdGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB0b2RvIHZhbGlkYXRpb25zXG4gICAgICAgICAgICB2YXIgbmV3QXJ0aWNlbCA9IG5ldyBOZXdBcnRpY2xlUmVxdWVzdFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEFydGljbGUgPSBuZXcgTmV3QXJ0aWNsZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSB0aGlzLlRpdGxlLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgQm9keSA9IHRoaXMuQm9keS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uID0gdGhpcy5EZXNjcmlwdGlvbi5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIFRhZ0xpc3QgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPih0aGlzLlRhZ3MuU2VsZigpLlNwbGl0KCcsJykpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGFydGljbGUgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkNyZWF0ZShuZXdBcnRpY2VsKTtcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkFydGljbGVJZCxnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJzbHVnXCIsYXJ0aWNsZS5BcnRpY2xlLlNsdWcpO3JldHVybiBfbzE7fSkpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWY7XHJcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXHJcbntcclxuICAgIGNsYXNzIEhvbWVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLkhvbWVJZDt9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90YWdGaWx0ZXIgPSBudWxsOyAvLyB0YWcgZmlsdGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfcmVzb3VyY2VzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJRmVlZFJlc291cmNlcyBfZmVlZFJlc291cmNlcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBLTk9DS09VVEpTXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkFydGljbGU+QXJ0aWNsZXM7IC8vIGFydGljbGVzXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj5QYWdlczsgLy8gcGFnaW5hdG9yIGhlbHBlclxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+VGFnczsgLy8gdGFnc1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkFjdGl2ZVRhYkluZGV4OyAvLyB0YWIgYWN0aXZlIGluZGV4XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5UYWJzO1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZDtcclxuICAgICAgICBcclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgSG9tZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyByZXNvdXJjZXMsIElTZXR0aW5ncyBzZXR0aW5ncywgSU1lc3NlbmdlciBtZXNzZW5nZXIsXHJcbiAgICAgICAgICAgIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSUZlZWRSZXNvdXJjZXMgZmVlZFJlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVzb3VyY2VzID0gcmVzb3VyY2VzO1xyXG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcclxuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XHJcbiAgICAgICAgICAgIF9mZWVkUmVzb3VyY2VzID0gZmVlZFJlc291cmNlcztcclxuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8QXJ0aWNsZT4oKTtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8UGFnaW5hdG9yPigpO1xyXG4gICAgICAgICAgICB0aGlzLlRhZ3MgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcclxuICAgICAgICAgICAgdGhpcy5UYWJzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPih0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXggPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KC0xKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpOyAvLyBhbHdheXMgY2FsbCBiYXNlICh3aGVyZSBhcHBseWJpbmRpbmcpXHJcblxyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXNUYXNrID0gdGhpcy5Mb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSkpOyAvLyBsb2FkIGFydGljbGUgdGFza1xyXG4gICAgICAgICAgICB2YXIgbG9hZFRhZ3NUYXNrID0gdGhpcy5Mb2FkVGFncygpO1xyXG4gICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGwoYXJ0aWNsZXNUYXNrLGxvYWRUYWdzVGFzayk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlc1Rhc2suUmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE9uTGVhdmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5PbkxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5VbnN1YnNjcmliZTxVc2VyU2VydmljZT4odGhpcywgU3BhZkFwcC5Mb2dpbklkKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIEtOT0NLT1VUIE1FVEhPRFNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byB1c2VyIGRldGFpbFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgR29Ub1VzZXIoQXJ0aWNsZSBhcnRpY2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuUHJvZmlsZUlkLCBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJ1c2VybmFtZVwiLGFydGljbGUuQXV0aG9yLlVzZXJuYW1lKTtyZXR1cm4gX28xO30pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byBhcnRpY2xlIGRldGFpbFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgR29Ub0FydGljbGUoQXJ0aWNsZSBhcnRpY2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuQXJ0aWNsZUlkLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInNsdWdcIixhcnRpY2xlLlNsdWcpO3JldHVybiBfbzE7fSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBZGQgcGFzc2VkIGFydGljbGUgdG8gZmF2XHJcbiAgICAgICAgLy8vIE9ubHkgZm9yIGF1dGggdXNlcnNcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQWRkVG9GYXZvdXJpdGUoQXJ0aWNsZSBhcnRpY2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzTG9nZ2VkLlNlbGYoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNpbmdsZUFydGljbGUgPSBhcnRpY2xlLkZhdm9yaXRlZCA/IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5VbkZhdm9yaXRlKGFydGljbGUuU2x1ZykgOiBcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Jlc291cmNlcy5GYXZvcml0ZShhcnRpY2xlLlNsdWcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZXBsYWNlKGFydGljbGUsc2luZ2xlQXJ0aWNsZS5BcnRpY2xlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR28gdG8gdXNlciBmZWVkXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlc2V0VGFic0ZvckZlZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKC0yKTtcclxuICAgICAgICAgICAgdGhpcy5UYWJzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl90YWdGaWx0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5Mb2FkRmVlZChGZWVkUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlUmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlc2V0IFRhYlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSZXNldFRhYnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKC0xKTtcclxuICAgICAgICAgICAgdGhpcy5UYWJzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl90YWdGaWx0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5Mb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSkpO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZVJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR28gdG8gcGFnZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFnaW5hdG9yXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEdvVG9QYWdlKFBhZ2luYXRvciBwYWdpbmF0b3IpXHJcbiAgICAgICAge1xyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNpbmdsZTxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5QYWdpbmF0b3I+KCAgICAgICAgICAgIHRoaXMuUGFnZXMuU2VsZigpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvciwgYm9vbD4pKHMgPT4gcy5BY3RpdmUuU2VsZigpKSkuQWN0aXZlLlNlbGYoZmFsc2UpO1xyXG4gICAgICAgICAgICBwYWdpbmF0b3IuQWN0aXZlLlNlbGYodHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KClcclxuICAgICAgICAgICAgICAgIC5XaXRoT2ZmU2V0KChwYWdpbmF0b3IuUGFnZS0xKSp0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKVxyXG4gICAgICAgICAgICAgICAgLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkodGhpcy5fdGFnRmlsdGVyKSlcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LldpdGhUYWcodGhpcy5fdGFnRmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuTG9hZEFydGljbGVzKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBGaWx0ZXIgYXJ0aWNsZXMgYnkgdGFnXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0YWdcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRmlsdGVyQnlUYWcoc3RyaW5nIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YWJOYW1lID0gc3RyaW5nLkZvcm1hdChcIiN7MH1cIix0YWcpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLkFydGljbGVzRm9yVGFiKHRhYk5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGFydGljbGVzIGZvciBwYXNzZWQgdGFiXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0YWJcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQXJ0aWNsZXNGb3JUYWIoc3RyaW5nIHRhYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YWdOYW1lID0gdGFiLlRyaW1TdGFydCgnIycpO1xyXG4gICAgICAgICAgICB0aGlzLl90YWdGaWx0ZXIgPSB0YWdOYW1lO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdHVhbEluZGV4ID0gdGhpcy5UYWJzLlNlbGYoKS5JbmRleE9mKHRhYik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihhY3R1YWxJbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuVGFicy5wdXNoKHRhYik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYodGhpcy5UYWJzLlNlbGYoKS5JbmRleE9mKHRhYikpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFydGljbGVzID0gYXdhaXQgdGhpcy5Mb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgLldpdGhUYWcodGFnTmFtZSlcclxuICAgICAgICAgICAgICAgIC5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSkpO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUFJJVkFURSBNRVRIT0RTXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBhcnRpY2xlc1xyXG4gICAgICAgIC8vLyBDbGVhciBsaXN0IGFuZCByZWxvYWRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrPEFydGljbGVSZXNwb25zZT4gTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlciByZXF1ZXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFydGljbGVSZXNvUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9yZXNvdXJjZXMuR2V0QXJ0aWNsZXMocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFydGljbGVSZXNvUmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBmZWVkXHJcbiAgICAgICAgLy8vIENsZWFyIGxpc3QgYW5kIHJlbG9hZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBMb2FkRmVlZChGZWVkUmVxdWVzdEJ1aWxkZXIgcmVxdWVzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmZWVkUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9mZWVkUmVzb3VyY2VzLkdldEZlZWQocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChmZWVkUmVzcG9uc2UuQXJ0aWNsZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmVlZFJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZWxvYWQgdGFnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZFRhZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhZ3MgPSBhd2FpdCB0aGlzLl9yZXNvdXJjZXMuR2V0VGFncygpO1xyXG4gICAgICAgICAgICB0aGlzLlRhZ3MucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFncy5wdXNoKHRhZ3MuVGFncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gV2hlbiB1cGRhdGUgYXJ0aWNsZXMgcmVidWlsZCBwYWdpbmF0b3JcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVSZXNvUmVzcG9uc2VcIj48L3BhcmFtPlxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZWZyZXNoUGFnaW5hdG9yKEFydGljbGVSZXNwb25zZSBhcnRpY2xlUmVzb1Jlc3BvbnNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcy5yZW1vdmVBbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQXJ0aWNsZT4oYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlcykpIHJldHVybjsgLy8gbm8gYXJ0aWNsZXNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBwYWdlc0NvdW50ID0gKGludCkgKGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXNDb3VudCAvIGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXMuTGVuZ3RoKTtcclxuICAgICAgICAgICAgdmFyIHJhbmdlID0gRW51bWVyYWJsZS5SYW5nZSgxLCBwYWdlc0NvdW50KTtcclxuICAgICAgICAgICAgdmFyIHBhZ2VzID0gcmFuZ2UuU2VsZWN0PGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj4oKGdsb2JhbDo6U3lzdGVtLkZ1bmM8aW50LCBnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5QYWdpbmF0b3I+KShzID0+IG5ldyBQYWdpbmF0b3JcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUGFnZSA9IHNcclxuICAgICAgICAgICAgfSkpLlRvQXJyYXkoKTtcclxuICAgICAgICAgICAgcGFnZXNbMF0uQWN0aXZlLlNlbGYodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUGFnZXMucHVzaChwYWdlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICAgICBcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIExvZ2luVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLkxvZ2luSWQ7fVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkVtYWlsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+UGFzc3dvcmQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SXNCdXN5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5FcnJvcnMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBMb2dpblZpZXdNb2RlbChJTmF2aWdhdG9yIG5hdmlnYXRvciwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuRW1haWwgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlBhc3N3b3JkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Jc0J1c3kgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPigpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHZvaWQgTG9naW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLklzQnVzeS5TZWxmKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5Mb2dpbih0aGlzLkVtYWlsLlNlbGYoKSwgdGhpcy5QYXNzd29yZC5TZWxmKCkpLkNvbnRpbnVlV2l0aCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlRocmVhZGluZy5UYXNrcy5UYXNrPikoYyA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuSXNCdXN5LlNlbGYoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGMuSXNGYXVsdGVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0RXhjZXB0aW9uID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxnbG9iYWw6OlN5c3RlbS5FeGNlcHRpb24+KGMuRXhjZXB0aW9uLklubmVyRXhjZXB0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0RXhjZXB0aW9uIGlzIFByb21pc2VFeGNlcHRpb24pXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gKFByb21pc2VFeGNlcHRpb24pU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxnbG9iYWw6OlN5c3RlbS5FeGNlcHRpb24+KGMuRXhjZXB0aW9uLklubmVyRXhjZXB0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KGVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNpZW50IFwibm90IGNvbXBsZXRlZCB0YXNrXCIgY2F1c2VkIGJ5IGJyaWRnZSB2ZXJzaW9uIChpbiBmaXgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkhvbWVJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgW1NpbmdsZUluc3RhbmNlXVxuICAgIHB1YmxpYyBjbGFzcyBNYWluVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkFjdHVhbFBhZ2VJZCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIE1haW5WaWV3TW9kZWwoSU1lc3NlbmdlciBtZXNzZW5nZXIsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSxJTmF2aWdhdG9yIG5hdmlnYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5BY3R1YWxQYWdlSWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gc3Vic2NyaWJlIHRvIGxvZ2luZG9uZSBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbC5Vc2VyU2VydmljZT4pKHNlcnZpY2UgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQuU2VsZih0cnVlKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIG5hdmlnYXRvci5Pbk5hdmlnYXRlZCArPSAoc2VuZGVyLCBsb2FkYWJsZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdm0gPSAoTG9hZGFibGVWaWV3TW9kZWwpIGxvYWRhYmxlO1xuICAgICAgICAgICAgICAgIHRoaXMuQWN0dWFsUGFnZUlkLlNlbGYodm0uRWxlbWVudElkKCkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFwcGx5IGJpbmRpbmcgdG8gbWFpbm1vZGVsXG4gICAgICAgIC8vLyB0cnkgYXV0byBsb2dpblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBTdGFydCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJldHlwZWQua25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyh0aGlzKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLlRyeUF1dG9Mb2dpbldpdGhTdG9yZWRUb2tlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICBcbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIFByb2ZpbGVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuUHJvZmlsZUlkO31cblxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElQcm9maWxlUmVzb3VyY2VzIF9wcm9maWxlUmVzb3VyY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlTW9kZWwgUHJvZmlsZU1vZGVsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+QWN0aXZlVGFiSW5kZXg7IC8vIHRhYiBhY3RpdmUgaW5kZXhcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzTG9nZ2VkIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlVmlld01vZGVsKElQcm9maWxlUmVzb3VyY2VzIHByb2ZpbGVSZXNvdXJjZSwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBcbiAgICAgICAgICAgIElBcnRpY2xlUmVzb3VyY2VzIGFydGljbGVSZXNvdXJjZXMsIElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJTWVzc2VuZ2VyIG1lc3NlbmdlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwgPSBuZXcgUHJvZmlsZU1vZGVsKCk7XG4gICAgICAgICAgICB0aGlzLl9wcm9maWxlUmVzb3VyY2UgPSBwcm9maWxlUmVzb3VyY2U7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgICAgIF9hcnRpY2xlUmVzb3VyY2VzID0gYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xuXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigwKTtcbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPih0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsLlVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQuU2VsZih0cnVlKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gc3RyaW5nLkVtcHR5O1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSBwYXJhbWV0ZXJzLkdldFBhcmFtZXRlcjxzdHJpbmc+KFwidXNlcm5hbWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk5vIHVzZXJuYW1lIHBhc3NlZCBhbmQgeW91IGFyZSBub3QgbG9nZ2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9IHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2dlZFVzZXIuVXNlcm5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB1c2VyVGFzayA9IHRoaXMuTG9hZFVzZXIodXNlcm5hbWUpO1xuICAgICAgICAgICAgdmFyIGFydGljbGVUYXNrID0gdGhpcy5Mb2FkQXJ0aWNsZXModXNlcm5hbWUpO1xuICAgICAgICAgICAgdmFyIGZhdm91cml0ZVRhc2sgPSB0aGlzLkxvYWRGYXZvdXJpdGVzQXJ0aWNsZXModXNlcm5hbWUpO1xuXG4gICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGwodXNlclRhc2ssIGFydGljbGVUYXNrLCBmYXZvdXJpdGVUYXNrKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlNob3dBcnRpY2xlcygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25MZWF2ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25MZWF2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlVuc3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLCBTcGFmQXBwLkxvZ2luSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFkZCBwYXNzZWQgYXJ0aWNsZSB0byBmYXZcbiAgICAgICAgLy8vIE9ubHkgZm9yIGF1dGggdXNlcnNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFkZFRvRmF2b3VyaXRlKEFydGljbGUgYXJ0aWNsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLklzTG9nZ2VkLlNlbGYoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgc2luZ2xlQXJ0aWNsZSA9IGFydGljbGUuRmF2b3JpdGVkID8gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5VbkZhdm9yaXRlKGFydGljbGUuU2x1ZykgOiBcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkZhdm9yaXRlKGFydGljbGUuU2x1Zyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLkFydGljbGVzLnJlcGxhY2UoYXJ0aWNsZSxzaW5nbGVBcnRpY2xlLkFydGljbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRm9sbG93IC8gdW5mb2xsb3dcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRm9sbG93KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gdGhpcy5Qcm9maWxlTW9kZWwuVXNlcm5hbWUuU2VsZigpO1xuICAgICAgICAgICAgdmFyIGZvbGxvdyA9IHRoaXMuUHJvZmlsZU1vZGVsLkZvbGxvd2luZy5TZWxmKCkgPyBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2UuVW5Gb2xsb3codXNlcm5hbWUpIFxuICAgICAgICAgICAgICAgIDogYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlLkZvbGxvdyh1c2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5Gb2xsb3dpbmcuU2VsZihmb2xsb3cuUHJvZmlsZS5Gb2xsb3dpbmcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byB1c2VyIGRldGFpbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgR29Ub1VzZXIoQXJ0aWNsZSBhcnRpY2xlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Qcm9maWxlSWQsIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInVzZXJuYW1lXCIsYXJ0aWNsZS5BdXRob3IuVXNlcm5hbWUpO3JldHVybiBfbzE7fSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byBhcnRpY2xlIGRldGFpbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgR29Ub0FydGljbGUoQXJ0aWNsZSBhcnRpY2xlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU2hvdyB1c2VyIGFydGljbGVzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dBcnRpY2xlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigwKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlNob3dBcnRpY2xlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU2hvdyBmYXZzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dGYXZvdXJpdGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKDEpO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuU2hvd0Zhdm91cml0ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgdXNlciBkYXRhXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInVzZXJuYW1lXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRVc2VyKHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHByb2ZpbGVSZXNwb25zZSA9IGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZS5HZXQodXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuTWFwTWUocHJvZmlsZVJlc3BvbnNlLlByb2ZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZEFydGljbGVzKHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFydGljbGVzID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCg1KVxuICAgICAgICAgICAgICAgIC5PZkF1dGhvcih1c2VybmFtZSkpO1xuXG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5Vc2VyQXJ0aWNsZXMgPSBhcnRpY2xlcy5BcnRpY2xlcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlcyBGYXZvcml0ZXNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRGYXZvdXJpdGVzQXJ0aWNsZXMoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KDUpXG4gICAgICAgICAgICAgICAgLk9mRmF2b3JpdGUodXNlcm5hbWUpKTtcblxuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuRmF2b3VydGl0ZXMgPSBhcnRpY2xlcy5BcnRpY2xlcztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIGNsYXNzIFByb2ZpbGVNb2RlbFxuICAgIHtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+SW1hZ2UgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Vc2VybmFtZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkJpbyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Gb2xsb3dpbmcgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5BcnRpY2xlPkFydGljbGVzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8QXJ0aWNsZT4gVXNlckFydGljbGVzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIElFbnVtZXJhYmxlPEFydGljbGU+IEZhdm91cnRpdGVzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUHJvZmlsZU1vZGVsKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5JbWFnZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkJpbyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRm9sbG93aW5nID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPEFydGljbGU+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBNYXBNZSAoUHJvZmlsZSBwcm9maWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkltYWdlLlNlbGYocHJvZmlsZS5JbWFnZSk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lLlNlbGYocHJvZmlsZS5Vc2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLkJpby5TZWxmKHByb2ZpbGUuQmlvKTtcbiAgICAgICAgICAgIHRoaXMuRm9sbG93aW5nLlNlbGYocHJvZmlsZS5Gb2xsb3dpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0FydGljbGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQXJ0aWNsZT4odGhpcy5Vc2VyQXJ0aWNsZXMpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0Zhdm91cml0ZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5BcnRpY2xlPih0aGlzLkZhdm91cnRpdGVzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgUmVnaXN0ZXJWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuUmVnaXN0ZXJJZDt9XG5cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IFVzZXJuYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IEVtYWlsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IFBhc3N3b3JkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5PHN0cmluZz4gRXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUmVnaXN0ZXJWaWV3TW9kZWwoSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRW1haWwgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5QYXNzd29yZCA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycyA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVnaXN0ZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5SZWdpc3Rlcih0aGlzLlVzZXJuYW1lLlNlbGYoKSwgdGhpcy5FbWFpbC5TZWxmKCksIHRoaXMuUGFzc3dvcmQuU2VsZigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBlLkdldFZhbGlkYXRpb25FcnJvcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KGVycm9ycykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBTZXR0aW5nc1ZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzUmVzb3VyY2VzIF9zZXR0aW5nc1Jlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuU2V0dGluZ3NJZDt9XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+SW1hZ2VVcmkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Vc2VybmFtZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkJpb2dyYXBoeSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkVtYWlsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+TmV3UGFzc3dvcmQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8c3RyaW5nPkVycm9ycyB7IGdldDsgc2V0OyB9XG5cblxuICAgICAgICBwdWJsaWMgU2V0dGluZ3NWaWV3TW9kZWwoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBJU2V0dGluZ3NSZXNvdXJjZXMgc2V0dGluZ3NSZXNvdXJjZXMsIElOYXZpZ2F0b3IgbmF2aWdhdG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NSZXNvdXJjZXMgPSBzZXR0aW5nc1Jlc291cmNlcztcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcblxuICAgICAgICAgICAgdGhpcy5JbWFnZVVyaSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkJpb2dyYXBoeSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRW1haWwgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLk5ld1Bhc3N3b3JkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcblxuICAgICAgICAgICAgdGhpcy5Qb3B1bGF0ZUVudHJpZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBQb3B1bGF0ZUVudHJpZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2dlZFVzZXI7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lLlNlbGYodXNlci5Vc2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsLlNlbGYodXNlci5FbWFpbCk7XG4gICAgICAgICAgICB0aGlzLkltYWdlVXJpLlNlbGYodXNlci5JbWFnZSk7XG4gICAgICAgICAgICB0aGlzLkJpb2dyYXBoeS5TZWxmKHVzZXIuQmlvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBVcGRhdGVTZXR0aW5ncygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nc1JlcXVlc3QgPSBuZXcgU2V0dGluZ3NSZXF1ZXN0XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBVc2VybmFtZSA9IHRoaXMuVXNlcm5hbWUuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBOZXdQYXNzd29yZCA9IHRoaXMuTmV3UGFzc3dvcmQuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBCaW9ncmFwaHkgPSB0aGlzLkJpb2dyYXBoeS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEVtYWlsID0gdGhpcy5FbWFpbC5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEltYWdlVXJpID0gdGhpcy5JbWFnZVVyaS5TZWxmKClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJVcGRhdGVkID0gYXdhaXQgdGhpcy5fc2V0dGluZ3NSZXNvdXJjZXMuVXBkYXRlU2V0dGluZ3Moc2V0dGluZ3NSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Qcm9maWxlSWQpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBlLkdldFZhbGlkYXRpb25FcnJvcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KGVycm9ycykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGFic3RyYWN0IGNsYXNzIEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UgOiBSZXNvdXJjZUJhc2VcbiAgICB7XG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBJVXNlclNlcnZpY2UgVXNlclNlcnZpY2U7XG5cbiAgICAgICAgcHJvdGVjdGVkIEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBVc2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmljIEF3YWl0YWJsZSBhamF4IGNhbGxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByb3RlY3RlZCBUYXNrPFQ+IE1ha2VBdXRob3JpemVkQ2FsbDxUPihBamF4T3B0aW9ucyBvcHRpb25zKSBcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoIXRoaXMuVXNlclNlcnZpY2UuSXNMb2dnZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIllvdSBtdXN0IGJlIGxvZ2dlZCB0byB1c2UgdGhpcyByZXNvdXJjZVwiKTtcblxuICAgICAgICAgICAgb3B0aW9ucy5CZWZvcmVTZW5kID0gKHhociwgbykgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4aHIuU2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgc3RyaW5nLkZvcm1hdChcIlRva2VuIHswfVwiLHRoaXMuVXNlclNlcnZpY2UuTG9nZ2VkVXNlci5Ub2tlbikpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFQ+KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5IDogSVJlcG9zaXRvcnlcbiAgICB7XG4gICAgICAgIHByaXZhdGUgY29uc3Qgc3RyaW5nIFRva2VuS2V5ID0gXCJ0b2tlblwiO1xuICAgICAgICBwcml2YXRlIFN0b3JhZ2UgX3N0b3JhZ2U7XG5cbiAgICAgICAgcHVibGljIExvY2FsU3RvcmFnZVJlcG9zaXRvcnkoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlID0gV2luZG93LkxvY2FsU3RvcmFnZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHZvaWQgU2F2ZVRva2VuKHN0cmluZyB0b2tlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5TZXRJdGVtKFRva2VuS2V5LHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0VG9rZW5JZkV4aXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5fc3RvcmFnZS5HZXRJdGVtKFRva2VuS2V5KTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbiE9bnVsbD90b2tlbi5Ub1N0cmluZygpOihzdHJpbmcpbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZVRva2VuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5SZW1vdmVJdGVtKFRva2VuS2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBVc2VyUmVzb3VyY2VzIDogUmVzb3VyY2VCYXNlLCBJVXNlclJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBVc2VyUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IExvZ2luKFNpZ25SZXF1ZXN0IGxvZ2luUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJzL2xvZ2luXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobG9naW5SZXF1ZXN0KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2lnblJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gUmVnaXN0ZXIoU2lnblJlcXVlc3QgbG9naW5SZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlcnNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChsb2dpblJlcXVlc3QpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBHZXRDdXJyZW50VXNlcihzdHJpbmcgdG9rZW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2VyXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIEJlZm9yZVNlbmQgPSAoeGhyLCBvKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLlNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIHN0cmluZy5Gb3JtYXQoXCJUb2tlbiB7MH1cIix0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBVc2VyU2VydmljZSA6IElVc2VyU2VydmljZVxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclJlc291cmNlcyBfdXNlclJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVzc2VuZ2VyIF9tZXNzZW5nZXI7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVJlcG9zaXRvcnkgX3JlcG9zaXRvcnk7XG5cbiAgICAgICAgcHVibGljIFVzZXJTZXJ2aWNlKElVc2VyUmVzb3VyY2VzIHVzZXJSZXNvdXJjZXMsIElNZXNzZW5nZXIgbWVzc2VuZ2VyLCBJUmVwb3NpdG9yeSByZXBvc2l0b3J5KVxuICAgICAgICB7XG4gICAgICAgICAgICBfdXNlclJlc291cmNlcyA9IHVzZXJSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xuICAgICAgICAgICAgX3JlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFVzZXIgTG9nZ2VkVXNlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIGJvb2wgSXNMb2dnZWQge2dldHtyZXR1cm4gdGhpcy5Mb2dnZWRVc2VyICE9IG51bGw7fX1cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBMb2dpbihzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuTG9naW4obmV3IFNpZ25SZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXNlciA9IG5ldyBVc2VyUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSBtYWlsLFxuICAgICAgICAgICAgICAgICAgICBQYXNzd29yZCA9IHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGwuVXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVnaXN0ZXIoc3RyaW5nIHVzZXJuYW1lLCBzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuUmVnaXN0ZXIobmV3IFNpZ25SZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXNlciA9IG5ldyBVc2VyUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSBtYWlsLFxuICAgICAgICAgICAgICAgICAgICBQYXNzd29yZCA9IHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICBVc2VybmFtZSA9IHVzZXJuYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGwuVXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgVHJ5QXV0b0xvZ2luV2l0aFN0b3JlZFRva2VuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0b3JlZFRva2VuID0gdGhpcy5fcmVwb3NpdG9yeS5HZXRUb2tlbklmRXhpc3QoKTtcbiAgICAgICAgICAgIGlmIChzdG9yZWRUb2tlbiA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBsb2dpblJlc3BvbnNlID0gYXdhaXQgdGhpcy5fdXNlclJlc291cmNlcy5HZXRDdXJyZW50VXNlcihzdG9yZWRUb2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbG9naW5SZXNwb25zZS5Vc2VyO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlNlbmQ8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsLlVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChQcm9taXNlRXhjZXB0aW9uIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LkRlbGV0ZVRva2VuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcclxuXHJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXHJcbntcclxuICAgIGNsYXNzIEFydGljbGVSZXNvdXJjZXMgOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJQXJ0aWNsZVJlc291cmNlc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcclxuXHJcbiAgICAgICAgcHVibGljIEFydGljbGVSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpIDogYmFzZSh1c2VyU2VydmljZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBHZXRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgYnVpbGRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLGJ1aWxkZXIuQnVpbGQoKSksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Vc2VyU2VydmljZS5Jc0xvZ2dlZFxyXG4gICAgICAgICAgICAgICAgPyBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuTWFrZUNhbGw8QXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFRhZ3NSZXNwb25zZT4gR2V0VGFncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3RhZ3NcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxUYWdzUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBHZXRBcnRpY2xlKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IEZhdm9yaXRlKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vZmF2b3JpdGVcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IFVuRmF2b3JpdGUoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9mYXZvcml0ZVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBDcmVhdGUoTmV3QXJ0aWNsZVJlcXVlc3QgbmV3QXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KG5ld0FydGljbGUpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPENvbW1lbnRzUmVzcG9uc2U+IEdldEFydGljbGVDb21tZW50cyhzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2NvbW1lbnRzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxDb21tZW50c1Jlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUNvbW1lbnRSZXNwb25zZT4gQWRkQ29tbWVudChzdHJpbmcgc2x1Zywgc3RyaW5nIGNvbW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9jb21tZW50c1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChuZXcgQ29tbWVudFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEJvZHkgPSBjb21tZW50XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUNvbW1lbnRSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIEZlZWRSZXNvdXJjZXMgOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJRmVlZFJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IEdldEZlZWQoRmVlZFJlcXVlc3RCdWlsZGVyIGJ1aWxkZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksYnVpbGRlci5CdWlsZCgpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgUHJvZmlsZVJlc291cmNlcyA6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElQcm9maWxlUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIFByb2ZpbGVSZXNvdXJjZXMoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBJU2V0dGluZ3Mgc2V0dGluZ3MpIDogYmFzZSh1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxGb2xsb3dSZXNwb25zZT4gRm9sbG93KHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3Byb2ZpbGVzL3sxfS9mb2xsb3dcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksdXNlcm5hbWUpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxGb2xsb3dSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxGb2xsb3dSZXNwb25zZT4gVW5Gb2xsb3coc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vcHJvZmlsZXMvezF9L2ZvbGxvd1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSx1c2VybmFtZSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiREVMRVRFXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8Rm9sbG93UmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8UHJvZmlsZVJlc3BvbnNlPiBHZXQoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vcHJvZmlsZXMvezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHVzZXJuYW1lKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5Vc2VyU2VydmljZS5Jc0xvZ2dlZCA/IGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFByb2ZpbGVSZXNwb25zZT4ob3B0aW9ucykgOiBiYXNlLk1ha2VDYWxsPFByb2ZpbGVSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4gIiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgU2V0dGluZ3NSZXNvdXJjZXM6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElTZXR0aW5nc1Jlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBTZXR0aW5nc1Jlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2V0dGluZ3NSZXNwb25zZT4gVXBkYXRlU2V0dGluZ3MoU2V0dGluZ3NSZXF1ZXN0IHNldHRpbmdzUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBVVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KHNldHRpbmdzUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTZXR0aW5nc1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdCn0K
