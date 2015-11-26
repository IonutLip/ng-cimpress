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
    angular.module('app.print-preview.module', []);
}());
(function () {
    angular.module('app.productions-label.module', []);
}());
(function () {
    angular.module('app.shipping', []);
}());
(function () {
    angular.module('app',
        [
            'app.core',

            'app.drop-order.module',
            'app.parcel.module',
            'app.print-preview.module',
            'app.productions-label.module'
        ])
        .config(
            /* @ngInject */
            ["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('dropOrder', {
                        abstract: true,
                        url: "/Drop-order",
                        controller: "DropOrder as vm",
                        templateUrl: "drop-order.html"
                    })
                    .state('dropOrder.printers', {
                        url: "/printers",
                        template: "<cm-lines></cm-lines>"
                    })
                    .state('dropOrder.printer', {
                        url: "/printers/:id",
                        template: "<cm-printer></cm-printer>"
                    })

                    .state('Print-product-preview', {
                        abstract: true,
                        url: "/Print-product-preview",
                        controller: "PrintProductPreview as vm",
                        template: "<ui-view/>"
                    })
                        .state('Print-product-preview.orders', {
                            url: "/orders",
                            template: "<cm-preview-orders></cm-preview-orders>"
                        })

                    .state('Parcel', {
                        abstract: true,
                        url: "/Parcel",
                        controller: "Parcel as vm",
                        template: "<ui-view/>"
                    })
                        .state('Parcel.create', {
                            url: "/create",
                            template: "<cm-parcels-orders></cm-parcels-orders>"
                        })
                        .state('Parcel.overview', {
                            url: "/overview",
                            template: "<cm-overview-parcels></cm-overview-parcels>"
                        });

                $urlRouterProvider
                    .otherwise('/Drop-order/printers/');

            }]
        )
        .run([
            '$rootScope','$state',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                return $rootScope.$stateParams = $stateParams;
            }
        ]);
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
        $rootScope.$emit(HIDE_PRINTERS, event);
    }

    function onDropSuccess(handler){
        $rootScope.$on(DROP_EVENT, function(){
            handler()
        })
    }
    function pubOnDrop(event){
        $rootScope.$emit(DROP_EVENT, event);
    }

    function onOpenModalWindow(handler) {
        $rootScope.$on(OPEN_MODAL_WINDOW, function(event, order){
            handler(order)
        })
    }
    function pubOpenModalWindow(order) {
        $rootScope.$emit(OPEN_MODAL_WINDOW, order);
    }

    function onReprintOrder(handler) {
        $rootScope.$on(REPRINT, function(event, order){
            handler(order)
        })
    }
    function pubReprintOrder(order) {
        $rootScope.$emit(REPRINT, order);
    }

    function onShowPrinter(handler){
        $rootScope.$on(SHOW_PRINTER, function(){
            handler()
        })
    }
    function pubShowPrinter(event){
        $rootScope.$emit(SHOW_PRINTER, event);
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
            replace: true,
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

(function () {
    angular.module('app.drop-order.module')
        .controller('DropOrder', DropOrder);

    /* @ngInject */
    function DropOrder($scope, $rootScope, $templateCache, dataservices) {
        var vm = this;

        //ITEMS
        function fnSuccessOrders(data) {
            vm.ordersItems = data.data;
        }

        dataservices.getOrders().then(fnSuccessOrders);

        vm.moved = function (order, index) {
            vm.ordersItems.splice(index, 1);
        };

        // LINES
        function fnSuccess(response) {
            vm.printers = response.data.printers;
        }

        dataservices.getPrinters().then(fnSuccess);

        //  PRINTER
        dataservices.getItems().then(function (response) {
            vm.ordersPrinter = response.data;
        });


    }
    DropOrder.$inject = ["$scope", "$rootScope", "$templateCache", "dataservices"];
})();
(function () {
    angular.module('app.parcel.module')
        .controller('Parcel', Parcel);

    /* @ngInject */
    function Parcel($scope, $rootScope, dataservices, $uibModal) {
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
            function getOrderFnSuccess(responce) {
                vm.modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modal-parcel.html',
                    controller: 'modalParcel as vm',
                    size: 'lg',
                    resolve: {
                        data: {
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
    Parcel.$inject = ["$scope", "$rootScope", "dataservices", "$uibModal"];

}());
/**
 * Created by o.syrbu on 10.11.2015.
 */
(function () {
    angular.module('app').directive('cmNavBar', navBar);

    /* @ngInject */
    function navBar(dataservices) {
        return {
            replace: true,
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
    navBar.$inject = ["dataservices"];
}());

(function () {
    angular.module('app.print-preview.module')
        .controller('PrintProductPreview', PrintProductPreview);

    /* @ngInject */
    function PrintProductPreview($scope, $rootScope, dataservices, eventServices, $uibModal) {
        var vm = this;

        function fnSuccessOrders(data) {
            vm.ordersPrinter = data.data;
        }

        dataservices.getOrders().then(fnSuccessOrders);

        vm.openModal = openModal;
        vm.reprintOrder = reprintOrder;

        function reprintOrder(order) {
            eventServices.pubReprintOrder(order);
        }

        function openModal(order) {
            //get items order
            getOrderById(order).then(
                getOrderFnSuccess
            );

            function getOrderFnSuccess(responce) {
                vm.modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modal-preview.html',
                    controller: 'ModalPreview as vm',
                    size: 'lg',
                    resolve: {
                        data: {
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

        }

        function createParcelFailure() {

        }
    }
    PrintProductPreview.$inject = ["$scope", "$rootScope", "dataservices", "eventServices", "$uibModal"];

}());
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
    ProductionsLabel.$inject = ["$scope", "$rootScope", "$http", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app.shipping')
        .controller('Shipping', Shipping);

    /* @ngInject */
    function Shipping($scope, $rootScope, $http, dataservices, eventServices) {
        var vm = this;
    }
    Shipping.$inject = ["$scope", "$rootScope", "$http", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app.drop-order.module').directive('cmLines', linesDirective);

    /* @ngInject */
    function linesDirective() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'lines.html',
            scope:true
        };
        return directive;

    }

}());

(function () {
    angular.module('app.drop-order.module')
        .controller('Lines', Lines);

    /* @ngInject */
    function Lines($scope, $rootScope, dataservices, eventServices) {
    }
    Lines.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app.drop-order.module').directive('cmItems', cmItems);

    /* @ngInject */
    function cmItems() {
        var directive = {
            restrict: "E",
            replace: true,
            templateUrl: 'items.html',
            scope:true
        };
        return directive;
    }
}());

(function () {
    angular.module('app.drop-order.module')
        .controller('Items', Items);

    /* @ngInject */
    function Items($scope, $rootScope, dataservices, eventServices) {

    }
    Items.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app.drop-order.module').directive('cmPrinter', printerDirective);

    /* @ngInject */
    function printerDirective() {
        var directive = {
            restrict: "E",
            replace: true,
            templateUrl: 'printer.html',
            scope:true
            //, controller:"itemsCtrl"
        };
        return directive;

    }
}());

(function () {
    angular.module('app.drop-order.module')
        .controller('Printer', Printer);

    /* @ngInject */
    function Printer($scope, $rootScope, dataservices, eventServices) {
        //var vm = this;
        //dataservices.getItems().then(function(response){
        //    vm.ordersPrinter = response.data;
        //});

    }
    Printer.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());
/**
 * Created by o.syrbu on 24.11.2015.
 */
(function () {
    angular.module('app.parcel.module')
        .controller('modalParcel', modalParcel);

    /* @ngInject */
    function modalParcel($scope, $rootScope, dataservices, data, $uibModalInstance) {
        var vm = this;
        vm.modalOrders = data.items;
        vm.orderName = data.name;
        vm.paramsParcel = [
            {name: 'Weight'},
            {name: 'Space'},
            {name: 'Height'},
            {name: 'Length'},
            {name: 'Width'}
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
    modalParcel.$inject = ["$scope", "$rootScope", "dataservices", "data", "$uibModalInstance"];

}());
(function () {
    angular.module('app.parcel.module').directive('cmOverviewParcels', overviewDirective);

    /* @ngInject */
    function overviewDirective() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'overview-parcels.html',
            scope:true
        }
    }
}());

(function () {
    angular.module('app.parcel.module').directive('cmParcelsOrders', ordersDirective);

    /* @ngInject */
    function ordersDirective() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'parcels-orders.html',
            scope:true
        }
    }
}());

(function () {
    angular.module('app.print-preview.module').directive('cmModal', modalPreview);

    /* @ngInject */
    function modalPreview() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'modal-preview.html'
        }
    }
}());

(function () {
    angular.module('app.print-preview.module')
        .controller('ModalPreview', ModalPreview);

    /* @ngInject */
    function ModalPreview($scope, $rootScope, $http, dataservices, eventServices, $uibModalInstance, data) {
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
            $uibModalInstance.close();
        }

        function getImg(itemId) {

        }

        function getLabels(itemId) {
            //call on server returns array labels
            vm.labels = [
                {'name': "label 1"},
                {'name': "label 3333"},
                {'name': "label 1231231"}
            ];
        }

    }
    ModalPreview.$inject = ["$scope", "$rootScope", "$http", "dataservices", "eventServices", "$uibModalInstance", "data"];

}());
(function () {
    angular.module('app.print-preview.module')
        .directive('cmPreviewOrders', ordersPreviewDirective);

    /* @ngInject */
    function ordersPreviewDirective() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'preview-orders.html'
        }
    }
}());

(function () {
    angular.module('app.print-preview.module')
        .controller('OrdersPreview', OrdersPreview);

    /* @ngInject */
    function OrdersPreview($scope, $rootScope, dataservices, eventServices) {
    }
    OrdersPreview.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());