/**
 * Crashes/reboots a VLC video
 *
 * @author mtownsend
 * @since June 2016
 */

'use strict';

var JITTER_TIME = 800;
var BOOT_TIME = 1000;
var SOCKET = '/Users/vlc/vlc.sock';
var REBOOT_SOUND = 'winxp.mp3';
var TIME_REGEX = /\d+\s*$/;

const exec = require('child_process').exec;
const express = require('express');
const app = express();

var crash_timer;

function tell_vlc(command) {
  return syscall('echo "' + command + '" | nc -U ' + SOCKET);
}

function syscall(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      //console.log(command + ':: ' + stdout);
      resolve(stdout);
    });
  });
}

app.post('/crash', (req, res) => {
  // This will "crash" the a/v
  console.info('crash');
  tell_vlc('get_time').then(tell_vlc.bind(null, 'get_time')).then(function (out) {
    var crash_time = out.match(TIME_REGEX);
    crash_timer = setInterval(function () {
      tell_vlc('seek ' + crash_time);
    }, JITTER_TIME);
    res.status(200).send('crashed');
  });
});

app.post('/reboot', (req, res) => {
  // This will "reboot" the a/v
  console.info('rebooting...');
  tell_vlc('pause').then(() => {
    crash_timer && clearInterval(crash_timer);
    crash_timer = null;
    setTimeout(() => {
      syscall('afplay ' + __dirname + '/' + REBOOT_SOUND)
          .then(tell_vlc.bind(null, 'pause'))
          .then(() => {
            console.info('rebooted');
            res.status(200).send('rebooted');
          });
    }, BOOT_TIME);
  });
});