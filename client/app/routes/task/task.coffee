'use strict'
angular
  .module('gulpApp')
  .config ($stateProvider)->
    $stateProvider
      .state 'task', {
        url: '/tasks',
        templateUrl: 'app/routes/task/task.html',
        controller: 'TaskCtrl as vm'
      }
