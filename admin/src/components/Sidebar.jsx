import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {

    const { admintoken } = useContext(AdminContext);
    const {doctortoken} = useContext(DoctorContext);
    return (
        <div className='min-h-screen bg-white border-r border-r-zinc-400'>
            {
                admintoken && <ul className='text-[#515151] mt-5'>

                    <NavLink to={'/admin-dashboard'}
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img src={assets.home_icon} alt="home icon" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink to={'/all-appointments'}
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img src={assets.appointment_icon} alt="appointment icon" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink to={'/add-doctor'}
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img src={assets.add_icon} alt="add icon" />
                        <p className='hidden md:block'>Add Doctor</p>
                    </NavLink>

                    <NavLink to={'/doctor-list'}
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img src={assets.people_icon} alt="people icon" />
                        <p className='hidden md:block'>Doctors List</p>
                    </NavLink>

                </ul>
            }

            {
                doctortoken && <ul className='text-[#515151] mt-5'>

                    <NavLink to={'/doctor-dashboard'}
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img src={assets.home_icon} alt="home icon" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink to={'/doctor-appointments'}
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img src={assets.appointment_icon} alt="appointment icon" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink to={'/doctor-profile'}
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                        <img src={assets.people_icon} alt="people icon" />
                        <p className='hidden md:block'>Profile</p>
                    </NavLink>

                </ul>
            }
        </div>
    )
}

export default Sidebar
