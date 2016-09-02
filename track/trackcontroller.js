'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:TrackCtrl
 * @description 
 * # TrackCtrl
 *
 * Controller for the Track of the musicApp.
 */
function TrackCtrl($scope, $state, $stateParams, $timeout, TrackService, AlbumService) {
    $scope.getOneTrack = function(id) {
        $scope.track = TrackService.get({ id: id });
        $scope.track.$promise.then(function(result) {
            $scope.track = result;
        });
    }

    // Fetch all tracks. Issues a GET to /api/tracks/:pageSize/:pageNumber/:orderBy
    $scope.getAllTracks = function(pageSize, pageNumber, orderBy) {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.response = TrackService.query({ pageSize: pageSize, pageNumber: pageNumber, orderBy: orderBy });
        $scope.response.$promise.then(function(result) {
            $scope.tracks = result.tracks;
            $scope.totalCount = result.totalCount;
            $scope.totalPages = result.totalPages;
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

    // Create a new track. Issues a POST to /api/tracks
    $scope.addTrack = function() {
        $scope.track.AlbumRefId = $scope.track.Album.AlbumId;
        console.log(JSON.stringify($scope.track));
        console.log("selectedTrack: " + JSON.stringify($scope.track.Album));
        $scope.track.$save(
            function(resp, headers) {
                // On success go back to tracks.
                //success callback
                console.log("success: " + JSON.stringify(resp));
                swal("Confirmed!", "The Track was created successfully!", "success");
                $state.go("home");
            },
            function(err) {
                // error callback
                swal("Error", "There was an error while tying to create your track.", "error");
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Update the edited track. Issues a PUT to /api/tracks/:id
    $scope.updateTrack = function() {
        $scope.track.AlbumRefId = $scope.track.Album.AlbumId;
        $scope.track.$update({ id: $scope.track.TrackId },
            function(resp, headers) {
                // On success go back to tracks.
                console.log("success: " + JSON.stringify(resp));

                swal("Confirmed!", "The Track was updated successfully!", "success");
                $state.go("home");
            },
            function(err) {
                // error callback
                swal("Error", "There was an error while tying to update your track.", "error");
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Delete the specified track. Issues a DELETE to /api/tracks/:id
    $scope.deleteTrack = function(track) {
        $scope.getOneTrack(track.TrackId);
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this track!",
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
                        $scope.track.$delete({ id: $scope.track.TrackId },
                            function(resp, headers) {
                                swal("Deleted!", "The track has been deleted.", "success");
                                console.log("success: " + JSON.stringify(resp));
                                // Update the tracks that are being shown by ng-repeat.
                                $scope.getAllTracks($scope.pageSize, $scope.pageNumber, $scope.orderBy);
                            },
                            function(err) {
                                // error callback
                                swal("Error", "There was an error while tying to delete your track.", "error");
                                console.log("error: " + JSON.stringify(err));
                            });
                    }, 1500);
                } else {
                    swal("Cancelled", "The track is safe :)", "error");
                }
            });
    }

    $scope.pageChanged = function(newPage) {
        $scope.getAllTracks($scope.pageSize, newPage, $scope.orderBy);
    };

    $scope.track = {};
    $scope.tracks = [];
    $scope.albums = [];
    $scope.pageSize = $stateParams.pageSize === null ? 10 : $stateParams.pageSize;
    $scope.pageNumber = $stateParams.pageNumber === null ? 1 : $stateParams.pageNumber; // Initialize page number to 1 if not set.
    $scope.orderBy = $stateParams.orderBy === null ? "Name" : $stateParams.orderBy;
    $scope.totalCount = 0;
    $scope.totalPages = 0;

    switch ($stateParams.action) {
        case "view":
            // Should get a specific track.
            $scope.getOneTrack($stateParams.id);
            break;
        case "add":
            // Should create new track instance. Properties will be set via ng-model on UI.
            $scope.track = new TrackService();
            $scope.getAllAlbums();
            break;
        case "edit":
            // Load a track which can be edited on UI.
            $scope.getOneTrack($stateParams.id);
            $scope.getAllAlbums();
        default:
            // Should get all the tracks.
            $scope.getAllTracks($scope.pageSize, $scope.pageNumber, $scope.orderBy);
    }
}

angular.module('musicApp').controller('TrackCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'TrackService', 'AlbumService', TrackCtrl]);
