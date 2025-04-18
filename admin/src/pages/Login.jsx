import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    //manage admin / doctor login . whenever we open the login page by default the state will be admin
    const [state, setState] = useState('Admin');
    const { setAdminToken, backendUrl } = useContext(AdminContext);
    const { setDoctorToken } = useContext(DoctorContext);

    //creating state for storing email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    // Sends a POST request to the /api/admin/login endpoint with the email and password in the request body.
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
            if (state === 'Admin') {
                if (data.success) {
                    console.log("ADMIN TOKEN : " +data.token);
                    localStorage.setItem('admintoken', data.token);
                    setAdminToken(data.token);
                    toast.success('Login success');
                }
                else {
                    toast.error(data.message);
                }
            }
            else {
                const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
                if (data.success) {
                    console.log("DOCTOR TOKEN : " +data.token);
                    localStorage.setItem('doctortoken', data.token);
                    setDoctorToken(data.token);
                    toast.success('Login success');
                }
                else {
                    toast.error(data.message)
                }
            }
        }
        catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <form className='min-h-screen flex flex-col justify-center items-center ' onSubmit={onSubmitHandler}>
            <div className='flex flex-col items-start gap-3 m-auto p-8 min-w-[390px] sm:min-w-96 border border-zinc-200 rounded-xl text-[#SESESE] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-blue-700'>{state}</span> Login </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <button className='bg-blue-500 text-white w-full py-2 rounded-md text-base'>Login</button>

                {
                    state === 'Admin' ?
                        <p>Doctor Login ? <span onClick={() => setState("Doctor")} className='text-blue-700 underline cursor-pointer'>Click here</span></p>
                        :
                        <p>Admin Login ? <span onClick={() => setState("Admin")} className='text-blue-700 underline cursor-pointer'>Click here</span></p>

                }
            </div>
        </form>
    )
}

export default Login
