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

})();
