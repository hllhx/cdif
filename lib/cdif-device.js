var events = require('events');
var util = require('util');

function CdifDevice(spec) {
  this.spec = spec;
  this.actions = {};
  var services = spec.device.serviceList;
  for (var i in services) {
    var service = services[i];
    this.actions[i] = {};
    var actions = service.actionList;
    for (var j in actions) {
      this.actions[i][j] = {};
    }
  }
}

util.inherits(CdifDevice, events.EventEmitter);


CdifDevice.prototype.getDeviceSpec = function(callback) {
  callback(null, JSON.stringify(this.spec));
}

CdifDevice.prototype.connect = function(user, pass, callback) {
}

CdifDevice.prototype.disconnect = function(callback) {
}

CdifDevice.prototype.getHWAddress = function(callback) {
}

CdifDevice.prototype.deviceControl = function(serviceId, actionName, args, callback) {
  var action = this.actions[serviceId][actionName];
  if (action == null) {
    callback(new Error('action not found: %s', actionName));
  } else {
    action(args, function(err, data) {
      callback(err, data);
    });
  }
}

CdifDevice.prototype.subScribeDeviceEvent = function(serviceId, callback) {

};

CdifDevice.prototype.unSubscribeDeviceEvent = function(serviceId, callback) {

};



module.exports = CdifDevice;