'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:LabelCtrl
 * @description 
 * # LabelCtrl
 *
 * Controller for the Record Label of the musicApp.
 */
angular.module('musicApp')
    .controller('LabelCtrl', ['$scope', 'LabelService', function($scope, LabelService) {
        // Does not return the actual data immediately.
        // It returns something will hold the data when the ajax returns.
        $scope.labels = LabelService.query(); // Fetch all labels. Issues a GET to /api/labels
        $scope.labels.$promise.then(function(data) {
            console.log(JSON.stringify(data));
        });

        $scope.setDataForLabel = function(labelId) {
            $scope.oneBand = LabelService.get({ id: labelId });
            $scope.oneBand.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });
        }
    }]);
