var express = require('express');
var router = express.Router();
var TODO = require('../model/todo-model');

router.get('/', function (req,res, next) {
    TODO.find(function (err,response) {
        if(err)
            res.send(err);
        res.json(response);
    })
});

router.post('/', function (req,res) {
    TODO.create(req.body, function (err,response) {
        if(err)
            res.send(err);
        res.json(response);
    })
});

router.delete('/:id', function (req,res) {
    TODO.findOneAndRemove({_id:req.params.id},function (err,product) {
        if(err)
            res.send(err);
        res.json(product);
    })
});
router.get('/:id', function (req,res) {

    TODO.findOne({_id:req.params.id},function (err,product) {
        if(err)
            res.send(err);
        res.json(product);
    })
});
router.put('/:id', function (req,res) {
    var query ={
        taskName:req.body.taskName,
        isDone:req.body.isDone,
    }
    TODO.findOneAndUpdate({_id:req.params.id},query,function (err,product) {
        if(err)
            res.send(err);
        res.json(product);
    })
});

module.exports = router;