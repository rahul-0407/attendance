const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();
const Attendance = require("../models/attendance")

router.get("/attendance",isAuthenticated,async(req,res)=>{
    const attendance = await Attendance.find({user:req.user.id})
    res.json(attendance);
})

module.exports = router