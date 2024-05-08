const Listing=require("./models/listing.js")
const {reviewSchema, listingSchema}=require("./schema.js")
const Review=require("./models/review.js")
const ExpressError=require("./utils/ExpressError.js")

module.exports.loggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("You must logged in to create New Listing")
        return res.redirect("/login")
    }
    next()
}  

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isowner=async(req,res,next)=>{
    let { id } = req.params;
    const listing=await Listing.findById(id)
    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("failure","You have No Authorization to Edit this listing")
      return res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.validateListing=(req,res,next)=>{
    let {error} = listingSchema.validate(req.body)
    if(error){
      throw new ExpressError(400,error)
    }
    else{
      next();
    }
  }

module.exports.validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body)
    if(error){
      throw new ExpressError(400,error)
    }
    else{
      next();
    }
}

module.exports.isReviewAuthor=async(req,res,next)=>{
  let { id,reviewId } = req.params;
  const review=await Review.findById(reviewId)
  if(!review.author._id.equals(res.locals.currUser._id)){
    req.flash("failure","You are not a Creator of this Review")
    return res.redirect(`/listings/${id}`)
  }
  next()
}