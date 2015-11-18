(function (){
    angular.module('app', ['ngRoute','dndLists'])
        .config(
            /* @ngInject */
            function ($routeProvider) {
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
            }
        )
})();
