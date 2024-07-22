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
//mongoose.connect(`mongodb+srv://luckytaorem5:Lucky@luckycluster.son3r0i.mongodb.net/internships`).then(()=>{
//    console.log("connected to database")
//})
mongoose.connect("mongodb+srv://luckytaorem5:Lucky@luckycluster.son3r0i.mongodb.net/fsmernlpu").then(()=>{
    console.log("Connected to MongoDb");
})

app.use("/test",()=>{
//    const mongoose = require('mongoose');
const student = new mongoose.Schema({
    name: String,
    age:Number,
    email:String,
    address:String,
    phone:Number
})
const Students = new mongoose.model("Students",student);
//model is a collections inside mongoDb
const adder =async ()=>{
    const student1 = new Students({
        name:"Rahul",
        age:20,
        email:"rahul@gmail.com",
        address:"Bangalore",
        phone:1234567890
    })
    await student1.save();
    
    // await Students.create({
    //     name:"Rahul3",
    //     age:19,
    //     email:"rahul@gmail.com",
    //     address:"Bangalore",
    //     phone:1234567890
    // })

    const a1 = await Students.findOne({age:{$lt: 20}})
    console.log(a1);

}
adder()
})

app.use("/auth",router)
app.listen(4000,()=>{
    console.log("server is running on port 4000")
})
