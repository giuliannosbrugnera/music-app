'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:LabelCtrl
 * @description 
 * # LabelCtrl
 *
 * Controller for the Record Label of the musicApp.
 */
function LabelCtrl($scope, $stateParams, LabelService) {
    $scope.getOneLabel = function(id) {
        $scope.label = LabelService.get({ id: id });
        $scope.label.$promise.then(function(result) {
            $scope.label = result;
        });
    }

    $scope.getAllLabels = function() {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.labels = LabelService.query(); // Fetch all labels. Issues a GET to /api/labels
        $scope.labels.$promise.then(function(result) {
            $scope.labels = result;
        });
    }

    $scope.label = {};
    $scope.labels = [];

    if ($stateParams.action === "view") {
        // Should get a specific label.
        $scope.getOneLabel($stateParams.id);
    } else {
        // Should get all the labels.
        $scope.getAllLabels();
    }
}

angular.module('musicApp').controller('LabelCtrl', ['$scope', '$stateParams', 'LabelService', LabelCtrl]);
