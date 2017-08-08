/**
 * Created by zhangzhongyou on 2017/8/5.
 */
var photoGallery = angular.module('photoGallery',["ui.router","ngCookies","myapp.news","myapp.school","myapp.shop","myapp.songs","myapp.login","myapp.nav"]);
photoGallery.config(["$stateProvider","$urlRouterProvider","$locationProvider","ACCESS_LEVELS",function($stateProvider, $urlRouterProvider,$locationProvider,ACCESS_LEVELS){
    $locationProvider.hashPrefix("");
    $urlRouterProvider.otherwise('/nav');
    $stateProvider
        .state("nav", {
            url: "/nav",
            templateUrl: "nav/nav.html",
            controller:"NavController"
        })
        .state("nav.news", {
            url: "/news",
            templateUrl: "news/news.html",
            controller:"NewsController",
            access_levels:ACCESS_LEVELS.public
        })
        .state("nav.school", {
            url: "/school",
            templateUrl: "school/school.html",
            controller:"SchoolController",
            access_levels:ACCESS_LEVELS.user
        })
        .state("nav.shop", {
            url: "/shop",
            templateUrl: "shop/shop.html",
            controller:"ShopController",
            access_levels:ACCESS_LEVELS.admin
        })
        .state("nav.songs", {
            url: "/songs",
            templateUrl: "songs/songs.html",
            controller:"SongsController",
            access_levels:ACCESS_LEVELS.user
        })
        .state("nav.login", {
            url: "/login",
            templateUrl: "login/login.html",
            controller:"LoginController"
        })
}]);

photoGallery.constant("ACCESS_LEVELS",{
    public:1,
    user:2,
    admin:3
});

photoGallery.factory('Auth',function ($cookieStore,ACCESS_LEVELS) {
    var _user = $cookieStore.get('user');
    var setUser = function (user) {
        if(!user.role || user.role < 0){
            user.role = ACCESS_LEVELS.public;
        }
        _user = user;
        $cookieStore.put('user',_user);
    };

    return {
        isAuthorized : function(lvl){
            return _user.role >= lvl;
        },
        setUser : setUser,
        isLoggedIn : function(){
            return _user ? true : false;
        },
        getUser : function(){
            return _user;
        },
        getId : function(){
            return _user ? _user.id : null;
        },
        logout : function(){
            $cookieStore.remove('user');
            _user = null;
        },
        getToken: function() {
            return _user ? _user.token : '';
        },
        setToken: function(a) {
            return _user.token = a;
        }
    }
});

photoGallery.run(["$rootScope","$location","Auth",function ($rootScope,$location,Auth) {
    $rootScope.$on('$stateChangeStart',function (evt,next,curr) {
        if(next.name.indexOf("nav") === -1){
            if(!Auth.isAuthorized(curr.access_levels)){
                if(Auth.isLoggedIn()){
                    $location.path('/nav');
                }else {
                    $location.path('/login');
                }
            }
        }

    });
}]);

photoGallery.config(function($httpProvider) {
    console.log($httpProvider.interceptors.push('interceptor'));

});

photoGallery.factory("interceptor",function ($q, $rootScope, Auth) {
    console.log(111);
    return {
        'request': function(req){
            req.data = req.data || {};
            if(Auth.isAuthorized() && !req.data.token){
                req.params.token = Auth.getToken();
            }
            return req;
        },
        'response': function (resp) {
            console.log(resp);
            if (resp.config.url == 'http://127.0.0.1:9099/login') {
// 假设API服务器返回的数据格式如下:
// { token: "AUTH_TOKEN" }
                Auth.setToken(resp.data.token);
            }
            return resp;
        },
        'responseError': function (rejection) {
// 错误处理
            switch (rejection.status) {
                case 401:
                    if (rejection.config.url !== 'api/login')
// 如果当前不是在登录页面
                        $rootScope.$broadcast('auth:loginRequired');
                    break;
                case 403:
                    $rootScope.$broadcast('auth:forbidden');
                    break;
                case 404:
                    $rootScope.$broadcast('page:notFound');
                    break;
                case 500:
                    $rootScope.$broadcast('server:error');
                    break;
            }
            return $q.reject(rejection);
        }
    };
});
