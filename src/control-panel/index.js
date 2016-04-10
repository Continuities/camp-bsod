/**
 * API for crash/reboot and a simple
 * control panel.
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

var JITTER_TIME = 800;
var BOOT_TIME = 1000;
var SOCKET = '/Users/vlc/vlc.sock';
var REBOOT_SOUND = 'winxp.mp3';
var TIME_REGEX = /\d+\s*$/;

var express = require('express');
var exec = require('child_process').exec;
var app = express();
var crash_timer;

function tell_vlc(command) {
  return syscall('echo "' + command + '" | nc -U ' + SOCKET);
}

function syscall(command) {
  return new Promise(function(resolve, reject) {
    exec(command, function(err, stdout, stderr) {
      //console.log(command + ':: ' + stdout);
      resolve(stdout);
    });
  });
}

function init(port) {

  app.use(express.static(__dirname + '/www'));

  app.post('/crash', function (req, res) {
    // This will "crash" the a/v and lighting
    console.info('crash');
    // Gotta ask twice, because VLC is sometimes stupid?
    tell_vlc('get_time').then(tell_vlc.bind(null, 'get_time')).then(function (out) {
      var crash_time = out.match(TIME_REGEX);
      crash_timer = setInterval(function () {
        tell_vlc('seek ' + crash_time);
      }, JITTER_TIME);
      res.status(200).send('crashed');
    });
  });

  app.post('/reboot', function (req, res) {
    // This will "reboot" the a/v and lighting
    console.info('rebooting...');
    tell_vlc('pause').then(function () {
      crash_timer && clearInterval(crash_timer);
      crash_timer = null;
      setTimeout(function () {
        syscall('afplay ' + __dirname + '/' + REBOOT_SOUND)
            .then(tell_vlc.bind(null, 'pause'))
            .then(function () {
              console.info('rebooted');
              res.status(200).send('rebooted');
            });
      }, BOOT_TIME);
    });
  });

  app.listen(port, function () {
    console.log('Control running on port ' + port);
  });
}

module.exports = {
  init: init
};