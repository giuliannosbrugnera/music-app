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
        'ngResource',
        'angularUtils.directives.dirPagination',
        'oitozero.ngSweetAlert'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html',
                controller: 'MainCtrl'
            })
            .state('tracks', {
                url: '/tracks/:pageSize/:pageNumber/:orderBy',
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
            })
            .state('viewTrack', { //state for showing single Track
                url: '/tracks/:id',
                params: { action: "view" },
                templateUrl: 'track/track-view.html',
                controller: 'TrackCtrl'
            })
            .state('viewAlbum', { //state for showing single Album
                url: '/albums/:id',
                params: { action: "view" },
                templateUrl: 'album/album-view.html',
                controller: 'AlbumCtrl'
            })
            .state('viewBand', { //state for showing single Band
                url: '/bands/:id',
                params: { action: "view" },
                templateUrl: 'band/band-view.html',
                controller: 'BandCtrl'
            })
            .state('viewLabel', { //state for showing single label
                url: '/labels/:id',
                params: { action: "view" },
                templateUrl: 'label/label-view.html',
                controller: 'LabelCtrl'
            })
            .state('newLabel', { //state for adding a new label
                url: '/labels',
                params: { action: "add" },
                templateUrl: 'label/label-add.html',
                controller: 'LabelCtrl'
            })
            .state('editLabel', { //state for updating a label
                url: '/labels/:id',
                params: { action: "edit" },
                templateUrl: 'label/label-edit.html',
                controller: 'LabelCtrl'
            });
    }])
    .run(['$state', function($state) {
        $state.go('home');
    }]);
