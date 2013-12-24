var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/todo');

exports.items = function(req, res){
    var collection = db.get('items');
    collection.find({}, {}, function(e,docs){
        res.json(docs);
    });
};