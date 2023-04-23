const fs=require("fs")
function record(req,res,next){
const id=req.params.id

//if(method is delete or patch then this middleware comes into play)

if(req.method=="DELETE"){
    fs.appendFileSync("./records.txt",`\nThe Movie with id:${id} has been deleted |${Date()}`)
}else{
    fs.appendFileSync("./records.txt",`\nThe Movie with id:${id} has been updated |${Date()}`)
}
 
  next()
}

module.exports=record