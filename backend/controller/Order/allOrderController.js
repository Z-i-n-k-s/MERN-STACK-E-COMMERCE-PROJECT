const orderModel = require("../../models/orderModel");
const userModel = require("../../models/userModel");

const allOrderController = async (request, response) => {
    try {
        const userId = request.userId;
        const user = await userModel.findById(userId);

        if (!user || user.role !== "ADMIN") {
            return response.status(403).json({
                message: "Access denied",
                success: false,
                error: true
            });
        }

        const allOrders = await orderModel.find()
            .sort({ createdAt: -1 })
            .select("-__v");

        return response.status(200).json({
            data: allOrders,
            message: "All orders retrieved successfully",
            success: true,
            error: false
        });
    } catch (err) {
        response.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = allOrderController;
