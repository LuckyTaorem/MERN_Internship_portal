const express =require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const router = require("./routes/userr")
const cookieParser = require("cookie-parser")
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin:["https://mern-internship.onrender.com"],
    credentials:true
}))
mongoose.connect(`mongodb+srv://luckytaorem5:Lucky@luckycluster.son3r0i.mongodb.net/internships?retryWrites=true&w=majority&appName=LuckyCluster&ssl=false&tls=false`).then(()=>{
    console.log("connected to database")
})
app.use("/auth",router)
app.listen(4000,()=>{
    console.log("server is running on port 4000")
})
