/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("realworld.spaf.test", function ($asm, globals) {
    "use strict";

    Bridge.define("realworld.spaf.test.FakeNavigator", {
        inherits: [Bridge.Navigation.INavigator],
        fields: {
            /**
             * Is Navigated Called?
             *
             * @instance
             * @public
             * @memberof realworld.spaf.test.FakeNavigator
             * @function NavigateCalled
             * @type boolean
             */
            NavigateCalled: false,
            LastNavigateController: null
        },
        events: {
            OnNavigated: null
        },
        alias: [
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation",
            "EnableSpafAnchors", "Bridge$Navigation$INavigator$EnableSpafAnchors",
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "LastNavigateController", "Bridge$Navigation$INavigator$LastNavigateController",
            "addOnNavigated", "Bridge$Navigation$INavigator$addOnNavigated",
            "removeOnNavigated", "Bridge$Navigation$INavigator$removeOnNavigated"
        ],
        methods: {
            InitNavigation: function () {

            },
            EnableSpafAnchors: function () { },
            Navigate: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                this.NavigateCalled = true;
            }
        }
    });

    Bridge.define("realworld.spaf.test.FakeRepository", {
        inherits: [realworld.spaf.Services.IRepository],
        fields: {
            SaveTokenCalled: false
        },
        alias: [
            "SaveToken", "realworld$spaf$Services$IRepository$SaveToken",
            "GetTokenIfExist", "realworld$spaf$Services$IRepository$GetTokenIfExist",
            "DeleteToken", "realworld$spaf$Services$IRepository$DeleteToken"
        ],
        methods: {
            SaveToken: function (token) {
                this.SaveTokenCalled = true;
            },
            GetTokenIfExist: function () {
                throw new System.NotImplementedException();
            },
            DeleteToken: function () {
                throw new System.NotImplementedException();
            }
        }
    });

    Bridge.define("realworld.spaf.test.FakeUserResource", {
        inherits: [realworld.spaf.Services.IUserResources],
        fields: {
            LoginCalled: false
        },
        alias: [
            "Login", "realworld$spaf$Services$IUserResources$Login",
            "Register", "realworld$spaf$Services$IUserResources$Register",
            "GetCurrentUser", "realworld$spaf$Services$IUserResources$GetCurrentUser"
        ],
        methods: {
            Login: function (loginRequest) {
                var $t, $t1;
                this.LoginCalled = true;

                return System.Threading.Tasks.Task.fromResult(($t = new realworld.spaf.Models.Response.SignResponse(), $t.User = ($t1 = new realworld.spaf.Models.User(), $t1.Token = "123", $t1.Email = "me@markjackmilian.com", $t1.Id = 1, $t1.Username = "markjackmilian", $t1), $t), Bridge.global.realworld.spaf.Models.Response.SignResponse);
            },
            Register: function (loginRequest) {
                throw new System.NotImplementedException();
            },
            GetCurrentUser: function (token) {
                throw new System.NotImplementedException();
            }
        }
    });

    Bridge.define("realworld.spaf.test.FakeUserService", {
        inherits: [realworld.spaf.Services.IUserService],
        fields: {
            /**
             * Is Login Called?
             *
             * @instance
             * @public
             * @memberof realworld.spaf.test.FakeUserService
             * @function LoginCalled
             * @type boolean
             */
            LoginCalled: false,
            LoggedUser: null,
            IsLogged: false
        },
        alias: [
            "LoggedUser", "realworld$spaf$Services$IUserService$LoggedUser",
            "IsLogged", "realworld$spaf$Services$IUserService$IsLogged",
            "Login", "realworld$spaf$Services$IUserService$Login",
            "Register", "realworld$spaf$Services$IUserService$Register",
            "TryAutoLoginWithStoredToken", "realworld$spaf$Services$IUserService$TryAutoLoginWithStoredToken"
        ],
        methods: {
            Login: function (mail, password) {
                this.LoginCalled = true;
                return System.Threading.Tasks.Task.fromResult(0, System.Int32);
            },
            Register: function (username, mail, password) {
                throw new System.NotImplementedException();
            },
            TryAutoLoginWithStoredToken: function () {
                throw new System.NotImplementedException();
            }
        }
    });

    Bridge.define("realworld.spaf.test.LoginViewModelTest", {
        methods: {
            WhenLoginIsCalled_LoginOnUserServiceIsCalled: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    fakeNavigator, 
                    fakeUSerService, 
                    loginVm, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        fakeNavigator = new realworld.spaf.test.FakeNavigator();
                                        fakeUSerService = new realworld.spaf.test.FakeUserService();
                                        loginVm = new realworld.spaf.ViewModels.LoginViewModel(fakeNavigator, fakeUSerService);
                                        $task1 = loginVm.Login();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Boolean, fakeUSerService.LoginCalled, true);
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
            WhenLoginIsCalled_NavigateIsCalled: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    fakeNavigator, 
                    fakeUSerService, 
                    loginVm, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        fakeNavigator = new realworld.spaf.test.FakeNavigator();
                                        fakeUSerService = new realworld.spaf.test.FakeUserService();
                                        loginVm = new realworld.spaf.ViewModels.LoginViewModel(fakeNavigator, fakeUSerService);
                                        $task1 = loginVm.Login();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Boolean, fakeNavigator.NavigateCalled, true);
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

    Bridge.define("realworld.spaf.test.UserServiceTest", {
        methods: {
            WhenLoginDone_RepoSaveTokenIsCalled: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    repo, 
                    userService, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        repo = new realworld.spaf.test.FakeRepository();
                                        userService = new realworld.spaf.Services.impl.UserService(new realworld.spaf.test.FakeUserResource(), new Bridge.Messenger.Messenger(), repo);
                                        $task1 = userService.Login("fake", "fakse");
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Boolean, repo.SaveTokenCalled, true);
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
            WhenLoginDone_LoggedUserIsSetted: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    repo, 
                    userService, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        repo = new realworld.spaf.test.FakeRepository();
                                        userService = new realworld.spaf.Services.impl.UserService(new realworld.spaf.test.FakeUserResource(), new Bridge.Messenger.Messenger(), repo);
                                        $task1 = userService.Login("fake", "fakse");
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.global.realworld.spaf.Models.User, userService.LoggedUser, null);
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.String, userService.LoggedUser.Username, "markjackmilian");
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
            JustSeeAFailTest: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    repo, 
                    userService, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        repo = new realworld.spaf.test.FakeRepository();
                                        userService = new realworld.spaf.Services.impl.UserService(new realworld.spaf.test.FakeUserResource(), new Bridge.Messenger.Messenger(), repo);
                                        $task1 = userService.Login("fake", "fakse");
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.String, userService.LoggedUser.Username, "fail_test");
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi50ZXN0LmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJGYWtlcy5jcyIsIkxvZ2luVmlld01vZGVsVGVzdC5jcyIsIlVzZXJTZXJ2aWNlVGVzdC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQTJCNkJBLFFBQWVBOztnQkFFaENBOzs7Ozs7Ozs7Ozs7Ozs7O2lDQXNFa0JBO2dCQUVsQkE7OztnQkFLQUEsTUFBTUEsSUFBSUE7OztnQkFLVkEsTUFBTUEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBM0NrQkE7O2dCQUU1QkE7O2dCQUVBQSxPQUFPQSx1Q0FBcUVBLFVBQUlBLHlEQUVyRUEsV0FBSUEsOElBRlFBOztnQ0FZUUE7Z0JBRS9CQSxNQUFNQSxJQUFJQTs7c0NBRzJCQTtnQkFFckNBLE1BQU1BLElBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkE3Q0lBLE1BQWFBO2dCQUUzQkE7Z0JBQ0FBLE9BQU9BLDBDQUFnQkE7O2dDQUlOQSxVQUFpQkEsTUFBYUE7Z0JBRS9DQSxNQUFNQSxJQUFJQTs7O2dCQUtWQSxNQUFNQSxJQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NDL0NWQSxnQkFBb0JBLElBQUlBO3dDQUN4QkEsa0JBQXNCQSxJQUFJQTt3Q0FDMUJBLFVBQWNBLElBQUlBLHlDQUFlQSxlQUFlQTt3Q0FDaERBLFNBQU1BOzs7Ozs7O3dDQUNsQkEseUVBQTJFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NBTS9EQSxnQkFBb0JBLElBQUlBO3dDQUN4QkEsa0JBQXNCQSxJQUFJQTt3Q0FDMUJBLFVBQWNBLElBQUlBLHlDQUFlQSxlQUFlQTt3Q0FDaERBLFNBQU1BOzs7Ozs7O3dDQUNsQkEseUVBQTJFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQ2IvREEsT0FBV0EsSUFBSUE7d0NBQ2ZBLGNBQWtCQSxJQUFJQSx5Q0FBWUEsSUFBSUEsd0NBQW9CQSxJQUFJQSw4QkFBYUE7d0NBQzNFQSxTQUFNQTs7Ozs7Ozt3Q0FDbEJBLHlFQUNZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FNQUEsT0FBV0EsSUFBSUE7d0NBQ2ZBLGNBQWtCQSxJQUFJQSx5Q0FBWUEsSUFBSUEsd0NBQW9CQSxJQUFJQSw4QkFBYUE7d0NBQzNFQSxTQUFNQTs7Ozs7Ozt3Q0FDbEJBLHNHQUNZQSx3QkFBdUJBO3dDQUNuQ0Esd0VBQTZFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FNakVBLE9BQVdBLElBQUlBO3dDQUNmQSxjQUFrQkEsSUFBSUEseUNBQVlBLElBQUlBLHdDQUFvQkEsSUFBSUEsOEJBQWFBO3dDQUMzRUEsU0FBTUE7Ozs7Ozs7d0NBQ2xCQSx3RUFDWUEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYudGVzdFxue1xuICAgIGNsYXNzIEZha2VOYXZpZ2F0b3IgOiBJTmF2aWdhdG9yXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBJcyBOYXZpZ2F0ZWQgQ2FsbGVkP1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgYm9vbCBOYXZpZ2F0ZUNhbGxlZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0TmF2aWdhdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgRW5hYmxlU3BhZkFuY2hvcnMoKVxuICAgICAgICB7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBOYXZpZ2F0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZUNhbGxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgSUFtTG9hZGFibGUgTGFzdE5hdmlnYXRlQ29udHJvbGxlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlcjxJQW1Mb2FkYWJsZT4gT25OYXZpZ2F0ZWQ7XG4gICAgfVxuICAgIFxuICAgIGNsYXNzIEZha2VVc2VyU2VydmljZSA6IElVc2VyU2VydmljZVxuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gSXMgTG9naW4gQ2FsbGVkP1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgYm9vbCBMb2dpbkNhbGxlZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBcbiAgICAgICAgcHVibGljIFVzZXIgTG9nZ2VkVXNlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIGJvb2wgSXNMb2dnZWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9IFxuICAgICAgICBwdWJsaWMgVGFzayBMb2dpbihzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkxvZ2luQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBUYXNrLkZyb21SZXN1bHQ8aW50PigwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIFRhc2sgUmVnaXN0ZXIoc3RyaW5nIHVzZXJuYW1lLCBzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3lzdGVtLk5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzayBUcnlBdXRvTG9naW5XaXRoU3RvcmVkVG9rZW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3lzdGVtLk5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBGYWtlVXNlclJlc291cmNlIDogSVVzZXJSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHB1YmxpYyBib29sIExvZ2luQ2FsbGVkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gTG9naW4oU2lnblJlcXVlc3QgbG9naW5SZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkxvZ2luQ2FsbGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIFRhc2suRnJvbVJlc3VsdDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZS5TaWduUmVzcG9uc2U+KG5ldyBTaWduUmVzcG9uc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VyID0gbmV3IFVzZXJcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFRva2VuID0gXCIxMjNcIixcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSBcIm1lQG1hcmtqYWNrbWlsaWFuLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICBJZCA9IDEsXG4gICAgICAgICAgICAgICAgICAgIFVzZXJuYW1lID0gXCJtYXJramFja21pbGlhblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IFJlZ2lzdGVyKFNpZ25SZXF1ZXN0IGxvZ2luUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IEdldEN1cnJlbnRVc2VyKHN0cmluZyB0b2tlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBGYWtlUmVwb3NpdG9yeSA6IElSZXBvc2l0b3J5XG4gICAge1xuICAgICAgICBwdWJsaWMgYm9vbCBTYXZlVG9rZW5DYWxsZWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgU2F2ZVRva2VuKHN0cmluZyB0b2tlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5TYXZlVG9rZW5DYWxsZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRUb2tlbklmRXhpc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZVRva2VuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVscztcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLnRlc3RcbntcbiAgICBbVGVzdF1cbiAgICBwdWJsaWMgY2xhc3MgTG9naW5WaWV3TW9kZWxUZXN0XG4gICAge1xuICAgICAgICBbVGVzdE1ldGhvZF1cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgV2hlbkxvZ2luSXNDYWxsZWRfTG9naW5PblVzZXJTZXJ2aWNlSXNDYWxsZWQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZmFrZU5hdmlnYXRvciA9IG5ldyBGYWtlTmF2aWdhdG9yKCk7XG4gICAgICAgICAgICB2YXIgZmFrZVVTZXJTZXJ2aWNlID0gbmV3IEZha2VVc2VyU2VydmljZSgpO1xuICAgICAgICAgICAgdmFyIGxvZ2luVm0gPSBuZXcgTG9naW5WaWV3TW9kZWwoZmFrZU5hdmlnYXRvciwgZmFrZVVTZXJTZXJ2aWNlKTtcbiAgICAgICAgICAgIGF3YWl0IGxvZ2luVm0uTG9naW4oKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGJvb2w+KCAgICAgICAgICAgIGZha2VVU2VyU2VydmljZS5Mb2dpbkNhbGxlZCx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2RdXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFdoZW5Mb2dpbklzQ2FsbGVkX05hdmlnYXRlSXNDYWxsZWQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZmFrZU5hdmlnYXRvciA9IG5ldyBGYWtlTmF2aWdhdG9yKCk7XG4gICAgICAgICAgICB2YXIgZmFrZVVTZXJTZXJ2aWNlID0gbmV3IEZha2VVc2VyU2VydmljZSgpO1xuICAgICAgICAgICAgdmFyIGxvZ2luVm0gPSBuZXcgTG9naW5WaWV3TW9kZWwoZmFrZU5hdmlnYXRvciwgZmFrZVVTZXJTZXJ2aWNlKTtcbiAgICAgICAgICAgIGF3YWl0IGxvZ2luVm0uTG9naW4oKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPGJvb2w+KCAgICAgICAgICAgIGZha2VOYXZpZ2F0b3IuTmF2aWdhdGVDYWxsZWQsdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYudGVzdFxue1xuICAgIFtUZXN0XVxuICAgIHB1YmxpYyBjbGFzcyBVc2VyU2VydmljZVRlc3RcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBXaGVuTG9naW5Eb25lX1JlcG9TYXZlVG9rZW5Jc0NhbGxlZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXBvID0gbmV3IEZha2VSZXBvc2l0b3J5KCk7XG4gICAgICAgICAgICB2YXIgdXNlclNlcnZpY2UgPSBuZXcgVXNlclNlcnZpY2UobmV3IEZha2VVc2VyUmVzb3VyY2UoKSwgbmV3IE1lc3NlbmdlcigpLCByZXBvKTtcbiAgICAgICAgICAgIGF3YWl0IHVzZXJTZXJ2aWNlLkxvZ2luKFwiZmFrZVwiLCBcImZha3NlXCIpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Ym9vbD4oICAgICAgICAgICAgXG4gICAgICAgICAgICByZXBvLlNhdmVUb2tlbkNhbGxlZCx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2RdXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFdoZW5Mb2dpbkRvbmVfTG9nZ2VkVXNlcklzU2V0dGVkKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcG8gPSBuZXcgRmFrZVJlcG9zaXRvcnkoKTtcbiAgICAgICAgICAgIHZhciB1c2VyU2VydmljZSA9IG5ldyBVc2VyU2VydmljZShuZXcgRmFrZVVzZXJSZXNvdXJjZSgpLCBuZXcgTWVzc2VuZ2VyKCksIHJlcG8pO1xuICAgICAgICAgICAgYXdhaXQgdXNlclNlcnZpY2UuTG9naW4oXCJmYWtlXCIsIFwiZmFrc2VcIik7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZU5vdEVxdWFsczxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5Vc2VyPiggICAgICAgICAgICBcbiAgICAgICAgICAgIHVzZXJTZXJ2aWNlLkxvZ2dlZFVzZXIsbnVsbCk7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxzdHJpbmc+KCAgICAgICAgICAgIHVzZXJTZXJ2aWNlLkxvZ2dlZFVzZXIuVXNlcm5hbWUsXCJtYXJramFja21pbGlhblwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW1Rlc3RNZXRob2RdXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEp1c3RTZWVBRmFpbFRlc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVwbyA9IG5ldyBGYWtlUmVwb3NpdG9yeSgpO1xuICAgICAgICAgICAgdmFyIHVzZXJTZXJ2aWNlID0gbmV3IFVzZXJTZXJ2aWNlKG5ldyBGYWtlVXNlclJlc291cmNlKCksIG5ldyBNZXNzZW5nZXIoKSwgcmVwbyk7XG4gICAgICAgICAgICBhd2FpdCB1c2VyU2VydmljZS5Mb2dpbihcImZha2VcIiwgXCJmYWtzZVwiKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPHN0cmluZz4oICAgICAgICAgICAgXG4gICAgICAgICAgICB1c2VyU2VydmljZS5Mb2dnZWRVc2VyLlVzZXJuYW1lLFwiZmFpbF90ZXN0XCIpO1xuICAgICAgICB9XG4gICAgfVxufSJdCn0K
