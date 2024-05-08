const express=require("express")
const router=express.Router()
const categorycontroller = require("../controllers/categorycontroller.js")

const {cloudinary,storage}=require("../cloudConfig.js")

const multer  = require('multer')
const upload = multer({ storage })

// Category
router
   .route('/:category')
   .post(categorycontroller.categoryform)

module.exports=router