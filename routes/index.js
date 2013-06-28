var  config = require('../config')
  , io, db;

module.exports = function (app, socketio) {
    io = socketio;
    events = require('../events')(io);
    // home page
    app.get('/', function (req, res) {
        res.render('index', { title: 'Home Page.  ' })
    });

    // chat area
    app.get('/chat', function (req, res) {
        res.render('chat', { title: 'VoteLog' })
    });

     // chat event area
    app.get('/chat/:shortname', function (req, res) {
        res.render('chat', { title: 'VoteLog', current: req.params.shortname })
    });



      // vote page
    app.get('/vote', function (req, res) {
        res.render('vote', { title: 'Default Vote!  ' })
    });

    // vote page
    app.get('/vote/:shortname', function (req, res) {
        console.log('vote/send reached');
        res.render('vote', { title: 'Vote!  ', current : req.params.shortname })
    });

    app.post('/vote/:shortname', function (req, res) {
        
        events.saveVote( req.params.shortname, req.body.name, req.body.user);
        console.log('vote cast: ' + event.name + ', ' + from);

    });

}




