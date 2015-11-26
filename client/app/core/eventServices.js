angular.module('app').
    service('eventServices', function ($rootScope) {

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
});