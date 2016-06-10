/**
 * Apple
 *
 * @author mtownsend
 * @since June 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', function(req, res) {
    res.render('home', {
      slides: [{
        image: 'slide1.png'
      }, {
        image: 'slide2.png'
      }, {
        image: 'slide3.png'
      }
      ]
    });
  });

  app.listen(port, () => {
    console.log('Apple running on port ' + port);
  });
}

module.exports = {
  init: init
};