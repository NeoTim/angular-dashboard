'use strict'

angular.module 'gulpApp'
.controller 'SignupCtrl', ($scope, Auth, $location) ->
  $scope.errors = {}
  @user = {}
  @register = (form) =>
    @submitted = true

    if form.$valid
      # Account created, redirect to home
      Auth.createUser
        name: @user.name
        email: @user.email
        password: @user.password

      .then ->
        $location.path '/'

      .catch (err) ->
        err = err.data
        $scope.errors = {}

        # Update validity of form fields that match the mongoose errors
        angular.forEach err.errors, (error, field) ->
          form[field].$setValidity 'mongoose', false
          $scope.errors[field] = error.message



  return
