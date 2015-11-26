(function () {
    angular.module('app.drop-order.module').directive('cmLines', linesDirective);

    /* @ngInject */
    function linesDirective() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'lines.html',
            scope:true
        };
        return directive;

    }

}());
