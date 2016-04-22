/**
 * Sign-in portal with totally reasonable
 * terms & conditions.
 *
 * @author mtownsend
 * @since April 2016
 */

'use strict';

var express = require('express');
var app = express();

var permittedAddresses;

function getIp(req) {
  return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
}

function init(port) {

  permittedAddresses = new Set();

  app.use(express.static(__dirname + '/www'));

  app.listen(port, function () {
    console.log('Sign-in running on port ' + port);
  });

  app.get('/accept', function(req, res) {
    console.log(req.headers);
    console.log('logging in ' + getIp(req));
    permittedAddresses.add(getIp(req));
    res.redirect(302, "http://www.google.com");
  });

}

module.exports = {
  init: init,
  permitted: req => { console.log('checking ' + getIp(req), permittedAddresses.size); var p = permittedAddresses.has(getIp(req)); console.log(p); return p;}
};