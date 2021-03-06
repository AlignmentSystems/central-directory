'use strict'

const Config = require('../../lib/config')

const extractUrls = (request) => {
  const urls = {}
  request.server.table()[0].table.filter(route => {
    return route.settings.id !== undefined &&
      Array.isArray(route.settings.tags) &&
      route.settings.tags.indexOf('api') >= 0
  }).forEach(route => {
    urls[route.settings.id] = `${Config.HOSTNAME}${route.path.replace(/\{/g, ':').replace(/\}/g, '')}`
  })
  return urls
}

exports.health = function (request, h) {
  return h.response({ status: 'OK' }).code(200)
}

exports.metadata = function (request, h) {
  return h.response({
    directory: Config.HOSTNAME,
    urls: extractUrls(request)
  }).code(200)
}
