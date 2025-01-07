const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const verifyToken = require('../Middleware/VerifyToken'); 

// Update User
router.put('/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } else {
            res.status(403).json("You can update only your account");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get User by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...otherDetails } = user._doc;
        res.status(200).json(otherDetails);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
