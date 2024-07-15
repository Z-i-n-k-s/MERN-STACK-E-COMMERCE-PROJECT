const userModel = require("../../models/userModel");

async function allUsers(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;  // Default values if not provided

    const allUsers = await userModel.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const totalUsers = await userModel.countDocuments();

    res.json({
      message: "All users",
      data: allUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: Number(page),
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
