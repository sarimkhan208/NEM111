// const isEven = require("is-even")
// console.log(isEven(5))


const fs = require("fs")

fs.readFile("./text.txt",'utf-8',(err,data)=>{
    if(err){
        console.log("errrrrrrrrrrrrrrr")
        console.log(err)
    }else{
        console.log(data)
    }
})


fs.writeFile("./text.txt",'superman',(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("filee written successfully")
    }
})
