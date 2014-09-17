'use strict'
angular
  .module('customBackground', [])
  .directive 'customBackground', () ->
    return {
      restrict: "A"
      controller: [
        '$scope', '$element', '$location'
        ($scope, $element, $location) ->
          path = ->
            return $location.path()

          addBg = (path) ->
            # remove all the classes
            $element.removeClass('body-home body-special body-tasks body-lock')

            # add certain class based on path
            switch path
                when '/' then $element.addClass('body-home')
                when '/404', '/pages/500', '/pages/signin', '/pages/signup' then $element.addClass('body-special')
                when '/pages/lock-screen' then $element.addClass('body-special body-lock')
                when '/tasks' then $element.addClass('body-tasks')

          addBg( $location.path() )

          $scope.$watch(path, (newVal, oldVal) ->
            if newVal is oldVal
              return
            addBg($location.path())
          )
      ]
    }
