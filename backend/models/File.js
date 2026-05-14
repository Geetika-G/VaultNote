const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    fileUrl:{
        type:String,
        required:true
    },

    fileType:{
        type:String,
        required:true
    },

    publicId:{
        type:String
    },

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model(
    "File",
    fileSchema
)