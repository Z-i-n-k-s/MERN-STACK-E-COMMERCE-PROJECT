const addToCartModel = require("../../models/cartProduct");

const deleteAllAddToCartProducts = async (req, res) => {
    try {
        const currentUserId = req.userId;

        const deleteAllProducts = await addToCartModel.deleteMany({ userId: currentUserId });

        res.json({
            message: "All Products Deleted From Cart",
            error: false,
            success: true,
            data: deleteAllProducts
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deleteAllAddToCartProducts;
