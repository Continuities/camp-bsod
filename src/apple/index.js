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
        title: 'Purchase More Products',
        subtitle: 'Consume. You need this. Spend money.',
        image: 'slide1.png'
      }, {
        title: 'This is your God',
        subtitle: 'Work 8 hours. Sleep 8 hours.',
        image: 'slide2.png'
      }, {
        title: 'Do Not Question Authority',
        subtitle: 'Stay asleep.',
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