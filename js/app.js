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
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'MainCtrl'
            })
            .state('tracks', {
                url: '/tracks',
                templateUrl: 'views/tracks.html',
                controller: 'TrackCtrl'
            })
            .state('albums', {
                url: '/albums',
                templateUrl: 'views/albums.html',
                controller: 'AlbumCtrl'
            })
            .state('bands', {
                url: '/bands',
                templateUrl: 'views/bands.html',
                controller: 'BandCtrl'
            })
            .state('labels', {
                url: '/labels',
                templateUrl: 'views/labels.html',
                controller: 'LabelCtrl'
            });
    }])
    .run(['$state', function($state) {
        $state.go('home');
    }]);
