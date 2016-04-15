/**
 * Node web server to support the
 * BSOD lounge "internet"
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

var bouncy = require('bouncy');
var PORT = 8080;

var sites = [
  {
    domain: /^api$/,
    port: 8081,
    handler: require('./control-panel/index.js')
  }, {
    domain: /^(clients3\.google\.com)|(connectivitycheck\.gstatic\.com)$/,
    port: 8082,
    handler: require('./connectivity/google.js')
  }, {
    domain: /^captive.apple.com/,
    port: 8083,
    handler: require('./connectivity/apple.js')
  }, {
    domain: /(www\.)?youtube/,
    port: 8084,
    handler: require('./youtube/index.js')
  }
];

sites.forEach(function(site){
  site.handler.init(site.port);
});

bouncy(function(req, res, bounce) {

  console.log('incoming: ' + req.host + req.path);

  var host = req.headers.host;
  var site = sites.reduce(function(value, s) {
    return value || (s.domain.test(host) && s);
  }, false);

  if (site) {
    console.log('Routing to port ' + site.port);
    bounce(site.port);
    return;
  }

  console.error('No routing');
  res.statusCode = 200;
  res.end('Unable to route to host');

}).listen(PORT);

console.log('Dispatch running on port ' + PORT);