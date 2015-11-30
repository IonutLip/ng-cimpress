(function () {
    angular.module('app.drop-order.module').directive('cmItemsHeader', cmItemsHeader);

    /* @ngInject */
    function cmItemsHeader() {
        var templateHTML =
            '<div class="panel-heading">'
                + '<ul class="panel-title">'
                    + '<li ng-repeat="title in titles" class="col-md-{{colNumber}}">'
                      + '{{title}}'
                    + '</li>'
                + '<span class="clearfix"></span>'
                + '</ul>'
            + '</div>';

        var directive = {
            restrict: "E",
            replace: true,
            template: templateHTML,
            link: linkFn,
            scope: {
                'titles': '=',
                'colNumber':'@'
            }
        };

        function linkFn(scope, element, attr) {

        }
        return directive;

    }
}());
