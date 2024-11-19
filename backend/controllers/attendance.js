
const Attendance = require("../models/attendance")

const attendance = async (req,res) => {
    try {
        const attendance = await Attendance.find({user:req.user.id})
        res.json(attendance);
    } catch (error) {
        console.log(error)
    }
}

module.exports = attendance