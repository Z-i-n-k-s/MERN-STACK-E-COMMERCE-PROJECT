const orderModel = require("../../models/orderModel");
const userModel = require("../../models/userModel");

const orderController = async (req, res) => {
    const { cartItems, totalPrice } = req.body;
    const user = await userModel.findOne({ _id: req.userId });

    try {
        const orderDetails = {
            productDetails: cartItems,
            email: user.email,
            userId: user._id,
            totalAmount: totalPrice,
            status: "pending",
            receivedStatus: false
        };

        const order = new orderModel(orderDetails);
        console.log("order ", order);

        const saveOrder = await order.save();
        res.status(200).json({
            data: saveOrder,
            message: "Payment is successful",
            error: false,
            success: true,
        });
    } catch (err) {
        console.log("err", err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = orderController;
