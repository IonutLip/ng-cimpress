(function () {
    angular.module('app')
        .controller('linesCtrl', linesCtrl);

    /* @ngInject */
    function linesCtrl($scope, $rootScope, dataservices, eventServices) {
        //var vm = this;
        //function fnSuccess(data) {
        //    vm.printers = data.data.printers;
        //}
        //dataservices.getPrinters().then(fnSuccess);
    }

}());