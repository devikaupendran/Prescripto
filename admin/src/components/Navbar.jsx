import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const { admintoken, setAdminToken } = useContext(AdminContext);
    const { doctortoken, setDoctorToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    //if admin click on logout button then navigate to home page and value of admintoken will '' and remove item from local storage
    const logout = () => {
        navigate('/');
        admintoken && setAdminToken('');
        doctortoken && setDoctorToken('')
        admintoken && localStorage.removeItem('admintoken');
        doctortoken && localStorage.removeItem('doctortoken');
    }
    
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-b-zinc-300 bg-white'>
            <div className='flex items-center gap-5 text-xs'>
                <img src={assets.logo} alt="admin logo" className='w-34 cursor-pointer' />
                <p className='border border-gray-500 text-gray-600 px-3 py-1 rounded-full cursor-pointer'>{admintoken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button className='bg-indigo-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer' onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar
