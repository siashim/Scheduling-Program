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
            console.log(entry);
            db.close();
        });
    });
}


module.exports = Database;


/*
MongoClient.connect(url,function(err,db) {
    if (err) throw err;
    var dbo = db.db(database);

    // test case
    var employee = new Employee('0000','John Smith','password','');
    var obj = employee.output();
    console.log(obj);

    dbo.collection(collection).insertOne(obj, function(err,res) {
        if (err) throw err;
        console.log('1 doc inserted');
        console.log(obj);
        db.close();
    });
});
*/

