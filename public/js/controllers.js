function ListCtrl($scope, Rooms) {
	$scope.rooms = Rooms.query();
}
function VoteCtrl($scope, $routeParams, Vote) {
	$scope.votelist = Vote.query({id: $routeParams.id});
    //$scope.votelist = Vote.get({voteId: $routeParams.id});
}
function ResultsCtrl($scope, $routeParams, Results) {
	$scope.results = Results.query({id: $routeParams.id});
}