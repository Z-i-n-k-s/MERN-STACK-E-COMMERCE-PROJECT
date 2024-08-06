const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = req?.body?.category || [];

        console.log("category list", categoryList);

        if (!Array.isArray(categoryList) || categoryList.length === 0) {
            return res.json({
                data: [],
                message: "No categories provided",
                error: false,
                success: true
            });
        }

        const products = await productModel.find({
            category: { $in: categoryList }
        });

        console.log("products", products);

        res.json({
            data: products,
            message: "Products found successfully",
            error: false,
            success: true
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.json({
            message: err.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;
