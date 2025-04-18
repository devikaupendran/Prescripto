import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets.js'

const AllAppointments = () => {

    const { admintoken, appointments, setAppointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

    //when there is an admin token then getAllAppointments function is called
    useEffect(() => {
        if (admintoken) {
            getAllAppointments();
        }
    }, [admintoken])

    //rendering the UI
    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
            <div className='bg-white border border-zinc-400 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-b-zinc-400'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>
                {
                    appointments.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-b-zinc-400 hover:bg-gray-100 '>

                                {/* seriel number  */}
                                <p className='max-sm:hidden'>{index + 1}</p>

                                {/* patient image and name  */}
                                <div className='flex items-center gap-2'>
                                    <img src={item.userData.image} alt="patientImage" className='w-8 rounded-full' />
                                    <p>{item.userData.name}</p>
                                </div>

                                {/* patient dob  */}
                                <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

                                {/* the time and date provide by the patient for book appointment  */}
                                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                                {/* doctor image and name  */}
                                <div className='flex items-center gap-2'>
                                    <img src={item.doctorData.image} alt="patientImage" className='w-8 rounded-full bg-gray-200' />
                                    <p>{item.doctorData.name}</p>
                                </div>

                                {/* fees of doctor  */}
                                <p> {currency}{item.amount}</p>

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
    )
}

export default AllAppointments
