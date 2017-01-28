/**
 * Tumblr
 *
 * @author mtownsend
 * @since May 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var fs = require('fs');
var util = require('../util.js');
var port = require('yargs').argv.port;

var NUM_TUMBLS = 10;
var TUMBLS = [];

function getUser() {
  return {
    photo: 'user.png',
    name: 'errydayimtumblin'
  }
}

function makeTumbl(image) {
  return {
    user: getUser(),
    image: 'tumbls/' + image,
    notes: Math.ceil(Math.random() * 5000).toLocaleString()
  }
}

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  fs.readdir(__dirname + '/www/tumbls', (err, files) => {
    TUMBLS = files.map(makeTumbl);
  });

  app.get('/', function(req, res) {
    var tumbls = util.shuffle(TUMBLS);
    tumbls.length = NUM_TUMBLS;
    res.render('home', { tumbls: tumbls });
  });

  app.listen(port);
}

init(port);