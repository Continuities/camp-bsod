(function() {

  var CAROUSEL_SPEED = 6000;
  var SLIDE_SPEED = 500;

  'use strict';

  var slideshow = document.getElementById('carousel');
  var slides = slideshow.querySelectorAll('.tile');
  var numSlides = slides.length;
  var curSlide = 0;

  function slide(toSlide) {

    if (toSlide + 1 >= numSlides ) {
      setTimeout(loop, CAROUSEL_SPEED);
    }
    else {
      setTimeout(slide.bind(null, toSlide + 1), CAROUSEL_SPEED);
    }

    slideshow.style = 'transform: translate(-' + toSlide * 100 + '%);';
    typeWords(slides[toSlide].querySelector('.fund'));
  }

  function loop() {

    setTimeout(slide.bind(null, 1), CAROUSEL_SPEED);

    setTimeout(function() {
      slideshow.offsetLeft;
      slideshow.classList.add('looping');
      slideshow.appendChild(slideshow.firstChild);
      slideshow.style = 'transform: translate(0);';
      slideshow.offsetLeft;
      slideshow.classList.remove('looping');
    }, SLIDE_SPEED);

    slideshow.classList.add('looping');
    slideshow.offsetLeft;
    slideshow.insertBefore(slideshow.lastChild, slideshow.firstChild);
    slideshow.style = 'transform: none;';
    slideshow.offsetLeft;
    slideshow.classList.remove('looping');
    slideshow.style = 'transform: translate(-' + 100 + '%);';
    typeWords(slides[0].querySelector('.fund'));
  }

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

  slide(0);

}());