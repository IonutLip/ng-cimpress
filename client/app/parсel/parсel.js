(function () {
    angular.module('app.parcel.module')
        .controller('Parcel', Parcel);

    /* @ngInject */
    function Parcel($scope, $rootScope, dataservices, $uibModal) {
        var vm = this;

        dataservices.getOrders().then(function (responce) {
            vm.ordersParcels = responce.data;
            vm.overviewParcels = responce.data;
        });

        vm.openModal = openModal;
        vm.openParcel = openParcel;
        vm.printParcels = printParcels;
        vm.shippedParcel = shippedParcel;

        function shippedParcel() {

        }

        function printParcels() {

        }

        function openParcel() {

        }

        function openModal(order) {
            //get items order
            getOrderById(order).then(
                getOrderFnSuccess
            );
            function getOrderFnSuccess(responce) {
                vm.modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modal-parcel.html',
                    controller: 'modalParcel as vm',
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
            return dataservices.getOrder1();
        }

        function createParcelSuccess(order) {

        }

        function createParcelFailure() {

        }


    }

}());