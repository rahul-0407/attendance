const mongoose = require("mongoose")


const attendanceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
    },
    Math:{
        type:String,
        default:"not mention"
    },
    Html_and_CSS:{
        type:String,
        default:"not mention"
    },
    GTP:{
        type:String,
        default:"not mention"
    },
    HVE:{
        type:String,
        default:"not mention"
    },
    EVS:{
        type:String,
        default:"not mention"
    },
    c_programminig:{
        type:String,
        default:"not mention"
    },
    Web_Dev:{
        type:String,
        default:"not mention"
    },
    c_programminig_lab:{
        type:String,
        default:"not mention"
    },
    science:{
        type:String,
        default:"not mention"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})


const Attendance = mongoose.model("attendance",attendanceSchema)

module.exports = Attendance