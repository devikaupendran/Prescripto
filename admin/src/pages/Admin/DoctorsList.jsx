import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
    const { doctors, admintoken, getAllDoctors, changeAvailability } = useContext(AdminContext);

    //whenever the adminToken will updated then it will execute the function
    useEffect(() => {
        if (admintoken) {
            getAllDoctors()
        }
    }, [admintoken]);

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>
            <div className='w-full flex flex-wrap gap-2 pt-5 gap-y-8'>
                {
                    doctors.map((item, index) => {
                        return (
                            <div key={index} className='border border-indigo-200 rounded-xl max-w-56 cursor-pointer overflow-hidden group'>
                                <img src={item.image} alt="docImage" className='bg-indigo-50 group-hover:bg-blue-400 transition-all duration-500' />
                                <div className='p-4'>
                                    <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                                    <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                                    <div className='flex mt-2 item-center gap-1 text-sm'>
                                        <input type="checkbox" checked={item.available} onChange={() => changeAvailability(item._id)} />
                                        <p>Available</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DoctorsList
