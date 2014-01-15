angular.module('lanvoteServices', ['ngResource']).
	factory('Rooms', function($resource) {
		return $resource('/list'
              , {}, {
			//// Use this method for getting a list of polls
			query: { method: 'GET', params: { roomID: ''}, isArray:true }	}
	)
	}).
    	factory('Room', function($resource) {
		return $resource('/room'
              , {}, {
			//// Use this method for getting a list of polls
			query: { method: 'GET', params: { roomID: ''}, isArray:true }	}
	)
	}).
	factory('socket', function($rootScope) {
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
