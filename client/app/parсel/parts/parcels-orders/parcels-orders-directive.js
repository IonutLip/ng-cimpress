(function () {
    angular.module('app').directive('parcelsOrders', ordersDirective);

    /* @ngInject */
    function ordersDirective() {
        return {
            restrict: "E",
            templateUrl: 'parcels-orders.html',
            scope:true
        }
    }
}());
