const express=require('express');
const app=express();
const mongoose=require('mongoose');
const InstituteDb=require('./models/InstituteDb')
const StudentDb=require('./models/Studen')
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
mongoose.connect(`mongodb://localhost:27017/crudOperation`).then(()=>{
    console.log('====================================');
    console.log("mongo is connectted");
    console.log('====================================');
})
const port=9000;

app.listen(port,()=>{
    console.log('====================================');
    console.log(`server is listen at ${port}`);
    console.log('====================================');
})

app.get("/",async(req,res)=>{
    try
    {
        const data=await InstituteDb.find();
        res.send(data)
    }
    catch(err)
    {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    }
})

app.post("/collegeData",(req,res)=>{
    const {name,address,contact}=req.body;

    const insData=new InstituteDb({
        name:name,
        address:address,
        contact:contact
    })

    insData.save()
    .then(()=>{
        console.log('====================================');
        console.log("Data is saved");
        console.log('====================================');
    })
    .catch((err)=>{
        console.log('====================================');
        console.log("Data is not saved error is :",err);
        console.log('====================================');
    })
})

app.put("/UpdateData",async(req,res)=>{
    const {id,name,address,contact}=req.body;
    console.log(id); 
    console.log(req.body);
    await InstituteDb.updateOne({_id:id},{
      $set:{
        name:name,
        address:address,
        contact:contact
      }
    })
    .then((res)=>{
      console.log(res);
    })
  })

  app.post("/delete",async(req,res)=>{
    const { id } = req.body;
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    await InstituteDb.deleteOne({ _id: id })
        .then((res) => {
            console.log(res);
        })
  })


  app.get("/student",async(req,res)=>{
    try
    {
        const data=await StudentDb.find();
        res.send(data)
    }
    catch(err)
    {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    }
})


app.post("/StudentData",(req,res)=>{
    const {firstName,lastName,email,phoneNumber,course,semester}=req.body;
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    const insData=new StudentDb({
        firstName:firstName,
        lastName:lastName,
        email:email,
        phoneNumber:phoneNumber,
        course:course,
        semester:semester
    })
    insData.save()
    .then(()=>{
        console.log('====================================');
        console.log("Data is saved");
        console.log('====================================');
    })
    .catch((err)=>{
        console.log('====================================');
        console.log("Data is not saved error is :",err);
        console.log('====================================');
    })
})