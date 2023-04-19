const {connection,UserModel} = require("./db")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("homepage")
})



// Create or Add the Data
app.post("/addUser",async (req,res)=>{
    try{
        const user = new UserModel(req.body)
        await user.save()
        res.send("User has been added")
    }
    catch(err){
        res.send(err)
    }
})



// Get the Data

app.get("/users",async (req,res)=>{
    // const query = req.query
    const {sort} = req.query
    try{
        let user;
        // const user  = await UserModel.find(query)
        if(sort=="asc"){
            user = await UserModel.find().sort({age:1})
        }
        else if(sort=="dsc"){
            user = await UserModel.find().sort({age:-1})
        }
        
        else{
            user = await UserModel.find()
        }
        res.send(user)
    }
    catch(err){
        res.send(err)
    }
})


// Update the User

app.patch("/updateUser/:id",async (req,res)=>{
    const {id} = req.params
    try{
        await UserModel.findByIdAndUpdate({_id:id},req.body)
        res.send("The Data has been updated")
    }catch(err){
        res.send(err)
    }
})


app.delete("/deleteUser/:id",async (req,res)=>{
    const {id} = req.params
    try{
        await UserModel.findByIdAndDelete({_id:id})
        res.send("The Data has been deleted")
    }catch(err){
        res.send(err)
    }
})


app.listen(4500, async ()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log("Some Error Occured")
    }
    console.log("server is running at port 4500")
})