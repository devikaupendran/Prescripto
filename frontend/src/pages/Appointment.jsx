import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {

    //accessing the params form the URL
    const { docId } = useParams();
    const { doctors, currencySymbol, token, backendUrl, getDoctorsData } = useContext(AppContext);
    const [docInfo, setDocInfo] = useState(null);

    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    let [slotTime, setSlotTime] = useState("");
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const navigate = useNavigate();

    //to find particular doctor by ID
    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDocInfo(docInfo);
    };

    const getAvailableSlot = async () => {
        setDocSlots([]);

        // Getting current date
        let today = new Date();
        for (let i = 0; i < 7; i++) {
            // Getting date with index
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            // Setting end time of date with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0); // 3 zeros are hr, min, sec

            // Setting hours
            if (today.getDate() === currentDate.getDate()) {
                // For today, calculate the next available slot
                let currentHour = currentDate.getHours();
                let currentMinutes = currentDate.getMinutes();

                // If minutes are greater than or equal to 30, we need to move to the next hour
                if (currentMinutes >= 30) {
                    currentDate.setHours(currentHour + 1);
                    currentDate.setMinutes(0);
                } else {
                    // If minutes are less than 30, we set minutes to 30
                    currentDate.setHours(currentHour);
                    currentDate.setMinutes(30);
                }

                // Ensure we don't start before 10 AM
                if (currentDate.getHours() < 10) {
                    currentDate.setHours(10);
                    currentDate.setMinutes(0);
                }
            } else {
                // For future days, start at 10 AM
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                // Create slot for every 30 min interval
                let formattedTime = currentDate.toLocaleDateString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // Ensure time format is in AM/PM
                });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = `${day}_${month}_${year}`;
                const slotTime = formattedTime.split(",")[1].trim();

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
                if (isSlotAvailable){
                    // Add slot to array
                    timeSlots.push({
                        dateTime: new Date(currentDate),
                        time: formattedTime,
                    });
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setDocSlots((prev) => [...prev, timeSlots]);
        }
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Please login to book your appointment.")
            return navigate('/login')
        }
        try {
            const date = docSlots[slotIndex][0].dateTime
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            const slotDate = `${day}_${month}_${year}`; //create a new format

            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });
            if (data.success) {
                toast.success(data.message)
                getDoctorsData();
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    //if any of these data in the array change then this function will run
    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlot();
    }, [docInfo]);

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots]);

    //if docInfo has value then only display the data
    return (
        docInfo && (
            <div>
                {/* ---------- Doctor Details -------------- */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* doctor image section  */}
                    <div>
                        <img
                            src={docInfo.image}
                            className="bg-blue-500 sm:max-w-72 rounded-lg"
                        />
                    </div>

                    {/* doctor info : name, degree, experience */}
                    <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                        <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                            {docInfo.name} <img src={assets.verified_icon} className="w-5" />
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <p>
                                {docInfo.degree} - {docInfo.speciality}
                            </p>
                            <button className="py-0.5 px-2 border text-xs rounded-full">
                                {docInfo.experience}
                            </button>
                        </div>

                        {/* -------- Doctor About -------- */}
                        <div>
                            <p className="flex items-center  gap-2 text-sm font-medium text-gray-900 mt-3">
                                About <img src={assets.info_icon} />
                            </p>
                            <p className="teext-sm text-gray-500 max-w-[700px] mt-1">
                                {docInfo.about}
                            </p>
                        </div>
                        <p className="text-gray-500 font-medium mt-4">
                            Appointment fee:{" "}
                            <span className="text-gray-600">
                                {currencySymbol}
                                {docInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>

                {/* ---------- booking slots ---------- */}
                <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                    <p>Booking slots</p>
                    <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                        {docSlots.length &&
                            docSlots.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => setSlotIndex(index)}
                                        key={index}
                                        className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index
                                            ? "bg-blue-500 text-white"
                                            : "border border-gray-200"
                                            }`}
                                    >
                                        <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                        <p>{item[0] && item[0].dateTime.getDate()}</p>
                                    </div>
                                );
                            })}
                    </div>

                    {/*---------- time section ---------- */}
                    <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                        {docSlots.length &&
                            docSlots[slotIndex].map((item, index) => {
                                let time = item.time.split(",")[1].trim()
                                return (

                                    <p
                                        key={index}
                                        onClick={() => setSlotTime(time)}
                                        className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${time === slotTime
                                            ? "bg-blue-500 text-white"
                                            : "text-gray-400 border border-ray-400"
                                            }`}
                                    >
                                        {time}
                                    </p>
                                );
                            })}
                    </div>

                    {/* book appointment button  */}
                    <button className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer"
                        onClick={bookAppointment}>
                        Book an appointment
                    </button>
                </div>

                {/*---------- listing related doctors  ----------*/}
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
        )
    );
};

export default Appointment;
