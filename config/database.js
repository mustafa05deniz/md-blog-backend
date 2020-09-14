
const mongoose = require('mongoose');
const mongoDB = "mongodb_adress";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    poolSize: 10, 
    serverSelectionTimeoutMS: 10000, 
    socketTimeoutMS: 45000, 
    family: 4 
  }; 
  mongoose.connect(mongoDB,options).then(response=>{
    console.log("connection establisment database");
}).catch(err=>{
    console.log("connection error",err)
});
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
module.exports = mongoose;