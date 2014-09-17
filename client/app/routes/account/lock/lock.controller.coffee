'use strict'

angular.module 'gulpApp'
.controller 'LockCtrl', ($scope, Auth, $location) ->
  @user = {}
  @errors = {}
  @login = (form) =>
    @submitted = true

    if form.$valid
      # Logged in, redirect to home
      Auth.login
        email: @user.email
        password: @user.password

      .then ->
        $location.path '/'

      .catch (err) ->
        @errors.other = err.message


  return
