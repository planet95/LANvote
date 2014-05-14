
var express = require('express.io'),
    jade = require('jade'),
    swig = require('swig'),
    connect = require('connect'), nano = require('nano')('https://planet95:h022roZP@planet95.cloudant.com/');

var app = express().http().io();

app.io.configure(function() {
    // app.engine('html', jade.renderFile);
    app.use('/public', express.static(__dirname + '/public'))
    //public is now root folder in all app.
    app.use(connect.static(__dirname + '/public'))
    app.use(express.methodOverride())
    app.use(express.cookieParser())
    app.use(express.session({
        secret: 'lanvoter'
    }))
    app.set('view engine', 'jade')
    app.use(app.router)
    app.set('views', __dirname + '/views')
    app.io.set("transports", ["xhr-polling"])
    app.io.set("polling duration", 10)
    app.io.set('log level', 2)

    app.use(function(err, req, res, next) {
        if (!err) return next();
        console.log(err.stack);
        res.json({
            error: true
        });
    });
});

var routes = require('./routes');
app.get('/', routes.index);
app.get('/roomlist', routes.roomlist);
app.get('/vote', routes.votelist);
app.get('/vote/:id', routes.votelist);
app.get('/voteresults/:id', routes.results);
//app.post('/vote/:id', routes.votecast);



app.io.sockets.on('connection', function(socket) {
    console.log('This Guy! --->' + socket.id + '<--- New Person connected.');
});

app.io.route('ready', function(req) {
    req.io.join(req.data)
    req.io.room(req.data).broadcast('announce', {
        message: 'New client in the ' + req.data + ' room. '
    })
});

app.io.route('votecast', function(req){
    //tell room that vote has been cast
    req.io.room(req.data.roomid).broadcast('votecast', req.data);

    var db = nano.use('node_votes');
        console.log('('+req.io.socket.id+')'+ 'voted: ' + req.data.vote + ' room: ' + req.data.roomid);
    db.insert({room: req.data.roomid, name:req.data.roomid, session: req.io.socket.id, vote:req.data.vote}, '',  function(err, body, header) {
      if (err) {
        console.log('[db.insert] ', err.message);
        return;
    }
    });
});

app.io.route('newlist', function(req){
    //tell room that vote has been cast
    //req.io.room(req.data.roomid).broadcast('votecast', req.data);

    var db = nano.use('node_votes');
    console.log('('+req.io.socket.id+')'+ 'new votelist: ' + req.data.votelist);
    db.insert({name: req.data.name, votelist:req.data.votelist}, 'votelist_' + req.data.name,  function(err, body, header) {
      if (err) {
        console.log('[db.insert] ', err.message);
        return;
    }
    });
});


app.listen(1337);

console.log('app started'); 