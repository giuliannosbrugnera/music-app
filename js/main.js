'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:MainCtrl
 * @description 
 * # MainCtrl
 *
 * Controller of the myApp.
 */
angular.module('musicApp')
  .controller('MainCtrl', ['$scope', 'TrackService', function($scope, TrackService) {
    // Does not return the actual data immediately.
    // It returns something will hold the data when the ajax returns.
    $scope.tracks = TrackService.query(); // Fetch all tracks. Issues a GET to /api/tracks
    $scope.tracks.$promise.then(function(data) {
      console.log(JSON.stringify(data));
    });
    
    $scope.setDataForTrack = function(trackId) {
      $scope.oneTrack = TrackService.get({id : trackId});
      $scope.oneTrack.$promise.then(function(data) {
        console.log(JSON.stringify(data));
      });
    }
  }]);