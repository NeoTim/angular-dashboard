'use strict'

angular
  .module('gulpApp')
  .controller 'NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter',
    ($scope, taskStorage, filterFilter)->

      tasks = $scope.tasks = taskStorage.get()
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length
      return $scope.$on('taskRemaining:changed', (event, count)->
        return $scope.taskRemainingCount = count
      )
  ]
