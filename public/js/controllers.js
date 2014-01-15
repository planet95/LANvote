function ListCtrl($scope, Rooms) {
	$scope.rooms = Rooms.query();
}

function RoomListCtrl($scope, $routeParams, Room) {
	$scope.room = Room.get({roomId: $routeParams.roomId});
}