import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorPay, registerUser, updateProfile, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router()

userRouter.post('/register', registerUser); //localhost:4000/api/user/register
userRouter.post('/login', loginUser); //localhost:4000/api/user/login
userRouter.get('/get-profile', authUser, getProfile); //localhost:4000/api/user/get-profile
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile); //localhost:4000/api/user/update-profile
userRouter.post('/book-appointment', authUser, bookAppointment); //localhost:4000/api/user/book-appointment
userRouter.get('/appointments', authUser, listAppointment); //localhost:4000/api/user/appointments
userRouter.post('/cancel-appointment', authUser, cancelAppointment); //localhost:4000/api/user/cancel-appointment
userRouter.post('/payment-razorpay', authUser, paymentRazorPay); //localhost:4000/api/user/payment-razorpay
userRouter.post('/verify-razorpay', authUser, verifyRazorpay); //localhost:4000/api/user/verify-razorpay

export default userRouter;