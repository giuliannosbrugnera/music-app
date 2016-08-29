'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:AlbumCtrl
 * @description 
 * # AlbumCtrl
 *
 * Controller for the Album of the musicApp.
 */
angular.module('musicApp')
    .controller('AlbumCtrl', ['$scope', 'AlbumService', function($scope, AlbumService) {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.albums = AlbumService.query(); // Fetch all albums. Issues a GET to /api/albums
        $scope.albums.$promise.then(function(data) {
            console.log(JSON.stringify(data));
        });

        $scope.setDataForAlbum = function(albumId) {
            $scope.oneAlbum = AlbumService.get({ id: albumId });
            $scope.oneAlbum.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });
        }
    }]);
