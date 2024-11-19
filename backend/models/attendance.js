const mongoose = require("mongoose")


const attendanceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
    },
    Math:{
        type:String,
        default:"N"
    },
    Html_and_CSS:{
        type:String,
        default:"N"
    },
    GTP:{
        type:String,
        default:"N"
    },
    HVE:{
        type:String,
        default:"not mention"
    },
    EVS:{
        type:String,
        default:"N"
    },
    c_programminig:{
        type:String,
        default:"N"
    },
    Web_Dev:{
        type:String,
        default:"N"
    },
    c_programminig_lab:{
        type:String,
        default:"N"
    },
    science:{
        type:String,
        default:"N"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})


const Attendance = mongoose.model("attendance",attendanceSchema)

module.exports = Attendance