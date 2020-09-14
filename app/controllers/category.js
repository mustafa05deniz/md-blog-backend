const postModel = require('../models/posts');
const categoryModel = require('../models/category');
module.exports = {



    addNewCategory: async function (req, res, next) {
      await addNewCategory(req.body).then(result=>{
          res.json({status:200,message:"Category is created",data:result})
      }).catch(err=>{
          res.json({status:404,message:"Category create error",data:err})
      })
    },
    updateCategory: async function (req, res, next) {
        await updateCategory(req.body).then(result=>{
            res.json({status:200,message:"Category is created",data:result})
        }).catch(err=>{
            res.json({status:404,message:"Category create error",data:err})
        })
      },
    categoryList: async function (req, res, next) {
        await List().then(result=>{
            res.json({status:200,message:"Category list is return",data:result})
        }).catch(err=>{
            res.json({status:404,message:"Category list return error",data:err})
        })
      },
 

}


async function addNewCategory(data){
    return new Promise(async(resolve,reject)=>{
        await categoryModel.create(data).then(result=>{
            resolve(result);
        }).catch(err=>{
            reject(err);
        })
    })
}

async function updateCategory(data){
    console.log(data);
    return new Promise(async(resolve,reject)=>{
        await categoryModel.update({_id:data._id},{$set:data.data}).then(result=>{
            resolve(result);
        }).catch(err=>{
            reject(err);
        })
    })
}


async function List(){
    return new Promise(async(resolve,reject)=>{
        await categoryModel.find().then(result=>{
            resolve(result);
        }).catch(err=>{
            reject(err);
        })
    })
}

