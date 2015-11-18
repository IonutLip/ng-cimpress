(function (){
    angular.module('app')
        .controller('printerCtrl', printerCtrl);

    /* @ngInject */
    function printerCtrl ($scope, $route, $location, $rootScope, dataservices, eventServices){
        var vm = this;
        vm.isShowPrinter = false;

        $rootScope.$on('showPrinter', function () {
            dataservices.getItems().then(function(response){
                vm.ordersPrinter = response.data;
                vm.isShowPrinter = !vm.isShowPrinter;
            });

        });
        vm.moved = function(order){
        }

        vm.initSortable = function(){
        };

        eventServices.subDropSuccess(function(){

        });

        vm.Preview = function(order){
            order.imageName = 'phone';
            eventServices.pubOpenModalWindow(order);
        };

        vm.RePrint = function(){

        }

    }

}());