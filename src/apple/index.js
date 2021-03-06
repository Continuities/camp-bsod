/**
 * Apple
 *
 * @author mtownsend
 * @since June 2016
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
      slides: [{
        title: 'Purchase More Products',
        subtitle: 'Consume. You need this. Spend money.',
        image: 'slide1.png'
      }, {
        title: 'This is your God',
        subtitle: 'Work 8 hours. Sleep 8 hours.',
        image: 'slide2.png'
      }, {
        title: 'Do Not Question Authority',
        subtitle: 'Stay asleep.',
        image: 'slide3.png'
      }],
      tiles: [{
        title: 'Money',
        subtitle: 'Can buy happiness.',
        image: 'tile1.png'
      }, {
        title: 'This Product',
        subtitle: 'Will make your life better.',
        image: 'tile2.png'
      }, {
        title: 'Spend More Time Online',
        subtitle: 'Do not go outside. Sleep.',
        image: 'tile3.png'
      }, {
        title: '<svg class="title-svg" viewBox="0 0.5 21 48"><path d="M19.35,26.896c-0.119,0.34-0.244,0.664-0.377,0.974c-0.324,0.733-0.705,1.409-1.149,2.028 c-0.604,0.847-1.097,1.432-1.479,1.754c-0.59,0.535-1.223,0.81-1.9,0.824c-0.487,0-1.074-0.137-1.758-0.412 c-0.686-0.273-1.314-0.412-1.891-0.412c-0.604,0-1.251,0.139-1.943,0.412c-0.694,0.275-1.253,0.42-1.68,0.434 c-0.65,0.027-1.298-0.253-1.945-0.846c-0.414-0.353-0.929-0.957-1.548-1.817c-0.664-0.915-1.209-1.979-1.636-3.192 c-0.456-1.309-0.685-2.576-0.685-3.803c0-1.408,0.311-2.621,0.929-3.637c0.487-0.816,1.135-1.461,1.945-1.934 s1.687-0.713,2.629-0.729c0.517,0,1.193,0.158,2.035,0.467c0.839,0.309,1.376,0.464,1.613,0.464c0.177,0,0.774-0.183,1.789-0.55 c0.958-0.338,1.769-0.478,2.433-0.422c1.797,0.142,3.146,0.838,4.043,2.093c-1.605,0.959-2.4,2.298-2.387,4.014 c0.016,1.341,0.51,2.455,1.481,3.339C18.311,26.355,18.803,26.674,19.35,26.896z M14.828,11.518 c0.015,0.141,0.021,0.279,0.021,0.421c0,1.047-0.389,2.027-1.166,2.936c-0.939,1.078-2.074,1.701-3.307,1.604 c-0.016-0.126-0.024-0.259-0.024-0.398c0-1.009,0.445-2.085,1.24-2.969c0.396-0.446,0.899-0.816,1.509-1.109 C13.709,11.707,14.287,11.546,14.828,11.518z"/></svg>tv',
        subtitle: 'Watch more television.',
        image: 'tile4.png',
        bottom: true
      }],
      menus: [{
        title: 'Honor Apathy',
        options: [
            'Reward Indifference',
            'Obey and Conform',
            'Submit',
            'No Independent Thought',
            'Use the Internet',
            'Stay in Bed',
            'Eat',
            'Spend Money',
            'Work',
            'Consume'
        ]
      }, {
        title: 'Procreate',
        options: [
            'Mary and Reproduce',
            'Masturbate',
            'Remain Passive',
            'No Thought',
            'Doubt Yourself',
            'Do Not Protest',
            'Money is Your God',
            'Art is Terrorism',
            'Yield',
            'Take Your Pills'
        ]
      }, {
        title: 'Follow',
        options: [
            'Stay in Line',
            'Surrender'
        ]
      }, {
        title: 'No Thoughts',
        options: [
            'No Ideas',
            'No Freedom'
        ]
      }, {
        title: 'Obey',
        options: [
            'Obey',
            'Obey',
            'Obey',
            'Obey',
            'Obey',
            'Obey',
            'Obey'
        ]
      }]
    });
  });

  app.listen(port);
}

init(port);