'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:BandCtrl
 * @description 
 * # BandCtrl
 *
 * Controller for the Band of the musicApp.
 */
function BandCtrl($scope, $state, $stateParams, $timeout, BandService, LabelService) {
    $scope.getOneBand = function(id) {
        $scope.band = BandService.get({ id: id });
        $scope.band.$promise.then(function(result) {
            $scope.band = result;
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

    // Fetch all labels. Issues a GET to /api/labels
    $scope.getAllLabels = function() {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.labels = LabelService.query();
        $scope.labels.$promise.then(function(result) {
            $scope.labels = result;
        });
    }

    // Create a new band. Issues a POST to /api/bands
    $scope.addBand = function() {
        console.log(JSON.stringify($scope.band));
        console.log("selectedLabelId: " + $scope.band.Label);
        $scope.band.$save(
            function(resp, headers) {
                // On success go back to bands.
                //success callback
                console.log("success: " + JSON.stringify(resp));
                swal("Confirmed!", "The Band was created successfully!", "success");
                $state.go('bands');
            },
            function(err) {
                // error callback
                swal("Error", "There was an error while tying to create your band.", "error");
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Update the edited band. Issues a PUT to /api/bands/:id
    $scope.updateBand = function() {
        $scope.band.$update({ id: $scope.band.BandId }, function() {
            // On success go back to bands.
            swal("Confirmed!", "The Band was updated successfully!", "success");
            $state.go("bands");
        });
    }

    // Delete the specified band. Issues a DELETE to /api/bands/:id
    $scope.deleteBand = function(band) {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this band!",
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
                        band.$delete({ id: band.BandId },
                            function(resp, headers) {
                                swal("Deleted!", "The band has been deleted.", "success");
                                console.log("success: " + JSON.stringify(resp));
                                // Update the bands that are being shown by ng-repeat.
                                $scope.getAllBands();
                            },
                            function(err) {
                                // error callback
                                swal("Error", "There was an error while tying to delete your band.", "error");
                                console.log("error: " + JSON.stringify(err));
                            });
                    }, 1500);
                } else {
                    swal("Cancelled", "The band is safe :)", "error");
                }
            });
    }

    $scope.band = {};
    $scope.bands = [];
    $scope.labels = [];

    switch ($stateParams.action) {
        case "view":
            // Should get a specific band.
            $scope.getOneBand($stateParams.id);
            break;
        case "add":
            // Should create new band instance. Properties will be set via ng-model on UI.
            $scope.band = new BandService();
            $scope.getAllLabels();
            break;
        case "edit":
            // Load a band which can be edited on UI.
            $scope.getOneBand($stateParams.id);
            $scope.getAllLabels();
        default:
            // Should get all the bands.
            $scope.getAllBands();
    }
}

angular.module('musicApp').controller('BandCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'BandService', 'LabelService', BandCtrl]);
