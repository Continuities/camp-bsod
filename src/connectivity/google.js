/**
 * Spoofs connectivity for Android
 *
 * @author mtownsend
 * @since April 2016
 **/

'use strict';

var express = require('express');
var app = express();

function init(port) {
  app.get('/*', (req, res) => {
    res.status(204).send();
  });

  app.listen(port, () => {
    console.log('Android Connectivity Spoofer running on port ' + port);
  });
}

module.exports = {
  init: init
};