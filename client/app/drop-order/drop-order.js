(function () {
    angular.module('app.drop-order.module')
        .controller('DropOrder', DropOrder);

    /* @ngInject */
    function DropOrder($scope, $rootScope, dataservices) {
        var vm = this;

        //ITEMS
        function fnSuccessOrders(data) {
            vm.orders = data.data;
        }
        dataservices.getOrders().then(fnSuccessOrders);

        vm.dataHeaderItems = [
            'Orders',
            'Items'
        ];
        vm.titleLinesPrinter = [
            'Orders'
        ];

        vm.movedDrop = function (order, index) {
            vm.orders.splice(index, 1);
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