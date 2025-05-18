const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskControllers");

const router = express.Router();

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); //Get All Tasks (Admin: all, User: assigned)
router.get("/:id", protect, getTaskById); //Get Task By ID
router.post("/", protect, adminOnly, createTask); //Create Task (Admin Only)
router.put("/:id", protect, updateTask); //Update Task Detals
router.delete("/:id", protect, adminOnly, deleteTask); //Delete Task (Admin Only)
router.put("/:id/status", protect, updateTaskStatus); //Update Task Status
router.put("/:id/todo", protect, updateTaskChecklist); //Update Task Checklist

module.exports = router;