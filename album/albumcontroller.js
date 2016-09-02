'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:AlbumCtrl
 * @description 
 * # AlbumCtrl
 *
 * Controller for the Album of the musicApp.
 */
function AlbumCtrl($scope, $state, $stateParams, $timeout, AlbumService, BandService) {
    $scope.getOneAlbum = function(id) {
        $scope.album = AlbumService.get({ id: id });
        $scope.album.$promise.then(function(result) {
            $scope.album = result;
        });
    }

    // Fetch all albums. Issues a GET to /api/albums
    $scope.getAllAlbums = function() {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.albums = AlbumService.query();
        $scope.albums.$promise.then(function(result) {
            $scope.albums = result;
        });
    }

    // Fetch all bands. Issues a GET to /api/bands
    $scope.getAllBands = function() {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.bands = BandService.query();
        $scope.bands.$promise.then(function(result) {
            $scope.bands = result;
        });
    }

    // Create a new album. Issues a POST to /api/albums
    $scope.addAlbum = function() {
        console.log(JSON.stringify($scope.album));
        console.log("selectedBand: " + JSON.stringify($scope.album.Band));
        $scope.album.$save(
            function(resp, headers) {
                // On success go back to albums.
                //success callback
                console.log("success: " + JSON.stringify(resp));
                swal("Confirmed!", "The Album was created successfully!", "success");
                $state.go('albums');
            },
            function(err) {
                // error callback
                swal("Error", "There was an error while tying to create your album.", "error");
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Update the edited album. Issues a PUT to /api/albums/:id
    $scope.updateAlbum = function() {
        $scope.album.$update({ id: $scope.album.AlbumId },
            function(resp, headers) {
                // On success go back to albums.
                console.log("success: " + JSON.stringify(resp));
                swal("Confirmed!", "The Album was updated successfully!", "success");
                $state.go("albums");
            },
            function(err) {
                // error callback
                swal("Error", "There was an error while tying to update your album.", "error");
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Delete the specified album. Issues a DELETE to /api/albums/:id
    $scope.deleteAlbum = function(album) {
        console.log("@deleteAlbum");
        console.log(JSON.stringify(album));
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this album!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    $timeout(function() {
                        album.$delete({ id: album.AlbumId },
                            function(resp, headers) {
                                swal("Deleted!", "The album has been deleted.", "success");
                                console.log("success: " + JSON.stringify(resp));
                                // Update the albums that are being shown by ng-repeat.
                                $scope.getAllAlbums();
                            },
                            function(err) {
                                // error callback
                                swal("Error", "There was an error while tying to delete your album.", "error");
                                console.log("error: " + JSON.stringify(err));
                            });
                    }, 1500);
                } else {
                    swal("Cancelled", "The album is safe :)", "error");
                }
            });
    }

    $scope.album = {};
    $scope.albums = [];
    $scope.bands = [];

    switch ($stateParams.action) {
        case "view":
            // Should get a specific album.
            $scope.getOneAlbum($stateParams.id);
            break;
        case "add":
            // Should create new album instance. Properties will be set via ng-model on UI.
            $scope.album = new AlbumService();
            $scope.getAllBands();
            break;
        case "edit":
            // Load a album which can be edited on UI.
            $scope.getOneAlbum($stateParams.id);
            $scope.getAllBands();
        default:
            // Should get all the albums.
            $scope.getAllAlbums();
    }
}

angular.module('musicApp').controller('AlbumCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'AlbumService', 'BandService', AlbumCtrl]);
