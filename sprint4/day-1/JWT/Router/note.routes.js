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

noteRouter.get("/",async(req,res)=>{
    try{
        const notes = await NoteModel.find()
        res.status(200).send({"Notes":notes})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
    
})

noteRouter.patch("/update/:id",async (req,res)=>{
    const {id} = req.params
    try{
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"Notes has beeen updated"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
    
})

noteRouter.delete("/delete/:id",async (req,res)=>{
    const {id} = req.params
    try{
        await NoteModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"Notes has beeen Deleted"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
    
})

module.exports = noteRouter