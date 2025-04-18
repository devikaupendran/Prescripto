import express from 'express'
import { addDoctor, adminDashboard, adminLogin, allDoctors, appointmentCancelledByAdmin, appointmentsAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

//creating router
const adminRouter = express.Router();

//send form data with an field name image then middleware will process this img and form data

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor); //localhost:4000/api/admin/add-doctor
adminRouter.post('/login', adminLogin); //localhost:4000/api/admin/login
adminRouter.post('/all-doctors', authAdmin, allDoctors);  //localhost:4000/api/admin/all-doctors
adminRouter.post('/change-availability', authAdmin, changeAvailability);  //localhost:4000/api/admin/change-availability
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);  //localhost:4000/api/admin/appointments
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancelledByAdmin);  //localhost:4000/api/admin/cancel-appointment
adminRouter.get('/dashboard', authAdmin, adminDashboard);  //localhost:4000/api/admin/dashboard

export default adminRouter;