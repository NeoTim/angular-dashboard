'use strict'
angular
  .module('toggleMinNav', [])
  .directive('toggleMinNav', [
    '$rootScope'
    ($rootScope) ->
      return {
        restrict: 'A'
        link: (scope, ele, attrs) ->
          app = $('#app')
          $window = $(window)
          # nav = $('#nav ul') # failt to get it
          $nav = $('#nav-container')
          $content = $('#content')
          # console.log($nav)

          ele.on('click', (e) ->
            if app.hasClass('nav-min')
              app.removeClass('nav-min')
            else
              app.addClass('nav-min')
              $rootScope.$broadcast('minNav:enabled')

            e.preventDefault()
          )

          # removeClass('nav-min') when size < $screen-sm
          Timer = undefined
          updateClass = ->
            width = $window.width()
            # console.log(width)
            if width < 768 then app.removeClass('nav-min')
          $window.resize( () ->
            clearTimeout(t)
            t = setTimeout(updateClass, 300)
          )
      }
  ])