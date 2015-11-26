/**
 * Created by o.syrbu on 24.11.2015.
 */
(function () {
    angular.module('app.parcel.module')
        .controller('modalCtrl', modalCtrl);

    /* @ngInject */
    function modalCtrl($scope, $rootScope, dataservices, data, $uibModalInstance) {
        var vm = this;
        vm.modalOrders = data.items;
        vm.orderName = data.name;
        vm.paramsParcel = [
            {name:'Weight'},
            {name:'Space'},
            {name:'Height'},
            {name:'Length'},
            {name:'Width'}
        ];

        vm.cancel = cancelWindow;
        vm.createShippingLabel = createShippingLabel;

        function cancelWindow() {
            $uibModalInstance.close();
        }

        function createShippingLabel(order) {
            $uibModalInstance.close(order);
        }

    }

}());