const express=require("express")
const router=express.Router()
const Listing = require("../models/listing.js");
const Reviews=require("../models/review.js")
const wrapAsync=require("../utils/wrapAsync.js")
const { loggedin, validateReview, isReviewAuthor }=require("../middleware.js")
const reviewController=require("../controllers/reviewscontroller.js")

// Post Review Route
router.post("/:id/reviews",loggedin,validateReview,reviewController.reviewform)

// Delete Review Route
router.delete("/:id/reviews/:reviewId",loggedin,isReviewAuthor,wrapAsync(reviewController.deleteform))

module.exports=router