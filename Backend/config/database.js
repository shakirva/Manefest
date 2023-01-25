const express= require('express');
const mongoose=require('mongoose');


const connectDatabase=()=>{
mongoose.set('strictQuery',false);
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((data)=>{
    console.log(`server connected to database${data.connection.host}`);
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDatabase