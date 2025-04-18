import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '..//../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    //creating states for collecting datas from the form 
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General Physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    //destructuring
    const { backendUrl, admintoken } = useContext(AdminContext);

    //handle the form data when user submit the form 
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!docImg) {
                return toast.error('Image not selected')
            }
            //creating a from data constructor
            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 })); //pass only string in form data so convert this JSON to string

            //console check
            formData.forEach((value, key) => { console.log(`${key} : ${value}`) })

            //API call for save data in db
            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { admintoken } })
            if (data.success) {
                toast.success(data.message);
                //reseting exclude experience and speciality
                setDocImg(false);
                setName('');
                setPassword('');
                setEmail('');
                setAddress1('');
                setAddress2('');
                setDegree('');
                setAbout('');
                setFees('');
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return (
        <form className='m-5 w-full' onSubmit={onSubmitHandler}>
            <p className='mb-3 text-lg fpnt-medium'>Add Doctor</p>

            <div className='bg-white px-8  py-8 border border-zinc-400 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

                {/* image upload section  */}
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="docImgInput">
                        <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} className=' w-16 cursor-pointer bg-gray-100 rounded-full' />
                    </label>
        
                    <input type="file" id="docImgInput" hidden onChange={(e) => setDocImg(e.target.files[0])} />
                    <p>Upload doctor <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    {/*-------------- first portion -------------- */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>

                            {/* doctor name  */}
                            <p>Doctor name</p>
                            <input type="text" placeholder='Name' required className='border rounded px-3 py-2  border-zinc-400'
                                onChange={(e) => setName(e.target.value)} value={name} />
                        </div>

                        {/* Email */}
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Email</p>
                            <input type="email" placeholder='Email' required className='border rounded px-3 py-2 border-zinc-400'
                                onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        {/* password  */}
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Password</p>
                            <input type="password" placeholder='Password' required className='border rounded px-3 py-2 border-zinc-400'
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        {/* experience  */}
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select className='border rounded px-3 py-2 border-zinc-400' onChange={(e) => setExperience(e.target.value)} value={experience}>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>

                        {/* fees  */}
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input type="number" placeholder='Your Fees' required className='border rounded px-3 py-2 border-zinc-400'
                                onChange={(e) => setFees(e.target.value)} value={fees} />
                        </div>
                    </div>

                    {/* -------------- second portion -------------- */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        {/* speciality  */}
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select className='border rounded px-3 py-2 border-zinc-400' onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                                <option value="General Physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gasteroenterologist">Gasteroenterologist</option>
                            </select>
                        </div>

                        {/* education  */}
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Education</p>
                            <input type="text" placeholder='Education' required className='border rounded px-3 py-2 border-zinc-400'
                                onChange={(e) => setDegree(e.target.value)} value={degree} />
                        </div>

                        {/* Address  */}
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input type="text" placeholder='Address 1' required className='border rounded px-3 py-2 border-zinc-400' onChange={(e) => setAddress1(e.target.value)} value={address1} />
                            <input type="text" placeholder='Address 2' required className='border rounded px-3 py-2 border-zinc-400' onChange={(e) => setAddress2(e.target.value)} value={address2} />
                        </div>
                    </div>
                </div>

                {/* -------------- about me section and button -------------- */}
                <div>
                    {/* about doctor  */}
                    <div>
                        <p className='mt-4 mb-2'>About Doctor</p>
                        <textarea placeholder='Write about Doctor' rows={5} required className='w-full px-4 pt-2 border rounded border-zinc-400'
                            onChange={(e) => setAbout(e.target.value)} value={about} />
                    </div>

                    <button type='submit' className='bg-blue-500 px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>Add Doctor</button>
                </div>
            </div>
        </form>
    )
}

export default AddDoctor;
