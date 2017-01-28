/**
 * Spoofs connectivity for iOS
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
    res.status(200).send('<HTML><HEAD><TITLE>Success</TITLE></HEAD><BODY>Success</BODY></HTML>');
  });

  app.listen(port);
}

init(port);