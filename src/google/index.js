/**
 * Google.
 *
 * @author mtownsend
 * @since April 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');

function getResults(seed) {
  return [{
    title: 'FOO',
    host: 'www.foo.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
  }, {
    title: 'BAR',
    host: 'www.bar.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
  }, {
    title: 'BAZ',
    url: 'www.baz.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
  }, {
    title: 'BOZ',
    host: 'www.boz.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
  }];
}

function getDoodle() {
  return "Doodle" + (Math.round(Math.random()) + 1) + ".gif";
}

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', (req, res) => {
    res.render('home', { doodle: getDoodle() });
  });

  app.get('/search', (req, res) => {
    res.render('results', {
      query: req.query.q,
      results: getResults(req.query.q)
    });
  });

  app.listen(port, () => {
    console.log('Google running on port ' + port);
  });
}

module.exports = {
  init: init
};