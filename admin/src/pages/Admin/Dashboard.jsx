import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {

    const { admintoken, dashData, getDashData, cancelAppointment } = useContext(AdminContext);
    const { slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (admintoken) {
            getDashData();
        }
    }, [admintoken])

    return dashData && (
        <div className='m-5 '>
            <div className='flex flex-wrap gap-4'>

                {/* doctor icon and total number of doctors  */}
                <div className='flex items-center gap-2 bg-white shadow p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.doctor_icon} alt="doctor Icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
                        <p className='text-gray-400'>Doctors</p>
                    </div>
                </div>
                {/* Appointments icon and total number of Appointments  */}
                <div className='flex items-center gap-2 bg-white  p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all shadow'>
                    <img src={assets.appointments_icon} alt="appointment Icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>
                {/* Patients icon and total number of Patients */}
                <div className='flex items-center gap-2 bg-white  p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all shadow'>
                    <img src={assets.patients_icon} alt="patients_icon" className='w-14' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>

            </div>
            {/* lastest five appointments  */}
            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-zinc-300'>
                    <img src={assets.list_icon} alt="list icon" />
                    <p className='font-semibold'>Latest Appointments</p>
                </div>

                <div className='pt-4 border border-t-0 border-zinc-300'>
                    {
                        dashData.latestAppointments.map((item, index) => {
                            return (
                                <div key={index} className='flex items-center gap-3 px-6 py-3 hover:bg-gray-100'>

                                    <img src={item.doctorData.image} alt="doctor image" className='rounded-full w-10 bg-gray-100' />
                                    <div className='flex-1 text-sm'>
                                        <p className='text-gray-800 font-medium'>{item.doctorData.name}</p>
                                        <p className='text-gray-800'>{slotDateFormat(item.slotDate)}</p>
                                    </div>
                                    {
                                        item.cancelled ?
                                            <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                            :
                                            item.isCompleted ?
                                                <p className='text-green-500 text-xs font-medium'>Completed</p>
                                                :
                                                <img src={assets.cancel_icon} alt="cancelicon" className='w-10 cursor-pointer' onClick={() => cancelAppointment(item._id)} />
                                    }
                                </div>
                            )
                        })

                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
