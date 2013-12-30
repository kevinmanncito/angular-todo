'use sctrict';

// Dependencies for the app
var angularTodoApp = angular.module('angularTodoApp', [
    'ngRoute',
    'todoListControllers',
    'todoListServices'
]);

// Routes
angularTodoApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/home', {
                templateUrl: '/static/app/templates/home.html',
                controller:  'TodoListCtrl'
            }).
            otherwise({
                redirectTo:  '/home'
            });
    }]);