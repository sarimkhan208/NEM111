const jwt = require("jsonwebtoken")

const auth = async (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try{
            const decoded = jwt.verify(token.split(" ")[1],"masai")
            if(decoded){
                next()
            }else{
                res.send({"msg":"Pls Login!!!"})
            }
        }catch(err){
            res.send({"msg":err.message})
        }
    }else{
        res.send({"msg":"Pls Login!!!"})
    }
}


module.exports = auth