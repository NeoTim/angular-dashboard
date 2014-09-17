'use strict';
(function(){

  angular
    .module('workApp')
    .factory('Thing', Thing);
    Thing.$inject = ['Restangular'];

    function Thing(Restangular) {
      return Restangular.service('things');
    };

}).call(this);
