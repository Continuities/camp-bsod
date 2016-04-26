/**
 * Scamzone.
 *
 * @author mtownsend
 * @since April 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');

var PRODUCTS = [
  {
    name: 'Captain Pecker the Party Wrecker 6ft Inflatable Penis',
    price: '19.99',
    image: '6ftinflatablepenis.png'
  }, {
    name: '64 Slices of American Cheese',
    price: '5.99',
    image: '64slicesamericancheese.png'
  }, {
    name: 'The Great American Challenge (Purple)',
    price: '39.99',
    image: 'americanchallengdildo.png'
  }, {
    name: 'Life Size Chewbacca Standee',
    price: '25.99',
    image: 'ChewbaccaStandee.png'
  }, {
    name: 'Deluxe Bong - Glass',
    price: '49.99',
    image: 'glassbong.png'
  }, {
    name: 'cast iron hitler skunk statuette RARE',
    price: '199.99',
    image: 'hitlerskunk.png'
  }, {
    name: 'Inflatable DINOSAUR COSTUME perfect for parties!',
    price: '53.99',
    image: 'inflatablecostume.png'
  }, {
    name: 'NOS Nitrous Oxide Dispenser + 10 cartridges',
    price: '149.99',
    image: 'nos.png'
  }, {
    name: 'Planet of the Grapes of Wrath by Pierre Steinbeck (paperback)',
    price: '3.49',
    image: 'planetofthegrapes.png'
  }, {
    name: '100% ORGANIC PLUMBUS',
    price: '36.99',
    image:'plumbus.png'
  }, {
    name: 'Premium dust goggles',
    price: '29.99',
    image: 'premiumdustgoggles.png'
  }, {
    name: 'The Devil\'s Diet: 666 Diet Tips for the Hungry Satanist by Lord Bing Shipley HARDCOVER',
    price: '12.99',
    image: 'thedevilsdiet.png'
  }, {
    name: 'The Totenkitten Manifesto',
    stars: 5,
    image: 'totenkittenmanifesto.png'
  }
];

function getStars() {
  return String(Math.ceil(Math.random() * 10) / 2).replace('.', '-');
}

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', function(req, res) {
    var products = PRODUCTS
                    .map(p => Object.assign({ stars: getStars() }, p))
                    .sort(() => (Math.random() * 2) - 1);
    res.render('home', { products: products });
  });

  app.listen(port, function () {
    console.log('Amazon running on port ' + port);
  });
}

module.exports = {
  init: init
};