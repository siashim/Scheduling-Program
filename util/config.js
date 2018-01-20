 /*
    the configuration file for the server
*/

module.exports = function(express) {
    
    var app = express();
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');


    // Connect to database
    // TODO remove
    var mongoose = require('mongoose'); // ODM library for mongodb
    mongoose.connect('mongodb://localhost:27017/meetingdb', {useMongoClient: true});
    mongoose.Promise = global.Promise;
    // Verify DB connection
    var db = mongoose.connection;
    db.on('connected', function(){
        console.log('MongoDB connected on port ' + 27017);
    });
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));


    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public'))); // delivers index.html to browser

    // Use backend router (api)
    var api = require('../routes/api.js');
    var errors = require('../routes/error.js');
    app.use('/', api);
    errors(app);

    return app;

}


/*

module.exports = function(express) {
    
    var app = express();
    var path = require('path');
    
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    //var favicon = require('serve-favicon');

    var api = require('./api.js');
    var errors = require('./error.js');
    
    //app.set('view engine','ejs');
    app.engine('html',require('ejs').renderFile);
    //app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname,'../frontend')));
    
    //app.use(favicon(path.join(__dirname,'../frontend','img','mesh.png')));
    
    app.use('/',api);
    errors(app);
    
    return app;

}

*/
