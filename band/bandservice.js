'use strict';

/**
 * @ngdoc service
 * @name  musicApp.BandService
 * @description 
 * # BandService
 *
 * Factory in the musicApp.
 */
angular.module('musicApp')
    .factory('BandService', ['$resource', function($resource) {
        return $resource('http://localhost:65338/api/bands/:id', { id: '@id' }, {
            'get': { method: 'GET' },
            'save': { method: 'POST' },
            'query': { method: 'GET', isArray: true },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE' },
            'update': { method: 'PUT' }
        });
    }]);
