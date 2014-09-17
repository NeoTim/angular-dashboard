'use strict'

angular.module 'gulpApp'
.factory 'Thing', (Restangular)->
  # Service logic
  # ...
  return Restangular.service 'things'
