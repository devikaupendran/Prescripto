import jwt from 'jsonwebtoken'

//Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { doctortoken } = req.headers;
        if (!doctortoken) {
            return res.json({ success: false, message: "You are not authorized. Please log in again" })
        }
        //for verify the token then  decode it 
        const token_decode = jwt.verify(doctortoken, process.env.JWT_SECRET);

        req.body.docId = token_decode.id;//convert the token to docId and attach to re.body
        next();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor;