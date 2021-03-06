'use strict'

const Hapi = require('hapi')

function setup () {
  const fixtures = {}

  const server = new Hapi.Server({port: 8000})

  server.register({
    plugin: require('../../src/api')
  })

  fixtures.server = server

  return fixtures
}

function buildRequest (options) {
  return { url: options.url, method: options.method || 'GET', payload: options.payload || '', headers: options.headers || {} }
}

function assertServerError (assert, response) {
  assert.equal(response.statusCode, 500)
  assert.equal(response.result.error, 'Internal Server Error')
  assert.equal(response.result.message, 'An internal server error occurred')
}

function assertNotFoundError (assert, response) {
  assert.equal(response.statusCode, 404)
  assert.equal(response.result.error, 'Not Found')
}

function assertBadRequestError (assert, response, message) {
  assert.equal(response.statusCode, 400)
  assert.equal(response.result.error, 'Bad Request')
  assert.equal(response.result.message, message)
}

module.exports = {
  setup,
  buildRequest,
  assertServerError,
  assertNotFoundError,
  assertBadRequestError
}
