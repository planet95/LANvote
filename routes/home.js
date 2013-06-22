module.exports = function(app) {

    // home page
    app.get('/', function(req, res) {        
        res.render('index', { title: 'Home Page.  ' })
    });

    // chat area
    app.get('/chat', function(req, res) {
        res.render('chat', { title: 'VoteLog' })
    });

    // about page
    app.get('/about', function(req, res) {
        res.render('about', { title: 'About Me.  ' })
    });    

        // about page
    app.get('/vote', function(req, res) {
        res.render('vote', { title: 'Vote!  ' })
    });    
}
