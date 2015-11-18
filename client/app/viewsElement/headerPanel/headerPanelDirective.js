/**
 * Created by o.syrbu on 10.11.2015.
 */
(function () {
    angular.module('app').directive('headerPanel', headerPanelDirective);

    /* @ngInject */
    function headerPanelDirective($location, dataservices) {
        return {
            restrict: "E",
            templateUrl: 'templates/headerPanel.html',
            link: function (scope, iElement, iAttrs) {
                function fnSuccess(data){
                    scope.panels = data.data.panels;
                }
                dataservices.getPanels().then(fnSuccess);

                scope.isActive = function (viewLocation) {
                    var active = ('/'+viewLocation.link === $location.path());
                    return active;
                };
            }
        }
    }
}());
