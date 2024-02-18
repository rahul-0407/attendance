const mongoose = require("mongoose")

const codeSchema = new mongoose.Schema({
    code:{
        type:Number,
    },
    subject:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const Code = mongoose.model("code",codeSchema)

module.exports = Code