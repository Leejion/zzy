var appLogin = angular.module("myapp.login",[]);

appLogin.factory("Backend",["$http","$q","$rootScope","Auth",function($http,$q,$rootScope,Auth){
    //console.log(Auth);
    return {
        $get : function () {
             return $http({
                method:"POST",
                url:"http://127.0.0.1:9099/login",
                data:{
                    token:8888888
                }
            }).then(function(data){
                console.log(data);
                return data.data;
            },function(reason){
                $q.reject(reason);
            });
    }}

}]);
appSchool.controller('LoginController', ['$scope','Backend','Auth',function($scope,Backend,Auth){
    $scope.go = function(){
        Backend.$get().then(function (data) {
            console.log(data);
        });
        return false;
    }
}]);

