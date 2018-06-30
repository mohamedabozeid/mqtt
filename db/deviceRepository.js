var context = require('./context');
var ObjectId = require('mongodb').ObjectID;
const DevicesTable = 'devices';
const UsersTable = 'users';

module.exports = {
    findById: function (id, cb, errorCb) {
        var db = context.db;
        const collection = db.collection(DevicesTable);
        collection.find({ _id: ObjectId(id) }).toArray(function (err, devices) {
            if (err) {
                errorCb(err);
                return;
            }

            if (devices && devices.length > 0) {
                cb(devices[0]);
                return;
            } else {
                errorCb(new Error('Device ' + id + ' does not exist'));
            }
        });
    },
    getUserDevices(userId, cb, errorCb) {
        var collection = context.db.collection(DevicesTable);
        collection.find({ userId: userId }).toArray(function (error, result) {
            if (error) return errorCb(error);
            return cb(result);
        })
    },
    save(device, cb, errorCb) {
        if (!device || !device._id) return errorCb(new Error('invalid device input, device is null'));
        var db = context.db;
        let deviceId = device._id;
        delete device._id;
        const collection = db.collection(DevicesTable);
        collection.update({ _id: ObjectId(deviceId) }, device, null, function (err, result) {
            if (err) return errorCb(err);
            return cb(result);
        });
    },
    findDevice(userId, deviceId, cb, errorCb) {
        if (!userId || !deviceId) return errorCb(new Error('invalid  input, deviceId or User is null'));
        var db = context.db;
        const collection = db.collection(DevicesTable);
        collection.find({ _id: ObjectId(deviceId), userId: userId }).toArray((error, devices) => {
            if (error) return errorCb(error);
            if (!devices || devices.length < 1) return errorCb(new Error('Could not find device with this Idfor this user'));
            return cb(devices[0]);
        });
    }
}