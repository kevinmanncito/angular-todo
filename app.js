var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 8330);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use('/static', express.static(path.join(__dirname, 'static')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// view urls
app.get('/', routes.index);

// api urls
app.get('/api/items', api.items);
app.get('/api/item/:id', api.item);
app.delete('/api/item/:id', api.deleteItem);
app.post('/api/item/:id', api.updateOrCreateItem);
app.post('/api/item', api.updateOrCreateItem);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
