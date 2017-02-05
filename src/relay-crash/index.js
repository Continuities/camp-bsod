/**
 * Crashes/reboots a USB relay for lighting
 *
 * @author mtownsend
 * @since June 2016
 */

'use strict';

const express = require('express');
const app = express();
var hid = require('node-hid');
var port = require('yargs').argv.port;
var relay;

var ON = 0xff;
var OFF = 0xfd;

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

  app.post('/crash', (req, res) => {
    // This will "crash" the lighting
    console.info('crash');
    relay && relay.write([0x0, ON, 1]);
    res.setHeader('Access-Control-Allow-Origin', '*')
        .status(200)
        .send('crashed');
  });

  app.post('/reboot', (req, res) => {
    // This will "reboot" the lighting
    console.info('rebooting...');
    relay && relay.write([0x0, OFF, 1]);
    res.setHeader('Access-Control-Allow-Origin', '*')
        .status(200)
        .send('rebooted');
  });

  app.listen(port);
}

init(port);