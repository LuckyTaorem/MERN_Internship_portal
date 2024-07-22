const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        default:""
    },
    dob:{
        type:Date,
        default:""
    }
});

const UserModel = mongoose.model("User",UserSchema)

module.exports =UserModel;