/**
 * Node web server to support the
 * BSOD lounge "internet"
 *
 * @author mtownsend
 * @since Feb 2016
 */

'use strict';

var PORT = 8080;
var JITTER_TIME = 800;
var BOOT_TIME = 1000;
var SOCKET = '/Users/vlc/vlc.sock';
var REBOOT_SOUND = 'winxp.mp3';
var TIME_REGEX = /\d+\s*$/;

var express = require('express');
var exec = require('child_process').exec;
var app = express();
var crash_timer;

app.use(express.static('www'));

app.post('/crash', function(req, res) {
  // This will "crash" the a/v and lighting
  tell_vlc('get_time').then(function(out) {
    var crash_time = out.match(TIME_REGEX);
    crash_timer = setInterval(function() {
      tell_vlc('seek ' + crash_time);
    }, JITTER_TIME);
    res.send('crashed');
  });
});

app.post('/reboot', function(req, res) {
  // This will "reboot" the a/v and lighting
  console.log('rebooting');
  tell_vlc('pause').then(function(out) {
    crash_timer && clearInterval(crash_timer);
    crash_timer = null;
    setTimeout(function() {
      syscall('afplay ' + __dirname + '/' + REBOOT_SOUND)
          .then(tell_vlc.bind(null, 'pause'))
          .then(res.send.bind(res, 'rebooted'));
    }, BOOT_TIME);
  });
});

app.listen(PORT, function() {
  console.log('Running on port ' + PORT);
});

function tell_vlc(command) {
  return syscall('echo "' + command + '" | nc -U ' + SOCKET);
}

function syscall(command) {
  return new Promise(function(resolve, reject) {
    exec(command, function(err, stdout, stderr) {
      resolve(stdout);
    });
  });
}