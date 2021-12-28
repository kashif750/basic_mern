const express = require("express");
const router=new express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

// schemas
const Student=require("../models/studentModel.js");


// middleware
const middleware=(req,res,next)=>{
    console.log("pello my middleware");
    next();
}//---> middleware()

router.post("/",async(req,res)=>{
    console.log(req.body);


    const {name,email,phone,address,password}=req.body;

    if(!name || !email || !phone || !address || !password){
        return res.status(422).json({error:"plz filled the field properly"});
    }

    Student.findOne({email:email})
    .then((userExist)=>{
        // console.log("user exist data : "+userExist);

        if(userExist){
            return res.status(422).json({error:"email already exist"});
        }

        const tempStudent=new Student({name,email,phone,address,password});
        // console.log("temp student : "+tempStudent);

        tempStudent.save().then(()=>{
            res.status(201).json({message:"user registered successfully"});
        }).catch((err)=>{
            res.status(500).json({message:"user not registered..."});
        })

    }).catch((err)=>{
        console.log(err);
    })
    // const user=new Student(req.body);

    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((e)=>{
    //     res.send(e);
    // });
});

// sign in
router.post("/signin",async(req,res)=>{

    // res.cookie("test","test");

    try{
        // console.log("req.body : ======> "+req.body.password);
        const {email,password}=req.body;

        if(!email || !password){
            return res.send(400).json({error:"plz filled the data"});
        }

        const userLogin=await Student.findOne({email:email});

        // res.cookie("test","test");
        if(userLogin){

            // decrypted password 
            const isMatch=await bcrypt.compare(password,userLogin.password);
            
            // generate token 
            let token = await userLogin.generateAuthToken();
            console.log("token is generated : "+token);
            console.log("token type : "+typeof token);
            token=String(token);

            // store token in cookies
            // res.cookie("jwtoken",token,{
            //     expires:new Date(Date.now()+8*3600000),
            //     httpOnly:true,
            // });

            res.cookie("jwtoken",token);
            res.cookie("temptoken","kashif");

            // res.cookie("test","test");

            if(!isMatch){
                res.status(400);
                res.json({error:"invalid credentials"});
            }else{
                res.json({message:"user signin successfully"});
                
            // res.cookie("test","test");
            }
        }else{
            res.status(400).json({error:"invalid credentials"});
        }


    }catch(err){
        console.log(err);
    }
});

router.get("/",middleware,async(req,res)=>{
    try{
        const studentData=await Student.find();
        res.send(studentData);
    }catch(er){
        res.send(er);
    }
});



router.post("/kashif",async(req,res)=>{
    
    try{
        const {email,password}=req.body;

        const userLogin=await Student.findOne({email:email});
        console.log("student info : "+userLogin);

        const token=await userLogin.generateAuthToken();
        console.log("student token : "+token);

        res.cookie("jwtoken","token",{
            expires:new Date(Date.now()+6000000),
            httpOnly:true,
        });

        res.json({message:"user signin successfully"});

    }catch(err){
        console.log("error : "+err);
        res.status(400).send("user not sigin");
    }
});

module.exports=router;