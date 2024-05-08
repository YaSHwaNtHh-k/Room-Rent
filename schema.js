const Joi =require("joi")

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:{
            url:Joi.string(),
            filename:Joi.string(),
        },
        price:Joi.number().required().min(1),
        country:Joi.string().required(),
        location:Joi.string().required(),
        category:Joi.string().required(),
    }).required(),
})

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().required().min(1).max(5),
        created_At:Joi.string(),
    }).required(),
})