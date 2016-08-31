'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:AlbumCtrl
 * @description 
 * # AlbumCtrl
 *
 * Controller for the Album of the musicApp.
 */
function AlbumCtrl($scope, $stateParams, AlbumService) {
    $scope.getOneAlbum = function(id) {
        $scope.album = AlbumService.get({ id: id });
        $scope.album.$promise.then(function(result) {
            $scope.album = result;
        });
    }

    $scope.getAllAlbums = function() {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.albums = AlbumService.query(); // Fetch all albums. Issues a GET to /api/albums
        $scope.albums.$promise.then(function(result) {
            $scope.albums = result;
        });
    }

    $scope.album = {};
    $scope.albums = [];

    if ($stateParams.action === "view") {
        // Should get a specific album.
        $scope.getOneAlbum($stateParams.id);
    } else {
        // Should get all albums.
        $scope.getAllAlbums();
    }
}

angular.module('musicApp').controller('AlbumCtrl', ['$scope', '$stateParams', 'AlbumService', AlbumCtrl]);
