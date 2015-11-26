(function () {
    angular.module('app.drop-order.module').directive('cmLines', linesDirective);

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
