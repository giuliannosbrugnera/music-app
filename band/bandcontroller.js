'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:BandCtrl
 * @description 
 * # BandCtrl
 *
 * Controller for the Band of the musicApp.
 */
function BandCtrl($scope, $stateParams, BandService) {
    $scope.getOneBand = function(id) {
        $scope.band = BandService.get({ id: id });
        $scope.band.$promise.then(function(result) {
            $scope.band = result;
        });
    }

    $scope.getAllBands = function() {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.bands = BandService.query(); // Fetch all bands. Issues a GET to /api/bands
        $scope.bands.$promise.then(function(result) {
            $scope.bands = result;
        });
    }

    $scope.band = {};
    $scope.bands = [];

    if ($stateParams.action === "view") {
        // Should get a specific band.
        $scope.getOneBand($stateParams.id);
    } else {
        // Should get all bands.
        $scope.getAllBands();
    }

}

angular.module('musicApp').controller('BandCtrl', ['$scope', '$stateParams', 'BandService', BandCtrl]);
