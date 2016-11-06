module.exports = function(RED) {
  "use strict";

  var Gpio = require('pigpio').Gpio,
    trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
    echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});
  var MICROSECONDS_PER_CM = 1e6/34321;

  trigger.digitalWrite(0);

  var startTick, endTick, diff;
  var msg = {payload: null};

  function Us100(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    echo.on('alert', function (level, tick) {
      if (level == 1) {
        startTick = tick;
      } else {
        endTick = tick;
        diff = (endTick >> 0) - (startTick >> 0);
        msg.payload = diff / 2 / MICROSECONDS_PER_CM;
        node.send(msg);
      }
    });
    setInterval(function () {
      trigger.trigger(10, 1);
    }, 1000);
  }
  RED.nodes.registerType("us100",Us100);
}
