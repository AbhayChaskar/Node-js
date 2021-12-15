const express=require('express');
const mongoose=require('mongoose');
const PORT = 8899;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//dbConnection
const db="mongodb://localhost:27017/mongocrud";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("Mongo Db Connected");
    }
    catch(err)
    {
        console.log(err.message);
    }
}
connectDB();

const catModel=require('./db/catSchema');

//routing
app.post("/insertcat",(req,res)=>{
    let cname=req.body.cname;
    let path=req.body.path;

    //insert data
    let ins=new catModel({cname:cname,image:path});
    ins.save((err)=>{
        if(err) {res.send("Already Added")}
        else{
        res.send("category Added");
        }
    })
})

app.get("/getcat",(req,res)=>{
    catModel.find({},(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})

app.delete("/deletecat/:id",(req,res)=>{
    let id=req.params.id;
    catModel.deleteOne({_id:id},(err)=>{
        if(err) throw err;
        else{
        res.send("Category Deleted");
        }
    })
})

app.put("/updatecat/:id",(req,res)=>{
    let id=req.params.id;
    let cname=req.body.cname;
    let path=req.body.path;
    catModel.updateOne({_id:id},{$set:{cname:cname,image:path}},(err)=>{
        if(err) throw err;
        else{
        res.send("Category Updated");
        }
    })
})

app.listen(PORT, (err) => 
{
    if (err) throw err;
    console.log(`Working on ${PORT}`);
})