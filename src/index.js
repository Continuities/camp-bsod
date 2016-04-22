/**
 * Node web server to support the
 * BSOD lounge "internet"
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

var PORT = 80;
var SIGNIN_DOMAIN = 'signin';

var http = require('http');
var httpProxy = require('http-proxy');
var signin = require('./sign-in/index.js');

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
    domain: /^(www\.)?youtube\./,
    port: 8084,
    handler: require('./youtube/index.js')
  }, {
    domain: /^(www\.)?huffingtonpost\./,
    port: 8085,
    handler: require('./huffpo/index.js')
  }, {
    domain: new RegExp('^' + SIGNIN_DOMAIN + '$'),
    port: 8086,
    handler: signin
  }
];

sites.forEach(function(site){
  site.handler.init(site.port);
});

var proxy = httpProxy.createProxyServer({ xfwd: true });
var server = http.createServer((req, res) => {
  if (req.headers.host !== SIGNIN_DOMAIN && !signin.permitted(req)) {
    console.log('redirecting to sign-in');
    res.writeHead(302, { 'Location': 'http://' + SIGNIN_DOMAIN });
    res.end();
    return;
  }

  var host = req.headers.host;
  var site = sites.reduce((value, s) => value || (s.domain.test(host) && s), false);

  if (site) {
    console.log('Routing to port ' + site.port);
    proxy.web(req, res, { target: 'http://127.0.0.1:' + site.port });
    return;
  }

  console.error('No routing');
  res.statusCode = 200;
  res.end('Unable to route to host');
});

server.listen(PORT);

console.log('Dispatch running on port ' + PORT);