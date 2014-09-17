'use strict'
angular
  .module('toggleOffCanvas', [])
  .directive 'toggleOffCanvas', ()->
    return {
      restrict: 'A',
      link: (scope, ele, attrs)->
        return ele.on('click', ()->
          return $('#app').toggleClass('on-canvas')
        )
    }
