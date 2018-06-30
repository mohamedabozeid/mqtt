const devicesRepo = require('../db').devices;
const usersRepo = require('../db').users;
const _ = require('lodash');
const mqttClient = require('../mqtt/test');

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

service.prototype.execute = function (userId, cmd, cb, errorCb) {
    console.log(cmd);
    if (!userId || !cmd.deviceId) return errorCb(new Error('Invalid Input, UserId or device is NULL'));
    devicesRepo.findDevice(userId, cmd.deviceId, (device) => {
        if(!device) return errorCb(new Error(`Could not retrieve device ${cmd.deviceId}`));
        if(!device.mqttId) return new errorCb(new Error(`device ${cmd.deviceId} deos have mqttId, please reconfigure`));
        mqttClient.sendMsg(`cmnd/DVES_${device.mqttId}}/IRhvac`, `{"Vendor": "Fujitsu", "Power": ${cmd.cmd}, "Mode":"Hot", "FanSpeed":1, "Temp":20," Swing":0}`);
        return cb(true);
    }, (error) => {
        return errorCb(error);
    });
    // devicesRepo.save(device, function (result) {
    //   cb(result);
    // }, function (error) {
    //  errorCb(error);
    // });
    
}



module.exports = new service();