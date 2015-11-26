/**
 * Created by o.syrbu on 10.11.2015.
 */
(function () {
    angular.module('app').directive('cmNavBar', navBar);

    /* @ngInject */
    function navBar(dataservices) {
        return {
            restrict: "E",
            templateUrl: 'nav-bar.html',

            link: function (scope) {
                function fnSuccess(data){
                    scope.panels = data.data.panels;
                }
                dataservices.getPanels().then(fnSuccess);
            }
        }
    }
}());
