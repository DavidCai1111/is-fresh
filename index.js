'use strict'
const http = require('http')
const assert = require('assert')

module.exports = function (req, res) {
  assert(req instanceof http.IncomingMessage, 'req should be an instance of http.IncomingMessage')
  assert(res instanceof http.ServerResponse, 'res should be an instance of http.ServerResponse')

  let isEtagMatched = true
  let isModifiedMatched = true

  let reqHeader = req.headers
  let ifModifiedSince = reqHeader['if-modified-since']
  let ifNoneMatch = reqHeader['if-none-match']
  let cacheControl = reqHeader['cache-control']

  let lastModified = res.getHeader('last-modified')
  let etag = res.getHeader('etag')

  if (!ifModifiedSince && !ifNoneMatch) return false
  if (cacheControl && ~cacheControl.indexOf('no-cache')) return false

  if (ifNoneMatch) ifNoneMatch = ifNoneMatch.split(',').forEach((etag) => etag.trim())

  if (ifNoneMatch) {
    isEtagMatched = ifNoneMatch.some(function (etagToMatch) {
      return etagToMatch === '*' || etagToMatch === etag || etagToMatch === `W/${etag}`
    })
  }

  if (ifModifiedSince) {
    ifModifiedSince = new Date(ifModifiedSince)
    lastModified = new Date(lastModified)
    isModifiedMatched = ifModifiedSince > lastModified
  }

  return Boolean(isEtagMatched && isModifiedMatched)
}
