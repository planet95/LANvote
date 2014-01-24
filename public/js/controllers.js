'use strict';
function ListCtrl($scope, Rooms) {
	$scope.rooms = Rooms.query();
}
function VoteCtrl($scope, $routeParams, socket, Vote) {
	$scope.votelist = Vote.query({id: $routeParams.id});
    $scope.name =$routeParams.id;
    $scope.random = function() {
    return 0.5 - Math.random();
    }
    $scope.vote= {};
    $scope.vote.roomid = 'Default';
    $scope.castVote = function(data) {
         
        var choice =  data.userChoice.name;
         var roomName = $routeParams.id;
        // $scope.random();
         if(roomName){

             $scope.vote = { roomid: roomName, vote: choice };
             var voteObj = $scope.vote;

             socket.emit('votecast',voteObj);

            }};
          
        
}

//    $http.post("/votecast/", $.param(voteObj), { 
//               headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, 
//               transformRequest: true
// }).success(function(data){

//               console.log(data);
//               return data;
//    //Callback function here.
//    //"data" is the response from the server.
//    console.log('success');
//}).error(function(data, status){
//    console.log('errors: ' + data + '\n' + status);
//    });


function ResultsCtrl($scope, $routeParams, socket, Results) {
    var data = Results.query({id: $routeParams.id});
    console.log('ResultsCtrl: ' + $scope.data);
    $scope.name =$routeParams.id;
    	socket.on('newvote', function(data) {
		console.dir(data);
	});
    $scope.chart = data;
    //$scope.$on('$destroy', function (event) {
    //    socket.removeAllListeners();
    //    // or something like
    //    // socket.removeListener(this);
    //});

  
     console.log('leaving results ctrl ' + data);
}
 


function ResultsDataCtrl($scope, $routeParams, Results) {
	var labels = [];
    var chartdata = [];
    $scope.chart = Results.query({id: $routeParams.id});
    console.log('DataCtrl: ');
    console.log($scope.chart);
}