import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctortoken, setDoctorToken] = useState(localStorage.getItem('doctortoken') ? localStorage.getItem('doctortoken') : '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false)

    //function to handle the get appointments
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { doctortoken } })
            if (data.success) {
                setAppointments(data.appointments);//get latest appointment first
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function to handle the complete appointment
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, { headers: { doctortoken } })
            if (data.success) {
                toast.success(data.message);
                getAppointments()
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function to cancel the  appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, { headers: { doctortoken } })
            if (data.success) {
                toast.success(data.message);
                getAppointments()
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    const acceptAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/accept-appointment`, { appointmentId }, { headers: { doctortoken } });
            if (data.success) {
                toast.success(data.message); // Show success message
                getAppointments(); // Refresh appointments
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to handle the api for getDash data
    const getDoctorDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { doctortoken } })
            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function to handle the api for getting profile data
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { doctortoken } })
            if (data.success) {
                setProfileData(data.profileData);
                console.log(data.profileData)
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        doctortoken, setDoctorToken, backendUrl, getAppointments, appointments, setAppointments,
        cancelAppointment, completeAppointment, getDoctorDashData, acceptAppointment, dashData, setDashData,
        profileData, setProfileData, getProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider