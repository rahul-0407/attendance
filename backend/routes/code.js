const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const { generateCode, submitCode } = require("../controllers/code");

router.post("/generateCode",generateCode)
router.put("/submitCode",isAuthenticated, submitCode)

module.exports = router;