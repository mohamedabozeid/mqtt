var context = require('./context');
var ObjectId = require('mongodb').ObjectID;



var users = function () {
  
  return {
    findById: function (id, cb) {
      var db = context.db;
      const collection = db.collection('users');
      collection.find({_id: ObjectId(id)}).toArray(function (err, users) {
        if (users && users.length > 0) {
          cb(null, users[0]);
        } else {
          cb(new Error('User ' + id + ' does not exist'));
        }
      });
    },
    findByUsername: function (username, cb) {
      var db = context.db;
      const collection = db.collection('users');
      collection.find({ username: username }).toArray(function (err, users) {
        if (users && users.length > 0) {
          cb(null, users[0]);
        } else {
          cb(new Error('Username ' + username + ' does not exist'));
        }
      });
    }

  }

}();


module.exports = users;