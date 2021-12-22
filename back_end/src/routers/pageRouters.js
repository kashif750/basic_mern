const express=require("express");
const router=new express.Router();

// middle wares
const authentication=require("../middleware/authentication.js");

// schemas
const Student=require("../models/studentModel.js");


// about us page route
router.get("/about",authentication,(req,res)=>{
    console.log("pello my about us page");

    res.send(req.rootStudent);
});//---> about-us GET

module.exports=router;