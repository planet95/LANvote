var nano = require('nano')('https://planet95:C0d4e33@planet95.cloudant.com/');
var db;
var db = nano.use('node_votes');

var voteRooms = db.view('filters','rooms',  { revs_info: true, group_level:3 }, function(err, list) {
  if (!err){
        voteRooms.list = list;
      }
  });


exports.index = function(req, res) {
	res.render('index');
};

exports.votelist = function(req,res){
    res.json(voteRooms.list.rows);
}

exports.vote = function(req, res) {
var voteId = req.params.id;
	  db.view('filters','votes',  { revs_info: true, group_level:3,startkey:voteId, endkey:[voteId,{}] }, function(err, data) {
  if (!err){
            res.json(data);
       //    req.io.broadcast('newresults', {rooms: rooms});
      }
else {
			res.json({error:true});
		}
	});
};