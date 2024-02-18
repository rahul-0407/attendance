const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
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
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const Student = mongoose.model("student",studentSchema)

module.exports = Student