const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    //console.log('🔐 Login request received:', req.body);

    try {
        // Check if user exists
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json("Wrong credentials");
        }

        // Validate password
        const validated = await bcrypt.compare(req.body.password, user.password);
       

        if (!validated) {
         
            return res.status(400).json("Wrong credentials");
        }

        // Check JWT_SECRET
        //console.log('🧪 JWT_SECRET:', process.env.JWT_SECRET);

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );


        // Exclude password before sending response
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token });
    } catch (err) {
        //console.error('🔥 Login error:', err);
        res.status(500).json({ error: 'Something went wrong', details: err.message });
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.status(200).json({ message: "Logged out successfully. Please remove your token on the client-side." });
});

module.exports = router;
