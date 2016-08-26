'use strict';

/**
 * @ngdoc service
 * @name  musicApp.AlbumService
 * @description 
 * # AlbumService
 *
 * Factory in the musicApp.
 */
angular.module('musicApp')
  .factory('AlbumService', ['$resource', function($resource) {
    return $resource('http://localhost:65338/api/albums/:id', {id: '@id'}, {
      'get': {method: 'GET'},
      'save': {method: 'POST'},
      'query': {method: 'GET', isArray: true},
      'remove': {method: 'DELETE'},
      'delete': {method: 'DELETE'}
    });
  }]);