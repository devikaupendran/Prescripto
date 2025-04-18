import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';

//function for change the availability of doctor when clicked on checkbox
export const changeAvailability = async (req, res) => {
    try {
        //whenever we request we need to send the doctor id 
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Availability Changed" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//function for api to get all the doctors in frontend
export const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);//save all the doctors data exclude email and password
        res.json({ success: true, doctors })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//API for doctor login
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        //conpare the password in db with the password from the login form 
        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to get doctor appointments for doctor panel
export const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });//get all the appointment from the appointmentarray of dctr
        res.json({ success: true, appointments })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API for mark the appointment completed for doctor panel
export const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment Completed" })
        }
        else {
            return res.json({ success: false, message: "Mark failed" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API for cancel the appointment  for doctor panel
export const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: "Appointment Cancelled" })
        }
        else {
            return res.json({ success: false, message: "cancellation failed" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to accept the appointment for the doctor panel
export const appointmentAccept = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        // Find the appointment by ID
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Check if the appointment exists and belongs to the doctor
        if (appointmentData && appointmentData.docId.toString() === docId) {
            // If accepted, update the appointment status
            if (appointmentData.isAccepted) {
                return res.json({ success: false, message: "Appointment already accepted." });
            }

            // Update the appointment's status to accepted
            await appointmentModel.findByIdAndUpdate(appointmentId, { isAccepted: true });

            return res.json({ success: true, message: "Appointment Accepted" });
        } else {
            return res.json({ success: false, message: "Appointment not found or does not belong to the doctor." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API for get dashboard data for the doctor panel
export const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId })
        let earnings = 0;
        appointments.map((item) => {

            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        let patients = []
        appointments.map((item) => {

            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to get doctor profile for doctor panel
export const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, profileData })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API for update the profile page form the doctor panel
export const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available }, { new: true })
        res.json({ success: true, message: "Profile Updated" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}