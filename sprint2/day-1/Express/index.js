const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.end("hello")
})

app.post("/addData",(req,res)=>{
    console.log(req.body)
    res.send("compltert")
})

app.get("/getStudents",(req,res)=>{
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    console.log(data.students)

    res.end(JSON.stringify(data.students))
})


app.post("/addStudents",(req,res)=>{
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    data.students.push(req.body)
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.end("student data added")
})


app.patch("/updateStudent",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0; i<data.students.length; i++){
        if(data.students[i].name == "Chunnu"){
            data.students[i].city = req.body.city
        }
    }
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.end("student data updated")

})


app.delete("/deleteStudent",(req,res)=>{
    let  data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    new_data = data.students.filter((el)=>{
        return el.name !== "Chunnu"
    })
    data.students = new_data
    console.log(data)
    fs.writeFileSync('./db.json',JSON.stringify(new_data))
    res.end("student data Deleted")

})


app.listen(4500)