const express = require("express")
const  connection  = require("./db")
var jwt = require('jsonwebtoken');
const userRouter = require("./Router/userRouter")
const noteRouter = require("./Router/note.routes")
const auth = require("./middleware/auth.middleware")
const app = express()

app.use(express.json())

app.use("/user",userRouter)




// Protected Routes
app.use(auth)
app.use("/note",noteRouter)



// {

//     "title":"DC",
//     "body":"dfge charger",
//     "author":"dc",
//     "category":"dog"

   
// }

app.listen(8080,async()=>{
    try{
        await connection
        console.log("connected to mongoDB")
    }catch(err){
        console.log(err)
    }
})