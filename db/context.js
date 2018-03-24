var username = 'admin';
var password = 'Y7ktFFul6VPz5nNy';

var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = `mongodb+srv://admin:${password}@smartvolt-xnzbl.mongodb.net/happy`;
const dbName = 'happy';

var dbContext = function () {
}

dbContext.prototype.init = function (cb) {
  var self = this;
  MongoClient.connect(uri, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    self.db = client.db(dbName);
    if(cb) cb(self.db);
  });
}

module.exports = new dbContext();
