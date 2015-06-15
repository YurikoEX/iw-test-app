'use strict';

angular.module('publicApp').factory('socket', function (socketFactory, $rootScope) {
  var socket = socketFactory();
  socket.on('comm:foobar-service:inform:foobar-worker:update',function(data){
    $rootScope.$broadcast('comm:foobar-service:inform:foobar-worker:update',data);
  });
  return socket;
});
