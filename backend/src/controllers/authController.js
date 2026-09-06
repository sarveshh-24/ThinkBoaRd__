import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        const token = createToken(user._id.toString());
        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Error in register controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = createToken(user._id.toString());
        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

function logout(req, res) {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ message: "Logged out successfully" });
}

function getMe(req, res) {
    res.status(200).json({
        user: { id: req.user._id, name: req.user.name, email: req.user.email },
    });
}

export { register, login, logout, getMe };
