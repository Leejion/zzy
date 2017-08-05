/**
 * Created by zhangzhongyou on 2017/8/5.
 */
var photoGallery = angular.module('photoGallery',["ui.router"]);
photoGallery.config(["$stateProvider","$urlRouterProvider","$locationProvider",function($stateProvider, $urlRouterProvider,$locationProvider){
    /*$locationProvider.hashPrefix("");
    $urlRouterProvider.otherwise('/news');
    $stateProvider
        .state('news',{
            url: '/news',
            templateUrl: 'news/news.html'
        })
        .state('photos',{
            url: '/photos',
            templateUrl: 'partials/photos.html'
        })
        .state('about',{
            url: '/about',
            templateUrl: 'partials/about.html'
        })*/
    $locationProvider.hashPrefix("");
    $urlRouterProvider.otherwise('/nav');
    console.log($stateProvider);
    //$urlRouterProvider.when("", "/nav");
    $stateProvider
        .state("nav", {
            "url": "/nav",
            "templateUrl": "nav/nav.html"
        })
        .state("nav.news", {
            "url": "/news",
            "templateUrl": "news/news.html"
        })
        .state("nav.school", {
            "url": "/school",
            "templateUrl": "school/school.html"
        })
        .state("nav.shop", {
            "url": "/shop",
            "templateUrl": "shop/shop.html"
        })
        .state("nav.songs", {
            "url": "/songs",
            "templateUrl": "songs/songs.html"
        })
}]);
