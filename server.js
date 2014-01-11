var express = require('express.io'),swig = require('swig'),connect = require('connect'), nano = require('nano')('https://planet95:C0d4e33@planet95.cloudant.com/');
var app = express().http().io();

app.configure(function() {
    app.engine('html', swig.renderFile);
    app.use('/public',express.static(__dirname + '/public'));
    //public is now root folder in all app.
    app.use(connect.static(__dirname + '/public'));
    app.use(express.methodOverride());
    app.use(express.cookieParser())
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.use(express.session({secret: 'lanvoter'}));
 
  });

app.io.configure( function(){
  app.io.set("transports", ["xhr-polling"]);
  app.io.set("polling duration", 10);
  app.io.set('log level', 2);
});

app.io.sockets.on('connection', function (socket) {
     socket.on('event', function(event) {
        socket.join(event);
    });
    console.log('This Guy! --->' + socket.id + '<--- New Person connected.' );
});

app.io.route('ready', function(req){  
    req.io.emit('name',{name:req.data});

    });

app.io.route('rtrvdata', function(req){  
   var db = nano.use('node_votes');
  db.view('filters','rooms',  { revs_info: true, group_level:3 }, function(err, rooms) {
  if (!err){
           req.io.broadcast('newvotes', {rooms: rooms});
      }
  });
    });

app.io.route('votecast', function(req){
    var db = nano.use('node_votes');
        console.log('('+req.data.session+')'+ 'voted: ' + req.data.value + ' room: ' + req.data.room);
    db.insert({room: req.data.room, name:req.data.name, session: req.data.session, vote:req.data.value}, '',  function(err, body, header) {
      if (err) {
        console.log('[db.insert] ', err.message);
        return;
    }
    });
});

app.io.route('rtrvresults', function(req){  
   var db = nano.use('node_votes');
  db.view('filters','votes',  { revs_info: true, group_level:3,startkey:[req.data.id], endkey:[req.data.id,{}] }, function(err, rooms) {
  if (!err){
           req.io.broadcast('newresults', {rooms: rooms});
      }
  });
    });

app.get('/', function(req, res){
  res.render('index');
});

app.get('/vote', function(req, res){
  var db = nano.use('node_votes');
   db.view('filters','rooms',  { revs_info: true, group_level:3 }, function(err, votelist) {
  if (!err){
      res.render('votelist', {games: votelist.rows, room:'LAN Vote'});
        console.log(req.session.id + ' entered vote page');}
});
  
});

app.get('/vote/:id', function(req, res){
     var db = nano.use('node_votes');
      db.get('votelist',  { revs_info: true }, function(err, votelist) {
  if (!err){
       res.render('vote',{games: votelist.games, room:req.params.id } );
       //
        console.log('This Guy! --->' + req.session.id + '<--- entered room:' + req.params.id + 'voting: ' + votelist);}
});
});

app.get('/vote/:id/results', function(req, res){
     var db = nano.use('node_votes');
      db.view('filters','votes',  { revs_info: true, group_level:3, startkey:[req.params.id], endkey:[req.params.id,{}] }, function(err, votes) {
  if (!err){
           console.log(req.session.id + '<--- entered results page');
           res.render('results',{room:req.params.id, votes:votes} );
      }
  });
});

app.get('/admin', function(req, res){
 var db = nano.use('node_votes');
      db.view('filters','rooms',  { revs_info: true, group_level:3 }, function(err, rooms) {
  if (!err){
           res.render('admin', {rooms: rooms, room:'LAN Vote'});
      }
    console.log(req.session.id + '<--- entered admin page');
    });
});

app.listen(1337);

console.log('app started');