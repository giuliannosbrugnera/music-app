'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:TrackCtrl
 * @description 
 * # TrackCtrl
 *
 * Controller for the Track of the musicApp.
 */
angular.module('musicApp')
    .controller('TrackCtrl', ['$scope', '$stateParams', 'TrackService', function($scope, $stateParams, TrackService) {
        if ($stateParams.action === "view") {
            // Should get a specific track.
            $scope.track = getOneTrack($stateParams.id);
        } else {
            // Should get all the tracks.
            $scope.tracks = getAllTracks();
        }

        function getOneTrack(id) {
            var result = TrackService.get({ id: id });
            result.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });

            return result;
        }

        function getAllTracks() {
            // Does not return the actual data immediately.
            // It returns something will hold the data when the ajax returns.
            var result = TrackService.query(); // Fetch all tracks. Issues a GET to /api/tracks
            result.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });

            return result;
        }

        $scope.setDataForTrack = function(trackId) {
            $scope.oneTrack = TrackService.get({ id: trackId });
            $scope.oneTrack.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });
        }
    }]);
