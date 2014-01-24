var nano = require('nano')('https://planet95:C0d4e33@planet95.cloudant.com/');
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
    console.log('collecting roomlist');
}

exports.votelist = function(req,res){
    if(req.params.id != null)
        console.log('collecting newlist :: ' + req.params.id);
 //   req.io.join(req.params.id);
    res.json(votelist.list);
}

exports.results = function(req, res) {
var chartdata = [];
var labels = [];
var voteId = req.params.id;
	  db.view('filters','votes',  { revs_info: true, group_level:3,startkey:[voteId,''], endkey:[voteId,{}] }, function(err, data) {
  if (!err){
          data.rows.forEach(function(i){
                    chartdata.push(i.value);
                    labels.push(i.key[1]);
                    });
            var chart = [{options: {chart: {
                renderTo: 'chartContainer',
                type: 'column'
            }},
            title: {
                text: 'Real-Time Graph of Votes'
            },
            subtitle: {
                text: 'a Tactical Pause production.'
            },
            xAxis: {
                categories: labels,
                title: {
                    text: voteId
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'votes',
                    align: 'high'
                }
            },
          series: [{name:'Room1',data:chartdata}]
        }];

            res.json(chart);
  }
      
else {
			res.json({error:true});
	 }
	});
};

//exports.votecast = function(req, res){
//       // console.log('('+req.data.session+')'+ 'voted: ' + req.data.value + ' room: ' + req.data.room);
//        db.insert({room: req.data.roomid, name:req.data.roomid, session: req.data.roomid, vote:req.data.vote}, '',  function(err, body, header) {
//      if (err) {
//        console.log('[db.insert] ', err.message);
//        return;
//    }
//        console.log(body);
//        return;
 
//    });
//};


