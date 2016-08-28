'use strict';

/**
 * @ngdoc overview
 * @name  musicApp
 * @description 
 * # musicApp
 *
 * Main module for the application.
 */
angular
    .module('musicApp', [
        'ui.router',
        'ngResource'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('tracks', {
                url: '/tracks',
                templateUrl: 'views/tracks.html',
                controller: 'MainCtrl'
            })
            .state('albums', {
                url: '/albums',
                templateUrl: 'views/albums.html',
                controller: 'MainCtrl'
            })
            .state('bands', {
                url: '/bands',
                templateUrl: 'views/bands.html',
                controller: 'MainCtrl'
            })
            .state('labels', {
                url: '/labels',
                templateUrl: 'views/labels.html',
                controller: 'MainCtrl'
            });
    }])
    .run(['$state', function($state) {
        $state.go('tracks');
    }]);
