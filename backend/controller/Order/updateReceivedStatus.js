const orderModel = require("../../models/orderModel");
const userModel = require("../../models/userModel");

const updateReceivedStatusController = async (req, res) => {
  try {
    const { orderId, receivedStatus } = req.body;

    // Validate that receivedStatus is a boolean
    if (typeof receivedStatus !== "boolean") {
      return res.status(400).json({
        message: "Invalid receivedStatus value. It must be a boolean.",
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

    // Fetch the order to ensure it exists and check its current status
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
        error: true,
      });
    }

    // Ensure that the order is delivered before marking it as received
    if (order.status !== "delivered") {
      return res.status(400).json({
        message: "Order must be delivered before it can be marked as received.",
        success: false,
        error: true,
      });
    }

    // Update the receivedStatus field
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { receivedStatus },
      { new: true }
    );

    return res.status(200).json({
      data: updatedOrder,
      message: "Order received status updated successfully",
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

module.exports = updateReceivedStatusController;
