'use strict';
(function(){

  var CustomerCtrl = function (resolvedCustomer, $scope,  Customer, CustomerSocket) {
    var vm = this;
    vm.customers = resolvedCustomer;
    CustomerSocket.syncUpdates('customers', vm.customers);
  };
  CustomerCtrl
    .$inject = ['resolvedCustomer', '$scope', 'Customer', 'CustomerSocket'];

  angular
    .module('stageApp')
    .controller('CustomerCtrl', CustomerCtrl);
}).call(this);
