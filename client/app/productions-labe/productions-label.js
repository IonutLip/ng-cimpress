(function () {
    angular.module('app.productions-label.module')
        .controller('ProductionsLabel', ProductionsLabel);

    /* @ngInject */
    function ProductionsLabel($scope, $rootScope, $http, dataservices, eventServices) {
        var vm = this;
        vm.getImage = getImage;

        //////////////
        //set id order item
        function getImage(id) {

        }

    }

}());