const Listing=require("../models/listing.js")

module.exports.categoryform=async(req,res)=>{
    const allListings = await Listing.find({});
    let{category}=req.params;
    res.render("listings/category.ejs",{category,allListings})
}