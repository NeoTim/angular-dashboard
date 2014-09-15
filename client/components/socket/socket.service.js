/* global io */
'use strict';
(function(){

  var socket = function (socketFactory, BuildSocket) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });
    var newSocket = BuildSocket
    newSocket.register(socket);
    console.log(newSocket);
    return newSocket
  }

  socket.$inject = ['socketFactory', 'BuildSocket'];
  angular
    .module('stageApp')
    .factory('socket', socket);

}).call(this);

