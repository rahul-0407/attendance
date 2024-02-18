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

    let student = await Student.findOne({ email });
    let teacher = await Teacher.findOne({ email });

    if (!student && !teacher) {
      return res.status(400).json({
        success,
        message: "Try to login with correct credentials student and teacher",
      });
    }

    if (student) {
      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Try to login with correct..... credentials",
          success: false,
        });
      }

      const data = {
        user: {
          id: student.id,
          userType: student.userType,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken, userType:student.userType });
    } 


    else {
      const isMatch = await bcrypt.compare(password, teacher.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Try to login with correct..... p",
          success: false,
        });
      }

      const data = {
        user: {
          id: teacher.id,
          userType: teacher.userType,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken, userType:teacher.userType,subject:teacher.subject });
    }
  } catch (error) {
    console.log(error);
  }
});

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
