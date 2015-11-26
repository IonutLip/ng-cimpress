/**
 * Created by o.syrbu on 20.11.2015.
 */
(function (){
    angular.module('app.core',[
        'ui.router',
        'ui.bootstrap',
        'dndLists'
    ])
}());
(function () {
    angular.module('app.drop-order.module', []);
}());
(function () {
    angular.module('app.parcel.module', []);
}());
(function () {
    angular.module('app.print-product-preview.module', []);
}());
(function () {
    angular.module('app.productions-label.module', []);
}());
(function () {
    angular.module('app',
        [
            'app.core',
            'app.drop-order.module',
            'app.parcel.module',
            'app.print-product-preview.module',
            'app.productions-label.module'
        ])
        .config(
            /* @ngInject */
            ["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
                $stateProvider

                    .state('Print-product-preview', {
                        abstract: true,
                        url: "/Print-product-preview",
                        controller: "printProductPreviewCtrl as vm",
                        template: "<ui-view/>"
                    })
                    .state('Print-product-preview.orders', {
                        url: "/orders",
                        template: "<preview-orders></preview-orders>"
                    })

                    .state('Parcel', {
                        abstract: true,
                        url: "/Parcel",
                        controller: "parcelCtrl as vm",
                        template: "<ui-view/>"
                    })
                    .state('Parcel.create', {
                        url: "/orders",
                        template: "<parcels-orders></parcels-orders>"
                    })
                    .state('Parcel.overview', {
                        url: "/overview",
                        template: "<overview-parcels></overview-parcels>"
                    })

                    .state('dropOrder', {
                        abstract: true,
                        url: "/Drop-order",
                        controller: "dropOrderCtrl as vm",
                        templateUrl: "drop-order.html"
                    })
                    .state('dropOrder.printers', {
                        url: "/printers",
                        template: "<lines></lines>"
                    })
                    .state('dropOrder.printer', {
                        url: "/printers/:id",
                        templateUrl: "printer.html"
                    });


                $urlRouterProvider
                    .otherwise('/Drop-order/printers/');

            }]
        );
})();

(function () {
    angular.module('app').factory('dataservices', getData);

    /* @ngInject */
    function getData($http) {

        function getOrder1() {
            return $http.get('/api/order1');
        }
        function getOrder2() {
            return $http.get('/api/order2');
        }


        function getOrders() {
            return $http.get('/api/orders');
        }

        function getPrinters() {
            return $http.get('/api/printers');
        }

        function getPanels() {
            return $http.get('/api/panels');
        }

        function getItems() {
            return $http.get('/api/items');
        }

        function getImage(order) {
            return $http.get('/dest/content/img/' + order.imageName + '.jpg');
        }

        return {
            getOrders: getOrders,
            getOrder1: getOrder1,
            getOrder2: getOrder2,

            getPrinters: getPrinters,
            getPanels: getPanels,
            getImage: getImage,
            getItems: getItems
        }

    }
    getData.$inject = ["$http"];

})();

angular.module('app').
    service('eventServices', ["$rootScope", function ($rootScope) {

    var DROP_EVENT = "dropEvent",
        OPEN_MODAL_WINDOW = 'openModalWindow',
        HIDE_PRINTERS = 'hidePrinters',
        SHOW_PRINTER = 'showPrinter',
        REPRINT = 'reprintEvent';

    function onHidePrinters(handler){
        $rootScope.$on(HIDE_PRINTERS, function(){
            handler()
        })
    }
    function pubHidePrinters(event){
        $rootScope.$broadcast(HIDE_PRINTERS, event);
    }

    function onDropSuccess(handler){
        $rootScope.$on(DROP_EVENT, function(){
            handler()
        })
    }
    function pubOnDrop(event){
        $rootScope.$broadcast(DROP_EVENT, event);
    }

    function onOpenModalWindow(handler) {
        $rootScope.$on(OPEN_MODAL_WINDOW, function(event, order){
            handler(order)
        })
    }
    function pubOpenModalWindow(order) {
        $rootScope.$broadcast(OPEN_MODAL_WINDOW, order);
    }

    function onReprintOrder(handler) {
        $rootScope.$on(REPRINT, function(event, order, $index){
            handler(order, $index)
        })
    }
    function pubReprintOrder(order, $index) {
        $rootScope.$broadcast(REPRINT, order, $index);
    }

    function onShowPrinter(handler){
        $rootScope.$on(SHOW_PRINTER, function(){
            handler()
        })
    }
    function pubShowPrinter(event){
        $rootScope.$broadcast(SHOW_PRINTER, event);
    }

    return {
        onShowPrinter: onShowPrinter,
        pubShowPrinter: pubShowPrinter,

        onHidePrinters: onHidePrinters,
        pubHidePrinters: pubHidePrinters,

        onReprintOrder: onReprintOrder,
        pubReprintOrder: pubReprintOrder,

        pubOpenModalWindow: pubOpenModalWindow,
        onOpenModalWindow: onOpenModalWindow,

        onDropSuccess: onDropSuccess,
        pubOnDrop: pubOnDrop
    };
}]);
(function () {
    angular.module('app').directive('error', errorDirective);

    /* @ngInject */
    function errorDirective($rootScope) {
        return {
            restrict: "E",
            template: '<div ng-show="isError" class="alert-danger alert">Error</div>',
            link: function (scope) {
                $rootScope.$on('errorEvent', function () {
                    scope.isError = false;
                });
            }
        }
    }
    errorDirective.$inject = ["$rootScope"];
}());

