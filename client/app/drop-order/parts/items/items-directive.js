(function () {
    angular.module('app').directive('items', itemsDirective);

    /* @ngInject */
    function itemsDirective() {
        var directive = {
            restrict: "E",
            templateUrl: 'items.html',
            scope:true,
            //controller:"itemsCtrl as vm",
            link:linkFn
        };
        return directive;

        function linkFn(scope, element, attrs) {



        }
    }
}());
