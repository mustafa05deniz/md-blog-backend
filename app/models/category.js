const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Categorychema = new Schema({
	name:{
        type:String,
    },
    no:{
        type:Number
    },
    postCount:{
        type:Number
    },
    createdDate:{
        type:Date,
        default:new Date()
    }
    
});

module.exports = mongoose.model('Category', Categorychema);