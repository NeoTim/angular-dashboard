'use strict'
angular
  .module('highlightActive', [])
  .directive('highlightActive', [ ->
    return {
      restrict: "A"
      controller: [
        '$scope', '$element', '$attrs', '$location'
        ($scope, $element, $attrs, $location) ->
          links = $element.find('a')
          path = () ->
            return $location.path()

          highlightActive = (links, path) ->
            path = '#' + path

            angular.forEach(links, (link) ->
              $link = angular.element(link)
              $li = $link.parent('li')
              href = $link.attr('href')

              if ($li.hasClass('active'))
                $li.removeClass('active')
              if path.indexOf(href) is 0
                $li.addClass('active')
            )

          highlightActive(links, $location.path())

          $scope.$watch(path, (newVal, oldVal) ->
            if newVal is oldVal
              return
            highlightActive(links, $location.path())
          )
      ]

    }
  ])