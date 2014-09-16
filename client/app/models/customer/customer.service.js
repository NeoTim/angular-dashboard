'use strict';
(function(){
  angular
    .module('stageApp')
    .factory('CustomerProvider', CustomerProvider)
    .factory('Customer', Customer);
  
  Customer
    .$inject = ['CustomerProvider'];
  CustomerProvider
    .$inject = ['Restangular'];
  

  
  function CustomerProvider(Restangular){
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://localhost:3000/api');
      });
   };
   
  function Customer(customerProvider) {
    
      return customerProvider.service('customers');
    
  };

}).call(this);
