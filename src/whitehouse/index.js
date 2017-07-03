/**
 * Whitehouse spoof.
 *
 * @author mtownsend
 * @since July 2017
 */

'use strict';

const express = require('express');
const app = express();
const cons = require('consolidate');
const port = require('yargs').argv.port;

const STORIES = [{
  image: 'martial-law.png',
  title: 'Martial Law Has Been Declared',
  content: 'Following a coup by the Totenkitten Empire, the United States government has been completely overthrown and martial law has been declared. Do not panic. So long as all citizens comply with the orders of Totenkitten operatives, your lives will be spared.'
}, {
  image: 'nyan.png',
  title: 'Nyan Cat is Now the Official National Anthem',
  content: 'Nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan...'
}, {
  image: 'mfga.png',
  content: 'White House at 1600 Daily.'
}];

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', (req, res) => {
    res.render('home', {
      stories: STORIES
    });
  });

  app.listen(port);
}

init(port);