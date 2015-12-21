/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/casts              ->  index
 * POST    /api/casts              ->  create
 * GET     /api/casts/:id          ->  show
 * PUT     /api/casts/:id          ->  update
 * DELETE  /api/casts/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var tmdbApiKey = '72fda05c2a5f2344d33ef3f772d5d90d';
var tmdb = require('moviedb')(tmdbApiKey);

// Gets a list of Casts
export function index(req, res) {
  res.send();
}

// Gets a single Cast from the DB
export function show(req, res) {
  var params = req.params;
  var person = {};

  tmdb.personInfo({
    id: params.id
  }, function(err, results) {
    if (err) {
      res.send();
    } else {
      person.infos = results;
      tmdb.personCredits({
        id: params.id
      }, function(err, results) {
        if (err) {
          res.send({
            results: person
          });
        } else {
          person.casts = results.cast;
          res.send({
            results: person
          });
        }
      });
    }
  });
  
}