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
    .controller('BandCtrl', ['$scope', 'BandService', function($scope, BandService) {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.bands = BandService.query(); // Fetch all bands. Issues a GET to /api/bands
        $scope.bands.$promise.then(function(data) {
            console.log(JSON.stringify(data));
        });

        $scope.setDataForBand = function(bandId) {
            $scope.oneBand = BandService.get({ id: bandId });
            $scope.oneBand.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });
        }
    }]);
