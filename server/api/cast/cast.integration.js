'use strict';

var app = require('../..');
import request from 'supertest';

var newCast;

describe('Cast API:', function() {

  describe('GET /api/casts', function() {
    var casts;

    beforeEach(function(done) {
      request(app)
        .get('/api/casts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          casts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(casts).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/casts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/casts')
        .send({
          name: 'New Cast',
          info: 'This is the brand new cast!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCast = res.body;
          done();
        });
    });

    it('should respond with the newly created cast', function() {
      expect(newCast.name).to.equal('New Cast');
      expect(newCast.info).to.equal('This is the brand new cast!!!');
    });

  });

  describe('GET /api/casts/:id', function() {
    var cast;

    beforeEach(function(done) {
      request(app)
        .get('/api/casts/' + newCast._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cast = res.body;
          done();
        });
    });

    afterEach(function() {
      cast = {};
    });

    it('should respond with the requested cast', function() {
      expect(cast.name).to.equal('New Cast');
      expect(cast.info).to.equal('This is the brand new cast!!!');
    });

  });

  describe('PUT /api/casts/:id', function() {
    var updatedCast;

    beforeEach(function(done) {
      request(app)
        .put('/api/casts/' + newCast._id)
        .send({
          name: 'Updated Cast',
          info: 'This is the updated cast!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCast = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCast = {};
    });

    it('should respond with the updated cast', function() {
      expect(updatedCast.name).to.equal('Updated Cast');
      expect(updatedCast.info).to.equal('This is the updated cast!!!');
    });

  });

  describe('DELETE /api/casts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/casts/' + newCast._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cast does not exist', function(done) {
      request(app)
        .delete('/api/casts/' + newCast._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
