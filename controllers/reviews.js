const Campground = require('../models/campground');
const Review = require("../models/review.js");

module.exports.createReviews = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created new review!")
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    console.log("id: ", id);
    console.log("reviewId: ", reviewId);
    //$pull operator removes from an existing array all instances of a value or values that match a specified condition
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!")
    res.redirect(`/campgrounds/${id}`);
}