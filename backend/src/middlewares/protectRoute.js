import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    try {

        // extracting the token from cookie
        const token = req.cookies.jwt;

        // checking weather the token exists or not
        if (!token) {
            return res.status(400).json({ message: "Unauthorized - No Token Provided" })
        }

        // decode the token using the same jet secret used to encode it get the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // check weather the token is a valid token or not (if not there will be nothing in decode)
        if (!decoded) {
            return res.status(400).json({ message: "Unauthorized - Invalid Token" })
        }

        // check weather the user exists or not by the userId from the decoded shit
        const user = await User.findById(decoded.userId);

        // normally this function will never be executed but writing just to make the code robust
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        // now finally assign the user to the req object user field and call the next function
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protected middleware", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}