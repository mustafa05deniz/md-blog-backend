const createApiModel = require('../models/apis');
const jwt = require('jsonwebtoken');
module.exports = {
	createApi: function (req, res, next) {
        console.log("buraya geldi")
        createApiModel.create({
            apiName:req.body.apiName,
            apiPath:req.body.apiPath,
            fields:req.body.fields,
            bodys:req.body.bodys,
            headers:req.body.headers,
            codes:req.body.codes
        },function(err,row){
            if(err){
                next(err);
            }else{
                res.json({status:200,message:'',data:row})
            }
        })
		
    },
    getAllApis:function(req,res,next){
        createApiModel.find({},function(err,row){
            if(err){
                next(err);
            }else{
                res.json({status:200,message:'',data:row})
            }
        })
    }

}