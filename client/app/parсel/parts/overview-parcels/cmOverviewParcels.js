(function () {
    angular.module('app.parcel.module').directive('cmOverviewParcels', overviewDirective);

    /* @ngInject */
    function overviewDirective() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'overview-parcels.html',
            scope:true
        }
    }
}());
