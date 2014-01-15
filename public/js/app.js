// Angular module, defining routes for the app
var app = angular.module('lanvote', ['lanvoteServices','ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
			when('/', { templateUrl: 'partials/index.html', controller: ListCtrl }).
			//when('/room/room', { templateUrl: 'partials/vote.html', controller: RoomListCtrl }).
            when('/vote/:id', { templateUrl: 'partials/vote.html', controller: RoomListCtrl }).
           otherwise({redirectTo: '/'});
}]);

//angular.module('room', ['roomService']).
//	config(['$routeProvider', function($routeProvider) {
		
//			//when('/new', { templateUrl: 'partials/new.html', controller: PollNewCtrl }).
//			// If invalid route, just redirect to the main list view
//			otherwise({ redirectTo: '/' });
//	}]);
	