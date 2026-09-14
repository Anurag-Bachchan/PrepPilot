const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express=require("express");
const app=express();
const db_connect=require("./config/database")
const cookieParser=require("cookie-parser")
const cors=require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true//it allows the server to accept requests from the frontend with cookies
}))
const PORT=process.env.PORT || 5000

db_connect();

const authRoute=require("./routes/auth_route")
const interviewRoute=require("./routes/interview_route")

app.use("/api/interview",interviewRoute)
app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})