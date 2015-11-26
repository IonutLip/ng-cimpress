(function () {
    angular.module('app.drop-order.module').directive('cmPrinter', printerDirective);

    /* @ngInject */
    function printerDirective() {
        var directive = {
            restrict: "E",
            replace: true,
            templateUrl: 'printer.html',
            scope:true
            //, controller:"itemsCtrl"
        };
        return directive;

    }
}());
