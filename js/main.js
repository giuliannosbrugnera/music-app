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
  .controller('MainCtrl', ['$scope', 'TrackService', 'AlbumService', 'BandService', 'LabelService', function($scope, TrackService, AlbumService, BandService, LabelService) {
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
      $scope.oneAlbum = AlbumService.get({id : albumId});
      $scope.oneAlbum.$promise.then(function(data) {
        console.log(JSON.stringify(data));
      });
    }

    $scope.bands = BandService.query(); // Fetch all bands. Issues a GET to /api/bands
    $scope.bands.$promise.then(function(data) {
      console.log(JSON.stringify(data));
    });
    
    $scope.setDataForBand = function(bandId) {
      $scope.oneBand = BandService.get({id : bandId});
      $scope.oneBand.$promise.then(function(data) {
        console.log(JSON.stringify(data));
      });
    }

    $scope.labels = LabelService.query(); // Fetch all labels. Issues a GET to /api/labels
    $scope.labels.$promise.then(function(data) {
      console.log(JSON.stringify(data));
    });
    
    $scope.setDataForLabel = function(labelId) {
      $scope.oneBand = LabelService.get({id : labelId});
      $scope.oneBand.$promise.then(function(data) {
        console.log(JSON.stringify(data));
      });
    }
  }]);