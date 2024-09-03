const mongoose=require('mongoose');


const collegeSchema=new mongoose.Schema(
    {
        name:String,
        address:String,
        contact:Number,
        createdAt:{
            type :Date,
            default:Date.now
        }
    }
)

const collegeModel=new mongoose.model('collegeModel',collegeSchema);

module.exports=collegeModel;