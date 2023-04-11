
const fs = require("fs")
const http = require("http")
const dns = require('node:dns');

const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        res.setHeader("Content-type", "text/html")
        res.end(`<h1>Welcome to the Home Page</h1>`)
    }
    else if(req.url == '/gencount'){
        res.setHeader("Content-type", "text/html")
        let write = fs.createWriteStream('logs.txt')
        fs.readFile('data.json','utf-8',(err,data)=>{
            if(err){
                res.end(err)
            }else{
                let male = 0,female=0;
                data = JSON.parse(data)
                for(let i=0; i<data.length; i++){
                    if(data[i].gender=="Male"){
                        male++
                    }else if(data[i].gender == "Female"){
                        female++
                    }
                }
                write.write(`The initial Male count is ${male} and Female count is ${female} at ${Date()}\n`,(err)=>{
                    if(err){
                        res.end(err)
                    }
                })
                res.end('The count has been updated in the logs file')
            }
        })
    }
    else if(req.url == "/people"){
        res.setHeader("Content-type", "text/html")
        let write = fs.createWriteStream('people.txt')
        fs.readFile('data.json','utf-8',(err,data)=>{
            if(err){
                res.end(err)
            }else{
                data = JSON.parse(data)
                for(let i=0; i<data.length; i++){
                    write.write(`First Name: ${data[i].first_name} Last Name: ${data[i].last_name} Gender: ${data[i].gender} Email: ${data[i].email}\n`,(err)=>{
                        if(err){res.end(err)}
                    })
                }
                res.end('The file has been created and data has been entered')
            }
        })
    }else if(req.url == '/address'){
                dns.lookup('masaischool.com', (err, address, family) => {
                    if(err){
                        res.end(err)
                    }
                    else{
                        fs.appendFile('logs.txt',`URL: masaischool.com IP Address: ${address} and Family is ${family}`,(err)=>{
                            if(err){
                                res.end(err)
                            }else{
                                res.end('Logs File has been updated')
                            }
                        })
                        
                    }   
                });
    }
})



server.listen(5500)

// done


// Do not forget to export the server.
// e.g => module.exports = server;
module.exports=server




// fs.readFile('data.json','utf-8',(err,data)=>{
//     data = JSON.parse(data)
//     data.push("check")
//     fs.writeFile('data.json',data,(err)=>{
//         console.log(err)
//     })
// })



















// dns.lookup('masaischool.com', (err, address, family) => {
//   console.log('address: %j family: IPv%s', address, family);
// });

// const data = fs.readFile('data.json','utf-8',(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })


// fs.readFile('data.json','utf-8',(err,data)=>{
//     if(err){
//         console.log('Send the complete error as a response')
//     }else{
//         let male = 0,female=0;
//         data = JSON.parse(data)
//         for(let i=0; i<data.length; i++){
//             if(data[i].gender=="Male"){
//                 male++
//             }else if(data[i].gender == "Female"){
//                 female++
//             }
//             console.log(data[i])
//         }
        
//         fs.appendFile('logs.txt',`The initial Male count is ${male} and Female count is ${female}`,(err)=>{
//             if(err){
//                 console.log(err)
//             }
//         })
//         // res.end('The count has been updated in the logs file')
//     }
// })