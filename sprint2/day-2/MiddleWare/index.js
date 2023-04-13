const express = require("express")
const app = express()

app.use((req,res,next)=>{
    console.log("Hello from MW@")
    next()
})

app.get("/",(req,res)=>{
    console.log("Home page")
    res.send("home page")
})

app.get("/about",(req,res)=>{
    console.log("about page")
    res.send("about page")
})

app.get("/contact",(req,res)=>{
    console.log("contact page")
    res.send("contact page")
})

app.get("/data",(req,res)=>{
    console.log("data page")
    res.send("data page")
})


app.listen(4500)