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
    .controller('LabelCtrl', ['$scope', '$stateParams', 'LabelService', function($scope, $stateParams, LabelService) {
        if ($stateParams.action === "view") {
            // Should get a specific label.
            $scope.label = getOneLabel($stateParams.id);
        } else {
            // Should get all the labels.
            $scope.labels = getAllLabels();
        }

        function getOneLabel(id) {
            var result = LabelService.get({ id: id });
            result.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });

            return result;
        }

        function getAllLabels() {
            // Does not return the actual data immediately.
            // It returns something will hold the data when the ajax returns.
            var result = LabelService.query(); // Fetch all labels. Issues a GET to /api/labels
            result.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });

            return result;
        }

        $scope.setDataForLabel = function(labelId) {
            $scope.oneLabel = LabelService.get({ id: labelId });
            $scope.oneLabel.$promise.then(function(data) {
                console.log(JSON.stringify(data));
            });
        }
    }]);
