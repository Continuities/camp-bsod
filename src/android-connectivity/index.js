/**
 * Spoofs connectivity for Android
 *
 * @author mtownsend
 * @since April 2016
 **/

'use strict';

var express = require('express');
var app = express();
var port = require('yargs').argv.port;

function init(port) {
  app.get('/*', (req, res) => {
    res.status(204).send();
  });

  app.listen(port);
}

init(port);