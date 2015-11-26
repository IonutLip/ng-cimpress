(function () {
    angular.module('app.drop-order.module')
        .controller('DropOrder', DropOrder);

    /* @ngInject */
    function DropOrder($scope, $rootScope, $templateCache, dataservices) {
        var vm = this;

        //ITEMS
        function fnSuccessOrders(data) {
            vm.ordersItems = data.data;
        }

        dataservices.getOrders().then(fnSuccessOrders);

        vm.moved = function (order, index) {
            vm.ordersItems.splice(index, 1);
        };

        // LINES
        function fnSuccess(response) {
            vm.printers = response.data.printers;
        }

        dataservices.getPrinters().then(fnSuccess);

        //  PRINTER
        dataservices.getItems().then(function (response) {
            vm.ordersPrinter = response.data;
        });


    }
})();