(function() {
  'use strict';

  var slideshow = document.getElementById('carousel');
  var slides = slideshow.querySelectorAll('.tile');
  var numSlides = slides.length;
  var curSlide = 0;
  setInterval(function() {
    if (++curSlide >= numSlides) { curSlide = 0; }
    slideshow.style = 'transform: translate(-' + curSlide * 100 + '%);'
    typeWords(slides[curSlide].querySelector('.fund'));
  }, 6000);

  function typeWords(elem) {
    var words = elem.innerText;
    elem.innerHTML = '';
    setTimeout(writeLetter.bind(null, elem, words, 1), 1000);
  }

  function writeLetter(elem, words, number) {
    elem.innerHTML = words.substring(0, number);
    if (number < words.length) {
      setTimeout(writeLetter.bind(null, elem, words, number + 1), 80 + rand(-50, 50));
    }
  }

  function rand(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
  }

  typeWords(slides[0].querySelector('.fund'));

}());