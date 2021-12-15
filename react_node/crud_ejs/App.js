const express=require('express');//import express
const fs=require('fs');//import fs
const cookieParser=require('cookie-parser');
const sessions=require('express-session');
var { randomBytes } = require('crypto'); //csrf crypto import

const PORT=7788;//define port
const app=express();//create object of port
const bcrypt = require('bcrypt'); //bcrypt import package
const saltRounds = 10;
const myPlaintextPassword = '05090509';
const hash = bcrypt.hashSync(myPlaintextPassword,saltRounds)

// app.set('view engine','pug');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const sessionTime=1000*60*60*24;
app.use(sessions({
    secret:"yafsga7astcawkjw23gvwasdv",
    saveUninitialized:true,
    cookie:{maxAge:sessionTime},
    resave:false
}))

// const csrf=(req,res,next)=>{
//     req.csrf = randomBytes(100).toString('base64');
//     next();
// }
// app.use(csrf);

app.use(cookieParser())

app.get('/',(req,res)=>{
    if(req.session.csrf===undefined){
        req.session.csrf = randomBytes(100).toString('base64');
    }
    let data=fs.readFileSync('./post.json').toString();
    // console.log(data)
    data=JSON.parse(data);
    res.render('index',{postData:data.posts});
})

app.get('/addpost',(req,res)=>{
    res.render('add',{csrf_token:req.session.csrf});
})

app.post('/postdata',(req,res)=>{
    console.log(req.session.csrf)
    console.log(req.body.csrf)

    if(!req.body.csrf){
        res.send("not includes CSRF");
    }
    else if(req.body.csrf!==req.session.csrf)
    {
        res.send("CSRF not match");
    }
    else{
    fs.readFile('./post.json',(err,data)=>{
        let password=req.body.password
        const hash = bcrypt.hashSync(password,saltRounds)
        console.log(hash);

        let postData=[];
        if(err) throw err;
        postData=JSON.parse(data);
        postData.posts.push({
            title:req.body.title,
            body:req.body.body,
            password:hash,
            id:postData.posts.length+1,
        })
        fs.writeFile('./post.json',JSON.stringify(postData),(err)=>{
            if (err) throw err;
        })
    })
    res.redirect('/');
}
})

// app.get('/editpost',(req,res)=>{
//     let id=req.params.id;
//     let data=fs.readFileSync('./post.json').toString();
//     let data1=JSON.parse(data);
//     data1.posts.splice(id,1);
//     fs.writeFileSync('./post.json',JSON.stringify(data1));
//     res.redirect("/");
// })

app.get('/deletepost/:id',(req,res)=>{
    let id=req.params.id;
    let data=fs.readFileSync('./post.json').toString();
    let data1=JSON.parse(data);
    data1.posts.splice(id,1);
    fs.writeFileSync('./post.json',JSON.stringify(data1));
    res.redirect("/");
})

//define app in the port
app.listen(PORT, (err)=>{
    if (err) throw err;
    console.log (`server working on ${PORT}`);
}) 