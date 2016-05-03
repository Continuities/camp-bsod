/**
 * Insta-gram.
 *
 * @author mtownsend
 * @since May 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var fs = require('fs');

var NUM_GRAMS = 10;
var GRAMS = [];

function getUser() {
  return {
    photo: 'user.png',
    name: 'gramfan2684'
  }
}

function makeGram(image) {
  return {
    user: getUser(),
    image: 'grams/' + image,
    age: '1d'
  }
}

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  fs.readdir(__dirname + '/www/grams', (err, files) => {
    GRAMS = files.map(makeGram);
  });

  app.get('/', function(req, res) {
    var grams = GRAMS.sort(() => (Math.random() * 2) - 1);
    grams.length = NUM_GRAMS;
    res.render('home', { grams: grams });
  });

  app.listen(port, () => {
    console.log('Instagram running on port ' + port);
  });
}

module.exports = {
  init: init
};