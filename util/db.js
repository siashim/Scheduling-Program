/*
    Mongo DB class
*/

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017';


function Database(name) {
    this.client = MongoClient;
    this.url = url;
    this.name = name;
}


Database.prototype.query = function(collection,criteria={}) {
    var self = this;
    return this.client.connect(this.url)
        .then(function(db) {
            var entries = db.db(self.name)
                .collection(collection)
                .find(criteria).toArray();
            db.close();
            return entries;
        });
}


Database.prototype.insert = function(collection,entry) {
    var self = this;
    return this.client.connect(this.url)
        .then(function(db) {
            db.db(self.name)
                .collection(collection)
                .insertOne(entry);
            db.close();
        }).
        then(function(db) {
            return self.query(collection);
        });
}


module.exports = Database;

