'use strict';

angular.module('movieApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'app/movieapp/index.html',
                controller: 'MovieAppController'
            })

        .state('movies', {
            url: '/movies',
            templateUrl: 'app/movieapp/movies.html',
            controller: 'MovieController'
        })

        .state('movie', {
            url: '/movies/:id',
            templateUrl: 'app/movieapp/movie.html',
            controller: 'MovieController'
        })

        .state('search', {
            url: '/search',
            templateUrl: 'app/movieapp/search.html',
            controller: 'SearchController'
        })

        .state('cast', {
            url: '/casts/:id',
            templateUrl: 'app/movieapp/cast.html',
            controller: 'CastController'
        });
    });
