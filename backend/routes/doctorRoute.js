import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorList, loginDoctor, doctorDashboard, doctorProfile, updateDoctorProfile, appointmentAccept } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js';


const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList);//localhost:4000/api/doctor/list
doctorRouter.post('/login', loginDoctor);//localhost:4000/api/doctor/login
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);//localhost:4000/api/doctor/appointments
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);//localhost:4000/api/doctor/complete-appointment
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);//localhost:4000/api/doctor/cancel-appointment
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);//localhost:4000/api/doctor/dashboard
doctorRouter.get('/profile', authDoctor, doctorProfile);//localhost:4000/api/doctor/profile
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);//localhost:4000/api/doctor/update-profiles
doctorRouter.post('/accept-appointment', authDoctor, appointmentAccept);//localhost:4000/api/doctor/accept-appointment

export default doctorRouter
