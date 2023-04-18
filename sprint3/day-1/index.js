const mongoose = require("mongoose")

const fun = async ()=>{
    try{
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/learningMongoose")
        console.log("Connected to DB")
        await UserModel.insertMany([{name:"saquib",age:19},{name:"arif",age:20}])
        console.log("insert Many")
        // const user = new UserModel({age:"25",city:"Gorakhpur"})
        // await user.save()
        console.log("single")
        connection.disconnect()
        console.log("Disconnct")
    }catch(err){
        console.log(err)
        console.log("Cant connect to DB")
    }
}

fun()


const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    age:{type:Number,required:true},
    city:{type:String,required:true}
},{
    versionKey:false
})

const UserModel = mongoose.model("users",userSchema)
