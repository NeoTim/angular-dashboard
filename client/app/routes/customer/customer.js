'use strict';
(function(){
  var Customer = function ($stateProvider) {
    $stateProvider
      .state('customer', {
        url: '/customers',
        templateUrl: 'app/routes/customer/customer.html',
        controller: 'CustomerCtrl as vm',
        resolve: {
          resolvedCustomer: resolvedCustomer
        }
      });

    //////////////

    function resolvedCustomer(Customer){
      return Customer.getList()
        .then(function (data){
          return data;
        });


    }
  };
  Customer
    .$inject = ['$stateProvider'];
  angular
    .module('stageApp')
    .config( Customer );
}).call(this);
