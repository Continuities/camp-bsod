(function() {
  'use strict';

  var slideshow = document.getElementById('slideshow');
  setInterval(function() {
    var curSlide = parseInt(slideshow.className.substring(1));
    if (++curSlide > 3) { curSlide = 1; }
    slideshow.className = 's' + curSlide;
  }, 6000);
}());