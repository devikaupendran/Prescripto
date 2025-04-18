import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointments = () => {

    const { doctortoken, appointments, getAppointments, completeAppointment, cancelAppointment, acceptAppointment } = useContext(DoctorContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

    useEffect(() => {
        if (doctortoken) {
            getAppointments()
        }
    }, [doctortoken])
    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
            <div className='bg-white border border-zinc-300 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-b-zinc-300'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fee</p>
                    <p>Action</p>
                </div>

                {
                    appointments.reverse().map((item, index) => {
                        return (
                            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base
                                                        sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-b-zinc-300
                                                        hover:bg-gray-100'>
                                {/* serial number  */}
                                <p className='max-sm:hidden'>{index + 1}</p>

                                {/* patient image and name  */}
                                <div className='flex items-center gap-2'>
                                    <img src={item.userData.image} className='w-8 rounded-full' alt="user image" />
                                    <p>{item.userData.name}</p>
                                </div>

                                {/* patients payment method  */}
                                <div>
                                    <p className={`text-xs inline   px-2 rounded-full ${item.payment ? 'text-green-600' : 'text-red-500'}`}>{item.payment ? 'PAID' : 'PENDING'}</p>
                                </div>

                                {/* patient age  */}
                                <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

                                {/* date and time of appointment  */}
                                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                                {/* appointment fee  */}
                                <p >{currency} {item.amount}</p>

                                {
                                    item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                        :
                                        item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                                            :
                                            item.isAccepted ? <div className='flex items-center gap-x-3' >
                                                <p className='text-blue-500 text-xs font-medium'>Accepted</p>
                                                {
                                                    item.isAccepted && item.payment && <img className='w-8 h-8 cursor-pointer' onClick={() => completeAppointment(item._id)} src={assets.completed} alt="tick icon" />
                                                }
                                            </div>
                                                :
                                                <div className='flex items-center gap-x-3'>
                                                    <img className='w-9 h-9 cursor-pointer' onClick={() => cancelAppointment(item._id)} src={assets.cancelled} alt="cancel icon" />
                                                    <img className='w-8 h-8 cursor-pointer' onClick={() => acceptAppointment(item._id)} src={assets.checked} alt="accepted icon" />
                                                    {/* <img className='w-10 cursor-pointer' onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt="tick icon" /> */}
                                                </div>
                                }

                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default DoctorAppointments
