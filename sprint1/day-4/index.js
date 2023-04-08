const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        res.end("this is home page")
    }else if(req.url=="/about"){
        res.end("this is about page")
    }
})

server.listen(3005,()=>{
    console.log("the server is running")
})