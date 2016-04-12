/**
 * YouTube spoof.
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

var express = require('express');
var app = express();

function init(port) {

  app.use(express.static(__dirname + '/www'));

  app.listen(port, function () {
    console.log('YouTube running on port ' + port);
  });
}

module.exports = {
  init: init
};