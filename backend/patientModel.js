const mongoose=require('mongoose');
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    phone:{
        type:Number,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    date:{
        type:Date,
    },
    location:{
        type:String,
    },
    symptoms:{
        type:String,
    },
    diagnosis:{
        type:String,
    },
},{timestamps:true})

const patient=mongoose.model("patient",patientSchema);
module.exports=patient;