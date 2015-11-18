(function (){
    angular.module('app', ['ngRoute','dndLists'])
        .config(
            /* @ngInject */
            ["$routeProvider", function ($routeProvider) {
                $routeProvider
                    .when('/DropService', {
                        templateUrl: 'templates/dropModule.html',
                        controller: 'dropModuleCtrl as vm'
                    })
                    .when('/LabelService', {
                        templateUrl: 'templates/labelService.html',
                        controller: 'labelServiceCtrl as vm'
                    })
                    .when('/FulfillmentAdapter', {
                        templateUrl: 'templates/fulfillmentAdapter.html',
                        controller: 'fulfillmentCtrl as vm'
                    })
                    .when('/ShippingService', {
                        templateUrl: 'templates/shipping.html',
                        controller: 'shippingCtrl as vm'
                    })
                    .otherwise({
                        redirectTo: '/DropService'
                    });
            }]
        )
})();

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

(function () {
    angular.module('app').factory('dataservices', getData);

    /* @ngInject */
    function getData($http) {

        function getOrders() {
            return $http.get('/api/orders');
        }

        function getPrinters(){
            return $http.get('/api/printers');
        }

        function getPanels(){
            return $http.get('/api/panels');
        }

        function getItems(){
            return $http.get('/api/items');
        }

        function getImage(order){
            return $http.get('/dest/content/img/' + order.imageName +'.jpg');
        }

        return {
            getOrders: getOrders,
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
        OPEN_MODAL_WINDOW = 'openModalWindow';

    function subDropSuccess(handler){
        $rootScope.$on(DROP_EVENT, function(){
            handler()
        })
    }
    function pubOnDrop(event){
        $rootScope.$broadcast(DROP_EVENT, event);
    }

    function subModalWindow(handler) {
        $rootScope.$on(OPEN_MODAL_WINDOW, function(event, order){
            handler(order)
        })
    }
    function pubOpenModalWindow(order) {
        $rootScope.$broadcast(OPEN_MODAL_WINDOW, order);
    }

    return {
        subDropSuccess: subDropSuccess,
        subModalWindow: subModalWindow,
        pubOpenModalWindow: pubOpenModalWindow,
        pubOnDrop: pubOnDrop
    };
}]);
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
    modalWindowCtrl.$inject = ["$scope", "$rootScope", "$http", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app').directive('modal', modalWindow);

    /* @ngInject */
    function modalWindow() {
        return {
            restrict: "E",
            templateUrl: 'templates/modalWindow.html',
            controller:'modalWindowCtrl as vm',
            scope: true
        }
    }
}());

(function (){
    angular.module('app')
        .controller('printersCtrl', printersCtrl);

    /* @ngInject */
    function printersCtrl($scope, $route, $location, $rootScope, dataservices, eventServices){
        var vm = this;

        function fnSuccess(data){
            vm.printers =  data.data.printers;
        }
        dataservices.getPrinters().then(fnSuccess);


        vm.showPrinter = function(printer){
            $rootScope.$emit('hidePrinters', printer);
        }

        vm.isHidePrinters = false;
        $rootScope.$on('hidePrinters', function (event, printer) {
            vm.isHidePrinters = !vm.isHidePrinters;
            $rootScope.$emit('showPrinter', printer);
        });

    }
    printersCtrl.$inject = ["$scope", "$route", "$location", "$rootScope", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app').directive('printers', printersDirective);

    /* @ngInject */
    function printersDirective() {
        return {
            restrict: 'E',
            templateUrl: 'templates/printers.html',
            controller: 'printersCtrl as vm',
            transclude: true,
            scope: true
        }
    }

}());

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
    headerPanelDirective.$inject = ["$location", "dataservices"];
}());

(function(){
    angular.module('app')
        .controller('dropModuleCtrl', dropModuleCtrl);

    /* @ngInject */
    function dropModuleCtrl($scope, $rootScope) {

    }
    dropModuleCtrl.$inject = ["$scope", "$rootScope"];
})();
(function(){
    angular.module('app')
        .controller('fulfillmentCtrl', fulfillmentCtrl);

    /* @ngInject */
    function fulfillmentCtrl($scope, $rootScope) {

    }
    fulfillmentCtrl.$inject = ["$scope", "$rootScope"];
})();
(function (){
    angular.module('app')
        .controller('labelServiceCtrl', labelServiceCtrl);

    /* @ngInject */
    function labelServiceCtrl($scope, $rootScope, $http, dataservices, eventServices) {
        var vm = this;

    }
    labelServiceCtrl.$inject = ["$scope", "$rootScope", "$http", "dataservices", "eventServices"];

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
    ordersCtrl.$inject = ["$scope", "$rootScope", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app').directive('orders', ordersDirective);

    /* @ngInject */
    function ordersDirective() {
        return {
            restrict: "E",
            templateUrl: 'templates/orders.html',
            controller: 'ordersCtrl as vm',
            transclude: true,
            scope: true
        }
    }
}());

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
    printerCtrl.$inject = ["$scope", "$route", "$location", "$rootScope", "dataservices", "eventServices"];

}());
(function () {
    angular.module('app').directive('printer', printerDirective);

    /* @ngInject */
    function printerDirective($rootScope, dataservices, eventServices) {
        return {
            restrict: "E",
            templateUrl: 'templates/printer.html',
            controller: 'printerCtrl as vm',
            transclude: true,
            scope: true
        }
    }
    printerDirective.$inject = ["$rootScope", "dataservices", "eventServices"];
}());
