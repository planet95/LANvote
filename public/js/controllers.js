'use strict';
function ListCtrl($scope, Rooms) {
	$scope.rooms = Rooms.query();
}

function NewVoteCtrl($scope, socket) {
	$scope.name = 'new vote';
    $scope.votelist = [];
    $scope.newvote = {};
    $scope.addnewvote = function(data){
        $('#newvoteform').show();
        if($scope.newVoteBG && $scope.newVoteName)
            {
                var newVote = { name :$scope.newVoteName, icon: $scope.newVoteBG };
                $scope.votelist.push(newVote);
                $scope.newVoteName= "";
                $scope.newVoteBG= "";
                $('#listWrap button').css('background-image',"url('')");
                }
        }

    $scope.changebg = function(data){
        console.log($scope.newVoteBG);
        $('#listWrap button').css('background-image',"url('"+$scope.newVoteBG+"')");
        }

    $scope.votelistname = function(data){

        if($scope.newVoteListName && $scope.votelist.length >=2)
        $('#save').show();
        else
            $('#save').hide();
        
        }

    $scope.savelist = function(data){
        $scope.newvote = {name:$scope.newVoteListName, votelist:$scope.votelist};
        socket.emit('newlist',$scope.newvote);
        }


}
function VoteCtrl($scope, $routeParams, $location, socket, Vote) {
	  $scope.votelist = Vote.query({id: $routeParams.id});
   // $scope.name =$scope.votelist.name;
    socket.emit('ready',$scope.name);
    $scope.vote= {};
    $scope.vote.roomid = 'Default';
    console.log('votecast: ' + $scope.votelist.name);
    $scope.castVote = function(data) {
    $scope.vote = { roomid: $routeParams.id, vote:  data.userChoice.name };
        socket.emit('votecast',$scope.vote);
    if($scope.random){
            $("#list div").sort(function(){
            return Math.random()*10 > 5 ? 1 : -1;
            }).each(function(){
            var $t = $(this), id = $t.attr("id"),
            bg = $t.find("button").css("background-image"),btn = $t.find("button");
            btn.css("background-image", bg).appendTo($t);
            $t.attr('id', id).appendTo($t.parent());
            });
       }

    };
    
}

function ResultsCtrl($scope, $routeParams, socket, Results) {
    $scope.chart = Results.query({id: $routeParams.id});
    console.log('ResultsCtrl: ' + $scope.data);
    $scope.name =$routeParams.id;
    socket.emit('ready',$scope.name);
    socket.on('votecast', function(data) {
    var chart=$('#chart1').highcharts();
   if($scope.chart[0] != null){
        var max = chart.yAxis[0].max;
             var index = $scope.chart[0].xAxis.categories.indexOf(data.vote); 
             if(index == -1){ 
                  $scope.chart[0].xAxis.categories.push(data.vote);
                  index = $scope.chart[0].xAxis.categories.indexOf(data.vote); 
                  $scope.chart[0].series[0].data[index] = 0 ;
                 }
         $scope.chart[0].series[0].data[index]++;
         chart.series[0].setData($scope.chart[0].series[0].data);
         console.log('votecast: ' + data.vote + ' :: ' + $scope.chart[0].series[0].data[index]);
   }
});

}
 


function ResultsDataCtrl($scope, $routeParams, Results) {
	var labels = [];
    var chartdata = [];
    $scope.chart = Results.query({id: $routeParams.id});
    console.log('DataCtrl: ');
    console.log($scope.chart);
}