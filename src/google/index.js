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


function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', (req, res) => {
    res.render('home', { });
  });

  app.listen(port, () => {
    console.log('Google running on port ' + port);
  });
}

module.exports = {
  init: init
};