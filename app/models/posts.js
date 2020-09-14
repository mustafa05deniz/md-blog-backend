const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
	title:{
        type:String,
	},
	text: {
		type: String,
	},
	summary:{
		type:String,

	},
	category: {
		type: String,
	},
	author: {
		type: String
	},
	img: {
		type: String
	},
	link: {
		type: Number
	},
	createdDate: {
        type: Date,
        default:new Date()
    },
    
});

module.exports = mongoose.model('Post', PostSchema);