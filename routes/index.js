var nano = require('nano')('https://planet95:C0d4e33@planet95.cloudant.com/');
var db = nano.use('node_votes');
var voteRooms = db.view('filters','rooms',  { revs_info: true, group_level:3 }, function(err, list) {
  if (!err){
        voteRooms.list = list;
      }
  });

 var votelist = db.get('votelist',  { revs_info: true }, function(err, list) {
  if (!err){
       votelist.default = list
       }
});

exports.index = function(req, res) {
	res.render('index');
};


exports.roomlist = function(req,res){
    
    console.log('collecting roomlist');
     db.view('filters','rooms',  { revs_info: true, group_level:3 }, function(err, list) {
  if (!err){
        voteRooms.list = list;
      }});

    res.json(voteRooms.list.rows);
}

exports.votelist = function(req,res){
    if(req.params.id != null)
        console.log('collecting newlist :: ' + req.params.id);
    db.get('votelist_' + req.params.id,  { revs_info: true }, function(err, list) {
  if (!err){
       res.json(list);
       }
    else{
    res.json(votelist.default);
    }
});
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
                type: 'column',
                animation: true,
                reflow: true, backgroundColor:'rgba(255, 255, 255, 0.1)'
            }, plotOptions: {
        column: {
            colorByPoint: true
        }
    }, colors: [
        '#282828'
    ],legend: {
                enabled: false
            }
},
                
            title: {
                text: 'Real-Time Graph of Votes'
                ,style:{color:'#FFFFFF'}
            },
            subtitle: {
                text: 'a Tactical Pause production.',style:{color:'#E74F4E'}
            },
            xAxis: {
                categories: labels,
                title: {
                    text: voteId,style:{color:'#FFFFFF'}
                },
                labels:{style:{color:'#E74F4E'}}
                
            },
            yAxis: {
                title: {
                    text: 'votes',
                    align: 'high',style:{color:'#FFFFFF'}
                }
            }, 
          series: [{data:chartdata}]
        }];

            res.json(chart);
  }
      
else {
			res.json({error:true});
	 }
	});
};
