const express=require("express");
const cookieparser=require("cookie-parser");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});

const PORT=process.env.PORT;

mongoose.connect(process.env.DATABASE_CONN).then(()=>{
    console.log("connection is successfull ... appp.js");
}).catch((error)=>{
    console.log("no connection is established ... appp.js");
})


const studentSchema=new mongoose.Schema({
    name:{type:String,},
    email:{type:String,},
    phone:{type:Number},
    address:{type:String,},
    password:{type:String},
});


studentSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:token_id.toString()},process.env.SECRET_KEY);
        return token;
    }catch(err){
        res.status(400).send("the error reported ");
        console.log("generate auth token error ");
    }
}


const Student=new mongoose.model("Student",studentSchema);
const corsOptions={
    credentials:true,
    origin:"http://localhost:3000",
}

app.use(cookieparser());
app.use(cors(corsOptions));
app.use(express.json());

app.post("/login",async(req,res)=>{
    console.log("request body"+req.body);
    console.log(" *8*****************");


    const {email,password}=req.body;

    const findStudent=await Student.findOne({email:email});
    console.log("Student find data : "+findStudent);


    res.cookie("tempcookie","tempcookielocalhost");

    res.send("user find");
});


app.listen(PORT,()=>{
    console.log("connection is established at : "+PORT);
});
