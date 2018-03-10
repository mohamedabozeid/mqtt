var username = 'admin';
var password = 'Y7ktFFul6VPz5nNy';

var MongoClient = require('mongodb').MongoClient;
var uri = `mongodb+srv://admin:${password}@smartvolt-xnzbl.mongodb.net/test`

var dbContext = function(){

}
dbContext.prototype.init = function(){
    MongoClient.connect(uri, function(err, db) {
        db.close();
    });
}

module.exports = new dbContext();
