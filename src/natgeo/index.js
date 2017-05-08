/**
 * National Geographic
 *
 * @author mtownsend
 * @since May 2017
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var port = require('yargs').argv.port;

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', function(req, res) {
    res.render('home', {
      items: [{
        type: 'cover',
        image: 'cover-photo.png',
        title: 'Firefly Attendees Are A Bunch Of Stinky Hippies'
      }, {
        type: 'article',
        image: 'pinchy.png',
        title: 'The Pinchy Invasion: What You Should Know About Vermont\'s Forest Lobster Problem'
      }, {
        type: 'gallery',
        image: 'pickle.png',
        title: 'Reasons Why You Should Deep Throat This Chocolate Covered Pickle',
        subtitle: '15 Photos'
      }]
    });
  });

  app.listen(port);
}

init(port);