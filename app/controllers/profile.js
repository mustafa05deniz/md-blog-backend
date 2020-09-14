const userModel = require('../models/users');

const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {



    user_info: async function (req, res, next) {
    
        await user_with_id(req.body.userId).then(async result => {
            res.json({status: 200, message: "user found", data: result}) 
        }).catch(err => {
            res.json({ status: 404, message: "this email is not found ", data: err })
        })

    },
    addNewUser: async function (req, res, next) {
        console.log(req.body);
        await check_user_with_email(req.body.email).then(async checked => {
            if (checked) {
                console.log("burda")
                bcrypt.genSalt(saltRounds, async function (err, salt) {
                    bcrypt.hash(req.body.password.toString(), salt, async function (err, hash) {
                        // Store hash in your password DB.
                        console.log(hash);
                        const data = {
                            name: req.body.name,
                            email: req.body.email,
                            role: parseInt(req.body.role),
                            linkedin: req.body.linkedin,
                            password: hash
                        }
                        console.log(data);
                        await AddUser(data).then(result => {
                            res.json({ status: 200, message: null, data: result })
                        }).catch(err => {
                            res.json({ status: 404, message: err, data: null })
                        })

                    });
                });
            } else {
                res.json({ status: 404, message: "this email number already use", data: null });
            }
        }).catch(err => {
            res.end()
        })

    },
    userList:async function(req,res,next){
        await userList().then(async result => {
            res.json({status: 200, message: "user list is not found", data: result})
        }).catch(err => {
            res.json({ status: 404, message: "user list is not found", data: err })
        })
    }

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


async function userList() {
    return new Promise(async (resolve, reject) => {
        userModel.find().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}


async function check_user_with_email(email) {
    return new Promise(async (resolve, reject) => {
        await userModel.findOne({ email: email }).then(async result => {
            console.log(result == null);
            if (result == null) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(err => {
            reject(err)
        })

    })
}




async function user_with_id(id) {
    return new Promise(async (resolve, reject) => {
        await userModel.findOne({ _id: id }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err);
        })
    })
}