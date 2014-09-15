'use strict';
(function(){

  angular
  .module('stageApp')
  .config( admin );

  admin.$inject = ['$stateProvider'];
  function admin($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/routes/admin/admin.html',
        controller: 'AdminCtrl as vm',
        resolve: {
          resolvedUsers: resolvedUsers
        }
      });
    function resolvedUsers(UserModel){
      return UserModel.getList()
        .then(function (data){
          console.log('resolved', data);
          return data;
        });
    }
  }
}).call(this);