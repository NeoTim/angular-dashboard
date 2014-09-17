'use strict';
(function(){

  angular
    .module('workApp')
    .controller('SignupCtrl', SignupCtrl)

    SignupCtrl.$inject = ['$scope', 'Auth', '$location'];

    function SignupCtrl($scope, Auth, $location) {
      var vm = this;
      $scope.errors = {};
      vm.user = {};
      vm.register = register;
      vm.loginOauth = loginOauth;

      //////////////

      function register(form) {
        vm.submitted = true;

        if(form.$valid) {
          Auth.createUser({
            name: vm.user.name,
            email: vm.user.email,
            password: vm.user.password
          })
          .then( function() {
            // Account created, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
        }
      };
  
    }

}).call(this);