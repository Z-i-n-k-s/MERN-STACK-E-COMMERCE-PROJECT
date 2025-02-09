const ReviewModel = require("../../models/reviewModel");
const UserModel = require("../../models/userModel"); // Import User model to fetch name

async function AddReviewController(req, res) {
    try {
        const sessionUserId = req.userId; // Extracting user ID from middleware
        const { productId, rating, review } = req.body;

        console.log("req review", req.body);
        console.log("req user id", sessionUserId);

        // Check if all required fields are provided.
        if (!productId || !rating || !review) {
            throw new Error("Product ID, rating, and review text are required.");
        }

        // Validate rating range.
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5.");
        }

        // Check if the user has already submitted a review for this product.
        const existingReview = await ReviewModel.findOne({ "product": productId, "user.id": sessionUserId });

        if (existingReview) {
            throw new Error("You have already submitted a review for this product.");
        }

        // Fetch the user's name from the User model.
        const user = await UserModel.findById(sessionUserId);
        if (!user) {
            throw new Error("User not found.");
        }

        // Create a new review document.
        const newReview = new ReviewModel({
            product: productId,
            rating,
            review,
            user: {
                id: sessionUserId,
                name: user.name, // Store the user’s name
            },
        });

        // Save the review to the database.
        const savedReview = await newReview.save();
        console.log("review saved", savedReview);

        res.status(201).json({
            message: "Review submitted successfully",
            data: savedReview,
            error: false,
            success: true,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = AddReviewController;
