'use strict'
angular
  .module('uiColorSwitch', [])
  .directive('uiColorSwitch', [ ->
    return {
      restrict: 'A'
      link: (scope, ele, attrs) ->
        ele.find('.color-option').on('click', (event)->
          $this = $(this)
          hrefUrl = undefined

          style = $this.data('style')
          if style is 'loulou'
            hrefUrl = 'styles/main.css'
            $('link[href^="styles/main"]').attr('href',hrefUrl)
          else if style
            style = '-' + style
            hrefUrl = 'styles/main' + style + '.css'
            $('link[href^="styles/main"]').attr('href',hrefUrl)
          else
            return false

          event.preventDefault()
        )
    }
  ])