var Example = require('../models/example.model');

// Create and save a new Example
exports.create = function(req, res) {
    if(!req.body.content) {
        return res.status(400).send({message: "Example can not be empty"});
    }

    var example = new Example({title: req.body.title || "Untitled Note", content: req.body.content});

    example.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Example."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    Example.find(function(err, examples){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving Examples."});
        } else {
            res.send(examples);
        }
    });
};

exports.findOne = function(req, res) {
    Example.findById(req.params.exampleId, function(err, note) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Example not found with id " + req.params.exampled});                
            }
            return res.status(500).send({message: "Error retrieving example with id " + req.params.exampleId});
        } 

        if(!note) {
            return res.status(404).send({message: "Example not found with id " + req.params.exampleId});            
        }

        res.send(example);
    });
}

exports.update = function(req, res) {
    Example.findById(req.params.exampleId, function(err, note) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Example not found with id " + req.params.exampleId});                
            }
            return res.status(500).send({message: "Error finding example with id " + req.params.exampleId});
        }

        if(!note) {
            return res.status(404).send({message: "Example not found with id " + req.params.exampleId});            
        }

        example.title = req.body.title;
        example.content = req.body.content;

        example.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update example with id " + req.params.exampleId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    Example.findByIdAndRemove(req.params.exampleId, function(err, example) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Example not found with id " + req.params.exampleId});                
            }
            return res.status(500).send({message: "Could not delete example with id " + req.params.exampleId});
        }

        if(!note) {
            return res.status(404).send({message: "Example not found with id " + req.params.exampleId});
        }

        res.send({message: "Example deleted successfully!"})
    });
};