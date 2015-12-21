/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/searchs              ->  index
 * POST    /api/searchs              ->  create
 * GET     /api/searchs/:id          ->  show
 * PUT     /api/searchs/:id          ->  update
 * DELETE  /api/searchs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Search = require('./search.model');

var tmdbApiKey = '72fda05c2a5f2344d33ef3f772d5d90d';
var tmdb = require('moviedb')(tmdbApiKey);

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Searchs
export function index(req, res) {
    res.send({});
}

// Gets a single Search from the DB
export function show(req, res) {
    //    Search.findByIdAsync(req.params.id)
    //        .then(handleEntityNotFound(res))
    //        .then(responseWithResult(res))
    //        .catch(handleError(res));

    var params = req.params;
    var search = {};
    if (params.category === 'movie') {
        tmdb.searchMovie({
                query: params.query
            },
            function (err, results) {
                if (err) {
                    res.send();
                } else {
                    res.send(results);

                }

            });
    } else if (params.category === 'actor') {
        tmdb.searchPerson({
                query: params.query
            },
            function (err, results) {
                if (err) {
                    res.send();
                } else {
                    res.send(results);

                }

            });
    }
}
