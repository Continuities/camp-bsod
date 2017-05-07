/**
 * Node web server to support the
 * BSOD lounge "internet"
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

const PORT = 8080
  , SIGNIN_DOMAIN = 'signin'
  , LIGHTS_DOMAIN = 'lights'
  , API_DOMAIN = 'api'

  , http = require('http')
  , httpProxy = require('http-proxy')
  , signin = require('./sign-in/index.js')
  , forever = require('forever-monitor')
;

const FREE_SITES = [
  SIGNIN_DOMAIN,
  LIGHTS_DOMAIN,
  API_DOMAIN
];

const DEADEND = {
  port: 9000,
  path: "./src/dead-ends"
};

const SITES = [
  {
    domain: new RegExp('^' + API_DOMAIN + '$'),
    port: 9091,
    path: "./src/control-panel"
  }, {
    domain: new RegExp('^' + LIGHTS_DOMAIN + '$'),
    port: 9092,
    path: "./src/relay-crash"
  }, {
    domain: /^(clients3\.google\.com)|(connectivitycheck\.gstatic\.com)$/,
    port: 8082,
    path: "./src/android-connectivity"
  }, {
    domain: /^captive.apple.com/,
    port: 8083,
    path: "./src/apple-connectivity"
  }, {
    domain: /^(www\.)?youtube\./,
    port: 8084,
    path: "./src/youtube"
  }, {
    domain: /^(www\.)?(huffingtonpost|huffpost)\./,
    port: 8085,
    path: "./src/huffpo"
  }, {
    domain: new RegExp('^' + SIGNIN_DOMAIN + '$'),
    port: 8086,
    handler: signin
  }, {
    domain: /^(www\.)?amazon\./,
    port: 8087,
    path: "./src/amazon"
  }, {
    domain: /^(www\.)?google\./,
    port: 8088,
    path: "./src/google"
  }, {
    domain: /^(www\.)?instagram\./,
    port: 8089,
    path: "./src/instagram"
  }, {
    domain: /^(www\.)?tumblr\./,
    port: 8090,
    path: "./src/tumblr"
  }, {
    domain: /^(www\.)?apple\./,
    port: 8091,
    path: "./src/apple"
  }, {
    domain: /^(www\.)?ebay\./,
    port: 8092,
    path: "./src/ebay"
  }, {
    domain: /^(www\.)?pornhub\./,
    port: 8093,
    path: "./src/pornhub"
  }, {
    domain: /(^www\.)?nationalgeographic\./,
    port: 8094,
    path: "./src/natgeo"
  }
];

function startSite(site) {
  if (site.path) {
    // Spin the site up in a separate restartable process
    var child = new (forever.Monitor)(site.path + '/index.js', {
      args: ['--port', site.port]
    });
    child.on('start', function () {
      console.log(`${site.path} started on port ${site.port}`);
    });
    child.on('restart', function () {
      console.log(`${site.path} restarted on port ${site.port}`);
    });
    child.on('exit', function () {
      console.log(`${site.path} has exited after 3 restarts`);
    });

    child.start();
  } else if (site.handler) {
    // Run in the same process
    // Try not to use this, as it's fragile
    site.handler.init(site.port);
  }
}

function needsSignin(host) {
  return FREE_SITES.indexOf(host) < 0;
}

startSite(DEADEND);
SITES.forEach(startSite);

var proxy = httpProxy.createProxyServer({ xfwd: true });
var server = http.createServer((req, res) => {
  if (needsSignin(req.headers.host) && !signin.permitted(req)) {
    console.log('redirecting to sign-in');
    res.writeHead(302, { 'Location': 'http://' + SIGNIN_DOMAIN });
    res.end();
    return;
  }

  var host = req.headers.host;
  var site = SITES.reduce((value, s) => value || (s.domain.test(host) && s), false);

  if (site) {
    console.log('Routing to port ' + site.port);
    proxy.web(req, res, { target: 'http://127.0.0.1:' + site.port }, e => {
      console.error("Proxy failed: ", e);
    });
    return;
  }

  proxy.web(req, res, { target: 'http://127.0.0.1:' + DEADEND.port }, e => {
    console.error("Proxy failed: ", e);
  });
});

server.listen(PORT);

console.log('Dispatch running on port ' + PORT);