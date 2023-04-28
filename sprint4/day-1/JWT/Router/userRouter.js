const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model")
const userRouter = express.Router()

userRouter.get("/get",(req,res)=>{
    res.send("hi")
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,age,pass} = req.body
    try{
        bcrypt.hash(pass, 5,async (err, hash)=>{
            // Store hash in your password DB.
            if(hash){
                const user = new UserModel({name,email,age,pass:hash})
                await user.save()
            }else{
                res.status(400).send({"err":err.message})
            }

        });
        res.status(200).send({"msg":"user has been registered"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})





userRouter.post("/login",async (req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email})
        console.log(user,"user")
        bcrypt.compare(pass, user.pass, function(err, result) {
            // result == true
            if(result){
                var token = jwt.sign({ author: user.name,authorID:user._id }, 'masai');
                res.status(200).send({"msg":"Login Successfull","token":token})
            }else{
                res.status(200).send({"msg":"Wrong Credentials"})
            }
        });
        // if(user){
        //     var token = jwt.sign({ course: 'backend' }, 'masai');
        //     res.status(200).send({"msg":"Login Successfull","token":token})
        // }else{
        //     res.status(200).send({"msg":"Wrong Credentials"})
        // }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
    
})

module.exports=userRouter