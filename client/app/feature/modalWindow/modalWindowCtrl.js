(function (){
    angular.module('app')
        .controller('modalWindowCtrl', modalWindowCtrl);

    /* @ngInject */
    function modalWindowCtrl($scope, $rootScope, $http, dataservices, eventServices) {
        var vm = this;
        vm.isShowModal = false;

        vm.labels = [
            {'name':"label 1"},
            {'name':"label 3333"},
            {'name':"label 1231231"}
        ];

        vm.gettingImage = function (responce) {
        }

        vm.sendOnPrint = function () {

        }

        eventServices.subModalWindow(function(order){

           //$http.get('/dest/content/img/' + order.imageName +'.jpg')
           //    .then(vm.gettingImage)
        })

    }

}());