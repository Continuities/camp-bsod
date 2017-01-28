/**
 * YouTube spoof.
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var util = require('../util.js');
var port = require('yargs').argv.port;

var HOME_VIDEOS = [
  {
    title: 'Full Tilt',
    thumbnail: 'full-tilt.png',
    author: 'Rule2 Productions',
    viewCount: '1,123,581'
  }, {
    title: 'Indefinite Late Fee',
    thumbnail: 'late-fee.png',
    author: 'Rule2 Productions',
    viewCount: '271,828'
  }, {
    title: 'Jurassic Park IV',
    thumbnail: 'jurassic-park.png',
    author: 'Rule2 Productions',
    viewCount: '3,141,592'
  }
];

var SEARCH_VIDEOS = [
  {
    title: '{query} reaction',
    thumbnail: 'fine-bros.png',
    author: 'Fine Brothers Entertainment',
    viewCount: '21,358,569'
  }, {
    title: 'pranked {query}!',
    thumbnail: 'prank.png',
    author: 'pranksterman3000',
    viewCount: '548,845'
  }, {
    title: 'Let {query} go',
    thumbnail: 'elsa.png',
    author: 'frozenelsa2',
    viewCount: '388,817'
  }, {
    title: 'Never gonna {query}',
    thumbnail: 'rick.png',
    author: 'rickastleyVEVO',
    viewCount: '943,215,636'
  }, {
    title: '{query} all night long',
    thumbnail: 'beef.png',
    author: 'The_beef',
    viewCount: '777,542'
  }, {
    title: 'hilarious {query} horse',
    thumbnail: 'horse.png',
    author: 'The Horse Channel',
    viewCount: '1,253,879'
  }
];

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', (req, res) => {
    res.render('home', {
      videos: HOME_VIDEOS
    });
  });

  app.get('/search', (req, res) => {
    res.render('search', {
      query: req.query.q,
      videos: util.shuffle(SEARCH_VIDEOS.map(v => {
        v = Object.assign({}, v);
        v.title = v.title.replace('{query}', req.query.q);
        return v;
      }))
    });
  });

  app.get('/video', (req, res) => {
    res.render('video', {
      title: req.query.q
    });
  });

  app.listen(port);
}

init(port);