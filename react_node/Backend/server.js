const express=require('express');
const cors=require('cors');
const PORT=8899;
const app=express();
app.use(cors())

//define routes
const postRoutes=require('./routes/postRoutes');
app.use("/api/posts",postRoutes);

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Working on ${PORT}`);
})