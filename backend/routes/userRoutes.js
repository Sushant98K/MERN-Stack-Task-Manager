const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userControllers");

const router = express.Router();

// User Management Route
router.get("/", protect, adminOnly, getUsers); // Get All Users (Admin-Only)
router.get("/:id", protect, getUserById); // Get Specific User

module.exports = router;
