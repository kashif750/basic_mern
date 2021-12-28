const express=require("express");
const router=new express.Router();

// middle wares
const authentication=require("../middleware/authentication.js");

// schemas
const Student=require("../models/studentModel.js");


// about us page route
router.get("/about",authentication,(req,res)=>{

    // console.log("------------------------------- about page token : "+req.cookies['jwtoken']);
    // console.log("pello my about us page");

    try{
        res.send(req.rootStudent);
    }catch(err){
        console.log("#####222222222##### page router error ######"+err);
    }
});//---> about-us GET


router.get("/logout",(req,res)=>{
    try{
        console.log("peello my logout page");
    res.clearCookie("jwtoken",{path:'/'});
    res.status(200).send("user logout");
    }catch(err){
        console.log("pageRouter logout error : "+err);
    }
});//---> logout GET

module.exports=router;