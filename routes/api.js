var _ = require('underscore');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/todo');

// Gets the whole collection
exports.items = function(req, res){
    var collection = db.get('todoListCollection');
    collection.find({}, {}, function(e,docs){
        res.json(docs);
    });
};

// Gets a specific item
exports.item = function(req, res){
    var collection = db.get('todoListCollection');
    collection.find({_id: req.params.id}, {}, function(e,docs){
        res.json(docs);
    });
}

// Deletes a specific item
exports.deleteItem = function(req, res){
    var collection = db.get('todoListCollection');
    collection.remove({_id: req.params.id});
    return res.send({success: true});
}

// Creates or updates an item
exports.updateOrCreateItem = function(req, res){
    var id = req.params.id;
    var collection = db.get('todoListCollection');
    
    // If id is not undefined we are editing an item
    if (!_.isUndefined(id)) {
        collection.updateById(
            id,
            {$set: req.body},
            function(e, docs){});
        return res.send({success: true});
    // If id is undefined we are creating a new item
    } else {
        var newItem = collection.insert(
                      req.body,
                      function(err,doc){});
        return res.send({success: true, item: newItem.query});
    }
}