(function(){
    angular.module('app.drop-order.module')
        .controller('dropOrderCtrl', dropOrderCtrl);

    /* @ngInject */
    function dropOrderCtrl($scope, $rootScope, $templateCache , dataservices, eventServices) {
        var vm = this;

        //ITEMS
        function fnSuccessOrders(data){
            vm.ordersItems = data.data;
        }
        dataservices.getOrders().then(fnSuccessOrders);

        eventServices.onReprintOrder(function(order){
            vm.ordersItems.push(order);
        });

        vm.moved = function(order, index){
            vm.ordersItems.splice(index,1);
            eventServices.pubOnDrop();
        };

        //PRINTERS
        // LINES
        function fnSuccess(data) {
            vm.printers = data.data.printers;
        }
        dataservices.getPrinters().then(fnSuccess);


        //  PRINTER
        dataservices.getItems().then(function(response){
            vm.ordersPrinter = response.data;
        });


    }
    dropOrderCtrl.$inject = ["$scope", "$rootScope", "$templateCache", "dataservices", "eventServices"];
})();
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
    navBar.$inject = ["$location", "dataservices"];
}());

(function () {
    angular.module('app')
        .controller('parcelCtrl', parcelCtrl);

    /* @ngInject */
    function parcelCtrl($scope, $rootScope, dataservices, $uibModal) {
        var vm = this;

        dataservices.getOrders().then(function (responce) {
            vm.ordersParcels = responce.data;
            vm.overviewParcels = responce.data;
        });

        vm.openModal = openModal;
        vm.openParcel = openParcel;
        vm.printParcels = printParcels;
        vm.shippedParcel = shippedParcel;

        function shippedParcel() {

        }
        function printParcels() {
          
        }
        function openParcel() {
          
        }

        function openModal(order) {
            //get items order
            getOrderById(order).then(
                getOrderFnSuccess
            );
            function getOrderFnSuccess(responce){
                vm.modalInstance = $uibModal.open({
                    animation:true,
                    templateUrl: 'modal-parcel.html',
                    controller: 'modalCtrl as vm',
                    size:'lg',
                    resolve: {
                        data:{
                            items: responce.data,
                            name: order.orderName
                        }
                    }
                });

                vm.modalInstance.result.then(createParcelSuccess, createParcelFailure);
            }

        }

        function getOrderById(order) {
            return dataservices.getOrder1();
        }

        function createParcelSuccess(order) {

        }

        function createParcelFailure() {

        }


    }
    parcelCtrl.$inject = ["$scope", "$rootScope", "dataservices", "$uibModal"];

}());
(function (){
    angular.module('app')
        .controller('printProductPreviewCtrl', printProductPreviewCtrl);

    /* @ngInject */
    function printProductPreviewCtrl($scope, $rootScope, dataservices, eventServices, $uibModal) {
        var vm = this;

        function fnSuccessOrders(data){
            vm.ordersPrinter = data.data;
        }
        dataservices.getOrders().then(fnSuccessOrders);

        vm.openModal = openModal;
        vm.reprintOrder = reprintOrder;

        function reprintOrder(order, index) {
            eventServices.pubReprintOrder(order, index);
        }

        function openModal(order) {
            //get items order
            getOrderById(order).then(
                getOrderFnSuccess
            );

            function getOrderFnSuccess(responce){
                vm.modalInstance = $uibModal.open({
                    animation:true,
                    templateUrl: 'modal-preview.html',
                    controller: 'modalPreviewCtrl as vm',
                    size:'lg',
                    resolve: {
                        data:{
                            items: responce.data,
                            name: order.orderName
                        }
                    }
                });
                vm.modalInstance.result.then(createParcelSuccess, createParcelFailure);
            }
        }

        function getOrderById(order) {
            return dataservices.getOrder2();
        }

        function createParcelSuccess(order) {
            debugger
        }

        function createParcelFailure() {
            debugger
        }
    }
    printProductPreviewCtrl.$inject = ["$scope", "$rootScope", "dataservices", "eventServices", "$uibModal"];

}());
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
    productionsLabelCtrl.$inject = ["$scope", "$rootScope", "$http", "dataservices", "eventServices"];

}());
(function (){
    angular.module('app')
        .controller('shippingCtrl', shippingCtrl);

    /* @ngInject */
    function shippingCtrl($scope, $rootScope, $http, dataservices, eventServices) {
        var vm = this;

    }
    shippingCtrl.$inject = ["$scope", "$rootScope", "$http", "dataservices", "eventServices"];

}());
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
    itemsCtrl.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app').directive('items', itemsDirective);

    /* @ngInject */
    function itemsDirective() {
        var directive = {
            restrict: "E",
            templateUrl: 'items.html',
            scope:true,
            //controller:"itemsCtrl as vm",
            link:linkFn
        };
        return directive;

        function linkFn(scope, element, attrs) {



        }
    }
}());

