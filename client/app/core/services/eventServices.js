angular.module('app').
    service('eventServices', function ($rootScope) {

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
});