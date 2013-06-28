var express = require('express')
  , less = require('less')
  , connect = require('connect')
  , everyauth = require('everyauth'),
   nconf = require('nconf');

   var config = require('./config');
   console.log(config);
   console.log(config.user);
   console.log(config.pass);
   var nano    = require('nano')('http://'+config.user+':'+config.pass+'@planet95.cloudant.com/ztlanvotes');

var app = module.exports = express.createServer();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('./middleware/locals'));
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'azure zomg' }));
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(connect.static(__dirname + '/public'));
    app.use(app.router);
});

var errorOptions = { dumpExceptions: false, showStack: true }
app.configure('development', function() { });
app.configure('production', function() {
    errorOptions = {};
});
app.use(require('./middleware/errorHandler')(errorOptions));


var io = require('socket.io').listen(app);

io.configure( function(){
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
  io.set('log level', 2);
});

io.sockets.on('connection', function (socket) {
    console.log('<---This Guy. New Person connected.' + socket);
    socket.on('event', function(event) {
        socket.join(event);
    });
});
require('./routes/index')(app, io, nano);
// Global Routes - this should be last!
require('./routes/global')(app);

everyauth.helpExpress(app);
app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
