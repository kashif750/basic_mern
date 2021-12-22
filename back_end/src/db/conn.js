const mongoose = require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:"../../config.env"});

mongoose.connect(process.env.DATABASE_CONN)
    .then(()=>{
        console.log("connection is successfull");
    }).catch((error)=>{
        console.log("no connection established"+error);
    })