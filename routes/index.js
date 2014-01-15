var nano = require('nano')('https://planet95:C0d4e33@planet95.cloudant.com/');
var db;
var db = nano.use('node_votes');

var voteRooms = db.view('filters','rooms',  { revs_info: true, group_level:3 }, function(err, list) {
  if (!err){
        voteRooms.list = list;
      }
  });

 var votelist = db.get('votelist',  { revs_info: true }, function(err, list) {
  if (!err){
       votelist.list = list.games
       }
});

exports.index = function(req, res) {
	res.render('index');
};

exports.roomlist = function(req,res){
    res.json(voteRooms.list.rows);
}

exports.votelist = function(req,res){
    if(req.params.id != null)
        console.log('Custom List? :: ' + req.params.id);
    res.json(votelist.list);
}

exports.results = function(req, res) {
var voteId = req.params.id;
	  db.view('filters','votes',  { revs_info: true, group_level:3,startkey:voteId, endkey:[voteId,{}] }, function(err, data) {
  if (!err){
            res.json(data);
      }
else {
			res.json({error:true});
		}
	});
};



