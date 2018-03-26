var Item = require('../models/item.model');

// Create and save new item
exports.create = function(req, res) {
    if(!req.body.content) {
        return res.status(400).send({message: "Item can not be empty"});
    }

    var item = new Item({name: req.body.name || "Untitled Item", content: req.body.content});

    item.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Item."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    Item.find(function(err, items){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving Items."});
        } else {
            res.send(items);
        }
    });
};

exports.findOne = function(req, res) {
    Item.findById(req.params.itemId, function(err, item) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Item not found with id " + req.params.itemId});                
            }
            return res.status(500).send({message: "Error retrieving item with id " + req.params.itemId});
        } 

        if(!item) {
            return res.status(404).send({message: "Item not found with id " + req.params.itemId});            
        }

        res.send(item);
    });
}

exports.update = function(req, res) {
    Item.findById(req.params.itemId, function(err, item) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Item not found with id " + req.params.itemId});                
            }
            return res.status(500).send({message: "Error finding item with id " + req.params.itemId});
        }

        if(!item) {
            return res.status(404).send({message: "Item not found with id " + req.params.itemId});            
        }

        item.name = req.body.name;
        item.content = req.body.content;

        item.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update item with id " + req.params.itemId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    Item.findByIdAndRemove(req.params.itemId, function(err, item) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Item not found with id " + req.params.itemId});                
            }
            return res.status(500).send({message: "Could not delete item with id " + req.params.itemId});
        }

        if(!item) {
            return res.status(404).send({message: "Item not found with id " + req.params.itemId});
        }

        res.send({message: "It deleted successfully!"})
    });
};