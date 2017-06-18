/**
 * GoFundMe spoof.
 *
 * @author mtownsend
 * @since June 2017
 */

'use strict';

const express = require('express');
const app = express();
const cons = require('consolidate');
const port = require('yargs').argv.port;

const CAMPAIGNS = processCampaigns([{
  image: 'nitrous.png',
  title: 'Camp Dust Apes road to recovery',
  raised: 29543,
  goal: 30000,
  description: 'The members of Camp Dust Apes are still recovering from being forced to listen to Nyan Cat on repeat at Hyperborea 2017.'
}, {
  image: 't-shirt.png',
  title: 'Help fund Camp Luminos\' fundraiser',
  raised: 3745,
  goal: 5000,
  description: 'We need a graphic designer who is willing to create graphics for the t-shirts that we will be selling at our fundraiser.'
}, {
  image: 'girls.png',
  title: 'I want to go to Burning Man',
  raised: 6745,
  goal: 12000,
  description: 'Hi my name is Michelle and I want to go to Burning Man I hear its like Coachella and Coachellas the bomb so I want to go'
}, {
  image: 'ship.png',
  title: 'Ship of Theseus art car needs parts',
  raised: 255,
  goal: 2000,
  description: 'Over the years the ship of theseus art car has required many replacement parts. At Burning Man 2016 it suffered a complete breakdown'
}]);

function processCampaigns(campaigns) {
  return campaigns.map(c => Object.assign(c, {
    progressPercent: Math.round(c.raised / c.goal * 100),
    progressText: progressText(c.raised, c.goal)
  }));
}

function progressText(raised, goal) {
  return `<strong>${formatMoney(raised)} raised</strong> of ${formatMoney(goal, true)}`;
}

function formatMoney(amount, truncate) {
  if (amount > 10000 && truncate) {
    return `$${Math.floor(amount / 1000)}k`;
  }
  if (amount > 1000) {
    return `$${String(amount).replace(/(\d+)(\d\d\d)/, '$1,$2')}`;
  }
  return `$${amount}`;
}

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', (req, res) => {
    res.render('home', {
      carousel: [{
        image: null,
        text: 'a vacation'
      }, {
        image: null,
        text: 'a burner'
      }, {
        image: null,
        text: 'a shirtcocker'
      }, {
        image: null,
        text: 'your own party'
      }, {
        image: null,
        text: 'a light fixture'
      }, {
        image: null,
        text: 'a theme camp'
      }, {
        image: null,
        text: 'a dj'
      }],
      campaigns: CAMPAIGNS
    });
  });

  app.listen(port);
}

init(port);