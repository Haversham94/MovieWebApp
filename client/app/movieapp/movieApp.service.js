'use strict';

movieApp.factory('MovieAppService', function ($resource, CONSTANT) {

    return {
        movies: $resource(CONSTANT.ENDPOINT + '/movies', {}, {
            call: {
                method: 'GET',
                params: {}
            }
        }),

        movie: $resource(CONSTANT.ENDPOINT + '/movies/:id', {}, {
            call: {
                method: 'GET',
                params: {
                    id: '@_id'
                }
            }
        }),

        cast: $resource(CONSTANT.ENDPOINT + '/casts/:id', {}, {
            call: {
                method: 'GET',
                params: {
                    id: '@_id'
                }
            }
        }),
        search: $resource(CONSTANT.ENDPOINT + '/searchs/:query/:category', {}, {
            call: {
                method: 'GET',
                params: {
                    query: '@_query',
                    category: '@_category'
                }
            }
        }),
    };
});
