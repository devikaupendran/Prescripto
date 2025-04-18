import jwt from 'jsonwebtoken'

//User authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "You are not authorized. Please log in again" })
        }
        //for verify the token then  decode it 
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = token_decode.id;//assigning a value to the userId property of the req.body object.
        next();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authUser;