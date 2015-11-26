(function () {
    angular.module('app.print-preview.module').directive('cmModal', modalPreview);

    /* @ngInject */
    function modalPreview() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'modal-preview.html'
        }
    }
}());
