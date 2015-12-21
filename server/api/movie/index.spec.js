'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var comicCtrlStub = {
  index: 'comicCtrl.index',
  show: 'comicCtrl.show',
  create: 'comicCtrl.create',
  update: 'comicCtrl.update',
  destroy: 'comicCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var comicIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './comic.controller': comicCtrlStub
});

describe('Comic API Router:', function() {

  it('should return an express router instance', function() {
    expect(comicIndex).to.equal(routerStub);
  });

  describe('GET /api/comics', function() {

    it('should route to comic.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'comicCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/comics/:id', function() {

    it('should route to comic.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'comicCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/comics', function() {

    it('should route to comic.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'comicCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/comics/:id', function() {

    it('should route to comic.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'comicCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/comics/:id', function() {

    it('should route to comic.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'comicCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/comics/:id', function() {

    it('should route to comic.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'comicCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
