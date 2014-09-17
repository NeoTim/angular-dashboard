'use strict'
angular
  .module('goBack', [])
  .directive 'goBack', ()->
    return {
      restrict: 'A',
      controller: [
        '$scope', '$element', '$window',
        ($scope, $element, $window)->
          return $element.on 'click', ()->
            return $window.history.back()

      ]
    }