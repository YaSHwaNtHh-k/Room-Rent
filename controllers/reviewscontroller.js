const Listing = require("../models/listing.js");
const Reviews=require("../models/review.js")

module.exports.reviewform=async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview=new Reviews(req.body.review)
    newReview.author=req.user._id;

    console.log(newReview )

    listing.reviews.push(newReview)
  
    await newReview.save()
  
    await listing.save()

    req.flash("success","New Review Created Successfully!")
  
    res.redirect(`/listings/${listing._id}`)
}

module.exports.deleteform=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    await Reviews.findByIdAndDelete(reviewId)

    req.flash("success","Review Deleted Successfully!")
  
    res.redirect(`/listings/${id}`)
  }