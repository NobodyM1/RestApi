var mongoose = require('mongoose');

var ExampleSchema = mongoose.Schema({
    name: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Example', ExampleSchema);