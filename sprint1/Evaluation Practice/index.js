// DAY-2
const fs = require("fs");
const path = require("path")
let command = process.argv


// function generateRandom(length){
//     if(!length){
//         console.log("provide length")
//         return
//     }
//     const crypto = require('crypto');

//     // Generate a random number between 0 and 999
//     const randomNum = crypto.randomBytes(1).readUInt8() % 1000;

//     console.log(randomNum);
// }


// switch(command[2]){
//     case 'add' : 
//     return console.log(Number(command[3])+Number(command[4]))
//     case 'divide' : 
//     return console.log(Number(command[3])/Number(command[4]))
//     case 'mul' : 
//     return console.log(Number(command[3])*Number(command[4]))
//     case 'random' :
//         return generateRandom(Number(command[3]))
//     default:
//     console.log("invalid operation")

// }


// DAY-3



// const operation = process.argv[2]
// const file = process.argv[3]

// switch(operation){
//     case 'read':
//         return(fs.readFile(file,'utf-8',(err,data)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 console.log(data)
//             }
//         })
//     )

//     case 'delete':
//         return(fs.unlink(file,(err)=>{
//             if(err){
//                 console.log(err,"error")
//             }
//             console.log("The file has been deleted")
//         })
//     )
//     case 'create':
//         return(
//             fs.writeFile("example.txt","",(err)=>{
//                 if(err){
//                     console.log(err,"Err")
//                     return
//                 }
//                 console.log("file created successfully")
//             })
//     )
//     case 'append' :
//         return(
//             fs.appendFile('example.txt','\n I am here',(err)=>{
//                 if(err){
//                     console.log(err)
//                     return
//                 }console.log("file appended successfully")
//             })
//     )

//     case 'rename' :
//     return (
//         fs.rename('example.txt','ironman.txt',(err)=>{
//             if(err){
//                 console.log(err)
//                 return
//             }console.log("file rename")
//         })
//     )
//     case 'list' :
//         return (
//             fs.readdir('.',(err,allFiles)=>{
//                 if(err){
//                     console.log(err)
//                 }
//                 else{
//                     allFiles.forEach((el)=>{
//                         console.log(el)
//                     })
//                 }
//             })
//         )

//     default :
//     return console.log("invalid operation")

// }


// Day 4



const http = require("http")
const server =  http.createServer((req,res)=>{
    fs.stat(`./${req.url}`,(err,stats)=>{
        if(err){
            res.writeHead(404,{"Content-type":"text"})
            res.end("404 Error")
            return;
        }
        if(stats.isDirectory()){
            res.setHeader("Content-type","text/html")
            let  htmlData=""
            let data=fs.readdirSync(`./${req.url}`,"utf-8")
            data.forEach((el)=>{
                let url=path.join(req.url,el)
                htmlData+=`<li><a href="${url}">${el}</a></li>`
            })
    
            res.writeHead(200,{"Content-type":"text/html"})
            res.end(`<ul>${htmlData}</ul>`,"utf-8")
        }else{
            fs.readFile(`./${req.url}`,"binary",(err,content)=>{
                if(err){
                    res.writeHead(404,{"Content-type":"text"})
                    res.end(err)
                }else{
                    res.end(content,"binary")
                }
            })
        }
    })
})

server.listen(4500,()=>{
    console.log("runiing")
})

