(function () {
    angular.module('app.print-preview.module')
        .controller('PrintProductPreview', PrintProductPreview);

    /* @ngInject */
    function PrintProductPreview($scope, $rootScope, dataservices, eventServices, $uibModal) {
        var vm = this;

        function fnSuccessOrders(data) {
            vm.ordersPrinter = data.data;
        }

        dataservices.getOrders().then(fnSuccessOrders);

        vm.openModal = openModal;
        vm.reprintOrder = reprintOrder;

        function reprintOrder(order) {
            eventServices.pubReprintOrder(order);
        }

        function openModal(order) {
            //get items order
            getOrderById(order).then(
                getOrderFnSuccess
            );

            function getOrderFnSuccess(responce) {
                vm.modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modal-preview.html',
                    controller: 'ModalPreview as vm',
                    size: 'lg',
                    resolve: {
                        data: {
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

        }

        function createParcelFailure() {

        }
    }

}());