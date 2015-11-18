(function () {
    angular.module('app').directive('orders', ordersDirective);

    /* @ngInject */
    function ordersDirective() {
        return {
            restrict: "E",
            templateUrl: 'templates/orders.html',
            controller: 'ordersCtrl as vm',
            transclude: true,
            scope: true
        }
    }
}());
