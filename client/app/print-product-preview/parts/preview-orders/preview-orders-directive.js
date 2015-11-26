(function () {
    angular.module('app.print-product-preview.module')
        .directive('previewOrders', ordersPreviewDirective);

    /* @ngInject */
    function ordersPreviewDirective() {
        return {
            restrict: "E",
            templateUrl: 'preview-orders.html'
        }
    }
}());
