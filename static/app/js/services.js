'use strict';

var todoListServices = angular.module('todoListServices', ['ngResource']);

todoListServices.factory('Items', ['$resource',
    function($resource){
        return $resource('/api/items', {}, {
            query: {method: 'GET', params: {}, isArray:true}
        });
    }]);