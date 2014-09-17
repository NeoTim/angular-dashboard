'use strict'
angular
  .module('imgHolder', [])
  .directive 'imgHolder', ()->
    return {
      restrict: 'A',
      link: (scope, ele, attrs)->
        return Holder.run({
          images: ele[0]
        });
    }
