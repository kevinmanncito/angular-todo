'use strict';

var angularTodoApp = angular.module('angularTodoApp', []);

angularTodoApp.controller('TodoListCtrl', function($scope, $http) {

    $http.get('/api/items').success(function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            data[i].created = new Date(data[i].created.replace(/-/g,"/"));
        };
        console.log(data);
        $scope.items = data;
    });

    $scope.orderProp = 'created';

    $scope.finishItem = function(id) {
        console.log(id);
        $http.post('/api/item/' + id, {"active": false}).success(function(data){
            console.log(data);
            console.log($scope.items);
        });
    }
});
