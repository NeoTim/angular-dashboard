'use strict'

angular
  .module 'gulpApp'
  .config ($stateProvider) ->
    $stateProvider
      .state 'main',
        url: '/'
        templateUrl: 'app/routes/main/main.html'
        controller: 'MainCtrl as vm'