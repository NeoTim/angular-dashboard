/* global io */
'use strict';
(function(){

  var CustomerSocket = function (socketFactory, BuildSocket) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('http://localhost:3000', {
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

  CustomerSocket.$inject = ['socketFactory', 'BuildSocket'];
  angular
    .module('stageApp')
    .factory('CustomerSocket', CustomerSocket);

}).call(this);

