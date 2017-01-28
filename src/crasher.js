var RELAY_TARGET = 'http://lights/';
var VLC_TARGET = 'http://192.168.1.100:8080/';

var Ajax = require('./ajax');

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