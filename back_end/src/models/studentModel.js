const mongoose = require("mongoose");
const validator=require("validator"); // for validation
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    },
    phone:{
        type:Number,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
});

//hashing the password
studentSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        console.log("encrypted password : "+this.password);
    }

    next();
});

// generating the tokens
studentSchema.methods.generateAuthToken=async function(){

    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token});
        // this.tokens=token;
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }

}//---> generateAuthToken()



// we will create a new collection
const Student=new mongoose.model('Student',studentSchema);
module.exports=Student;