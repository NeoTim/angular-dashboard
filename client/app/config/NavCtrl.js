'use strict';
(function() {
  angular
    .module('workApp')
    .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$scope', 'taskStorage', 'filterFilter'];
    function NavCtrl($scope, taskStorage, filterFilter) {
      var tasks;

      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }

}).call(this);
