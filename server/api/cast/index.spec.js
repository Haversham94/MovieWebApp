'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var castCtrlStub = {
  index: 'castCtrl.index',
  show: 'castCtrl.show',
  create: 'castCtrl.create',
  update: 'castCtrl.update',
  destroy: 'castCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var castIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cast.controller': castCtrlStub
});

describe('Cast API Router:', function() {

  it('should return an express router instance', function() {
    expect(castIndex).to.equal(routerStub);
  });

  describe('GET /api/casts', function() {

    it('should route to cast.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'castCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/casts/:id', function() {

    it('should route to cast.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'castCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/casts', function() {

    it('should route to cast.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'castCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/casts/:id', function() {

    it('should route to cast.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'castCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/casts/:id', function() {

    it('should route to cast.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'castCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/casts/:id', function() {

    it('should route to cast.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'castCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
