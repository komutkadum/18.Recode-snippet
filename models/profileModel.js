const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
    _id : {
        type  : String,
        required : true
    },
    name : {
        type:String,
        required : true
    },
    email : {
        type: String,
    },
    picture : {
        type:String 
    },
    phone : {
        type: Number,
    },
    address : {
        type: String,
    },
    title : {
        type: String,
    },
    website : {
        type: String,
    },
    github : {
        type: String,
    },
    twitter : {
        type: String,
    },
    facebook : {
        type: String,
    },
    instagram : {
        type: String,
    },
    date : {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model("profile",Profile);