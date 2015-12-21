'use strict';
movieApp.controller('CastController', function ($scope, $state, MovieAppService) {

    $scope.getCast = function (id) {
        MovieAppService.cast.call({
            id: id
        }).$promise.then(function (data) {
            $scope.actor = data.results;
        });
    };

    $scope.clickOnCast = function (id) {
        $state.go('movie', {
            id: id
        });
    };

    $scope.init = function () {
        if ($state.params.id) {
            $scope.getCast($state.params.id);
        }
    };

    $scope.init();
});
