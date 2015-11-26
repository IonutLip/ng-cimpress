(function () {
    angular.module('app').directive('error', errorDirective);

    /* @ngInject */
    function errorDirective($rootScope) {
        return {
            restrict: "E",
            template: '<div ng-show="isError" class="alert-danger alert">Error</div>',
            link: function (scope) {
                $rootScope.$on('errorEvent', function () {
                    scope.isError = false;
                });
            }
        }
    }
}());
