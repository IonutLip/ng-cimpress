(function () {
    angular.module('app.print-preview.module')
        .directive('cmPreviewOrders', ordersPreviewDirective);

    /* @ngInject */
    function ordersPreviewDirective() {
        return {
            restrict: "E",
            templateUrl: 'preview-orders.html'
        }
    }
}());
