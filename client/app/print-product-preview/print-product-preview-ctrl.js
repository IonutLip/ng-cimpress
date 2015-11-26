(function (){
    angular.module('app')
        .controller('printProductPreviewCtrl', printProductPreviewCtrl);

    /* @ngInject */
    function printProductPreviewCtrl($scope, $rootScope, dataservices, eventServices, $uibModal) {
        var vm = this;

        function fnSuccessOrders(data){
            vm.ordersPrinter = data.data;
        }
        dataservices.getOrders().then(fnSuccessOrders);

        vm.openModal = openModal;
        vm.reprintOrder = reprintOrder;

        function reprintOrder(order, index) {
            eventServices.pubReprintOrder(order, index);
        }

        function openModal(order) {
            //get items order
            getOrderById(order).then(
                getOrderFnSuccess
            );

            function getOrderFnSuccess(responce){
                vm.modalInstance = $uibModal.open({
                    animation:true,
                    templateUrl: 'modal-preview.html',
                    controller: 'modalPreviewCtrl as vm',
                    size:'lg',
                    resolve: {
                        data:{
                            items: responce.data,
                            name: order.orderName
                        }
                    }
                });
                vm.modalInstance.result.then(createParcelSuccess, createParcelFailure);
            }
        }

        function getOrderById(order) {
            return dataservices.getOrder2();
        }

        function createParcelSuccess(order) {
            debugger
        }

        function createParcelFailure() {
            debugger
        }
    }

}());