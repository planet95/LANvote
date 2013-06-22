
module.exports = function(app) {
    // logout
    app.get('/logout', function(req, res) {
        res.redirect('/');
    });
}

