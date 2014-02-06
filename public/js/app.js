// Angular module, defining routes for the app
var app = angular.module('lanvote', ['ngRoute','ngResource','highcharts-ng']);

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
			when('/vote', { templateUrl: 'partials/votelist.html', controller: ListCtrl }).
			when('/results/:id', { templateUrl: 'partials/results.html', controller: ResultsCtrl }).
            when('/resultsdata/:id', { templateUrl: 'partials/results.html', controller: ResultsDataCtrl }).
            when('/vote/:id', { templateUrl: 'partials/vote.html', controller: VoteCtrl }).
            otherwise({redirectTo: '/vote'});
}]).directive('coolFade', function() {
    return {
      compile: function(elm) {
        console.log('compiling');
        $(elm).css('opacity', 0.1);
        return function(scope, elm, attrs) {
          console.log('animating');
          $(elm).animate({ opacity : 1.0 }, 1000 );
        };
      }
    };
  });

app.factory('Rooms', function($resource) {
		return $resource('/roomlist', {
			query: { method: 'GET', isArray:true }	}
	)
	});
app.factory('Vote', function($resource) {
		return $resource('/vote/:id',{ id:'@id'}, {
			query: { method: 'GET', isArray: true}}
	);
	});
app.factory('Results', function($resource) {
		return $resource('/voteresults/:id', {
			query: { method: 'GET', params: { id:'@id'}, isArray: false }	}
	)
	});

app.factory('socket', function($rootScope) {
		var socket = io.connect();
		return {
		on: function (eventName, callback) {
	      socket.on(eventName, function () {  
	        var args = arguments;
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      });
	    },
	    emit: function (eventName, data, callback) {
	      socket.emit(eventName, data, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          if (callback) {
	            callback.apply(socket, args);
	          }
	        });
	      })
	    }
		};
	});