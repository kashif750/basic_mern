const jwt = require("jsonwebtoken");

const Student = require("../models/studentModel.js");


const Authentication = async(req, res, next) => {

    try{
        console.log("***************** cookies : "+JSON.stringify(req.body,null,2)+" ****************");
        const token=req.cookies.jwtoken;
        console.log("token : "+token);
        const verifyToken=await jwt.verify(token,process.env.SECRET_KEY);
        // const rootUser=await Student.findOne({_id:verifyToken._id,"tokens.token":token});
        // if(!verifyToken){
        //     res.send(401).send("unauthorizedd : token not found");
        // }
        // console.log("verify token : "+verifyToken);

        const rootUser=await Student.findOne({_id:verifyToken._id});

        if(!rootUser){
            throw new Error("User not found");
        }

        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser;
        next();


    }catch(err){
        console.log("#######111111####### authentication error "+err);
        res.status(404).send("unauthorized : no token provided ");
        // console.log(err);
    }//---> try-catch

    
}

module.exports = Authentication;