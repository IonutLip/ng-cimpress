(function () {
    angular.module('app.print-preview.module')
        .controller('ModalPreview', ModalPreview);

    /* @ngInject */
    function ModalPreview($scope, $rootScope, $http, dataservices, eventServices, $uibModalInstance, data) {
        var vm = this;

        vm.getLabels = getLabels;
        vm.getImg = getImg;
        vm.sendOnPrint = sendOnPrint;
        vm.cancel = cancelWindow;

        vm.orderId = data.id;
        getImg(vm.orderId);
        getLabels(vm.orderId);


        ///////////
        function cancelWindow() {
            $uibModalInstance.dismiss('cancel')
        }

        function sendOnPrint(itemId) {
            $uibModalInstance.close();
        }

        function getImg(itemId) {

        }

        function getLabels(itemId) {
            //call on server returns array labels
            vm.labels = [
                {'name': "label 1"},
                {'name': "label 3333"},
                {'name': "label 1231231"}
            ];
        }

    }

}());