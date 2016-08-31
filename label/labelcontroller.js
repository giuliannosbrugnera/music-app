'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:LabelCtrl
 * @description 
 * # LabelCtrl
 *
 * Controller for the Record Label of the musicApp.
 */
function LabelCtrl($scope, $state, $stateParams, LabelService) {
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
                // On success go back to home.
                //success callback
                console.log("success: " + JSON.stringify(resp));
                swal("Confirmed!", "The Record Label was created successfully!", "success");
                $state.go('home');
            },
            function(err) {
                // error callback
                console.log("error: " + JSON.stringify(err));
            });
    }

    // Update the edited label. Issues a PUT to /api/labels/:id
    $scope.updateLabel = function() {
        $scope.label.$update(function() {
            // On success go back to home.
            $state.go('home');
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

angular.module('musicApp').controller('LabelCtrl', ['$scope', '$state', '$stateParams', 'LabelService', LabelCtrl]);
