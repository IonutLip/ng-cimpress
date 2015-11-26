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
            function ($stateProvider, $urlRouterProvider) {
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

            }
        );
})();
