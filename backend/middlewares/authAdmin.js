import jwt from 'jsonwebtoken'

//admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { admintoken } = req.headers;
        if (!admintoken) {
            return res.json({ success: false, message: "You are not authorized. Please log in again" })
        }
        //for verify the token then  decode it 
        const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET);

        //if it is not same as the email and password 
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "You are not authorized. Please log in again" })
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin