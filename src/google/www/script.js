(function() {
  'use strict';

  function debounce(fn, delay) {
    var _last = null;
    return function() {
      if (_last === null || Date.now() - _last >= delay) {
        fn.apply(this, arguments);
      }
      _last = Date.now();
    };
  }

  var playDoodle = debounce(function() {
    var doodle = document.createElement('img');
    doodle.className = 'logo-doodle';
    doodle.src = this.getAttribute('data-doodle');
    this.parentNode.appendChild(doodle);
    this.parentNode.offsetWidth; // reflow
    this.parentNode.className += ' play';
    this.removeEventListener('click', playDoodle);
    this.removeEventListener('touchstart', playDoodle);
  }, 100);

  var logo = document.querySelector('.logo-img');
  if (logo) {
    logo.addEventListener('click', playDoodle);
    logo.addEventListener('touchstart', playDoodle);
  }

})();