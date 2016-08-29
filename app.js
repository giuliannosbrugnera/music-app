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
                templateUrl: 'home/home.html',
                controller: 'MainCtrl'
            })
            .state('tracks', {
                url: '/tracks',
                templateUrl: 'track/tracks.html',
                controller: 'TrackCtrl'
            })
            .state('albums', {
                url: '/albums',
                templateUrl: 'album/albums.html',
                controller: 'AlbumCtrl'
            })
            .state('bands', {
                url: '/bands',
                templateUrl: 'band/bands.html',
                controller: 'BandCtrl'
            })
            .state('labels', {
                url: '/labels',
                templateUrl: 'label/labels.html',
                controller: 'LabelCtrl'
            });
    }])
    .run(['$state', function($state) {
        $state.go('home');
    }]);
