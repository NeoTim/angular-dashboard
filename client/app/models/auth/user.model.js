'use-strict';
(function(){
  var UserModel = function(Restangular){
    return Restangular.service('users');
  }
  UserModel.$inject = ['Restangular'];
  angular
    .module('stageApp')
    .factory('UserModel', UserModel);
}).call(this);