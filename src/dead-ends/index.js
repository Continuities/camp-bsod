/**
 * Dead-end pages for when we don't have a site built.
 *
 * @author mtownsend
 * @since April 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var port = require('yargs').argv.port;

const PAGES = [
    'bsod',
    'totenkitten',
    'hyperborea',
    'burnt'
    //'firefly'
];

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.listen(port);

  app.get('/*', (req, res) => {
    var page = PAGES[Math.floor(Math.random() * PAGES.length)];
    res.render(page, {});
  });
}

init(port);
