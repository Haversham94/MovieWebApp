'use strict';

var app = require('../..');
import request from 'supertest';

var newComic;

describe('Comic API:', function() {

  describe('GET /api/comics', function() {
    var comics;

    beforeEach(function(done) {
      request(app)
        .get('/api/comics')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          comics = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(comics).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/comics', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/comics')
        .send({
          name: 'New Comic',
          info: 'This is the brand new comic!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newComic = res.body;
          done();
        });
    });

    it('should respond with the newly created comic', function() {
      expect(newComic.name).to.equal('New Comic');
      expect(newComic.info).to.equal('This is the brand new comic!!!');
    });

  });

  describe('GET /api/comics/:id', function() {
    var comic;

    beforeEach(function(done) {
      request(app)
        .get('/api/comics/' + newComic._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          comic = res.body;
          done();
        });
    });

    afterEach(function() {
      comic = {};
    });

    it('should respond with the requested comic', function() {
      expect(comic.name).to.equal('New Comic');
      expect(comic.info).to.equal('This is the brand new comic!!!');
    });

  });

  describe('PUT /api/comics/:id', function() {
    var updatedComic;

    beforeEach(function(done) {
      request(app)
        .put('/api/comics/' + newComic._id)
        .send({
          name: 'Updated Comic',
          info: 'This is the updated comic!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedComic = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedComic = {};
    });

    it('should respond with the updated comic', function() {
      expect(updatedComic.name).to.equal('Updated Comic');
      expect(updatedComic.info).to.equal('This is the updated comic!!!');
    });

  });

  describe('DELETE /api/comics/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/comics/' + newComic._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when comic does not exist', function(done) {
      request(app)
        .delete('/api/comics/' + newComic._id)
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
