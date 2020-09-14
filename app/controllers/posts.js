const userModel = require('../models/users');
const postModel = require('../models/posts');

module.exports = {



    addNewPost: async function (req, res, next) {
        await addNewPost(req.body).then(result => {
            res.json({ status: 200, message: "post is created", data: result })
        }).catch(err => {
            res.json({ status: 404, message: "post create error", data: err })
        })
    },
    postList: async function (req, res, next) {
        await List().then(result => {
            res.json({ status: 200, message: "post list is return", data: result })
        }).catch(err => {
            res.json({ status: 404, message: "post list return error", data: err })
        })
    },
    postWithCategory: async function (req, res, next) {
        if(req.body.category=="all"){
            await List().then(result => {
                res.json({ status: 200, message: "post list is return", data: result })
            }).catch(err => {
                res.json({ status: 404, message: "post list return error", data: err })
            })
        }else{
            await Filter(req.body.category).then(result => {
                res.json({ status: 200, message: "post list is return", data: result })
            }).catch(err => {
                res.json({ status: 404, message: "post list return error", data: err })
            })
        }
        
    },
    single: async function (req, res, next) {
        await Single(req.body.id).then(result => {
            res.json({ status: 200, message: "post is return", data: result })
        }).catch(err => {
            res.json({ status: 404, message: "post return error", data: err })
        })
    },

}


async function addNewPost(data) {
    return new Promise(async (resolve, reject) => {
        await postModel.create(data).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

async function List() {
    return new Promise(async (resolve, reject) => {
        await postModel.find().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

async function Filter(category) {
    return new Promise(async (resolve, reject) => {
        await postModel.find({category:category}).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}


async function Single(id) {
    return new Promise(async (resolve, reject) => {
        await postModel.findOne({_id:id}).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}




