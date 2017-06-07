/**
 * GoFundMe spoof.
 *
 * @author mtownsend
 * @since June 2017
 */

'use strict';

const express = require('express');
const app = express();
const cons = require('consolidate');
const port = require('yargs').argv.port;

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', (req, res) => {
    res.render('home');
  });

  app.listen(port);
}

init(port);