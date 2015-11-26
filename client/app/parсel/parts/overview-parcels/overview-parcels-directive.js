(function () {
    angular.module('app').directive('overviewParcels', overviewDirective);

    /* @ngInject */
    function overviewDirective() {
        return {
            restrict: "E",
            templateUrl: 'overview-parcels.html',
            scope:true
        }
    }
}());
