/*
    the error manager
    comment-out development error handler before deployment
    
*/


module.exports = function(app) {
    
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    
        // error handlers
    
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('../frontend/views/error.html', {
                    message: err.message,
                    status: err.status,
                    error: err
                });
    
    
            });
        }
    
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('../frontend/views/error.html', {
                message: err.message,
                stats: err.status,
                error: {}
            });
        });
    
    }
    
    