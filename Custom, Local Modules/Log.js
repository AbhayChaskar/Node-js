let  log={
    info:function(message){
    console.log("Info: "+message)
    },
    error:function(message){
        console.log("Error: "+message)
    },
    success:function(message){
        console.log("Success: "+message)
    }
}
module.exports=log; 
//Es5 concept