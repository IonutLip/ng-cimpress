(function () {
    angular.module('app').directive('printer', printerDirective);

    /* @ngInject */
    function printerDirective($rootScope, dataservices, eventServices) {
        return {
            restrict: "E",
            templateUrl: 'templates/printer.html',
            controller: 'printerCtrl as vm',
            transclude: true,
            scope: true
        }
    }
}());
