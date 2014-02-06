'use strict';
function ListCtrl($scope, Rooms) {
	$scope.rooms = Rooms.query();
}
function VoteCtrl($scope, $routeParams, socket, Vote) {
	$scope.votelist = Vote.query({id: $routeParams.id});
    $scope.name =$routeParams.id;
    socket.emit('ready',$scope.name);
    $scope.vote= {};
    $scope.vote.roomid = 'Default';
    $scope.castVote = function(data) {
        if($routeParams.id){
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
    }
    };    
}

function ResultsCtrl($scope, $routeParams, socket, Results) {
    $scope.chart = Results.query({id: $routeParams.id});
    console.log('ResultsCtrl: ' + $scope.data);
    $scope.name =$routeParams.id;
    socket.emit('ready',$scope.name);
    socket.on('votecast', function(data) {
    var chart=   $('#chart1').highcharts();
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