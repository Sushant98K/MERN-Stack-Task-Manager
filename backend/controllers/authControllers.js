const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Genrate JWT Token
const genrateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc            Register a new User
// @route           POST /api/auth/register
// @access          Public
const registerUser = async (req, res) => { 
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body
        
        // Check if user already existes
        const userExistes = await User.findOne({ email })
        if (userExistes) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Determine user role: Admin if correct token is provided, otherwise Member
        let role = 'member'
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin"
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const user = await User.create({
            name,email,password: hashedPassword, profileImageUrl,role,
        })

        // Return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: genrateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({message:'Server Error', error: error.message})
    }
}

// @desc            Login User
// @route           POST /api/auth/login
// @access          Public
const loginUSer = async (req, res) => { 
    try {
        const { email, password } = req.body
        
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({message:"Invalid Email or Password"})
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({message:"Invalid Email or Password"})
        }

        // Return User Data with JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: genrateToken(user._id)
        })
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// @desc            Get User PRofile
// @route           GET /api/auth/profile
// @access          Private (requires JWT)
const getUserProfile = async (req, res) => { 
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({message:"User Not Found"})
        }
        res.json(user)
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// @desc            Update User PRofile
// @route           PUT /api/auth/profile
// @access          Private (requires JWT)
const updateUserProfile = async (req, res) => { 
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        user.name = req.body.name || user.name
        user.email = req.body.name || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password, salt)
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: genrateToken(updatedUser._id)
        })
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports = { registerUser, loginUSer, getUserProfile, updateUserProfile }
