(function () {
    angular.module('app.parcel.module').directive('cmParcelsOrders', ordersDirective);

    /* @ngInject */
    function ordersDirective() {
        return {
            restrict: "E",
            templateUrl: 'parcels-orders.html',
            scope:true
        }
    }
}());
