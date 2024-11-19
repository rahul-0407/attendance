const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const { createUser, loginUser, logout, getUser } = require("../controllers/student.js");

router.post("/create", createUser);
router.post("/login",loginUser);
router.post('logout',logout)
router.post("/getuser", isAuthenticated, getUser);

module.exports = router;
