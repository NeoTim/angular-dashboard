'use strict';
(function() {
  angular
    .module('niceScroll', [])
    .directive('niceScroll', niceScroll);
    function niceScroll() {
      return {
        restrict: 'A',
        link: link
      };

      //////////////////////////////

      function link(scope, ele, attrs) {
        console.log('nice')
        ele.niceScroll({
          cursorcolor: "#31C0BE",
          cursorborder: "0",
          cursorborderradius: "0",
          cursorwidth: "3px"
        })
      }
    }

}).call(this);