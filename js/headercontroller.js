'use strict';

/**
 * @ngdoc function
 * @name  musicApp.controller:HeaderCtrl
 * @description 
 * # HeaderCtrl
 * # See if the clicked navbar item is the one to be activated 
 * Controller of the header.
 */
angular.module('musicApp')
    .controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
