const express = require("express")
const fs = require("fs")
const app = express()
const {timeLogger} = require("./timeLogger")
const {logger} = require("./logger")

app.use(timeLogger)
app.use(logger)

app.get("/",(req,res)=>{
    console.log("Home page")
    res.send("ho")
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
    const data = fs.readFileSync("./db.json","utf-8")
    res.send(data)
})


app.listen(5500)