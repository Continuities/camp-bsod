/**
 * API for crash/reboot and a simple
 * control panel.
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

var express = require('express');
var app = express();
var port = require('yargs').argv.port;

function init(port) {
  app.use(express.static(__dirname + '/www'));
  app.listen(port);
}

init(port);
