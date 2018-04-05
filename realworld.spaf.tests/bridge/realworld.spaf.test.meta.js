Bridge.assembly("realworld.spaf.test", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,System.Collections.Generic,Bridge.Navigation,System.Threading.Tasks,realworld.spaf.Models,realworld.spaf.Models.Request];
    $m("realworld.spaf.test.FakeNavigator", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"EnableSpafAnchors","t":8,"sn":"EnableSpafAnchors","rt":$n[0].Void},{"a":2,"n":"InitNavigation","t":8,"sn":"InitNavigation","rt":$n[0].Void},{"a":2,"n":"Navigate","t":8,"pi":[{"n":"pageId","pt":$n[0].String,"ps":0},{"n":"parameters","dv":null,"o":true,"pt":$n[1].Dictionary$2(System.String,System.Object),"ps":1}],"sn":"Navigate","rt":$n[0].Void,"p":[$n[0].String,$n[1].Dictionary$2(System.String,System.Object)]},{"a":2,"n":"LastNavigateController","t":16,"rt":$n[2].IAmLoadable,"g":{"a":2,"n":"get_LastNavigateController","t":8,"rt":$n[2].IAmLoadable,"fg":"LastNavigateController"},"fn":"LastNavigateController"},{"a":2,"n":"NavigateCalled","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_NavigateCalled","t":8,"rt":$n[0].Boolean,"fg":"NavigateCalled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_NavigateCalled","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"NavigateCalled"},"fn":"NavigateCalled"},{"a":2,"n":"OnNavigated","t":2,"ad":{"a":2,"n":"add_OnNavigated","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addOnNavigated","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_OnNavigated","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeOnNavigated","rt":$n[0].Void,"p":[Function]}}]}; });
    $m("realworld.spaf.test.FakeUserService", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Login","t":8,"pi":[{"n":"mail","pt":$n[0].String,"ps":0},{"n":"password","pt":$n[0].String,"ps":1}],"sn":"Login","rt":$n[3].Task,"p":[$n[0].String,$n[0].String]},{"a":2,"n":"Register","t":8,"pi":[{"n":"username","pt":$n[0].String,"ps":0},{"n":"mail","pt":$n[0].String,"ps":1},{"n":"password","pt":$n[0].String,"ps":2}],"sn":"Register","rt":$n[3].Task,"p":[$n[0].String,$n[0].String,$n[0].String]},{"a":2,"n":"TryAutoLoginWithStoredToken","t":8,"sn":"TryAutoLoginWithStoredToken","rt":$n[3].Task},{"a":2,"n":"IsLogged","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsLogged","t":8,"rt":$n[0].Boolean,"fg":"IsLogged","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsLogged"},{"a":2,"n":"LoggedUser","t":16,"rt":$n[4].User,"g":{"a":2,"n":"get_LoggedUser","t":8,"rt":$n[4].User,"fg":"LoggedUser"},"fn":"LoggedUser"},{"a":2,"n":"LoginCalled","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_LoginCalled","t":8,"rt":$n[0].Boolean,"fg":"LoginCalled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_LoginCalled","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"LoginCalled"},"fn":"LoginCalled"}]}; });
    $m("realworld.spaf.test.FakeUserResource", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"GetCurrentUser","t":8,"pi":[{"n":"token","pt":$n[0].String,"ps":0}],"sn":"GetCurrentUser","rt":$n[3].Task$1(realworld.spaf.Models.Response.SignResponse),"p":[$n[0].String]},{"a":2,"n":"Login","t":8,"pi":[{"n":"loginRequest","pt":$n[5].SignRequest,"ps":0}],"sn":"Login","rt":$n[3].Task$1(realworld.spaf.Models.Response.SignResponse),"p":[$n[5].SignRequest]},{"a":2,"n":"Register","t":8,"pi":[{"n":"loginRequest","pt":$n[5].SignRequest,"ps":0}],"sn":"Register","rt":$n[3].Task$1(realworld.spaf.Models.Response.SignResponse),"p":[$n[5].SignRequest]},{"a":2,"n":"LoginCalled","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_LoginCalled","t":8,"rt":$n[0].Boolean,"fg":"LoginCalled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_LoginCalled","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"LoginCalled"},"fn":"LoginCalled"}]}; });
    $m("realworld.spaf.test.FakeRepository", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"DeleteToken","t":8,"sn":"DeleteToken","rt":$n[0].Void},{"a":2,"n":"GetTokenIfExist","t":8,"sn":"GetTokenIfExist","rt":$n[0].String},{"a":2,"n":"SaveToken","t":8,"pi":[{"n":"token","pt":$n[0].String,"ps":0}],"sn":"SaveToken","rt":$n[0].Void,"p":[$n[0].String]},{"a":2,"n":"SaveTokenCalled","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_SaveTokenCalled","t":8,"rt":$n[0].Boolean,"fg":"SaveTokenCalled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_SaveTokenCalled","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"SaveTokenCalled"},"fn":"SaveTokenCalled"}]}; });
    $m("realworld.spaf.test.LoginViewModelTest", function () { return {"att":1048577,"a":2,"at":[new Bridge.EasyTests.Attributes.TestAttribute.ctor()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"at":[new Bridge.EasyTests.Attributes.TestMethodAttribute(null)],"a":2,"n":"WhenLoginIsCalled_LoginOnUserServiceIsCalled","t":8,"sn":"WhenLoginIsCalled_LoginOnUserServiceIsCalled","rt":$n[3].Task},{"at":[new Bridge.EasyTests.Attributes.TestMethodAttribute(null)],"a":2,"n":"WhenLoginIsCalled_NavigateIsCalled","t":8,"sn":"WhenLoginIsCalled_NavigateIsCalled","rt":$n[3].Task}]}; });
    $m("realworld.spaf.test.UserServiceTest", function () { return {"att":1048577,"a":2,"at":[new Bridge.EasyTests.Attributes.TestAttribute.ctor()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"at":[new Bridge.EasyTests.Attributes.TestMethodAttribute(null)],"a":2,"n":"JustSeeAFailTest","t":8,"sn":"JustSeeAFailTest","rt":$n[3].Task},{"at":[new Bridge.EasyTests.Attributes.TestMethodAttribute(null)],"a":2,"n":"WhenLoginDone_LoggedUserIsSetted","t":8,"sn":"WhenLoginDone_LoggedUserIsSetted","rt":$n[3].Task},{"at":[new Bridge.EasyTests.Attributes.TestMethodAttribute(null)],"a":2,"n":"WhenLoginDone_RepoSaveTokenIsCalled","t":8,"sn":"WhenLoginDone_RepoSaveTokenIsCalled","rt":$n[3].Task}]}; });
});