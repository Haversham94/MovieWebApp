/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/movies              ->  index
 * GET     /api/movies/:id          ->  show
 */

'use strict';

import _ from 'lodash';

var tmdbApiKey = '72fda05c2a5f2344d33ef3f772d5d90d';
var tmdb = require('moviedb')(tmdbApiKey);

// Gets a list of Comics
export function index(req, res) {
    tmdb.miscTopRatedMovies(function (err, results) {
        if (err) {
            res.send();
        } else {
            res.send(results);
        }
    });
}

// Gets a single Comic from the DB
export function show(req, res) {
    var params = req.params;
    var movie = {};

    tmdb.movieInfo({
        id: params.id
    }, function (err, results) {
        if (err) {
            res.send();
        } else {
            movie.infos = results;
            tmdb.movieCredits({
                id: params.id
            }, function (err, results) {
                if (err) {
                    res.send({
                        results: movie
                    });
                } else {
                    movie.casts = results.cast;
                    res.send({
                        results: movie
                    });
                }
            });
        }
    });
}
