'use strict';

/**
 * @ngdoc service
 * @name  musicApp.TrackService
 * @description 
 * # TrackService
 *
 * Factory in the musicApp.
 */
angular.module('musicApp')
    .factory('TrackService', ['$resource', function($resource) {
        return $resource('http://localhost:65338/api/tracks/:id', { id: '@id' }, {
            'get': { method: 'GET' },
            'save': { method: 'POST' },
            'query': {
                method: 'GET',
                url: 'http://localhost:65338/api/tracks/:pageSize/:pageNumber/:orderBy',
                params: { pageSize: '@pageSize', pageNumber: '@pageNumber', orderBy: '@orderBy' },
                isArray: false
            },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE' },
            'update': { method: 'PUT' }
        });
    }]);
