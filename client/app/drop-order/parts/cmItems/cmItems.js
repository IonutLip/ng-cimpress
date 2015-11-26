(function () {
    angular.module('app.drop-order.module').directive('cmItems', cmItems);

    /* @ngInject */
    function cmItems() {
        var directive = {
            restrict: "E",
            templateUrl: 'items.html',
            scope:true
        };
        return directive;
    }
}());
