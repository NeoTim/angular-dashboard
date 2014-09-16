'use strict';
(function(){
  angular
    .module('stageApp')
    .controller('invoiceCtrl', ['$scope', '$window', controller])
    function controller($scope, $window){

        $scope.printInvoice = function(){
            printContents = document.getElementById('invoice').innerHTML;
            originalContents = document.body.innerHTML;
            popupWin = window.open();
            popupWin.document.open()
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
            popupWin.document.close();
        };
    };

}).call(this);


