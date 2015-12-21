'use strict';
movieApp.controller('MovieController', function ($scope, $state, MovieAppService) {

    $scope.getMovies = function () {
        MovieAppService.movies.call().$promise.then(function (data) {
            $scope.movies = data.results;
        });
    };

    $scope.clickOnMovie = function (id) {
        $state.go('movie', {
            id: id
        });
    };

    $scope.clickOnCast = function (id) {
        $state.go('cast', {
            id: id
        });
    };

    $scope.getMovie = function (id) {
        MovieAppService.movie.call({
            id: id
        }).$promise.then(function (data) {
            $scope.movie = data.results;
        });
    };

    $scope.init = function () {
        if ($state.params.id) {
            $scope.getMovie($state.params.id);
        } else {
            $scope.getMovies();
        }
    };

    $scope.init();
});
