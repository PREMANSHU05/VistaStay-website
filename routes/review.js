const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const  Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validatereview, isLoggedIn, isreviewAuthor} = require("../middleware.js");
const ReviewController = require("../controllers/review.js");


//Reviews
router.post("/", isLoggedIn,validatereview, wrapAsync(ReviewController.postreview));
// delete review
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(ReviewController.deletereview));

module.exports=router;