const express=require("express")
const router=express.Router()
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const { loggedin, isowner, validateListing }=require("../middleware.js")
const listingcontroller = require("../controllers/listingscontroller.js")

const {cloudinary,storage}=require("../cloudConfig.js")

const multer  = require('multer')
const upload = multer({ storage })


//New Route
router.get("/listings/new",loggedin, listingcontroller.renderNewform);

   
router
  .route("/listings/")
  // All route
  .get(wrapAsync(listingcontroller.index))

  // create route
  .post(upload.single('listing[image]'),wrapAsync(listingcontroller.createform)) 

router
  .route("/listings/:id")

  //Show Route
  .get(wrapAsync(listingcontroller.showform))
  
  //Update Route
  .put(loggedin,isowner,upload.single('listing[image]'),validateListing,wrapAsync(listingcontroller.updateform))

  //Delete Route
  .delete(loggedin,isowner,wrapAsync(listingcontroller.deleteform))


  
  //Edit Route
  router.get("/listings/:id/edit",loggedin,isowner,wrapAsync(listingcontroller.editform));

module.exports=router;
  