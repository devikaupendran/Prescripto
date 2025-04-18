import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    //if localstorage  has   a admintoken then initialize with that token otherwise set it as empty string
    const [admintoken, setAdminToken] = useState(localStorage.getItem('admintoken') ? localStorage.getItem('admintoken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //create a state for storing the all doctors data from the DB, created a function  for make an API call using axios and take the response in data variable
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false)


    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { admintoken } })
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function for change availability
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { admintoken } })
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();//to update the data
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function for get all appointments
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { admintoken } });
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function for handle cancelAppointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { admintoken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments();
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //function for handle dash data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { admintoken } });
                 if(data.success){
                    setDashData(data.dashData)
                    console.log(data.dashData)
                 } else {
                    toast.error(data.message)
                 }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        admintoken, setAdminToken, backendUrl, doctors, getAllDoctors, changeAvailability, getAllAppointments,
        appointments, setAppointments, cancelAppointment,dashData, getDashData
    }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider