'use strict'

angular
  .module 'gulpApp'
  .controller 'MainCtrl', ($scope, Thing, socket) ->

    @awesomeThings = []


    Thing
      .getList()
      .then (data)=>
        @awesomeThings = data
        socket.syncUpdates 'things', $scope.awesomeThings

  
    @addThing = =>
      return if $scope.newThing is ''
      @awesomeThings.post({name: @newThing})
      @newThing = ''

    @deleteThing = (thing) =>
      @awesomeThings.one(thing._id).remove()

    $scope.$on '$destroy', ->
      socket.unsyncUpdates 'things'

    return
