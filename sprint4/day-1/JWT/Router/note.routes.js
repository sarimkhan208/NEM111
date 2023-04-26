const express = require("express")
const NoteModel = require("../model/note.model")
const noteRouter = express.Router()

noteRouter.post("/create",async (req,res)=>{
    try{
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"Note has been added"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }

})

noteRouter.get("/",(req,res)=>{
    
})

noteRouter.patch("/update",(req,res)=>{
    
})

noteRouter.delete("/delete",(req,res)=>{
    
})

module.exports = noteRouter