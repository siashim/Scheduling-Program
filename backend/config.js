 /*
    the configuration file for the server
*/


module.exports = function(express) {
    
    var app = express();
    var path = require('path');
    
    //var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    //var favicon = require('serve-favicon');

    var api = require('./api.js');
    //var emailer = require('./emailer.js');
    var errors = require('./error.js');
    
    app.set('view engine','ejs');

    //app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname,'../frontend')));
    
    //app.use(favicon(path.join(__dirname,'../frontend','img','mesh.png')));
    
    app.use('/',api);
    //emailer(app);
    errors(app);
    
    return app;

}
