(function (){
    angular.module('app')
        .controller('productionsLabelCtrl', productionsLabelCtrl);

    /* @ngInject */
    function productionsLabelCtrl($scope, $rootScope, $http, dataservices, eventServices) {
        var vm = this;
        vm.getImage = getImage;

        //////////////
        //set id order item
        function getImage(id) {

        }

    }

}());