const express=require('express');//import express
const PORT=8888;//define port
const app=express();//create object of port

// app.set('view engine','pug');
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    let salary=["20000","30000","40000"]
    res.render('home',{country:"India",salary:salary});
})

app.get('/handleForm',(req,res)=>{
    res.send('Handling Form');
})

//define app in the port
app.listen(PORT, (err)=>{
    if (err) throw err;
    console.log (`server working on ${PORT}`);
}) 