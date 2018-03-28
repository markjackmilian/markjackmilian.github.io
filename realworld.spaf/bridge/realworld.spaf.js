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
            Body: null,
            HomeId: null
        },
        alias: [
            "CreateRoutes", "Bridge$Navigation$INavigatorConfigurator$CreateRoutes",
            "Body", "Bridge$Navigation$INavigatorConfigurator$Body",
            "HomeId", "Bridge$Navigation$INavigatorConfigurator$HomeId"
        ],
        ctors: {
            init: function () {
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
                        }, $t.HtmlLocation = function () {
                            return "pages/home.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.HomeId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.HomeViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = function () {
                            return "pages/login.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.LoginId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.LoginViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = function () {
                            return "pages/register.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.RegisterId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.RegisterViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = Bridge.fn.bind(this, function () {
                            return this._userService.realworld$spaf$Services$IUserService$IsLogged;
                        }), $t.HtmlLocation = function () {
                            return "pages/profile.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.ProfileId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.ProfileViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = Bridge.fn.bind(this, function () {
                            return this._userService.realworld$spaf$Services$IUserService$IsLogged;
                        }), $t.HtmlLocation = function () {
                            return "pages/settings.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.SettingsId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.SettingsViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = function () {
                            return "pages/editArticle.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.EditArticleId, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = function () {
                            return "pages/article.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.ArticleId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.ArticleViewModel);
                        }, $t));
                        return _o1;
                    })(new (System.Collections.Generic.List$1(Bridge.Navigation.IPageDescriptor)).ctor());
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp", {
        main: function Main () {
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
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.ICommentResources, realworld.spaf.Services.impl.CommentResources);
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
                GetErrors: function (exception) {
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
                GetErrorList: function (exception) {
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
                                            errors = realworld.spaf.Classes.Extensions.GetErrors(exception);

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

    Bridge.define("realworld.spaf.Services.ICommentResources", {
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
            _commentResources: null,
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
            ctor: function (articleResources, userService, navigator, commentResources, profileResources) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._articleResources = articleResources;
                this._userService = userService;
                this._navigator = navigator;
                this._commentResources = commentResources;
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

                                        $task1 = this._commentResources.realworld$spaf$Services$ICommentResources$AddComment(this.Article.Slug, this.Comment());
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
                                        $task1 = this._commentResources.realworld$spaf$Services$ICommentResources$GetArticleComments(slug);
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
        alias: ["OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad"],
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

                this._messenger.Bridge$Messenger$IMessenger$Subscribe(realworld.spaf.Services.IUserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone, Bridge.fn.bind(this, function (service) {
                    this.IsLogged(true);
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
                Bridge.global.alert(System.String.format("Go to user {0}", [article.Author.Username]));
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
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        if (!this.IsLogged()) {
                                            $tcs.setResult(null);
                                            return;
                                        }
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
                                $step = System.Array.min([1,2,3,4], $step);
                                switch ($step) {

                                    case 1: {
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
                                        errors = realworld.spaf.Classes.Extensions.GetErrorList(e);
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

                this._messenger.Bridge$Messenger$IMessenger$Subscribe(realworld.spaf.Services.IUserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone, Bridge.fn.bind(this, function (service) {
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

    Bridge.define("realworld.spaf.ViewModels.ProfileViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _userService: null,
            User: null
        },
        alias: ["OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad"],
        ctors: {
            ctor: function (userService) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this.User = new realworld.spaf.ViewModels.UserModel();
                this._userService = userService;
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.ProfileId;
            },
            OnLoad: function (parameters) {
                this.User.MapMe(this._userService.realworld$spaf$Services$IUserService$LoggedUser);

                Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters);
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
                                        errors = realworld.spaf.Classes.Extensions.GetErrorList(e);
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
                                        errors = realworld.spaf.Classes.Extensions.GetErrorList(e);
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

    Bridge.define("realworld.spaf.ViewModels.UserModel", {
        fields: {
            ImageUri: null,
            Username: null,
            Biography: null,
            Email: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.ImageUri = ko.observable();
                this.Username = ko.observable();
                this.Biography = ko.observable();
                this.Email = ko.observable();
            }
        },
        methods: {
            MapMe: function (user) {
                this.ImageUri(user.Image);
                this.Username(user.Username);
                this.Biography(user.Bio);
                this.Email(user.Email);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.ArticleResources", {
        inherits: [realworld.spaf.Services.impl.ResourceBase,realworld.spaf.Services.IArticleResources],
        fields: {
            _settings: null
        },
        alias: [
            "GetArticles", "realworld$spaf$Services$IArticleResources$GetArticles",
            "GetTags", "realworld$spaf$Services$IArticleResources$GetTags",
            "GetArticle", "realworld$spaf$Services$IArticleResources$GetArticle"
        ],
        ctors: {
            ctor: function (settings) {
                this.$initialize();
                realworld.spaf.Services.impl.ResourceBase.ctor.call(this);
                this._settings = settings;
            }
        },
        methods: {
            GetArticles: function (builder) {
                var options = { url: System.String.format("{0}/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, builder.Build()), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.ArticleResponse, options);
            },
            GetTags: function () {
                var options = { url: System.String.format("{0}/tags", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.TagsResponse, options);
            },
            GetArticle: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SingleArticleResponse, options);
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
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.IUserService, Bridge.cast(this, realworld.spaf.Services.IUserService), Bridge.Spaf.SpafApp.Messages.LoginDone);
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
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.IUserService, Bridge.cast(this, realworld.spaf.Services.IUserService), Bridge.Spaf.SpafApp.Messages.LoginDone);
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
                    e, 
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
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.IUserService, Bridge.cast(this, realworld.spaf.Services.IUserService), Bridge.Spaf.SpafApp.Messages.LoginDone);
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

    Bridge.define("realworld.spaf.Services.impl.CommentResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.ICommentResources],
        fields: {
            _settings: null
        },
        alias: [
            "GetArticleComments", "realworld$spaf$Services$ICommentResources$GetArticleComments",
            "AddComment", "realworld$spaf$Services$ICommentResources$AddComment"
        ],
        ctors: {
            ctor: function (settings, userService) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
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
        alias: ["Follow", "realworld$spaf$Services$IProfileResources$Follow"],
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQ3VzdG9tUm91dGVzQ29uZmlnLmNzIiwiU3BhZkFwcC5jcyIsIkNsYXNzZXMvRXh0ZW5zaW9ucy5jcyIsIkNsYXNzZXMvRmVlZFJlcXVlc3RCdWlsZGVyLmNzIiwiTW9kZWxzL0FydGljbGUuY3MiLCJNb2RlbHMvQ29tbWVudC5jcyIsIk1vZGVscy9QYWdpbmF0b3IuY3MiLCJDbGFzc2VzL0FydGljbGVSZXF1ZXN0QnVpbGRlci5jcyIsIlNlcnZpY2VzL2ltcGwvUmVzb3VyY2VCYXNlLmNzIiwiVmlld01vZGVscy9BcnRpY2xlVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9Ib21lVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9Mb2dpblZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvTWFpblZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvUHJvZmlsZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvUmVnaXN0ZXJWaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1NldHRpbmdzVmlld01vZGVsLmNzIiwiU2VydmljZXMvaW1wbC9BcnRpY2xlUmVzb3VyY2VzLmNzIiwiU2VydmljZXMvaW1wbC9BdXRob3JpemVkUmVzb3VyY2VCYXNlLmNzIiwiU2VydmljZXMvaW1wbC9Mb2NhbFN0b3JhZ2VSZXBvc2l0b3J5LmNzIiwiU2VydmljZXMvaW1wbC9Vc2VyUmVzb3VyY2VzLmNzIiwiU2VydmljZXMvaW1wbC9Vc2VyU2VydmljZS5jcyIsIlNlcnZpY2VzL2ltcGwvQ29tbWVudFJlc291cmNlcy5jcyIsIlNlcnZpY2VzL2ltcGwvRmVlZFJlc291cmNlcy5jcyIsIlNlcnZpY2VzL2ltcGwvUHJvZmlsZVJlc291cmNlcy5jcyIsIlNlcnZpY2VzL2ltcGwvU2V0dGluZ3NSZXNvdXJjZXMuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7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Q0FBeUJBLGlJQUl4QkEsNENBQTRCQTs7Z0JBR3ZDQSxPQUFPQSx5RUFBMENBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIGNsYXNzIEN1c3RvbVJvdXRlc0NvbmZpZyA6IEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XHJcbiAgICAgICAgcHVibGljIEN1c3RvbVJvdXRlc0NvbmZpZyhJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSUxpc3Q8SVBhZ2VEZXNjcmlwdG9yPiBDcmVhdGVSb3V0ZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PElQYWdlRGVzY3JpcHRvcj4oKSwoX28xKT0+e19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PlwicGFnZXMvaG9tZS5odG1sXCIsIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuSG9tZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxIb21lVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5cInBhZ2VzL2xvZ2luLmh0bWxcIiwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Mb2dpbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxMb2dpblZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+XCJwYWdlcy9yZWdpc3Rlci5odG1sXCIsIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuUmVnaXN0ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8UmVnaXN0ZXJWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5cInBhZ2VzL3Byb2ZpbGUuaHRtbFwiLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8UHJvZmlsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PlwicGFnZXMvc2V0dGluZ3MuaHRtbFwiLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlNldHRpbmdzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPFNldHRpbmdzVmlld01vZGVsPigpLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+XCJwYWdlcy9lZGl0QXJ0aWNsZS5odG1sXCIsIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuRWRpdEFydGljbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICAvL1BhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxIb21lVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5cInBhZ2VzL2FydGljbGUuaHRtbFwiLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkFydGljbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8QXJ0aWNsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBqUXVlcnkgQm9keSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBIb21lSWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICBcbnByaXZhdGUgalF1ZXJ5IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2R5PWpRdWVyeS5TZWxlY3QoXCIjcGFnZUJvZHlcIik7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0hvbWVJZD1TcGFmQXBwLkhvbWVJZDt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLklvYztcclxudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcGFmQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBJSW9jIENvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xyXG4gICAgICAgICAgICBDb250YWluZXJDb25maWcoKTsgLy8gY29uZmlnIGNvbnRhaW5lclxyXG4gICAgICAgICAgICB2YXIgbWFpblZtID0gQ29udGFpbmVyLlJlc29sdmU8TWFpblZpZXdNb2RlbD4oKTtcclxuICAgICAgICAgICAgbWFpblZtLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVzb2x2ZTxJTmF2aWdhdG9yPigpLkluaXROYXZpZ2F0aW9uKCk7IC8vIGluaXQgbmF2aWdhdGlvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBDb250YWluZXJDb25maWcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbmF2aWdhdG9yXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElOYXZpZ2F0b3IsIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SU5hdmlnYXRvckNvbmZpZ3VyYXRvciwgQ3VzdG9tUm91dGVzQ29uZmlnPigpOyBcclxuXHJcbiAgICAgICAgICAgIC8vIG1lc3NlbmdlclxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJTWVzc2VuZ2VyLCBNZXNzZW5nZXIuTWVzc2VuZ2VyPigpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmlld21vZGVsc1xyXG4gICAgICAgICAgICBSZWdpc3RlckFsbFZpZXdNb2RlbHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGN1c3RvbSByZXNvdXJjZSwgc2VydmljZXMuLlxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJU2V0dGluZ3MsIFNldHRpbmdzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJVXNlclNlcnZpY2UsIFVzZXJTZXJ2aWNlPigpO1xyXG5cclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElBcnRpY2xlUmVzb3VyY2VzLEFydGljbGVSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJVXNlclJlc291cmNlcyxVc2VyUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SUZlZWRSZXNvdXJjZXMsRmVlZFJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElDb21tZW50UmVzb3VyY2VzLENvbW1lbnRSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJUHJvZmlsZVJlc291cmNlcyxQcm9maWxlUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElSZXBvc2l0b3J5LExvY2FsU3RvcmFnZVJlcG9zaXRvcnk+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJU2V0dGluZ3NSZXNvdXJjZXMsU2V0dGluZ3NSZXNvdXJjZXM+KCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQQUdFUyBJRFNcclxuICAgICAgICAvLyBzdGF0aWMgcGFnZXMgaWRcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEhvbWVJZCB7Z2V0e3JldHVybiBcImhvbWVcIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIExvZ2luSWQge2dldHtyZXR1cm4gXCJsb2dpblwiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgUmVnaXN0ZXJJZCB7Z2V0e3JldHVybiBcInJlZ2lzdGVyXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBQcm9maWxlSWQge2dldHtyZXR1cm4gXCJwcm9maWxlXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBTZXR0aW5nc0lkIHtnZXR7cmV0dXJuIFwic2V0dGluZ3NcIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEVkaXRBcnRpY2xlSWQge2dldHtyZXR1cm4gXCJlZGl0QXJ0aWNsZVwiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQXJ0aWNsZUlkIHtnZXR7cmV0dXJuIFwiYXJ0aWNsZVwiO319XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTUVTU0FHRVNcclxuICAgICAgICAvLyBtZXNzZW5nZXIgaGVscGVyIGZvciBnbG9iYWwgbWVzc2FnZXMgYW5kIG1lc3NhZ2VzIGlkc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE1lc3NhZ2VzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgR2xvYmFsU2VuZGVyIHsgfTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgR2xvYmFsU2VuZGVyIFNlbmRlciA9IG5ldyBHbG9iYWxTZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIExvZ2luRG9uZSB7Z2V0e3JldHVybiBcIkxvZ2luRG9uZVwiO319XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZWdpc3RlciBhbGwgdHlwZXMgdGhhdCBlbmQgd2l0aCBcInZpZXdtb2RlbFwiLlxyXG4gICAgICAgIC8vLyBZb3UgY2FuIHJlZ2lzdGVyIGEgdmlld21vZGUgYXMgU2luZ2xyIEluc3RhbmNlIGFkZGluZyBcIlNpbmdsZUluc3RhbmNlQXR0cmlidXRlXCIgdG8gdGhlIGNsYXNzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlZ2lzdGVyQWxsVmlld01vZGVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdE1hbnk8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSxnbG9iYWw6OlN5c3RlbS5UeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5Bc3NlbWJseSwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5JRW51bWVyYWJsZTxnbG9iYWw6OlN5c3RlbS5UeXBlPj4pKHMgPT4gcy5HZXRUeXBlcygpKSlcclxuICAgICAgICAgICAgICAgIC5XaGVyZSgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UeXBlLCBib29sPikodyA9PiB3Lk5hbWUuVG9Mb3dlcigpLkVuZHNXaXRoKFwidmlld21vZGVsXCIpKSkuVG9MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uVHlwZT4pKGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFNpbmdsZUluc3RhbmNlQXR0cmlidXRlKSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4oYXR0cmlidXRlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UoZik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyKGYpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERlc2VyaWFsaXplIHJlYWx3b3JsZCBwcm9taXNlIGV4Y2VwdGlvbiB0byBnZXQgZXJyb3JzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRGljdGlvbmFyeTxzdHJpbmcsc3RyaW5nW10+IEdldEVycm9ycyh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gKEVycm9yUmVzcG9uc2UpSnNvbkNvbnZlcnQuRGVzZXJpYWxpemVPYmplY3Q8RXJyb3JSZXNwb25zZT4oZXhjZXB0aW9uLkFyZ3VtZW50c1swXS5Ub0R5bmFtaWMoKS5yZXNwb25zZUpTT04pO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9ycy5FcnJvcnM7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgcmVhZGFibGUgZXJyb3IgbGlzdFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleGNlcHRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIElFbnVtZXJhYmxlPHN0cmluZz4gR2V0RXJyb3JMaXN0KHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBleGNlcHRpb24uR2V0RXJyb3JzKCk7XG5cbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlcnJvciBpbiBlcnJvcnMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGVycm9yRGVzY3JpcHRpb24gaW4gZXJyb3IuVmFsdWUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCByZXR1cm4gc3RyaW5nLkZvcm1hdChcInswfSB7MX1cIixlcnJvci5LZXksZXJyb3JEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuQ2xhc3Nlc1xue1xuICAgIHB1YmxpYyBjbGFzcyBGZWVkUmVxdWVzdEJ1aWxkZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgaW50IF9vZmZzZXQ7XG4gICAgICAgIHByaXZhdGUgaW50IF9saW1pdDtcblxuXG4gICAgICAgIHByaXZhdGUgRmVlZFJlcXVlc3RCdWlsZGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSAyMDtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIEZlZWRSZXF1ZXN0QnVpbGRlciBEZWZhdWx0KClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZWVkUmVxdWVzdEJ1aWxkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVxdWVzdEJ1aWxkZXIgV2l0aE9mZlNldChpbnQgb2Zmc2V0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVxdWVzdEJ1aWxkZXIgV2l0aExpbWl0KGludCBsaW1pdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSBsaW1pdDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJ1aWxkKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcihcImFydGljbGVzL2ZlZWRcIik7XG5cbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCI/bGltaXQ9ezB9XCIsdGhpcy5fbGltaXQpKTtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJm9mZnNldD17MH1cIix0aGlzLl9vZmZzZXQpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG5cclxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXJ0aWNsZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQXV0aG9yID0gbmV3IEF1dGhvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidGl0bGVcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUaXRsZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJzbHVnXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2x1ZyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJib2R5XCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQm9keSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJjcmVhdGVkQXRcIildXHJcbiAgICAgICAgcHVibGljIERhdGVUaW1lPyBDcmVhdGVkQXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidXBkYXRlZEF0XCIpXVxyXG4gICAgICAgIHB1YmxpYyBEYXRlVGltZT8gVXBkYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInRhZ0xpc3RcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIFRhZ0xpc3QgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiZGVzY3JpcHRpb25cIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJhdXRob3JcIildXHJcbiAgICAgICAgcHVibGljIEF1dGhvciBBdXRob3IgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiZmF2b3JpdGVkXCIpXVxyXG4gICAgICAgIHB1YmxpYyBib29sIEZhdm9yaXRlZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJmYXZvcml0ZXNDb3VudFwiKV1cclxuICAgICAgICBwdWJsaWMgbG9uZyBGYXZvcml0ZXNDb3VudCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ3JlYXRlIHtnZXR7cmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsdGhpcy5DcmVhdGVkQXQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxEYXRlVGltZT4oXCJrZXkxXCIpLlRvU3RyaW5nKFwiTU1NTSBkZFwiKTooc3RyaW5nKW51bGw7fX1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5Nb2RlbHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQ29tbWVudFxuICAgIHtcbiAgICAgICAgcHVibGljIENvbW1lbnQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkF1dGhvciA9IG5ldyBBdXRob3IoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImlkXCIpXVxuICAgICAgICBwdWJsaWMgbG9uZyBJZCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImNyZWF0ZWRBdFwiKV1cbiAgICAgICAgcHVibGljIERhdGVUaW1lIENyZWF0ZWRBdCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInVwZGF0ZWRBdFwiKV1cbiAgICAgICAgcHVibGljIERhdGVUaW1lIFVwZGF0ZWRBdCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImJvZHlcIildXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQm9keSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImF1dGhvclwiKV1cbiAgICAgICAgcHVibGljIEF1dGhvciBBdXRob3IgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHN0cmluZyBDcmVhdGUge2dldHtyZXR1cm4gdGhpcy5DcmVhdGVkQXQuVG9TdHJpbmcoXCJNTU1NIGRkXCIpO319XG5cbiAgICB9XG59IiwiXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXG57XG4gICAgcHVibGljIGNsYXNzIFBhZ2luYXRvclxuICAgIHtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPkFjdGl2ZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBpbnQgUGFnZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFBhZ2luYXRvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90YWc7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9hdXRob3I7XG4gICAgICAgIHByaXZhdGUgaW50IF9vZmZzZXQ7XG4gICAgICAgIHByaXZhdGUgaW50IF9saW1pdDtcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3VzZXI7XG5cblxuICAgICAgICBwcml2YXRlIEFydGljbGVSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gMjA7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgRGVmYXVsdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhPZmZTZXQoaW50IG9mZnNldClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhMaW1pdChpbnQgbGltaXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgT2ZBdXRob3Ioc3RyaW5nIGF1dGhvcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fYXV0aG9yID0gYXV0aG9yO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhUYWcoc3RyaW5nIHRhZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdGFnID0gdGFnO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgT2ZGYXZvcml0ZShzdHJpbmcgdXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdXNlciA9IHVzZXI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHN0cmluZyBCdWlsZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoXCJhcnRpY2xlc1wiKTtcblxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIj9saW1pdD17MH1cIix0aGlzLl9saW1pdCkpO1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmb2Zmc2V0PXswfVwiLHRoaXMuX29mZnNldCkpO1xuXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3RhZykpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmdGFnPXswfVwiLHRoaXMuX3RhZykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX2F1dGhvcikpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmYXV0aG9yPXswfVwiLHRoaXMuX2F1dGhvcikpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3VzZXIpKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJmZhdm9yaXRlZD17MH1cIix0aGlzLl91c2VyKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGFic3RyYWN0IGNsYXNzIFJlc291cmNlQmFzZVxuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2VuZXJpYyBBd2FpdGFibGUgYWpheCBjYWxsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBUYXNrPFQ+IE1ha2VDYWxsPFQ+KEFqYXhPcHRpb25zIG9wdGlvbnMpIFxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gVGFzay5Gcm9tUHJvbWlzZTxUPihqUXVlcnkuQWpheChvcHRpb25zKVxuICAgICAgICAgICAgICAgICwgKEZ1bmM8b2JqZWN0LCBzdHJpbmcsIGpxWEhSLCBUPikgKChyZXNPYmosIHN1Y2Nlc3MsIGpxWGhyKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLlN0cmluZ2lmeShyZXNPYmopO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gSnNvbkNvbnZlcnQuRGVzZXJpYWxpemVPYmplY3Q8VD4oanNvbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBSZXR5cGVkO1xudXNpbmcgQ29tbWVudCA9IHJlYWx3b3JsZC5zcGFmLk1vZGVscy5Db21tZW50O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIEFydGljbGVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuQXJ0aWNsZUlkO31cblxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcnRpY2xlUmVzb3VyY2VzIF9hcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElDb21tZW50UmVzb3VyY2VzIF9jb21tZW50UmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElQcm9maWxlUmVzb3VyY2VzIF9wcm9maWxlUmVzb3VyY2VzO1xuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlIEFydGljbGUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQ29tbWVudD5Db21tZW50cyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkNvbW1lbnQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIGJvb2wgSXNMb2dnZWQge2dldHtyZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQ7fX1cbiAgICAgICAgcHVibGljIFVzZXIgTG9nZ2VkVXNlciB7Z2V0e3JldHVybiB0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyO319XG5cbiAgICAgICAgcHVibGljIEFydGljbGVWaWV3TW9kZWwoSUFydGljbGVSZXNvdXJjZXMgYXJ0aWNsZVJlc291cmNlcywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBcbiAgICAgICAgICAgIElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJQ29tbWVudFJlc291cmNlcyBjb21tZW50UmVzb3VyY2VzLCBJUHJvZmlsZVJlc291cmNlcyBwcm9maWxlUmVzb3VyY2VzKVxuICAgICAgICB7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfY29tbWVudFJlc291cmNlcyA9IGNvbW1lbnRSZXNvdXJjZXM7XG4gICAgICAgICAgICBfcHJvZmlsZVJlc291cmNlcyA9IHByb2ZpbGVSZXNvdXJjZXM7XG5cbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZSA9IG5ldyBBcnRpY2xlKCk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnRzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxDb21tZW50PigpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB2YXIgc2x1ZyA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJzbHVnXCIpO1xuICAgICAgICAgICAgaWYoc3RyaW5nLklzTnVsbE9yRW1wdHkoc2x1ZykpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIkFydGljbGUgcGFnZSBuZWVkIHNsdWcgcGFyYW1ldGVyXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVRhc2sgPSB0aGlzLkxvYWRBcnRpY2xlKHNsdWcpO1xuICAgICAgICAgICAgdmFyIGNvbW1lbnRzVGFzayA9IHRoaXMuTG9hZENvbW1lbnRzKHNsdWcpO1xuICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsKGFydGljbGVUYXNrLGNvbW1lbnRzVGFzayk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaEJpbmRpbmcoKTsgLy8gbWFudWFsIHJlZnJlc2ggZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuRW5hYmxlU3BhZkFuY2hvcnMoKTsgLy8gdG9kbyBjaGVjayB3aHkgbm90IGF1dG8gZW5hYmxlZFxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQWRkIGNvbW1lbnQgdG8gYXJ0aWNsZVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRDb21tZW50KClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLklzTG9nZ2VkKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBjb21tZW50UmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9jb21tZW50UmVzb3VyY2VzLkFkZENvbW1lbnQodGhpcy5BcnRpY2xlLlNsdWcsIHRoaXMuQ29tbWVudC5TZWxmKCkpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50LlNlbGYoc3RyaW5nLkVtcHR5KTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMucHVzaChjb21tZW50UmVzcG9uc2UuQ29tbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBGb2xsb3cgQXJ0aWNsZSBBdXRob3JcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRm9sbG93QXV0aG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlcy5Gb2xsb3codGhpcy5BcnRpY2xlLkF1dGhvci5Vc2VybmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE1hbnVhbCByZXZhbHVhdGUgYmluZGluZ1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwcml2YXRlIHZvaWQgUmVmcmVzaEJpbmRpbmcoKVxuICAgICAgICB7XG4gICAgICAgICAgICBSZXR5cGVkLmtub2Nrb3V0LmtvLmNsZWFuTm9kZSh0aGlzLlBhZ2VOb2RlKTtcbiAgICAgICAgICAgIGJhc2UuQXBwbHlCaW5kaW5ncygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBjb21tZW50c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzbHVnXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRDb21tZW50cyhzdHJpbmcgc2x1ZylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSBhd2FpdCB0aGlzLl9jb21tZW50UmVzb3VyY2VzLkdldEFydGljbGVDb21tZW50cyhzbHVnKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudHMucHVzaChjb21tZW50LkNvbW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgQXJ0aWNsZSBpbmZvXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNsdWdcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZEFydGljbGUoc3RyaW5nIHNsdWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlKHNsdWcpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlID0gYXJ0aWNsZS5BcnRpY2xlO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWY7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXHJcbntcclxuICAgIGNsYXNzIEhvbWVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLkhvbWVJZDt9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90YWdGaWx0ZXIgPSBudWxsOyAvLyB0YWcgZmlsdGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfcmVzb3VyY2VzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJRmVlZFJlc291cmNlcyBfZmVlZFJlc291cmNlcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBLTk9DS09VVEpTXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkFydGljbGU+QXJ0aWNsZXM7IC8vIGFydGljbGVzXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj5QYWdlczsgLy8gcGFnaW5hdG9yIGhlbHBlclxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+VGFnczsgLy8gdGFnc1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkFjdGl2ZVRhYkluZGV4OyAvLyB0YWIgYWN0aXZlIGluZGV4XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5UYWJzO1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZDtcclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgSG9tZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyByZXNvdXJjZXMsIElTZXR0aW5ncyBzZXR0aW5ncywgSU1lc3NlbmdlciBtZXNzZW5nZXIsXHJcbiAgICAgICAgICAgIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSUZlZWRSZXNvdXJjZXMgZmVlZFJlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVzb3VyY2VzID0gcmVzb3VyY2VzO1xyXG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcclxuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XHJcbiAgICAgICAgICAgIF9mZWVkUmVzb3VyY2VzID0gZmVlZFJlc291cmNlcztcclxuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8QXJ0aWNsZT4oKTtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8UGFnaW5hdG9yPigpO1xyXG4gICAgICAgICAgICB0aGlzLlRhZ3MgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcclxuICAgICAgICAgICAgdGhpcy5UYWJzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPih0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXggPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxpbnQ+KC0xKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TdWJzY3JpYmU8SVVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuSVVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklzTG9nZ2VkLlNlbGYodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7IC8vIGFsd2F5cyBjYWxsIGJhc2UgKHdoZXJlIGFwcGx5YmluZGluZylcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlc1Rhc2sgPSB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7IC8vIGxvYWQgYXJ0aWNsZSB0YXNrXHJcbiAgICAgICAgICAgIHZhciBsb2FkVGFnc1Rhc2sgPSB0aGlzLkxvYWRUYWdzKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbChhcnRpY2xlc1Rhc2ssbG9hZFRhZ3NUYXNrKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVzVGFzay5SZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBLTk9DS09VVCBNRVRIT0RTXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gdXNlciBkZXRhaWxcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9Vc2VyKEFydGljbGUgYXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5BbGVydChzdHJpbmcuRm9ybWF0KFwiR28gdG8gdXNlciB7MH1cIixhcnRpY2xlLkF1dGhvci5Vc2VybmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGFydGljbGUgZGV0YWlsXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvQXJ0aWNsZShBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFkZCBwYXNzZWQgYXJ0aWNsZSB0byBmYXZcclxuICAgICAgICAvLy8gT25seSBmb3IgYXV0aCB1c2Vyc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRUb0Zhdm91cml0ZShBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQuU2VsZigpKSByZXR1cm47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHbyB0byB1c2VyIGZlZWRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVzZXRUYWJzRm9yRmVlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoLTIpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLkxvYWRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVzZXQgVGFiXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlc2V0VGFicygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoLTEpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlUmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHbyB0byBwYWdlXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdpbmF0b3JcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgR29Ub1BhZ2UoUGFnaW5hdG9yIHBhZ2luYXRvcilcclxuICAgICAgICB7XHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2luZ2xlPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj4oICAgICAgICAgICAgdGhpcy5QYWdlcy5TZWxmKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yLCBib29sPikocyA9PiBzLkFjdGl2ZS5TZWxmKCkpKS5BY3RpdmUuU2VsZihmYWxzZSk7XHJcbiAgICAgICAgICAgIHBhZ2luYXRvci5BY3RpdmUuU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgLldpdGhPZmZTZXQoKHBhZ2luYXRvci5QYWdlLTEpKnRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpXHJcbiAgICAgICAgICAgICAgICAuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl90YWdGaWx0ZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuV2l0aFRhZyh0aGlzLl90YWdGaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5Mb2FkQXJ0aWNsZXMocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEZpbHRlciBhcnRpY2xlcyBieSB0YWdcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhZ1wiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGaWx0ZXJCeVRhZyhzdHJpbmcgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhYk5hbWUgPSBzdHJpbmcuRm9ybWF0KFwiI3swfVwiLHRhZyk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuQXJ0aWNsZXNGb3JUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgYXJ0aWNsZXMgZm9yIHBhc3NlZCB0YWJcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhYlwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBcnRpY2xlc0ZvclRhYihzdHJpbmcgdGFiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSB0YWIuVHJpbVN0YXJ0KCcjJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IHRhZ05hbWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0dWFsSW5kZXggPSB0aGlzLlRhYnMuU2VsZigpLkluZGV4T2YodGFiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGFjdHVhbEluZGV4ID09IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UYWJzLnB1c2godGFiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZih0aGlzLlRhYnMuU2VsZigpLkluZGV4T2YodGFiKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAuV2l0aFRhZyh0YWdOYW1lKVxyXG4gICAgICAgICAgICAgICAgLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQUklWQVRFIE1FVEhPRFNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGFydGljbGVzXHJcbiAgICAgICAgLy8vIENsZWFyIGxpc3QgYW5kIHJlbG9hZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBMb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIHJlcXVlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVJlc29SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5HZXRBcnRpY2xlcyhyZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZVJlc29SZXNwb25zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGZlZWRcclxuICAgICAgICAvLy8gQ2xlYXIgbGlzdCBhbmQgcmVsb2FkXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IExvYWRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlciByZXF1ZXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZlZWRSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2ZlZWRSZXNvdXJjZXMuR2V0RmVlZChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKGZlZWRSZXNwb25zZS5BcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZWVkUmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbG9hZCB0YWdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkVGFncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFncyA9IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5HZXRUYWdzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFncy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5UYWdzLnB1c2godGFncy5UYWdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBXaGVuIHVwZGF0ZSBhcnRpY2xlcyByZWJ1aWxkIHBhZ2luYXRvclxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVJlc29SZXNwb25zZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlZnJlc2hQYWdpbmF0b3IoQXJ0aWNsZVJlc3BvbnNlIGFydGljbGVSZXNvUmVzcG9uc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBhZ2VzLnJlbW92ZUFsbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5BcnRpY2xlPihhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzKSkgcmV0dXJuOyAvLyBubyBhcnRpY2xlc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHBhZ2VzQ291bnQgPSAoaW50KSAoYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlc0NvdW50IC8gYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlcy5MZW5ndGgpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBFbnVtZXJhYmxlLlJhbmdlKDEsIHBhZ2VzQ291bnQpO1xyXG4gICAgICAgICAgICB2YXIgcGFnZXMgPSByYW5nZS5TZWxlY3Q8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yPigoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxpbnQsIGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj4pKHMgPT4gbmV3IFBhZ2luYXRvclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQYWdlID0gc1xyXG4gICAgICAgICAgICB9KSkuVG9BcnJheSgpO1xyXG4gICAgICAgICAgICBwYWdlc1swXS5BY3RpdmUuU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcy5wdXNoKHBhZ2VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgTG9naW5WaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuTG9naW5JZDt9XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+RW1haWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5QYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+RXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgTG9naW5WaWV3TW9kZWwoSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLkVtYWlsID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5QYXNzd29yZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIExvZ2luKClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuTG9naW4odGhpcy5FbWFpbC5TZWxmKCksIHRoaXMuUGFzc3dvcmQuU2VsZigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpOyAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBlLkdldEVycm9yTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oZXJyb3JzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBbU2luZ2xlSW5zdGFuY2VdXG4gICAgcHVibGljIGNsYXNzIE1haW5WaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzTG9nZ2VkIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgTWFpblZpZXdNb2RlbChJTWVzc2VuZ2VyIG1lc3NlbmdlciwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPihmYWxzZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TdWJzY3JpYmU8SVVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuSVVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZC5TZWxmKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFwcGx5IGJpbmRpbmcgdG8gbWFpbm1vZGVsXG4gICAgICAgIC8vLyB0cnkgYXV0byBsb2dpblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJldHlwZWQua25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLlRyeUF1dG9Mb2dpbldpdGhTdG9yZWRUb2tlbigpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBQcm9maWxlVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLlByb2ZpbGVJZDt9XG5cbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuXG4gICAgICAgIHB1YmxpYyBVc2VyTW9kZWwgVXNlciB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFByb2ZpbGVWaWV3TW9kZWwoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLlVzZXIgPSBuZXcgVXNlck1vZGVsKCk7XG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuVXNlci5NYXBNZSh0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyKTtcblxuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBjbGFzcyBVc2VyTW9kZWxcbiAgICB7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkltYWdlVXJpIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VXNlcm5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5CaW9ncmFwaHkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5FbWFpbCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFVzZXJNb2RlbCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuSW1hZ2VVcmkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5CaW9ncmFwaHkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgTWFwTWUgKFVzZXIgdXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5JbWFnZVVyaS5TZWxmKHVzZXIuSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZS5TZWxmKHVzZXIuVXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5CaW9ncmFwaHkuU2VsZih1c2VyLkJpbyk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsLlNlbGYodXNlci5FbWFpbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFJldHlwZWQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgUmVnaXN0ZXJWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuUmVnaXN0ZXJJZDt9XG5cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IFVzZXJuYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IEVtYWlsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IFBhc3N3b3JkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5PHN0cmluZz4gRXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUmVnaXN0ZXJWaWV3TW9kZWwoSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRW1haWwgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5QYXNzd29yZCA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycyA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVnaXN0ZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5SZWdpc3Rlcih0aGlzLlVzZXJuYW1lLlNlbGYoKSwgdGhpcy5FbWFpbC5TZWxmKCksIHRoaXMuUGFzc3dvcmQuU2VsZigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBlLkdldEVycm9yTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oZXJyb3JzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIFNldHRpbmdzVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3NSZXNvdXJjZXMgX3NldHRpbmdzUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcblxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpIHtyZXR1cm4gU3BhZkFwcC5TZXR0aW5nc0lkO31cblxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5JbWFnZVVyaSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlVzZXJuYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+QmlvZ3JhcGh5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+RW1haWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5OZXdQYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+RXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuXG4gICAgICAgIHB1YmxpYyBTZXR0aW5nc1ZpZXdNb2RlbChJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIElTZXR0aW5nc1Jlc291cmNlcyBzZXR0aW5nc1Jlc291cmNlcywgSU5hdmlnYXRvciBuYXZpZ2F0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1Jlc291cmNlcyA9IHNldHRpbmdzUmVzb3VyY2VzO1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuXG4gICAgICAgICAgICB0aGlzLkltYWdlVXJpID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuQmlvZ3JhcGh5ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FbWFpbCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuTmV3UGFzc3dvcmQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xuXG4gICAgICAgICAgICB0aGlzLlBvcHVsYXRlRW50cmllcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFBvcHVsYXRlRW50cmllcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gdGhpcy5fdXNlclNlcnZpY2UuTG9nZ2VkVXNlcjtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUuU2VsZih1c2VyLlVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuRW1haWwuU2VsZih1c2VyLkVtYWlsKTtcbiAgICAgICAgICAgIHRoaXMuSW1hZ2VVcmkuU2VsZih1c2VyLkltYWdlKTtcbiAgICAgICAgICAgIHRoaXMuQmlvZ3JhcGh5LlNlbGYodXNlci5CaW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIFVwZGF0ZVNldHRpbmdzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzUmVxdWVzdCA9IG5ldyBTZXR0aW5nc1JlcXVlc3RcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFVzZXJuYW1lID0gdGhpcy5Vc2VybmFtZS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIE5ld1Bhc3N3b3JkID0gdGhpcy5OZXdQYXNzd29yZC5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEJpb2dyYXBoeSA9IHRoaXMuQmlvZ3JhcGh5LlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSB0aGlzLkVtYWlsLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VVcmkgPSB0aGlzLkltYWdlVXJpLlNlbGYoKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgdXNlclVwZGF0ZWQgPSBhd2FpdCB0aGlzLl9zZXR0aW5nc1Jlc291cmNlcy5VcGRhdGVTZXR0aW5ncyhzZXR0aW5nc1JlcXVlc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLlByb2ZpbGVJZCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChQcm9taXNlRXhjZXB0aW9uIGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IGUuR2V0RXJyb3JMaXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xyXG5cclxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcclxue1xyXG4gICAgY2xhc3MgQXJ0aWNsZVJlc291cmNlcyA6IFJlc291cmNlQmFzZSwgSUFydGljbGVSZXNvdXJjZXNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBHZXRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgYnVpbGRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLGJ1aWxkZXIuQnVpbGQoKSksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8VGFnc1Jlc3BvbnNlPiBHZXRUYWdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdGFnc1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFRhZ3NSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+IEdldEFydGljbGUoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGFic3RyYWN0IGNsYXNzIEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UgOiBSZXNvdXJjZUJhc2VcbiAgICB7XG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBJVXNlclNlcnZpY2UgVXNlclNlcnZpY2U7XG5cbiAgICAgICAgcHJvdGVjdGVkIEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBVc2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmljIEF3YWl0YWJsZSBhamF4IGNhbGxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByb3RlY3RlZCBUYXNrPFQ+IE1ha2VBdXRob3JpemVkQ2FsbDxUPihBamF4T3B0aW9ucyBvcHRpb25zKSBcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoIXRoaXMuVXNlclNlcnZpY2UuSXNMb2dnZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIllvdSBtdXN0IGJlIGxvZ2dlZCB0byB1c2UgdGhpcyByZXNvdXJjZVwiKTtcblxuICAgICAgICAgICAgb3B0aW9ucy5CZWZvcmVTZW5kID0gKHhociwgbykgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4aHIuU2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgc3RyaW5nLkZvcm1hdChcIlRva2VuIHswfVwiLHRoaXMuVXNlclNlcnZpY2UuTG9nZ2VkVXNlci5Ub2tlbikpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFQ+KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5IDogSVJlcG9zaXRvcnlcbiAgICB7XG4gICAgICAgIHByaXZhdGUgY29uc3Qgc3RyaW5nIFRva2VuS2V5ID0gXCJ0b2tlblwiO1xuICAgICAgICBwcml2YXRlIFN0b3JhZ2UgX3N0b3JhZ2U7XG5cbiAgICAgICAgcHVibGljIExvY2FsU3RvcmFnZVJlcG9zaXRvcnkoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlID0gV2luZG93LkxvY2FsU3RvcmFnZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHZvaWQgU2F2ZVRva2VuKHN0cmluZyB0b2tlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5TZXRJdGVtKFRva2VuS2V5LHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0VG9rZW5JZkV4aXN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5fc3RvcmFnZS5HZXRJdGVtKFRva2VuS2V5KTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbiE9bnVsbD90b2tlbi5Ub1N0cmluZygpOihzdHJpbmcpbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZVRva2VuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5SZW1vdmVJdGVtKFRva2VuS2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBVc2VyUmVzb3VyY2VzIDogUmVzb3VyY2VCYXNlLCBJVXNlclJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBVc2VyUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IExvZ2luKFNpZ25SZXF1ZXN0IGxvZ2luUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJzL2xvZ2luXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobG9naW5SZXF1ZXN0KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2lnblJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gUmVnaXN0ZXIoU2lnblJlcXVlc3QgbG9naW5SZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlcnNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChsb2dpblJlcXVlc3QpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBHZXRDdXJyZW50VXNlcihzdHJpbmcgdG9rZW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2VyXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIEJlZm9yZVNlbmQgPSAoeGhyLCBvKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLlNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIHN0cmluZy5Gb3JtYXQoXCJUb2tlbiB7MH1cIix0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFVzZXJTZXJ2aWNlIDogSVVzZXJTZXJ2aWNlXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyUmVzb3VyY2VzIF91c2VyUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUmVwb3NpdG9yeSBfcmVwb3NpdG9yeTtcblxuICAgICAgICBwdWJsaWMgVXNlclNlcnZpY2UoSVVzZXJSZXNvdXJjZXMgdXNlclJlc291cmNlcywgSU1lc3NlbmdlciBtZXNzZW5nZXIsIElSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF91c2VyUmVzb3VyY2VzID0gdXNlclJlc291cmNlcztcbiAgICAgICAgICAgIF9tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XG4gICAgICAgICAgICBfcmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVXNlciBMb2dnZWRVc2VyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuICAgICAgICBwdWJsaWMgYm9vbCBJc0xvZ2dlZCB7Z2V0e3JldHVybiB0aGlzLkxvZ2dlZFVzZXIgIT0gbnVsbDt9fVxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIExvZ2luKHN0cmluZyBtYWlsLCBzdHJpbmcgcGFzc3dvcmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsb2dpblJlc3BvbnNlID0gYXdhaXQgdGhpcy5fdXNlclJlc291cmNlcy5Mb2dpbihuZXcgU2lnblJlcXVlc3RcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VyID0gbmV3IFVzZXJSZXF1ZXN0XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IG1haWwsXG4gICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkID0gcGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbG9naW5SZXNwb25zZS5Vc2VyO1xuICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5TYXZlVG9rZW4obG9naW5SZXNwb25zZS5Vc2VyLlRva2VuKTtcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TZW5kPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuSVVzZXJTZXJ2aWNlPigoSVVzZXJTZXJ2aWNlKXRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVnaXN0ZXIoc3RyaW5nIHVzZXJuYW1lLCBzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuUmVnaXN0ZXIobmV3IFNpZ25SZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXNlciA9IG5ldyBVc2VyUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSBtYWlsLFxuICAgICAgICAgICAgICAgICAgICBQYXNzd29yZCA9IHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICBVc2VybmFtZSA9IHVzZXJuYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLklVc2VyU2VydmljZT4oKElVc2VyU2VydmljZSl0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFRyeUF1dG9Mb2dpbldpdGhTdG9yZWRUb2tlbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdG9yZWRUb2tlbiA9IHRoaXMuX3JlcG9zaXRvcnkuR2V0VG9rZW5JZkV4aXN0KCk7XG4gICAgICAgICAgICBpZiAoc3RvcmVkVG9rZW4gPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuR2V0Q3VycmVudFVzZXIoc3RvcmVkVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LlNhdmVUb2tlbihsb2dpblJlc3BvbnNlLlVzZXIuVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TZW5kPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuSVVzZXJTZXJ2aWNlPigoSVVzZXJTZXJ2aWNlKXRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LkRlbGV0ZVRva2VuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBDb21tZW50UmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSxJQ29tbWVudFJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBDb21tZW50UmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgVGFzazxDb21tZW50c1Jlc3BvbnNlPiBHZXRBcnRpY2xlQ29tbWVudHMoc3RyaW5nIHNsdWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vY29tbWVudHNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8Q29tbWVudHNSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVDb21tZW50UmVzcG9uc2U+IEFkZENvbW1lbnQoc3RyaW5nIHNsdWcsIHN0cmluZyBjb21tZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2NvbW1lbnRzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChuZXcgQ29tbWVudFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgQm9keSA9IGNvbW1lbnRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUNvbW1lbnRSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIEZlZWRSZXNvdXJjZXMgOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJRmVlZFJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IEdldEZlZWQoRmVlZFJlcXVlc3RCdWlsZGVyIGJ1aWxkZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS97MX1cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksYnVpbGRlci5CdWlsZCgpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJHRVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgUHJvZmlsZVJlc291cmNlcyA6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElQcm9maWxlUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIFByb2ZpbGVSZXNvdXJjZXMoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBJU2V0dGluZ3Mgc2V0dGluZ3MpIDogYmFzZSh1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBUYXNrPEZvbGxvd1Jlc3BvbnNlPiBGb2xsb3coc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vcHJvZmlsZXMvezF9L2ZvbGxvd1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSx1c2VybmFtZSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxGb2xsb3dSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgU2V0dGluZ3NSZXNvdXJjZXM6IEF1dGhvcml6ZWRSZXNvdXJjZUJhc2UsIElTZXR0aW5nc1Jlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBTZXR0aW5nc1Jlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2V0dGluZ3NSZXNwb25zZT4gVXBkYXRlU2V0dGluZ3MoU2V0dGluZ3NSZXF1ZXN0IHNldHRpbmdzUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBVVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KHNldHRpbmdzUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTZXR0aW5nc1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdCn0K
