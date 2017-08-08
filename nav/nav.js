var appNav = angular.module("myapp.nav",[]);
appNav.controller('NavController', ['$scope','$state', function($scope,$state){
    $scope.go = function(){
        $state.go('nav.login');
    }
}]);