(function () {
    angular.module('app')
        .controller('linesCtrl', linesCtrl);

    /* @ngInject */
    function linesCtrl($scope, $rootScope, dataservices, eventServices) {
        //var vm = this;
        //function fnSuccess(data) {
        //    vm.printers = data.data.printers;
        //}
        //dataservices.getPrinters().then(fnSuccess);
    }
    linesCtrl.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app').directive('lines', linesDirective);

    /* @ngInject */
    function linesDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'lines.html',
            scope:true
        };
        return directive;

    }

}());

(function (){
    angular.module('app')
        .controller('printerCtrl', printerCtrl);

    /* @ngInject */
    function printerCtrl ($scope, $rootScope, dataservices, eventServices){
        //var vm = this;
        //dataservices.getItems().then(function(response){
        //    vm.ordersPrinter = response.data;
        //});

    }
    printerCtrl.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app').directive('printer', printerDirective);

    /* @ngInject */
    function printerDirective() {
        var directive = {
            restrict: "E",
            templateUrl: 'printer.html',
            scope:true
            //, controller:"itemsCtrl"
        };
        return directive;

    }
}());

/**
 * Created by o.syrbu on 24.11.2015.
 */
(function () {
    angular.module('app.parcel.module')
        .controller('modalCtrl', modalCtrl);

    /* @ngInject */
    function modalCtrl($scope, $rootScope, dataservices, data, $uibModalInstance) {
        var vm = this;
        vm.modalOrders = data.items;
        vm.orderName = data.name;
        vm.paramsParcel = [
            {name:'Weight'},
            {name:'Space'},
            {name:'Height'},
            {name:'Length'},
            {name:'Width'}
        ];

        vm.cancel = cancelWindow;
        vm.createShippingLabel = createShippingLabel;

        function cancelWindow() {
            $uibModalInstance.close();
        }

        function createShippingLabel(order) {
            $uibModalInstance.close(order);
        }

    }
    modalCtrl.$inject = ["$scope", "$rootScope", "dataservices", "data", "$uibModalInstance"];

}());
(function () {
    angular.module('app').directive('overviewParcels', overviewDirective);

    /* @ngInject */
    function overviewDirective() {
        return {
            restrict: "E",
            templateUrl: 'overview-parcels.html',
            scope:true
        }
    }
}());

(function () {
    angular.module('app').directive('parcelsOrders', ordersDirective);

    /* @ngInject */
    function ordersDirective() {
        return {
            restrict: "E",
            templateUrl: 'parcels-orders.html',
            scope:true
        }
    }
}());

(function (){
    angular.module('app')
        .controller('modalPreviewCtrl', modalPreviewCtrl);

    /* @ngInject */
    function modalPreviewCtrl($scope, $rootScope, $http, dataservices, eventServices, $uibModalInstance, data) {
        var vm = this;

        vm.getLabels = getLabels;
        vm.getImg = getImg;
        vm.sendOnPrint = sendOnPrint;
        vm.cancel = cancelWindow;

        vm.orderId = data.id;
        getImg(vm.orderId);
        getLabels(vm.orderId);


        ///////////
        function cancelWindow() {
            $uibModalInstance.dismiss('cancel')
        }

        function sendOnPrint(itemId) {
            $uibModalInstance.close(order);
            debugger
        }
        function getImg(itemId) {

        }
        function getLabels(itemId) {
            //call on server returns array labels
            vm.labels = [
                {'name':"label 1"},
                {'name':"label 3333"},
                {'name':"label 1231231"}
            ];
        }

    }
    modalPreviewCtrl.$inject = ["$scope", "$rootScope", "$http", "dataservices", "eventServices", "$uibModalInstance", "data"];

}());
(function () {
    angular.module('app').directive('modal', modalPreview);

    /* @ngInject */
    function modalPreview() {
        return {
            restrict: "E",
            templateUrl: 'modal-preview.html'
        }
    }
}());

(function () {
    angular.module('app.print-product-preview.module')
        .directive('previewOrders', ordersPreviewDirective);

    /* @ngInject */
    function ordersPreviewDirective() {
        return {
            restrict: "E",
            templateUrl: 'preview-orders.html'
        }
    }
}());

(function (){
    angular.module('app.print-product-preview.module')
        .controller('OrdersPreviewCtrl', OrdersPreviewCtrl);

    /* @ngInject */
    function OrdersPreviewCtrl($scope, $rootScope, dataservices, eventServices) {
        //var vm = this;
        //function fnSuccessOrders(data){
        //    vm.ordersPrinter = data.data;
        //}
        //dataservices.getOrders().then(fnSuccessOrders);

    }
    OrdersPreviewCtrl.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());