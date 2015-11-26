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
            function ($stateProvider, $urlRouterProvider) {
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

            }
        )
        .run([
            '$rootScope','$state',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                return $rootScope.$stateParams = $stateParams;
            }
        ]);
})();
