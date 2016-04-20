(function() {
  'use strict';

  var THRESHOLD = 30;

  var last
  ,   lastDir
  ,   count = 0
  ,   header = document.querySelector('header')
  ;

  window.addEventListener('scroll', function(e) {

    var current = window.scrollY
    ,   dir = (current - last) / Math.abs(current - last)
    ;

    if (dir !== lastDir) {
      count = 0;
    } else {
      count += Math.abs(current - last);
    }

    if (count > THRESHOLD) {
      if (dir > 0) {
        header.className = 'hide';
      } else {
        header.className = '';
      }
    }

    lastDir = dir;
    last = current;

  });
})();