/**
 * eBay.
 *
 * @author mtownsend
 * @since June 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var util = require('../util.js');
var port = require('yargs').argv.port;

const SECTIONS = [{
  title: 'Today\'s Deals',
  products: [{
    desc: 'Former Toronto Mayor Rob Ford\'s Necktie',
    price: '$449.99',
    image: 'deal1.png'
  }, {
    desc: 'Bridgeville, California - ENTIRE TOWN',
    price: '$999,999.99',
    image: 'deal2.png'
  }, {
    desc: 'advertise your company on forehead ad space (space limited)',
    price: '$10,000.00',
    image: 'deal3.png'
  }, {
    desc: 'Donald Trump Hair "Genuine" 100% REAL!!!',
    price: '$5.99',
    image: 'deal4.png'
  }, {
    desc: 'Cornflake shaped like Illinois',
    price: '$134.99',
    image: 'deal5.png'
  }, {
    desc: 'Kangaroo Scrotum Drawstring Bag - PERFECT UNIQUE GIFT',
    price: '$19.99',
    image: 'deal6.png'
  }, {
    desc: 'M1 Abrams Military Tank',
    price: '$5,000.00',
    image: 'deal7.png'
  }]
}, {
  title: 'Food That Looks Like Jesus',
  products: [{
    desc: 'FACE OF JESUS FISH STICK',
    price: '$579.99',
    image: 'jesus1.png'
  }, {
    desc: 'tortilla christ',
    price: '$666.66',
    image: 'jesus2.png'
  }, {
    desc: 'Jesus Banana Messiah',
    price: '$45.39',
    image: 'jesus3.png'
  }]
}, {
  title: 'Haunted Paintings',
  products: [{
    desc: 'The Anguished Man Haunted Painting',
    price: '$35.99',
    image: 'haunted1.png'
  }, {
    desc: 'Headless cart driver haunted painting WARNING',
    price: '$20.00',
    image: 'haunted2.png'
  }, {
    desc: 'Crying Child Haunted Painting Real',
    price: '$6.99',
    image: 'haunted3.png'
  }]
}, {
  title: 'Spare Parts',
  products: [{
    desc: 'Human Kidney "Fresh" good for transplant limited offer',
    price: '$199.95',
    image: 'kidney1.png'
  }, {
    desc: 'KIDNEY found outside don\'t need it',
    price: '$39.99',
    image: 'kidney2.png'
  }, {
    desc: 'Lot of 10 Kidneys - Great Deal!',
    price: '$899.95',
    image: 'kidney3.png'
  }]
}, {
  title: 'Uranium',
  products: [{
    desc: 'Uranium Rock, Highly Radioactive',
    price: '$500.00',
    image: 'uranium1.jpg'
  }, {
    desc: 'URANIUM',
    price: '$799.99',
    image: 'uranium2.png'
  }, {
    desc: 'Uranium ore from my backyard',
    price: '$67.89',
    image: 'uranium3.png'
  }]
}];

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', function(req, res) {
    res.render('home', { sections: SECTIONS });
  });

  app.listen(port);
}

init(port);