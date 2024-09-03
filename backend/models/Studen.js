const mongoose=require('mongoose');


const StudentScema=new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email:String,
        phoneNumber:String,
        course:String,
        semester:String,
        createdAt:{
            type :Date,
            default:Date.now
        }
    }
)

const StudentModel=new mongoose.model('StudentModel',StudentScema);

module.exports=StudentModel;