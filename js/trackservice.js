'use strict';

/**
 * @ngdoc service
 * @name  musicApp.TrackService
 * @description 
 * # TrackService
 *
 * Factory in the myApp.
 */
angular.module('musicApp')
  .factory('TrackService', ['$resource', function($resource) {
    return $resource('http://localhost:65338/api/tracks/:id', {id: '@id'}, {
      'get': {method: 'GET'},
      'save': {method: 'POST'},
      'query': {method: 'GET', isArray: true},
      'remove': {method: 'DELETE'},
      'delete': {method: 'DELETE'}
    });
  }]);