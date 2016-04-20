/**
 * HuffPo spoof.
 *
 * @author mtownsend
 * @since April 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');

var ARTICLES = [
  {
    title: 'BM2017: Not As Good As Next Year',
    image: 'nope.png'
  }, {
    title: 'Totenkitten\'s Secret Weapons Program',
    image: 'nope.png'
  }, {
    title: 'BSOD Brings Internet To The Masses',
    image: 'nope.png'
  }, {
    title: 'Herpes Outbreak at Lion\'s Den',
    image: 'nope.png'
  }
];

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', function(req, res) {
    res.render('home', {
      splash: 'BSOD IS AWESOME',
      splashImage: 'nope.png',
      articles: ARTICLES
    });
  });

  app.listen(port, function () {
    console.log('HuffPo running on port ' + port);
  });
}

module.exports = {
  init: init
};