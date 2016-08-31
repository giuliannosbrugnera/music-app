'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:TrackCtrl
 * @description 
 * # TrackCtrl
 *
 * Controller for the Track of the musicApp.
 */
function TrackCtrl($scope, $stateParams, TrackService) {
    $scope.getOneTrack = function(id) {
        $scope.track = TrackService.get({ id: id });
        $scope.track.$promise.then(function(data) {
            $scope.track = data;
        });
    }

    $scope.getAllTracks = function(pageSize, pageNumber, orderBy) {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        // Fetch all tracks. Issues a GET to /api/tracks/:pageSize/:pageNumber/:orderBy
        $scope.response = TrackService.query({ pageSize: pageSize, pageNumber: pageNumber, orderBy: orderBy });
        $scope.response.$promise.then(function(result) {
            $scope.tracks = result.tracks;
            $scope.totalCount = result.totalCount;
            $scope.totalPages = result.totalPages;
        });
    }

    $scope.pageChanged = function(newPage) {
        $scope.getAllTracks($scope.pageSize, newPage, $scope.orderBy);
    };

    $scope.track = {};
    $scope.tracks = []; // Declare an empty array.
    $scope.pageSize = $stateParams.pageSize === null ? 10 : $stateParams.pageSize;
    $scope.pageNumber = $stateParams.pageNumber === null ? 1 : $stateParams.pageNumber; // Initialize page number to 1 if not set.
    $scope.orderBy = $stateParams.orderBy === null ? "Name" : $stateParams.orderBy;
    $scope.totalCount = 0;
    $scope.totalPages = 0;

    if ($stateParams.action === "view") {
        // Should get a specific track.
        $scope.getOneTrack($stateParams.id);
    } else {
        // Should get all the tracks.
        $scope.getAllTracks($scope.pageSize, $scope.pageNumber, $scope.orderBy);
    }
}

angular.module('musicApp').controller('TrackCtrl', ['$scope', '$stateParams', 'TrackService', TrackCtrl]);
