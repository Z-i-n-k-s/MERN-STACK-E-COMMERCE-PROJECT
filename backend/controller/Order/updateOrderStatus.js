const orderModel = require("../../models/orderModel");
const userModel = require("../../models/userModel");

const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const validStatus = ["pending", "shipped", "delivered"];
    
    // Validate the new status
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
        success: false,
        error: true,
      });
    }

    // Check if the current user is an admin
    const user = await userModel.findById(req.userId);
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Access denied",
        success: false,
        error: true,
      });
    }

    // Update the order status
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      data: updatedOrder,
      message: "Order status updated successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = updateOrderStatusController;
