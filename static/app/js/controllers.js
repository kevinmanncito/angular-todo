'use strict';

var todoListControllers = angular.module('todoListControllers', []);

todoListControllers.controller('TodoListCtrl', ['$scope', '$http', 'Items',
    function($scope, $http, Items){

        $scope.items = Items.query();
        $scope.orderProp = 'created';
        $scope.inputClass = "hidden";
        $scope.addItemButtonClass = "";

        // Events
        $scope.finishItem = function(id) {
            $http.post('/api/item/' + id, {"active": false}).success(function(data){
                _.findWhere($scope.items, {_id: id}).active = false;
            });
        }

        $scope.showInput = function() {
            $scope.inputClass = "";
            $scope.addItemButtonClass = "hidden";
        }

        $scope.createNewItem = function(description) {
            if (description.length) {
                $http.post('/api/item', {"description": description,
                                         "created": new Date(),
                                         "active": true}).success(function(data){
                    $scope.items.push(data.item);
                })
            }
            $scope.inputClass = "hidden";
            $scope.addItemButtonClass = "";
            $scope.description = "";
        }

    }]);