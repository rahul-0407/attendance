const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    userType:{
        type:String,
        require:true,
    },
    subject:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const Teacher = mongoose.model("teacher",teacherSchema)

module.exports = Teacher