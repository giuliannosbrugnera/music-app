'use strict';

/**
 * @ngdoc service
 * @name  musicApp.LabelService
 * @description 
 * # LabelService
 *
 * Factory in the musicApp.
 */
angular.module('musicApp')
    .factory('LabelService', ['$resource', function($resource) {
        return $resource('http://localhost:65338/api/labels/:id', { id: '@id' }, {
            'get': { method: 'GET' },
            'save': { method: 'POST' },
            'query': { method: 'GET', isArray: true },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE' }
        });
    }]);
