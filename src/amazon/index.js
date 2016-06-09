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
var util = require('../util.js');

var NUM_PRODUCTS = 10;
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
    name: 'The Totenkidden Manifesto',
    stars: 5,
    image: 'totenkiddenmanifesto.png'
  }, {
    name: 'Bacon Bandages (with bacon flavor!)',
    price: '9.99',
    image: 'baconbandages.png'
  }, {
    name: 'runny nose shower gel dispenser',
    price: '23.99',
    image: 'showergel.png'
  }, {
    image: 'phonethumb.png',
    name: 'Suction cup thumb iPhone stand!!!',
    price: '4.99'
  }, {
    image: 'condimentgun.png',
    name: 'Ketchup Mustard Condiment Gun',
    price: '12.99'
  }, {
    image: 'silverhelmet.png',
    name: 'Silver stardust paintjob shiny motorcycle helmet',
    price: '49.99'
  }, {
    image: 'breakfaststation.png',
    name: 'Snorton\'s 3-in-1 Breakfast Station 9000',
    price: '129.99'
  }, {
    image: 'keyboardwaffleiron.png',
    name: 'WAFFLE KEYBOARD MAKER WAFFLE IRON',
    price: '35.99'
  }, {
    image: 'meatgrindergun.png',
    name: 'Meat Grinder Gun Hamburger Gun Limited Edition',
    price: '24.99'
  }, {
    image: 'picnicpants.png',
    name: 'DPW Picnic Pants - Picnic blanket on the go',
    price: '19.99'
  }, {
    image: 'flavoredwallpaper.png',
    name: 'Scratch and sniff, flavored wallpaper: Beef, Banana, Cherry, Cola, Potato Chip',
    price: '52.29'
  }, {
    image: 'analsharingbolt.png',
    name: 'Friendly Partners Popular Silicon Anal Sharing Bolt',
    price: '33.95'
  }, {
    image: 'helmetbag.png',
    name: 'Grappa brand Helmet Handbag Earthquake Protection Bag',
    price: '21.29'
  }, {
    image: 'seniorladydecal.png',
    name: 'Senior Woman With Asthma Inhaler Peel and Stick Wall Decal (48" x 41")',
    price: '27.98'
  }, {
    image: 'boyfriendpillow.png',
    name: 'Boyfriend Arm Pillow, Blue Shirt',
    price: '29.95'
  }, {
    image: 'coffeebars.png',
    name: 'Non-GMO, Gluten Free, Coffee Infused Energy Bars - Pack of 12',
    price: '36.00'
  }, {
    image: 'pizzalanyard.png',
    name: 'Pizza holder slide-lock lanyard',
    price: '9.99'
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
    var products = util.shuffle(PRODUCTS
                    .map(p => Object.assign({ stars: getStars() }, p)));
    products.length = NUM_PRODUCTS;
    res.render('home', { products: products });
  });

  app.listen(port, () => {
    console.log('Amazon running on port ' + port);
  });
}

module.exports = {
  init: init
};