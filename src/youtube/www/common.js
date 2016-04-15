(function() {

  'use strict';

  var header = document.querySelector('header h1')
  ,   search = document.querySelector('header .search-box')
  ;


  function searchClick() {
    document.body.className = 'search-open';
    header.style.display = 'none';
    search.style.display = 'block';
    search.focus();
  }

  function searchClose() {
    document.body.className = '';
    header.style.display = 'block';
    search.style.display = 'none';
  }

  document.body.addEventListener('click', searchClose);
  document.querySelector('.search').addEventListener('click', searchClick);
  document.querySelector('header').addEventListener('click', function(e) {
    e.stopPropagation();
  });
  search.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      window.location = '/search?q=' + search.value;
    }
  });

})();