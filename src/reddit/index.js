/**
 * Reddit
 *
 * @author mtownsend
 * @since July 2017
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var port = require('yargs').argv.port;

function init(port) {

  app.use(express.static(__dirname + '/www'));
  app.listen(port);
}

init(port);