import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import cloudinary from '../lib/cloudinary.js'
import bcrypt from 'bcryptjs'

// signup function
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {

        // checking weather all fields are mentioned or not
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // checking password weather it is below 6 length or not
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email })

        // checking if user exists already or not
        if (user) return res.status(400).json({ message: "Email already exists" });

        //hashing password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating new User
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        // Saving the new User into the database
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });


        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// login function
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check weather user exist or not
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // checking weather the password matches or not
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

// logout function
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

// update Profile function
export const updateProfile = async (req, res) => {
    try {
        // get the profile pic from the body and get the userId from the req object
        const { profilePic } = req.body;
        const userId = req.user._id;

        // check weather profile pic is uploaded by the user or not
        if (!profilePic) {
            return res.status(400).json({ message: "Profile Pic is required" });
        }

        // upload the profile in the cloudinary server and then updated the user profile pic using their id
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// check authentication
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}