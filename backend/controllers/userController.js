import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay';

//API to register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing required information" })
        }

        //validating the email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        //validating user password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)//value b/w 5 to 15 
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        //saving this new data in db
        const newUser = new userModel(userData)
        const user = await newUser.save()

        //creating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "No user data found" })
        }

        //compare the hashed password in the db with user enter in loginform
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API for geting user profile data
export const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        res.json({ success: true, userData })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API for updating user profile
export const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Missing required information" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            //upload image in cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageURL })//update it in db
        }
        res.json({ success: true, message: "Profile updated successfully" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API for book appointment
export const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');

        //if the doctor is not available
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" })
        }
        //if the doctor is available
        let slots_booked = docData.slots_booked;

        //checking for slot availability
        if (slots_booked[slotDate]) {  //20/10/2025 11am
            if (slots_booked[slotDate].includes(slotTime)) { //[10 ,11.30, 12.30]
                return res.json({ success: false, message: "Slot not available" })
            }
            else {
                slots_booked[slotDate].push(slotTime); //[10, 11.30, 12.30, 11]
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked; //we dont want the history of the slots booked 

        const appointmentData = {
            userId,
            docId,
            userData,
            doctorData: docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),//currentdate and time for knwing when the appointment has booked
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ success: true, message: "Your appointment has been successfully booked!" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get user Appointments for frontend my-appointment page
export const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API for handle the cancellation of an appointment.

// export const cancelAppointment = async (req, res) => {
//     try {
//         const { userId, appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);

//         // Verify if the user is authorized to cancel the appointment
//         if (appointmentData.userId !== userId) {
//             return res.json({ success: false, message: "Unauthorized action" });
//         }

//         // Check if the appointment is already cancelled
//         if (appointmentData.cancelled) {
//             return res.json({ success: false, message: "Appointment already cancelled" });
//         }

//         // Check the time difference between the current time and the appointment time
//         const appointmentDate = new Date(appointmentData.slotDate + ' ' + appointmentData.slotTime);
//         const currentDate = new Date();
//         const timeDifferenceInDays = Math.ceil((appointmentDate - currentDate) / (1000 * 3600 * 24));

//         // Refund Logic based on time difference
//         let refundAmount = 0;

//         // Full refund if the cancellation is done 2 days before the appointment
//         if (timeDifferenceInDays >= 2) {
//             refundAmount = appointmentData.amount;
//         } else if (timeDifferenceInDays >= 0) {
//             // No refund if the cancellation is done on the appointment day
//             refundAmount = 0;
//         }

//         // Process the refund if applicable
//         if (refundAmount > 0) {
//             const paymentDetails = await razorpayInstance.payments.fetch(appointmentData.paymentId);
//             const refund = await razorpayInstance.payments.refund(paymentDetails.id, { amount: refundAmount * 100 }); // Amount in paise
//             console.log('Refund Successful:', refund);
//         }

//         // Cancel the appointment and release the doctor's slot
//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

//         const { docId, slotDate, slotTime } = appointmentData;
//         const doctorData = await doctorModel.findById(docId);
//         let slots_booked = doctorData.slots_booked;
//         slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: "Appointment cancelled" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

export const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        //releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "appointment cancelled" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const razorpayInstance = new Razorpay(
    {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    }
)

//API to make payment of appointment using razor pay
export const paymentRazorPay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment cancelled or not found" })
        }

        //appointment is not cancelled then we can create options for Razorpay payment
        const options = {
            amount: appointmentData.amount * 100,//remove decimal points
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }
        //creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({ success: true, order })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to verify the payment of razorpay
export const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log(orderInfo)
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ sucess: false, message: "Payment Failed" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}