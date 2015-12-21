'use strict';
movieApp.controller('SearchController', function ($scope, $state, MovieAppService) {

    $scope.init = function () {};
    $scope.categories = ['movie', 'actor'];
    $scope.search = {
        category: $scope.categories[0]
    };
    $scope.submitSearch = function () {
        MovieAppService.search.call({

            query: $scope.search.query,
            category: $scope.search.category

        }).$promise.then(function (data) {
            $scope.searchs = data.results;
        });
    };

    $scope.clickOnSearchResultMovie = function (id) {

        $state.go('movie', {
            id: id
        });

    };

    $scope.clickOnSearchResultActor = function (id) {

        $state.go('cast', {
            id: id
        });

    };



    $scope.init();
});
