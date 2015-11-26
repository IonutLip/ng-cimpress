(function () {
    angular.module('app').directive('printer', printerDirective);

    /* @ngInject */
    function printerDirective() {
        var directive = {
            restrict: "E",
            templateUrl: 'printer.html',
            scope:true
            //, controller:"itemsCtrl"
        };
        return directive;

    }
}());
