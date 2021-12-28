const express=require("express");
const cookieparser=require("cookie-parser");
const app=express();
const cors=require("cors");

// const bodyparser=require("body-parser");

const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});

require('./src/db/conn.js');


// variables
const PORT=process.env.PORT;

// routers
const studentRouter=require("./src/routers/studentRouters.js");
const pageRouter=require("./src/routers/pageRouters.js");

const corsOptions={
    credentials:true,
    origin:"http://localhost:3000",
    // optionSuccessStatus:200
}
// app.use(bodyparser.urlencoded({extended:false}));
// app.use(bodyparser.json);
app.use(cookieparser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/",pageRouter);
app.use("/students",studentRouter);
app.post("/temp",(req,res)=>{
    try{
        // const studentData=await Student.find();
        console.log("req.cookies" + req.params['jwtoken']);
        res.send("messagekashif");
    }catch(er){
        res.send(er);
    }
});



// where the application can listen
app.listen(PORT,()=>{
    console.log(`connection is setup at ${PORT}`);
});


