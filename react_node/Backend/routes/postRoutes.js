const express=require('express');
const router=express.Router();

router.get("/fetchpost",(req,res)=>{
    res.send("Fetch Post Call");
})

router.post("/addpost",(req,res)=>{
    res.send("Add Post Call");
})

module.exports=router;