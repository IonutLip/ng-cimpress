(function () {
    angular.module('app.parcel.module').directive('cmParcelsOrders', ordersDirective);

    /* @ngInject */
    function ordersDirective() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'parcels-orders.html',
            scope:true
        }
    }
}());
