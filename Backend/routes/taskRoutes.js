const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskController");
const router = express.Router();

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // get all tasks(Admin : all, member: assigned)
router.get("/:id", protect, getTasksById); // get tasks by ID
router.post("/", protect, adminOnly, createTask); // create a new task (Admin only)
router.put("/:id", protect, updateTask); // Update a task details
router.delete("/:id", protect, adminOnly, deleteTask); //Delete a task (admin only)
router.put("/:id/status", protect, updateTaskStatus); // update task status
router.put("/:id/todo", protect, updateTaskChecklist); //update task checklist

module.exports = router;
