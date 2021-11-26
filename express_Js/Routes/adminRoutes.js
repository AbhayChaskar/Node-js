const express=require('express');
const router=express.Router();
//custom route level middleware

const requirejson=()=>{
    return (req,res,next)=>{
        if(req.headers['content-type']==="application/json"){
            next();
        }
        else{
            res.send('server require application/json format')
        }
    }
}
router.get("/",(req,res)=>{
    res.send("Admin Front");
})

router.get("/dashboard",(req,res)=>{
    res.send("Admin Dashboard");
})

router.post("/register",requirejson(),(req,res)=>{
    res.send("Registration working");
})

module.exports=router;