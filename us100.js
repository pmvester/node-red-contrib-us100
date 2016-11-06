module.exports = function(RED) {
  "use strict";
  var Gpio = require('pigpio').Gpio,
    trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
    echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});
  var MICROSECONDS_PER_CM = 1e6/34321;
  trigger.digitalWrite(0);
  function Us100(config) {
    RED.nodes.createNode(this,config);
      var node = this;
      this.on('input', function(msg) {
        msg.payload = msg.payload.toLowerCase();
        node.send(msg);
    });
  }
  RED.nodes.registerType("us100",Us100);
}
