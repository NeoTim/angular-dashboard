'use strict';
(function(){

  angular
    .module('workApp')
    .controller('LockCtrl', LockCtrl)

    LockCtrl.$inject = ['$scope', 'Auth', '$location'];

    function LockCtrl($scope, Auth, $location) {
      var vm = this;
      vm.user = {};
      vm.errors = {};

      vm.login = login;
      vm.loginOauth = loginOauth;

      function login(form) {
        vm.submitted = true;

        if(form.$valid) {
          Auth.login({
            email: vm.user.email,
            password: vm.user.password
          })
          .then( function() {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            vm.errors.other = err.message;
          });
        }
      }
  
    };

}).call(this);