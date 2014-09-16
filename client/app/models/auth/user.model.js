'use-strict';
(function(){
  angular
    .module('stageApp')
    .factory('UserModel', UserModel);

  UserModel.$inject = ['Restangular'];
  function UserModel(Restangular){
    return Restangular.service('users');
  }

}).call(this);