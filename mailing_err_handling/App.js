const express=require('express');//import express
const PORT=8899;//define port
const app=express();//create object of port
const nodemailer=require("nodemailer");
const credentials= require('./env.js')

let transporter=nodemailer.createTransport({
    service:"gmail",
    port:587,
    secure:false,
    auth:{
        user: credentials.email,
        pass: credentials.password,
    },
});
//create routes
app.get("/sendmail",(req,res)=>{
    let mailOptions={
        from:'abhayrc.dummy@gmail.com',
        to: 'abhayrc.521@gmail.com',
        subject:'Testing mail',
        text:'Thats eji!'
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log('Email Sent: ' +info.response);
        }
    });
})

//define app in the port
app.listen(PORT, (err)=>{
    if (err) throw err;
    console.log (`server working on ${PORT}`);
})