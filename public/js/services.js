angular.module('lanvoteServices', ['ngResource']).
	factory('Rooms', function($resource) {
		return $resource('/vote', {
			query: { method: 'GET', isArray:true }	}
	)
	}).
      factory('Vote', function($resource) {
		return $resource('/votelist/:id', {
			query: { method: 'GET',params: { id:'@id'}}	}
	)
	}).
    factory('Results', function($resource) {
		return $resource('/results/:id', {
			query: { method: 'GET', params: { id:'@id'}, isArray:true }	}
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
