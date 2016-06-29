/**
 * Pornhub
 *
 * @author mtownsend
 * @since June 2016
 */

'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var cons = require('consolidate');
var util = require('../util.js');

const NAMES = [
    'Stretched Asshole Prolapse XXX',
    'Fuck Party God This is Harder Than You\'d Think',
    'Squirting Girl in Bathtup Gusher',
    'Food Porn Pizza Delivery Big Sausage',
    'I Dunno Costume Porn',
    'It\'s Enormous OMG #GIANTCOCK',
    'Porno Dicknose!!',
    'These Blue People Are Totally Doin It',
    'What Happened to This Ranger\'s Clothes??'
];

function getTime() {
  return Math.ceil(Math.random() * 10) + ':00';
}

function getViews() {
  return Math.ceil(Math.random() * 100000)
}

function makePorn(image, idx) {
  return {
    thumb: 'thumbs/' + image,
    views: getViews().toLocaleString(),
    time: getTime(),
    name: NAMES[idx]
  };
}

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  var THUMBS = [];
  var VIDEOS = [];
  fs.readdir(__dirname + '/www/thumbs', (err, files) => {
    THUMBS = files.map(makePorn);
  });
  fs.readdir(__dirname + '/www/videos', (err, files) => {
    VIDEOS = files;
  });

  app.get('/', (req, res) => {
    res.render('home', { porn: THUMBS });
  });

  app.get('/video', (req, res) => {
    res.render('video', {
      video: 'videos/' + VIDEOS[Math.floor(Math.random() * VIDEOS.length)]
    });
  });

  app.listen(port, () => {
    console.log('Pornhub running on port ' + port);
  });
}

module.exports = {
  init: init
};