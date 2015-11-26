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

})();
