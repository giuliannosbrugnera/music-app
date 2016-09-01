'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:LabelCtrl
 * @description 
 * # LabelCtrl
 *
 * Controller for the Record Label of the musicApp.
 */
function LabelCtrl($scope, $state, $stateParams, $timeout, LabelService) {
    $scope.getOneLabel = function(id) {
        $scope.label = LabelService.get({ id: id });
        $scope.label.$promise.then(function(result) {
            $scope.label = result;
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

    // Create a new label. Issues a POST to /api/labels
    $scope.addLabel = function() {
        console.log(JSON.stringify($scope.label));
        $scope.label.$save(
            function(resp, headers) {
                // On success go back to labels.
                //success callback
                console.log("success: " + JSON.stringify(resp));
                swal("Confirmed!", "The Record Label was created successfully!", "success");
                $state.go('labels');
            },
            function(err) {
                // error callback
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Update the edited label. Issues a PUT to /api/labels/:id
    $scope.updateLabel = function() {
        $scope.label.$update({ id: $scope.label.LabelId }, function() {
            // On success go back to labels.
            swal("Confirmed!", "The Record Label was updated successfully!", "success");
            $state.go("labels");
        });
    }

    // Delete the specified label. Issues a DELETE to /api/labels/:id
    $scope.deleteLabel = function(label) {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this record label!",
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
                        label.$delete({ id: label.LabelId },
                            function(resp, headers) {
                                swal("Deleted!", "The record label has been deleted.", "success");
                                console.log("success: " + JSON.stringify(resp));
                                // Update the labels that are being shown by ng-repeat.
                                $scope.getAllLabels();
                            },
                            function(err) {
                                // error callback
                                swal("Error", "There was an error while tying to delete your record label.", "error");
                                console.log("error: " + JSON.stringify(err));
                            });
                    }, 1500);
                } else {
                    swal("Cancelled", "The record label is safe :)", "error");
                }
            });
    }

    $scope.label = {};
    $scope.labels = [];

    switch ($stateParams.action) {
        case "view":
            // Should get a specific label.
            $scope.getOneLabel($stateParams.id);
            break;
        case "add":
            // Should create new label instance. Properties will be set via ng-model on UI.
            $scope.label = new LabelService();
            break;
        case "edit":
            // Load a label which can be edited on UI.
            $scope.getOneLabel($stateParams.id);
        default:
            // Should get all the labels.
            $scope.getAllLabels();
    }
}

angular.module('musicApp').controller('LabelCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'LabelService', LabelCtrl]);
