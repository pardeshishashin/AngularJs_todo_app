var mongoose = require('mongoose');

var TODO =mongoose.model('Todo', mongoose.Schema({
    taskName :  {
        type: String , 
        required: true
    },
    isDone:{
        type: Boolean,
        required: true,
        default: false
    }
}));
module.exports = TODO;