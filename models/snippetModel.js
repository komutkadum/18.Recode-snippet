const mongoose = require("mongoose");

const Snippet = new mongoose.Schema({
    userId : {
        type:String ,
        required:true,
    },
    title : {
        type:String,
        required : true,
        index : true
    },
    snippet : {
        type: String,
        required: true,
    },
    language : {
        type: String,
        required : true
    },
    tags : {
        type: String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model("snippet",Snippet);