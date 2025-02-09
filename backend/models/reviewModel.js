const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product", // Reference to the Product model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to the User model
        required: true,
      },
      name: {
        type: String,
        required: true, // Store user's name directly
      },
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
