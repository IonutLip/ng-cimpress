module.exports = function(app) {
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get('/api/orders', getOrders);
    app.get('/api/printers', getPrinters);
    app.get('/api/panels', getPanels);

    app.get('/api/items', getItems);

    function getItems(req, res, next){
        var json = jsonfileservice.getJsonFromFile('/../../data/items.json');
        res.send(json);
    }

    function getPrinters(req, res, next){
        var json = jsonfileservice.getJsonFromFile('/../../data/printers.json');
        res.send(json);
    }

    function getOrders(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/orders.json');
        res.send(json);
    }

    function getPanels(req, res, next){
        var json = jsonfileservice.getJsonFromFile('/../../data/panels.json');
        res.send(json);
    }
};