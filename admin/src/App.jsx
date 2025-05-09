import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

    const { admintoken } = useContext(AdminContext);
    const { doctortoken } = useContext(DoctorContext);
    // if we have token then show this toastcontainer otherwise show the login page
    return admintoken || doctortoken ? (
        <div className='bg-[#F8F9FD]'>
            <ToastContainer />
            <Navbar />
            <div className='flex items-start'>
                <Sidebar />
                <Routes>

                    {/* Admin routes */}
                    <Route path='/' element={<></>} />
                    <Route path='/admin-dashboard' element={<Dashboard />} />
                    <Route path='/all-appointments' element={<AllAppointments />} />
                    <Route path='/add-doctor' element={<AddDoctor />} />
                    <Route path='/doctor-list' element={<DoctorsList />} />

                    {/* Doctor routes  */}
                    <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                    <Route path='/doctor-appointments' element={<DoctorAppointments />} />
                    <Route path='/doctor-profile' element={<DoctorProfile />} />
                </Routes>
            </div>
        </div>
    ) : (
        <>
            <Login />
            <ToastContainer />
        </>
    )
}

export default App
