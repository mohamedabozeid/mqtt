var username = 'admin';
var password = 'Y7ktFFul6VPz5nNy';

var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = `mongodb+srv://admin:${password}@smartvolt-xnzbl.mongodb.net/happy`;
const dbName = 'happy';

var dbContext = function(){

}
dbContext.prototype.init = function(){
    var self = this;
    MongoClient.connect(uri, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        console.log(this); 
        self.db = client.db(dbName);
        self.insertDocuments(self.db, function(result){
            console.log(result);
        });
        //client.close();
    });
}

dbContext.prototype.insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

dbContext.prototype.findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

  dbContext.prototype.findDocumentsByQry = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({'a': 3}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      callback(docs);
    });
  }

  dbContext.prototype.updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
      , { $set: { b : 1 } }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document with the field a equal to 2");
      callback(result);
    });  
  }

  dbContext.prototype.removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });    
  }

module.exports = new dbContext();
