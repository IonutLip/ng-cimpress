(function(){
    angular.module('app.drop-order.module')
        .controller('dropOrderCtrl', dropOrderCtrl);

    /* @ngInject */
    function dropOrderCtrl($scope, $rootScope, $templateCache , dataservices, eventServices) {
        var vm = this;

        //ITEMS
        function fnSuccessOrders(data){
            vm.ordersItems = data.data;
        }
        dataservices.getOrders().then(fnSuccessOrders);

        eventServices.onReprintOrder(function(order){
            vm.ordersItems.push(order);
        });

        vm.moved = function(order, index){
            vm.ordersItems.splice(index,1);
            eventServices.pubOnDrop();
        };

        //PRINTERS
        // LINES
        function fnSuccess(data) {
            vm.printers = data.data.printers;
        }
        dataservices.getPrinters().then(fnSuccess);


        //  PRINTER
        dataservices.getItems().then(function(response){
            vm.ordersPrinter = response.data;
        });


    }
})();