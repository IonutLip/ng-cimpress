/**
 * Created by o.syrbu on 10.11.2015.
 */
(function () {
    angular.module('app').directive('navBar', navBar);

    /* @ngInject */
    function navBar($location, dataservices) {
        return {
            restrict: "E",
            templateUrl: 'nav-bar.html',

            link: function (scope, iElement, iAttrs) {
                function fnSuccess(data){
                    scope.panels = data.data.panels;
                }
                dataservices.getPanels().then(fnSuccess);

                scope.isActive = function (viewLocation) {
                    var active = ('/'+viewLocation === $location.path());
                    return active;
                };
            }
        }
    }
}());
