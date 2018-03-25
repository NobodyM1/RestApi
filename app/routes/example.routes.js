module.exports = function(app) {
    var examples = require('../controllers/example.controller');

    // Create a new Example
    app.post('/example', examples.create);

    // Retrieve all Examples 
    app.get('/example', examples.findAll);

    // Retrieve a single Example with id
    app.get('/example/:exampleId', examples.findOne);

    // Update a Example with id
    app.get('/example/:exampleId', examples.update);

    // Delete a Example with id
    app.delete('/examples/:exampleId', examples.delete);
}