(function() {
  'use strict';

  var slideshow = document.getElementById('slideshow');
  var numSlides = document.querySelectorAll('li.slide').length;
  setInterval(function() {
    var curSlide = parseInt(slideshow.className.substring(1));
    if (++curSlide > numSlides) { curSlide = 1; }
    slideshow.className = 's' + curSlide;
  }, 6000);
}());