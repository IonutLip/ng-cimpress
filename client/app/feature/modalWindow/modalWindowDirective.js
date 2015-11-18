(function () {
    angular.module('app').directive('modal', modalWindow);

    /* @ngInject */
    function modalWindow() {
        return {
            restrict: "E",
            templateUrl: 'templates/modalWindow.html',
            controller:'modalWindowCtrl as vm',
            scope: true
        }
    }
}());
