const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	name:{
        type:String,
        trim:true,
		default:"full name"
	},
	email: {
		type: String,
		default:"email"
	},
	password: {
		type: String,
		trim: true
	},
	role: {
		type: Number
	},
	linkedin: {
		type: String
	},
});

module.exports = mongoose.model('User', UserSchema);