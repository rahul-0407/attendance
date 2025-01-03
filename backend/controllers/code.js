
const Code = require("../models/code");
const Attendance = require("../models/attendance")

const generateCode = async (req,res) => {
    try {
        const {code,subject} = req.body;

        const newCode  = await Code.create({code,subject})

        setTimeout(async ()  => {
            await Code.findOneAndDelete({_id:newCode._id})
        }, 30000 );

        res.status(200).json({ message: "Code generated successfully" });  
    } catch (error) {
        console.log(error)
    }
}

const submitCode = async (req,res) => {
    try {

        const {code} =req.body;
    
        let newCode  = await Code.findOne({code})
    
        let subject = newCode.subject
    
        if(!newCode){
            return res.status(400).json({
                success:false,
                message:"Invalid Code"
            })
        }
    
        let attendance = await Attendance.findOneAndUpdate({user:req.user.id},{[subject]:"present"},{new:true})
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error");
        }
}


module.exports = {generateCode,submitCode}