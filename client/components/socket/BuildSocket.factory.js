'use strict';
(function(){

  var BuildSocket = function(socketFactory) {

    this.register = register;
    this.syncUpdates = syncUpdates;
    this.unsyncUpdates = unsyncUpdates;
    ////////////////
    function register(socket, model){
      this.socket = socket;
      this.model = model;
    }

    function syncUpdates(modelName, collection, cb){
      cb = cb || angular.noop;

        /**
         * Syncs item creation/updates on 'model:save'
         */
        this.socket.on(modelName + ':save', function (item) {
          var index = _.findIndex(collection, {_id: item._id});
          var oldItem = collection[index] || null;
          var event = 'created';


          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            var scope = collection.push(item)
            var readyScope = collection.call('push', item);
            return cb(event, item, scope);
          }

          cb(event, item, collection);

        });

        /**
         * Syncs removed items on 'model:remove'
         */
        this.socket.on(modelName + ':remove', function (item) {
          var event = 'deleted';
          _.remove(collection, {_id: item._id});
          cb(event, item, collection);
        });
    }
    function unsyncUpdates(modelName){
      this.socket.removeAllListeners(modelName + ':save');
      this.socket.removeAllListeners(modelName + ':remove');
    }

  };
  BuildSocket
    .inject = ['socketFactory']
  angular
    .module('workApp')
    .service('BuildSocket', BuildSocket);

}).call(this);

