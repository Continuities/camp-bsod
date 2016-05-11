/**
 * Google.
 *
 * @author mtownsend
 * @since April 2016
 */

'use strict';

var express = require('express');
var app = express();
var cons = require('consolidate');
var util = require('../util.js');

const NUM_RESULTS = 10
const PAGES = [
  {
    title: '10 Reasons You Should {0} | Cracked.com',
    domain: 'www.cracked.com',
    path: 'article',
    excerpt: 'You may think you know all about {0} but you\'ll never believe this!'
  }, {
    title: 'Amazon.com: Brand new {0}',
    domain: 'www.amazon.com',
    excerpt: '{0}: New and used. Shipping anywhere in the world.'
  }, {
    title: 'Unbelievable {0} - YouTube',
    domain: 'www.youtube.com',
    path: 'video',
    excerpt: 'Watch {0} - Duration: 11 minutes. 17,161 views; 1 day ago.'
  }, {
    title: 'Breaking: {0} - Huffington Post',
    domain: 'www.huffingtonpost.com',
    excerpt: 'Get the most recent updates about {0} as things progress.'
  }, {
    title: '{0} · Instagram photos and videos',
    domain: 'www.instagram.com',
    excerpt: '{0}. 582 posts; 1.7m followers; 65 following.'
  }, {
    title: 'Jeremy \'{0}\' Winston - Facebook',
    domain: 'www.facebook.com',
    excerpt: '{0}. 216435 likes · 35235 talking about this.'
  }, {
    title: 'Frightening New Images of {0} - Yahoo',
    domain: 'www.yahoo.com',
    excerpt: 'See the shocking new images from just days ago.'
  }, {
    title: 'Theory of {0} - Wikipedia, the free encyclopedia',
    domain: 'www.wikipedia.org',
    excerpt: 'In the early 19th century, scholars believed that ...'
  }, {
    title: '{0} (@bsod) | Twitter',
    domain: 'www.twitter.com',
    excerpt: 'The latest Tweets from {0} (@bsod)'
  }, {
    title: 'New Study on {0} Revealed | MSN.com',
    domain: 'www.msn.com',
    excerpt: 'A groundbreaking new study on {0} has shown ...'
  }, {
    title: 'Willemina {0}, CEO | LinkedIn',
    domain: 'www.linkedin.com',
    excerpt: 'Join LinkedIn and access Willemina\'s full profile.'
  }, {
    title: '{0} Memorabilia | eBay',
    domain: 'www.ebay.com',
    excerpt: 'Find great deals on Bay for {0}. Shop with confidence.'
  }, {
    title: 'I\'m {0}. AMA! : IAmA - Reddit',
    domain: 'www.reddit.com',
    excerpt: 'AMA in 45 minutes.'
  }, {
    title: 'Amazing {0} Designs | Pinterest',
    domain: 'www.pinterest.com',
    excerpt: 'Cool {0} designs from across the web.'
  }, {
    title: 'Search Results for {0} - Netflix',
    domain: 'www.netflix.com',
    excerpt: 'Popular Movies and TV about {0}.'
  }, {
    title: 'Why I Don\'t {0} Anymore',
    domain: 'www.wordpress.com',
    excerpt: 'Last year, around Christmas, I decided on something that ...'
  }, {
    title: '{0} on Tumblr',
    domain: 'www.tumblr.com',
    excerpt: 'Find and follow posts tagged {0} on Tumblr'
  }, {
    title: 'Sometimes {0} Happens - GIF on Imgur',
    domain: 'www.imgur.com',
    excerpt: 'Sometimes {0} Happens. Uploaded 6 months ago. 7124 points. 12,034 views.'
  }
];

function capitalise(s) {
  return s.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
}

function getResults(q) {
  q = capitalise(q);
  var pages = util.shuffle(PAGES.map(p => ({
    title: p.title.replace('{0}', q),
    domain: p.domain,
    path: p.path,
    excerpt: p.excerpt.replace('{0}', q)
  })));
  pages.length = Math.min(NUM_RESULTS, pages.length);

  return pages;
}

function getDoodle() {
  return "Doodle" + (Math.round(Math.random()) + 1) + ".gif";
}

function init(port) {

  app.engine('dust', cons.dust);
  cons.dust.helpers = require('dustjs-helpers');
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/www'));

  app.get('/', (req, res) => {
    res.render('home', { doodle: getDoodle() });
  });

  app.get('/search', (req, res) => {
    res.render('results', {
      query: req.query.q,
      results: getResults(req.query.q)
    });
  });

  app.listen(port, () => {
    console.log('Google running on port ' + port);
  });
}

module.exports = {
  init: init
};