(function() {
  'use strict';

  var slideshow = document.getElementById('slideshow');
  var numSlides = document.querySelectorAll('li.slide').length;
  setInterval(function() {
    var curSlide = parseInt(slideshow.className.substring(1));
    if (++curSlide > numSlides) { curSlide = 1; }
    slideshow.className = 's' + curSlide;
  }, 4000);

  Array.prototype.forEach.call(document.querySelectorAll('.menu'), function(menu) {
    menu.addEventListener('click', toggleMenu);
  });

  function toggleMenu() {
    this.classList.toggle('open');
  }

}());