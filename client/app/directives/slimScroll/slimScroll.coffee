'use strict'
angular
  .module('slimScroll', [])
  .directive 'slimScroll', ()->
    return {
      restrict: 'A',
      link: (scope, ele, attrs)->
        return ele.slimScroll({
          height: attrs.scrollHeight or '100%'
        });
    }
