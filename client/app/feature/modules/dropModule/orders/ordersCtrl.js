(function (){
    angular.module('app')
        .controller('ordersCtrl', ordersCtrl);

    /* @ngInject */
    function ordersCtrl($scope, $rootScope, dataservices, eventServices) {
        var vm = this;
        function fnSuccessOrders(data){
            vm.orders = data.data;
        }
        dataservices.getOrders().then(fnSuccessOrders);

        eventServices.subDropSuccess(function(){

        });

        vm.moved = function(order, index){
            vm.orders.splice(index,1);
            eventServices.pubOnDrop();
        }

        vm.dragend = function(){
        }

    }

}());