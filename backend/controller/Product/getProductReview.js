const reviewModel = require("../../models/reviewModel");


async function GetReviewsController(req, res) {
    try {
        // Extract productId from the query parameters.
        const { productId } = req.body;
        if (!productId) {
            throw new Error("Product ID is required.");
        }
        console.log("get review ", productId)

        // Find all reviews for the given product.
        // Optionally, populate the user field to include user details (e.g., name and profilePic)
        const reviews = await reviewModel.find({ product: productId })
            .populate("user", "name profilePic");

        // Respond with a success message and the reviews data.
        res.status(200).json({
            message: "Reviews fetched successfully",
            data: reviews,
            error: false,
            success: true,
        });
    } catch (err) {
        // If an error occurs, send an error response.
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = GetReviewsController;
