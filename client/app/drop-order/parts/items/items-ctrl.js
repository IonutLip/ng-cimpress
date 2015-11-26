(function () {
    angular.module('app')
        .controller('itemsCtrl', itemsCtrl);

    /* @ngInject */
    function itemsCtrl($scope, $rootScope, dataservices, eventServices) {
       // var vm = this;
       // function fnSuccessOrders(data){
       //     vm.ordersItems = data.data;
       // }
       // dataservices.getOrders().then(fnSuccessOrders);
       //
       //eventServices.onReprintOrder(function(order){
       //     vm.ordersItems.push(order);
       // });
       //
       // vm.moved = function(order, index){
       //     vm.ordersItems.splice(index,1);
       //     eventServices.pubOnDrop();
       // };


    }

}());