'use strict'
angular
  .module('gulpApp')
  .service 'BuildSocket', (socketFactory)->
    @register = (socket, model)=>
      @socket = socket;
      @model = model;

    @syncUpdates = (modelName, collection, cb)=>
      cb = cb || angular.noop
      ###
      #  * Syncs item creation/updates on 'model:save'
      ###
      @socket.on(modelName + ':save', (item)=>
        index = _.findIndex(collection, {_id: item._id});
        oldItem = collection[index] or null
        event = 'created'


        # replace oldItem if it exists
        # otherwise just add item to the collection
        if oldItem
          array.splice(index, 1, item)
          event = 'updated'
        else
          scope = collection.push(item)
          readyScope = collection.call('push', item)
          return cb(event, item, scope)


        cb(event, item, collection);

      )

      ###
      # Syncs removed items on 'model:remove'
      ###
      @socket.on(modelName + ':remove', (item)=>
        event = 'deleted'
        _.remove(collection, {_id: item._id})
        cb(event, item, collection)
      )

    @unsyncUpdates = (modelName)=>
      @socket.removeAllListeners(modelName + ':save')
      @socket.removeAllListeners(modelName + ':remove')
