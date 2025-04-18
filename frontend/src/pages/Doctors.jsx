import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {

    const { speciality } = useParams();
    const { doctors } = useContext(AppContext);
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setshowFilter] = useState(false);
    const navigate = useNavigate();

    console.log("speciality" + speciality)

    //if there anyone click on speciality then filter based on that 
    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(
                doctors.filter((doc) => doc.speciality.toLowerCase() === speciality.toLowerCase())
            )
        }
        else {
            setFilterDoc(doctors)
        }
    }

    //whenever the user speciality is changed this will be executed 
    useEffect(() => {
        applyFilter();
    }, [doctors, speciality])

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-4 mt-5'>

                {/* show filters button on mobile screen only */}
                <button onClick={() => setshowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden
                    ${showFilter ? 'bg-blue-500' : ''}`}>Filters</button>

                {/* ---------categories--------- 
                        if any speciality is already selected then move to all doctors otherwise display the doctors based on speciality*/}
                <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
                        className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                        ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>
                       General physician
                    </p>

                    <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
                        className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                        ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>
                        Gynecologist
                    </p>

                    <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
                        className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                        ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>
                        Dermatologist
                    </p>

                    <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
                        className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                        ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>
                        Pediatricians
                    </p>

                    <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
                        className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                        ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>
                        Neurologist
                    </p>

                    <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
                        className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                        ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>
                        Gastroenterologist
                    </p>
                </div>

                {/* doctors list section  */}
                <div className='w-full grid grid-cols-auto sm:grid-cols-2 md:grid-cols-4 gap-5 pt-5 gap-y-6 px-3 sm:px-0'>
                    {
                        filterDoc.map((item, index) => {
                            return (
                                <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                                    <img src={item.image} className='bg-blue-50' />
                                    <div className='p-4'>
                                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}  `}>
                                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500 rounded-full' : 'bg-red-500 rounded-full'} `}></p>
                                            <p>{item.available ? 'Available' : 'Not Available'}</p>
                                        </div>
                                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Doctors
