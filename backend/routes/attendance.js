const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const attendance = require("../controllers/attendance");
const { generateCode, submitCode } = require("../controllers/code");
const router = express.Router();

router.get("/attendance",isAuthenticated,attendance)


module.exports = router