(function () {
    angular.module('app').directive('lines', linesDirective);

    /* @ngInject */
    function linesDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'lines.html',
            scope:true
        };
        return directive;

    }

}());
