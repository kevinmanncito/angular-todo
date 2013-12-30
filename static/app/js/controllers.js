'use strict';

var todoListControllers = angular.module('todoListControllers', []);

todoListControllers.controller('TodoListCtrl', ['$scope', '$http', 'Items',
    function($scope, $http, Items){

        $scope.items = Items.query();
        $scope.orderProp = 'created';
        
        $scope.finishItem = function(id) {
            console.log(id);
            $http.post('/api/item/' + id, {"active": false}).success(function(data){
                _.findWhere($scope.items, {_id: id}).active = false;
            });
        }
    }]);