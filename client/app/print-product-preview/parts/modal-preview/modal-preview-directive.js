(function () {
    angular.module('app').directive('modal', modalPreview);

    /* @ngInject */
    function modalPreview() {
        return {
            restrict: "E",
            templateUrl: 'modal-preview.html'
        }
    }
}());
