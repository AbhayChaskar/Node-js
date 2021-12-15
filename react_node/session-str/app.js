const express = require('express');
let session = require('express-session');
const fs = require('fs');
const app = express();
const PORT = 7777;
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:false}));

const sessionTime=1000*60*60*24;
app.use(session({
    secret:"havfibakfbwkjwe43fcwedsg",
    saveUninitialized:true,
    cookie:{maxAge:sessionTime},
    resave:false
}))

app.get('/',(req,res)=>{
    res.render('form')
})

app.get('/dashboard',(req,res)=>{
     console.log(req.session.email);
    res.render('dashboard',{email:session.email});
})

app.post('/',(req,res)=>{
    let userData = fs.readFileSync('./details.json').toString();
    data = JSON.parse(userData);

    if(req.body.email===data.data[0].email && req.body.password===data.data[0].password){
        session=req.session;
        session.email=req.body.email;
        res.redirect("/dashboard");
    }
    else {
        res.redirect('/')
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Work on ${PORT}`)
})