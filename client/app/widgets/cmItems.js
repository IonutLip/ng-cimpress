(function () {
    angular.module('app.drop-order.module').directive('cmItems', cmItems);

    /* @ngInject */
    function cmItems() {

        var directive = {
            restrict: "E",
            replace: true,
            templateUrl: 'items.html',
            compile: function compile(tElement, iAttrs) {
                return {
                    post: function (scope, iElement, iAttrs) {
                    }
                };

            },
            scope: {
                'vm': '=',
                'data': '=',
                'colNumber': '@'
            }
        };
        return directive;
    }
}());
