const express = require("express")
const { UserModel } = require("../model/user.model")
const userRouter = express.Router()

userRouter.get("/get",(req,res)=>{
    res.send("hi")
})

userRouter.post("/register",async(req,res)=>{
    try{
        const user = new UserModel(req.body)
        await user.save()
        res.status(200).send({"msg":"user has been registered"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})





userRouter.post("/login",async (req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email,pass})
        if(user){
            res.status(200).send({"msg":"Login Successfull"})
        }else{
            res.status(200).send({"msg":"Wrong Credentials"})
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
    
})

module.exports=userRouter