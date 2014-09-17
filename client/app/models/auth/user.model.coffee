'use-strict'
angular
  .module('gulpApp')
  .factory 'UserModel', (Restangular)->
      return Restangular.service('users');
