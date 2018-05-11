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
var port = require('yargs').argv.port;

const NUM_RESULTS = 10;
const PAGES = [
  {
    title: '10 Reasons You Should {0} | Cracked.com',
    domain: 'www.cracked.ff',
    path: 'article',
    excerpt: 'You may think you know all about {0} but you\'ll never believe this!'
  }, {
    title: 'Amazon.com: Brand new {0}',
    domain: 'www.amazon.ff',
    excerpt: '{0}: New and used. Shipping anywhere in the world.',
    exists: true
  }, {
    title: 'Unbelievable {0} - YouTube',
    domain: 'www.youtube.ff',
    path: 'video',
    excerpt: 'Watch {0} - Duration: 11 minutes. 17,161 views; 1 day ago.',
    exists: true
  }, {
    title: 'Breaking: {0} - Huffington Post',
    domain: 'www.huffingtonpost.ff',
    excerpt: 'Get the most recent updates about {0} as things progress.',
    exists: true
  }, {
    title: '{0} · Instagram photos and videos',
    domain: 'www.instagram.ff',
    excerpt: '{0}. 582 posts; 1.7m followers; 65 following.',
    exists: true
  }, {
    title: 'Jeremy \'{0}\' Winston - Facebook',
    domain: 'www.facebook.ff',
    excerpt: '{0}. 216435 likes · 35235 talking about this.'
  }, {
    title: 'Frightening New Images of {0} - Yahoo',
    domain: 'www.yahoo.ff',
    excerpt: 'See the shocking new images from just days ago.'
  }, {
    title: 'Theory of {0} - Wikipedia, the free encyclopedia',
    domain: 'www.wikipedia.org',
    excerpt: 'In the early 19th century, scholars believed that ...'
  }, {
    title: '{0} (@bsod) | Twitter',
    domain: 'www.twitter.ff',
    excerpt: 'The latest Tweets from {0} (@bsod)'
  }, {
    title: 'New Study on {0} Revealed | MSN.com',
    domain: 'www.msn.ff',
    excerpt: 'A groundbreaking new study on {0} has shown ...'
  }, {
    title: 'Willemina {0}, CEO | LinkedIn',
    domain: 'www.linkedin.ff',
    excerpt: 'Join LinkedIn and access Willemina\'s full profile.'
  }, {
    title: '{0} Memorabilia | eBay',
    domain: 'www.ebay.ff',
    excerpt: 'Find great deals on Bay for {0}. Shop with confidence.',
    exists: true
  }, {
    title: 'I\'m {0}. AMA! : IAmA - Reddit',
    domain: 'www.reddit.ff',
    excerpt: 'AMA in 45 minutes.'
  }, {
    title: 'Amazing {0} Designs | Pinterest',
    domain: 'www.pinterest.ff',
    excerpt: 'Cool {0} designs from across the web.'
  }, {
    title: 'Search Results for {0} - Netflix',
    domain: 'www.netflix.ff',
    excerpt: 'Popular Movies and TV about {0}.'
  }, {
    title: 'Why I Don\'t {0} Anymore',
    domain: 'www.wordpress.ff',
    excerpt: 'Last year, around Christmas, I decided on something that ...'
  }, {
    title: '{0} on Tumblr',
    domain: 'www.tumblr.ff',
    excerpt: 'Find and follow posts tagged {0} on Tumblr',
    exists: true
  }, {
    title: 'Sometimes {0} Happens - GIF on Imgur',
    domain: 'www.imgur.ff',
    excerpt: 'Sometimes {0} Happens. Uploaded 6 months ago. 7124 points. 12,034 views.'
  }, {
    title: 'Unexplained {0} - National Geographic Video',
    domain: 'www.nationalgeographic.ff',
    excerpt: 'A few of the natural mysteries that bother scientists are ...'
  }, {
    title: 'President explains {0} - whitehouse.gov',
    domain: 'www.whitehouse.ff',
    excerpt: 'The president took to twitter this evening ...'
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
    excerpt: p.excerpt.replace('{0}', q),
    exists: p.exists
  }))).sort(function (a, b) {
    console.log(a, b, a.exists, b.exists);
    if (a.exists === b.exists) { return 0; }
    if (a.exists) { return -1; }
    return 1;
  });
  pages.length = Math.min(NUM_RESULTS, pages.length);

  return pages;
}

function getDoodle() {
  return "Doodle" + (Math.floor(Math.random() * 3) + 1) + ".gif";
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

  app.listen(port);
}

init(port);