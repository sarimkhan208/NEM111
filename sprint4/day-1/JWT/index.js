const express = require("express")
const  connection  = require("./db")
var jwt = require('jsonwebtoken');
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
    const {token} = req.query
    jwt.verify(token, 'masai', function(err, decoded) {
        if(decoded){
            res.status(200).send({"msg":"Movie Data"})
        }else{
            res.status(200).send({"msg":"Pls Login first"})
        }
      });
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