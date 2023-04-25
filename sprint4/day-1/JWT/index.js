const express = require("express")
const  connection  = require("./db")
const userRouter = require("./Router/userRouter")
const app = express()

app.use(express.json())

app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("home page")
})

app.get("/about",(req,res)=>{
    res.send("home page")
})


// Protecrted Routes
app.get("/movie",(req,res)=>{
    res.send("home page")
})

app.get("/series",(req,res)=>{
    res.send("home page")
})




app.listen(8080,async()=>{
    try{
        await connection
        console.log("connected to mongoDB")
    }catch(err){
        console.log(err)
    }
})