const express = require("express")
const  connection  = require("./db")
var jwt = require('jsonwebtoken');
const userRouter = require("./Router/userRouter")
const auth = require("./middleware/auth.middleware")
const app = express()

app.use(express.json())

app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("home page")
})

app.get("/about",(req,res)=>{
    res.send("home page")
})


// Protected Routes
app.use(auth)
app.get("/movie",(req,res)=>{
    res.status(200).send({"msg":"Movie Data"})
})

app.get("/series",(req,res)=>{
    res.status(200).send({"msg":"Series Data"})
})




app.listen(8080,async()=>{
    try{
        await connection
        console.log("connected to mongoDB")
    }catch(err){
        console.log(err)
    }
})