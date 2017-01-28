(function() {
  'use strict';

  var Crasher = require("../../crasher");
  var _locked = false;
  var _crashed = false;

  function click() {
    if (_locked) {
      return;
    }
    _locked = true;
    document.body.className = 'working';
    Crasher[_crashed ? 'reboot' : 'crash']().then(done, done);
  }

  function done() {
    _locked = false;
    _crashed = !_crashed;
    document.body.className = '';
    document.querySelector('.btn').innerText = _crashed ? 'REBOOT' : 'CRASH';
  }

  document.querySelector('.btn').addEventListener('click', click);

})();