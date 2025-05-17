const express = require('express');
const { registerUser, loginUSer, getUserProfile, updateUserProfile } = require('../controllers/authControllers');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router()

// Auth Routes
router.post('/register', registerUser);                      //Register USer
router.post('/login', loginUSer);                            //Login User
router.get('/profile', protect, getUserProfile);             //Get User Prifile
router.put('/profile', protect, updateUserProfile);          //Update User Profile

router.post('/upload-image', upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No File Uploaded" })
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({ imageUrl })
})

module.exports = router;