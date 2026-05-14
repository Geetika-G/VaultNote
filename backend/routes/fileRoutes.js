const express = require("express")

const router = express.Router()

const cloudinary = require("../config/cloudinary")

const upload = require("../middleware/uploadMiddleware")

const authMiddleware = require("../middleware/authMiddleware")

const File = require("../models/File")


// UPLOAD FILE
router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    async(req,res)=>{

        try{

            let resourceType = "auto"

            if(req.file.mimetype === "text/plain"){
                resourceType = "raw"
            }

            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    resource_type: resourceType
                }
            )

            const newFile = new File({

                title:req.body.title,

                fileUrl:result.secure_url,

                fileType:req.file.mimetype,

                publicId:result.public_id,

                uploadedBy:req.user.id
            })

            await newFile.save()

            res.status(201).json({
                message:"File uploaded",
                file:newFile
            })

        }
        catch(error){

            res.status(500).json({
                message:error.message
            })
        }
})


// GET USER FILES
router.get(
    "/",
    authMiddleware,
    async(req,res)=>{

        try{

            const files = await File.find({
                uploadedBy:req.user.id
            })

            res.status(200).json(files)

        }
        catch(error){

            res.status(500).json({
                message:error.message
            })
        }
})


// DELETE FILE
router.delete(
    "/:id",
    authMiddleware,
    async(req,res)=>{

        try{

            const file = await File.findById(
                req.params.id
            )

            if(!file){
                return res.status(404).json({
                    message:"File not found"
                })
            }

            let resourceType = "image"

if(file.fileType.startsWith("video")){
    resourceType = "video"
}

if(file.fileType.startsWith("audio")){
    resourceType = "video"
}

if(file.fileType === "text/plain"){
    resourceType = "raw"
}

await cloudinary.uploader.destroy(
    file.publicId,
    {
        resource_type: resourceType
    }
)

            await File.findByIdAndDelete(
                req.params.id
            )

            res.status(200).json({
                message:"File deleted"
            })

        }
        catch(error){

            res.status(500).json({
                message:error.message
            })
        }
})

module.exports = router