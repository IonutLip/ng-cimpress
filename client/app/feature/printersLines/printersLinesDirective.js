(function () {
    angular.module('app').directive('printers', printersDirective);

    /* @ngInject */
    function printersDirective() {
        return {
            restrict: 'E',
            templateUrl: 'templates/printers.html',
            controller: 'printersCtrl as vm',
            transclude: true,
            scope: true
        }
    }

}());
