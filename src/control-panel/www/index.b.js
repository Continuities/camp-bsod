/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  var Crasher = __webpack_require__(1);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var RELAY_TARGET = 'http://lights/';
	var VLC_TARGET = 'http://192.168.1.100:8080/';

	var Ajax = __webpack_require__(2);

	function send(instruction) {
	  return Promise.all([
	    Ajax.send(VLC_TARGET + instruction),
	    Ajax.send(RELAY_TARGET + instruction)
	  ]);
	}

	module.exports = {
	  crash: send.bind(null, 'crash'),
	  reboot: send.bind(null, 'reboot')
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  send: function(url) {
	    return new Promise(function(resolve, reject) {
	      var xhr = new XMLHttpRequest();
	      xhr.addEventListener("load", function(result) {
	        resolve(result);
	      });
	      xhr.addEventListener("error", function(err) {
	        reject(err);
	      });
	      xhr.open('POST', url);

	      try {
	        xhr.send();
	      } catch(e) {
	        reject(e);
	      }
	    });
	  }
	};

/***/ }
/******/ ]);