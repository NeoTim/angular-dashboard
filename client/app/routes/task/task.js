'use strict';
(function(){
  angular
    .module('stageApp')
    .config( Task );

  Task
    .$inject = ['$stateProvider'];
  function Task($stateProvider) {
    $stateProvider
      .state('task', {
        url: '/tasks',
        templateUrl: 'app/routes/task/task.html',
        controller: 'TaskCtrl as vm'
      });
  };

}).call(this);
