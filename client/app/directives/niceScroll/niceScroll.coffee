'use strict'
angular
  .module('niceScroll', [])
  .directive('niceScroll', [ ->
    return {
      restrict: 'A'
      link: (scope, ele, attrs) ->
        console.log 'nice'
        ele.niceScroll(
          cursorcolor: "#31C0BE",
          cursorborder: "0",
          cursorborderradius: "0",
          cursorwidth: "3px"
        )
    }
  ])
