/**
 * Node web server to support the
 * BSOD lounge "internet"
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

var http = require('http');
var bouncy = require('bouncy');
var PORT = 80;

var signin = {
  handler: require('./sign-in/index.js'),
  port: 9000,
  domain: 'signin'
}

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
    domain: /^signin$/,
    port: 8086,
    handler: signin.handler
  }
];

signin.handler.init(signin.port);
sites.forEach(function(site){
  site.handler.init(site.port);
});

var server = http.createServer();

bouncy(server, (req, res, bounce) => {
  console.log('===' + req.headers.host + '===');
  if (req.headers.host !== signin.domain && !signin.handler.permitted(req)) {
    console.log('redirecting to sign-in');
    res.writeHead(302, { 'Location': 'http://' + signin.domain });
    res.end();
    // Aaaaah, bouncy hack!
    req.connection._bouncyStream._handled = false;
    return;
  }

  console.log('incoming: ' + req.headers.host + req.url);

  var host = req.headers.host;
  var site = sites.reduce((value, s) => value || (s.domain.test(host) && s), false);

  if (site) {
    console.log('Routing to port ' + site.port);
    bounce({
      port: site.port,
      headers: {
        'x-forwarded-for': req.connection.remoteAddress
      }
    });
    return;
  }

  console.error('No routing');
  res.statusCode = 200;
  res.end('Unable to route to host');

});

server.listen(PORT);

console.log('Dispatch running on port ' + PORT);