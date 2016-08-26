'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:MainCtrl
 * @description 
 * # MainCtrl
 *
 * Controller of the musicApp.
 */
angular.module('musicApp')
  .controller('MainCtrl', ['$scope', 'TrackService', 'AlbumService', function($scope, TrackService, AlbumService) {
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

    $scope.albums = AlbumService.query(); // Fetch all albums. Issues a GET to /api/albums
    $scope.albums.$promise.then(function(data) {
      console.log(JSON.stringify(data));
    });
    
    $scope.setDataForAlbum = function(albumId) {
      $scope.oneTrack = AlbumService.get({id : albumId});
      $scope.oneTrack.$promise.then(function(data) {
        console.log(JSON.stringify(data));
      });
    }
  }]);