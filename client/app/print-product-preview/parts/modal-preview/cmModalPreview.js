(function () {
    angular.module('app.print-preview.module').directive('cmModal', modalPreview);

    /* @ngInject */
    function modalPreview() {
        return {
            restrict: "E",
            templateUrl: 'modal-preview.html'
        }
    }
}());
