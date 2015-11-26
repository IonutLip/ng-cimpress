(function () {
    angular.module('app.print-preview.module')
        .directive('cmPreviewOrders', ordersPreviewDirective);

    /* @ngInject */
    function ordersPreviewDirective() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'preview-orders.html'
        }
    }
}());
