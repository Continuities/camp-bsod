/**
 * National Geographic
 *
 * @author mtownsend
 * @since May 2017
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var port = require('yargs').argv.port;

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', function(req, res) {
    res.render('home', {
      items: [{
        type: 'cover',
        image: 'cover-photo.png',
        title: 'Firefly Attendees Are A Bunch Of Stinky Hippies'
      }, {
        type: 'article',
        image: 'pinchy.png',
        title: 'The Pinchy Invasion: What You Should Know About Vermont\'s Forest Lobster Problem'
      }, {
        type: 'gallery',
        image: 'pickle.png',
        title: 'Reasons Why You Should Deep Throat This Chocolate Covered Pickle',
        supertitle: '15 Photos'
      }, {
        type: 'potd',
        image: 'snake.png',
        title: 'I Swear It\'s A Snake',
        subtitle: 'PHOTO GRAPH BY DREW P. WEINER NATIONALISTIC GEOCENTRISM'
      }],
      videos: [{
        image: 'tarsir.png',
        title: 'True Facts About The Tarsir'
      }, {
        image: 'bacon.png',
        title: 'Scientists Launch Study: Does Bacon Taste Better At Burns?'
      }, {
        image: 'shirtcock.png',
        title: 'A History Of Shirtcocking: How Donald Duck Caused An Epidemic'
      }, {
        image: 'cthulhu.png',
        title: 'Cthulhu Is Back And He\'s Sick Of Your Shit'
      }, {
        image: 'bigfoot.png',
        title: 'Bigfoot Spotted At Vermont Arts Festival'
      }, {
        image: 'cats.png',
        title: 'Fuck Dogs: Cats Declared Best Animal Ever'
      }],
      mostRead: [{
        subimage: 'bm-sucks.png',
        supertitle: 'PICTURE STORIES',
        title: 'Burning Man Sucks And You Know It',
        type: 'indexed'
      }, {
        supertitle: 'GORY DETAILS',
        title: 'Testing Reveals Meat Camp\'s Meat Man Made Of Human Meat',
        type: 'indexed'
      }, {
        supertitle: 'WEIRD & WILD',
        title: 'Can You Survive The Legendary Arkham Wizard Initiation?',
        type: 'indexed'
      }, {
        supertitle: 'WATCH',
        title: 'Torture Techniques Of The Totenkitten Empire',
        type: 'indexed'
      }],
      latestStories: [{
        type: 'cover',
        image: 'soylent.png',
        title: 'The Soylent Burner Diet: Be Prepared To Shit Yourself A Lot'
      }, {
        image: 'lohman.png',
        title: 'The Search For Dr. Lohman: What Is In His Secret Lemonade?'
      }, {
        type: 'tiny',
        image: 'tick.png',
        supertitle: 'weird animal question of the week',
        title: 'Can I Get Herpes From A Tick Bite?'
      }, {
        type: 'tiny',
        image: 'map.png',
        supertitle: 'all over the map',
        title: 'Firefly Is Literally The Only Thing That Happens In Bethel, Vermont'
      }]
    });
  });

  app.listen(port);
}

init(port);