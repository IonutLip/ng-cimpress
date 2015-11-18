(function (){
    angular.module('app')
        .controller('printersCtrl', printersCtrl);

    /* @ngInject */
    function printersCtrl($scope, $route, $location, $rootScope, dataservices, eventServices){
        var vm = this;

        function fnSuccess(data){
            vm.printers =  data.data.printers;
        }
        dataservices.getPrinters().then(fnSuccess);


        vm.showPrinter = function(printer){
            $rootScope.$emit('hidePrinters', printer);
        }

        vm.isHidePrinters = false;
        $rootScope.$on('hidePrinters', function (event, printer) {
            vm.isHidePrinters = !vm.isHidePrinters;
            $rootScope.$emit('showPrinter', printer);
        });

    }

}());