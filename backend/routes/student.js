const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Student = require("../models/student.js");
const Teacher = require("../models/teacher.js");
const Attendance = require("../models/attendance")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "qwertyuikmnhytfvfredsxz";

const isAuthenticated = require("../middlewares/auth");

router.post("/create", async (req, res) => {
  try {
    let success = false;
    const { email, password, userType, subject } = req.body;

    let student = await Student.findOne({ email });
    let teacher = await Teacher.findOne({ email });

    if (student || teacher) {
      return res.status(400).json({
        message: "user already exist",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    if (userType === "student") {
      student = await Student.create({
        email,
        password: hasedPassword,
        userType,
      });

      let attendance = await Attendance.create({user: student._id})

      const data = {
        user: {
          id: student.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } else {
      teacher = await Teacher.create({
        email,
        password: hasedPassword,
        userType,
        subject,
      });

      const data = {
        user: {
          id: teacher.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let success = false;
    const { email, password } = req.body;

    let user = await Student.findOne({ email }) || Teacher.findOne({ email });
    let userType = user instanceof Student ? 'student' : 'teacher';

    if (!user) {
      return res.status(400).json({
        success,
        message: "Try to login with correct credentials student and teacher",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Try to login with correct..... credentials",
         success: false,
      });
    }

    const data = {
      user: {
        id: user.id,
        userType:userType,
      },
    };


    sendCookies(data,res,201)


    res.json({
      success:true,
      userType:userType,
      ...(userType = "teacher" && {subject:user.subject})
    })

    
  } catch (error) {
    console.log(error);
  }
});

router.post('logout',(res,res)=> {
  req.clearCookie('token',{
    httpOnly: true,
    sameSite: 'Strict',
  })
  res.status(200).json({ message: 'Logged out successfully' });
})

router.post("/getuser", isAuthenticated, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
