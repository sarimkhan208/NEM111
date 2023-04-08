const http = require("http")
const fs = require("fs")



const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        res.end("this is home page")
    }else if(req.url=="/about"){
        res.end("this is about page")
    }
    else if(req.url == "/data"){
        try{
            const data = fs.readFileSync("./data.json","utf-8")
            res.end(data)
        }catch(err){
            res.end(err)
        }
    }
    else if(req.url=="/writedata"){
        try{
            const data = fs.writeFileSync("./text.txt","This is me Learning the logic of server")
            res.end("Data has been written")
        }catch(err){
            res.end(err)
        }
    }
})

server.listen(3005,()=>{
    console.log("the server is running")
})