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
    .controller('AlbumCtrl', ['$scope', '$stateParams', 'AlbumService', function($scope, $stateParams, AlbumService) {
        if ($stateParams.action === "view") {
            // Should get a specific album.
            $scope.album = getOneAlbum($stateParams.id);
        } else {
            // Should get all albums.
            $scope.albums = getAllAlbums();
        }

        function getOneAlbum(id) {
            var result = AlbumService.get({ id: id });
            result.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });

            return result;
        }

        function getAllAlbums() {
            // Does not return the actual data immediately.
            // It returns something will hold the data when the ajax returns.
            var result = AlbumService.query(); // Fetch all albums. Issues a GET to /api/albums
            result.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });

            return result;
        }

        $scope.setDataForAlbum = function(albumId) {
            $scope.oneAlbum = AlbumService.get({ id: albumId });
            $scope.oneAlbum.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });
        }
    }]);
