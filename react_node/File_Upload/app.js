// const express=require('express');
// const multer=require('multer');
// const helpers=require('/')
// const path=require('path');
// const PORT=8888;
// const app=express();
// app.use(express.static("uploads"));
// app.set("view engine","ejs");
// //for uploading 
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/')
//     },
//     filename:(req,file,cb)=>{
//       cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
//     }
// })
// //end 
// app.get("/",(req,res)=>{
//     res.render("upload");
// })
// app.post("/fileupload",(req,res)=>{
//     let upload=multer({storage:storage,fileFilter:helpers.imageFilter}).single('myfile');
//     upload(req,res,(err)=>{
//         if(req.fileValidationError){
//             res.send(req.fileValidationError);

//         }
//        else if(!req.file){
//            res.send("Please select a file");
//        }
//        else if(err){
//            res.send("SOme uploading error");
//        }
//        else {
//            res.send(`You uploaded the file : <hr/> <img src="${req.file.filename}" width="300" height="300"/>`);
//        }
//     })
// })
// app.listen(PORT,(err)=>{
//     if(err) throw err;
//     console.log(`Work on ${PORT}`);
// })


const express = require('express');
const multer = require('multer');
const path = require('path');
const helpers=require('./helpers/helpers');
const PORT = 8888;
const app = express();
app.use(express.static("uploads"));
app.set("view engine", "ejs");
//for uploading 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
//end 
app.get("/", (req, res) => {
    res.render("upload");
})
app.post("/fileupload", (req, res) => 
{
    // let upload=multer({storage:storage}).single('myfile');

    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('files', 10);
    upload(req, res, (err) => 
    {
        if(req.fileValidationError){
            res.send(req.fileValidationError);
        }
        else if(!req.files){
            res.send("Please select a Single or Multiple files.");
        }
        else if (err){
            res.send("You can upload 10 files MAX");
        }
        else 
        {
            const files = req.files;
            let len = files.length;
            let result='';
            for (index = 0; index < len; ++index) 
            {
                result += `<img src="${files[index].filename}" width=250 height=250/>`;  
            }
            res.send(`You uploaded the file : <hr/>`+result);
        }
    })
})
    app.listen(PORT, (err) => 
    {
        if (err) throw err;
        console.log(`Work on ${PORT}`);
    })