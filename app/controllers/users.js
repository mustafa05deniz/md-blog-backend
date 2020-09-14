const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {


	create: async function (req, res, next) {
		await check_user_with_email(req.body.email).then(result1=>{
			if (result1) {
				res.json({ status: 404, message: "this email number already use", data: null });
			} else {
				bcrypt.genSalt(saltRounds, async function (err, salt) {
					bcrypt.hash(req.body.password.toString(), salt, async function (err, hash) {
						// Store hash in your password DB.
						const data = {
							name: req.body.name,
							email: req.body.email,
							password: hash
						}
						await AddUser(data).then(result => {
							res.json({ status: 200, message: null, data: result })
						}).catch(err => {
							res.json({ status: 404, message: err, data: null })
						})
	
					});
				});
			}
		}).catch(err => {
			res.json({ status: 404, message: err, data: null })
		})
	
	},
	authenticate: async function (req, res, next) {
		console.log(req.body.email);

		await check_user_with_email(req.body.email).then(async result=>{
			console.log(result);
			await compare_password(req.body.password.toString(), result.password.toString()).then(async checked_password=>{
				res.json({
					status: 200,
					message: "user found!!!",
					data: {
						id: result._id,
						name: result.name,
						email: result.email,
						token:jwt.sign({ id: result._id }, req.app.get('secretKey'), { expiresIn: '30 days' })
					}
				});
			}).catch(err=>{
				res.json({status:405,message:"passord is not match",data:err})
			})

		}).catch(err=>{
			res.json({status:404,message:"this email is not found ",data:err})
		})
		


	},

}





async function AddUser(data) {
	return new Promise(async (resolve, reject) => {
		userModel.create(data).then(result => {
			resolve(result);
		}).catch(err => {
			reject(err);
		})
	})
}

async function check_user_with_email(email) {
	return new Promise(async (resolve,reject) => {
		await userModel.findOne({ email: email }).then(async result=>{
			if(result){
				console.log(result);
				resolve(result)
			}else{
				resolve(false)
			}
		}).catch(err=>{
			reject(err)
		})
	
	})
}

async function compare_password(requested_password,real_password){
	return new Promise(async (resolve,reject) => {
		await bcrypt.compare(requested_password,real_password).then(result=>{
			if(result)resolve(result)
			else reject(false)
		}).catch(err=>{
			reject(err);
		})
	})
}