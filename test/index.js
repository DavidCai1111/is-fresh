'use strict'
/* global describe, beforeEach, it */
const http = require('http')
const isFresh = require('..')
require('should')

describe('is-fresh test', function () {
  let req, res, resHeader

  beforeEach(function () {
    resHeader = {}
    req = new http.IncomingMessage({})
    res = new http.ServerResponse({})
    res.getHeader = function (header) { return resHeader[header] }
  })

  it('Should throw Error when req or res is not validated', function () {
    (() => isFresh()).should.throw(/req/);
    (() => isFresh(new http.IncomingMessage())).should.throw(/res/)
  })

  it('Should return true when modified caught', function () {
    resHeader = { 'last-modified': Date.now() - 1000 }
    req.headers = { 'if-modified-since': Date.now() }
    isFresh(req, res).should.eql(true)
  })

  it('Should return true when etag caught', function () {
    resHeader = { 'etag': 'haha' }
    req.headers = { 'if-none-match': 'haha' }
    isFresh(req, res).should.eql(true)
  })

  it('Should return true when etag is *', function () {
    resHeader = { 'etag': '*' }
    req.headers = { 'if-none-match': 'haha' }
    isFresh(req, res).should.eql(true)
  })

  it('Should return true when weak etag caught', function () {
    resHeader = { 'etag': 'W/haha' }
    req.headers = { 'if-none-match': 'haha' }
    isFresh(req, res).should.eql(true)
  })

  it('Should return false when having no cache header', function () {
    resHeader = {}
    req.headers = {}
    isFresh(req, res).should.eql(false)
  })

  it('Should return false when no-cache', function () {
    resHeader = {}
    req.headers = {
      'cache-control': 'no-cache',
      'if-modified-since': Date.now()
    }
    isFresh(req, res).should.eql(false)
  })
})

