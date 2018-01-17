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


Database.prototype.insert = function(collection,entry) {
    var self = this;
    this.client.connect(this.url,function(err,db) {
        if (err) throw err;
        var dbo = db.db(self.name);
        dbo.collection(collection).insertOne(entry,function(err,res) {
            if (err) throw err;
            console.log('1 doc inserted');
            db.close();
        });
    });
}


/*
Database.prototype.query = function(collection,criteria={}) {
    var entries = [];
    var self = this;
    this.client.connect(this.url,function(err,db) {
        if (err) throw err;
        var dbo = db.db(self.name);
        dbo.collection(collection).find(criteria).toArray(function(err,res) {
            if (err) throw err;
            entries = res.slice();
            console.log(res);
            db.close();
        });
    });
}
*/

/*
'use strict';
const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';

mongoClient.connect(url)
  .then(conn => {
    return conn.collection('restaurants')
      .find().limit(10).toArray()
      .then(out => console.log(out))
      .then(() => conn.close())
  })
*/


Database.prototype.query = function(collection,criteria={}) {
    var self = this;    
    return this.client.connect(this.url)
        .then(conn => {
            return conn.db(self.name)
            .collection(collection)
            .find(criteria).toArray();
        });
    
}

/*
Database.prototype.connection = function(collection,criteria) {
    var self = this;
    return new Promise(function(resolve,reject) {
        self.client.connect(self.url,function(err,db) {
            if (err) { 
                reject(new Error(err)); 
            } else { 
                resolve('resolved connection');
            }
        });
    });
}
*/


/*
Database.prototype.query = function(collection,entries,criteria={}) {

    //  1.  connect
    //  2.  find
    //  3.  to array
    //  4.  return
    var self = this;
    //var entries = [];
    this.client.connect(this.url,function(err,db) {
        if (err) throw err;
        var dbo = db.db(self.name);
        dbo.collection(collection).find(criteria).toArray(function(err,res) {
            var p = new Promise(function(resolve,reject) {
                if (err)
                    reject(new Error('Did not query workers'));
                else
                    resolve(new Error('Found users'));
            });
            p.then(function() {
                entries = res.slice();
                //console.log(entries);
            });
        });
    });
}
*/

module.exports = Database;

