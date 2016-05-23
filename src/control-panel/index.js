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
var ON = 0xff;
var OFF = 0xfd;

var express = require('express');
var app = express();
var exec = require('child_process').exec;
var hid = require('node-hid');
var crash_timer;
var relay;

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

function find_relay() {
  return hid.devices().reduce((r,d) => {
    if (r) { return r; }
    if (d.product === 'USBRelay1') {
      return new hid.HID(d.path);
    }
    return null;
  }, null);
}

function init(port) {

  relay = find_relay();

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
    relay && relay.write([0x0, ON, 1]);
  });

  app.post('/reboot', (req, res) => {
    // This will "reboot" the a/v and lighting
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
        relay && relay.write([0x0, OFF, 1]);
      }, BOOT_TIME);
    });
  });

  app.listen(port, () => {
    console.log('Control running on port ' + port);
  });
}

module.exports = {
  init: init
};