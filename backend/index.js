const connectDB = require("./db/database")
connectDB()




const express = require("express")
const port = 5000;
const app = express();
const cors = require("cors");
const studentRouter = require("./routes/student")
const attendanceRouter = require("./routes/attendance")
const codeRouter = require("./routes/code")


app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/api/auth", studentRouter)
app.use("/api/auth", attendanceRouter)
app.use("/api/auth", codeRouter)


app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`)
})