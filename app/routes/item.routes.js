module.exports = function(app) {
    var items = require('../controllers/item.controller');

    // Create a new Item
    app.post('/item', items.create);

    // Retrieve all Items 
    app.get('/items', items.findAll);

    // Retrieve a single Item with id
    app.get('/items/:itemId', items.findOne);

    // Update a Item with id
    app.put('/items/:itemsId', items.update);

    // Delete a Item with id
    app.delete('/items/:itemId', items.delete);
}