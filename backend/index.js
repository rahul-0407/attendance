const connectDB = require("./db/database")
connectDB()




const express = require("express")
const port = 5000;
const app = express();
const cors = require("cors");
const path = require("path")
const cookieParser = require("cookie-parser")
const {config} = require("dotenv")

config({
    path:path.join(__dirname,'./db/config.env')
})

const studentRouter = require("./routes/student")
const attendanceRouter = require("./routes/attendance")
const codeRouter = require("./routes/code")


app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/api/auth", studentRouter)
app.use("/api/auth", attendanceRouter)
app.use("/api/auth", codeRouter)


app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`)
})