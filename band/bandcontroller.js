'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:BandCtrl
 * @description 
 * # BandCtrl
 *
 * Controller for the Band of the musicApp.
 */
angular.module('musicApp')
    .controller('BandCtrl', ['$scope', '$stateParams', 'BandService', function($scope, $stateParams, BandService) {
        if ($stateParams.action === "view") {
            // Should get a specific band.
            $scope.band = getOneBand($stateParams.id);
        } else {
            // Should get all bands.
            $scope.bands = getAllBands();
        }

        function getOneBand(id) {
            var result = BandService.get({ id: id });
            result.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });

            return result;
        }

        function getAllBands() {
            // Does not return the actual data immediately.
            // It returns something will hold the data when the ajax returns.
            var result = BandService.query(); // Fetch all bands. Issues a GET to /api/bands
            result.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });

            return result;
        }

        $scope.setDataForBand = function(bandId) {
            $scope.oneBand = BandService.get({ id: bandId });
            $scope.oneBand.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });
        }
    }]);
