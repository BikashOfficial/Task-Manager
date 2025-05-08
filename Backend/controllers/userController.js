const taskModel = require("../models/Task");
const userModel = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: "member" }).select("-password");

    const userWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await taskModel.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const InProgressTask = await taskModel.countDocuments({
          assignedTo: user._id,
          status: "InProgress",
        });
        const completedTasks = await taskModel.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc, //include all existing user data
          pendingTasks,
          InProgressTask,
          completedTasks,
        };
      })
    );

    res.json(userWithTaskCounts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User mot found", error: error.message });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// const deleteUser = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

module.exports = { getUsers, getUserById };
