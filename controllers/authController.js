const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.find({ email });

        if(user) {
            throw new AppError('Email already registered', 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch(error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.find({ email });

        if(!user) {
            throw new AppError('Invalid email or password', 400);
        }

        const isMatched = await bcrypt.compare(password, hashedPassword);
        if(!isMatched) {
            throw new AppError('Invalid email or password', 400);
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        return res.status(200).json({ token });
    }
    catch(error) {
        next(error);
    }
}

module.exports = { register, login };