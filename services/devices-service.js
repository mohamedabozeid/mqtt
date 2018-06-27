var devicesRepo = require('../db').devices;
var usersRepo = require('../db').users;
var _ = require('lodash');

var service = function () { }
service.prototype.verify = function (userId, deviceId, cb, errorCb) {
    // check if this device exists in devices collection, if yes then add it userDevices if it does't exist
    devicesRepo.findById(deviceId, function (device) {
        if (device) {
            device.userId = userId;
            if (cb) cb(device);
        } else throw new Error(`Device # ${deviceId} does not exist`);
    }, function (error) {
        if (errorCb) errorCb(error);
    });
}

service.prototype.getUserDevices = function (userId, cb, errorCb) {
    devicesRepo.getUserDevices(userId, function (result) {
        cb(result);
    }, function (error) {
        errorCb(error);
    });
}

service.prototype.save = function (device, cb, errorCb) {
    devicesRepo.save(device, function (result) {
        cb(result);
    }, function (error) {
        errorCb(error);
    });
}



module.exports = new service();