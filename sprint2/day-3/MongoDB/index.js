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

app.get("/contact/:id",(req,res)=>{
    const {id} = req.params
    console.log(id)
    res.send(id)
})

app.get("/data",(req,res)=>{
    const {name} = req.query
    console.log(name)
    res.send(name)
})


app.listen(5500)