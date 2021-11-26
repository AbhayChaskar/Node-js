const express=require('express');
const frontRouter=express.Router();

frontRouter.get("/",(req,res)=>{
    res.sendFile("Form.html",{root:"."});
})
frontRouter.post("/success",(req,res)=>{
    res.send(`Name: ${req.body.fname} and Age: ${req.body.age}`);
})

// app.get("/category/:cname",(req,res)=>{
//     //read param value
//     let cn=req.params.cname;
//     res.send(`The Category is ${cn}`);
// })

frontRouter.get("/category/:cname/:scname?",(req,res)=>{
    //read param value
    let cn=req.params.cname;
    let scn=req.params.scname;
    if(scn!=undefined)
    {
    res.send(`The Category is ${cn} and The Sub-Category is ${scn}`);
    }
    else
    {
        res.send(`The Category is ${cn}`);
    }
})

module.exports=frontRouter;