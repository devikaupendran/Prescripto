import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>About <span className="text-gray-700 font-medium">Us</span></p>
            </div>

            <div className="flex flex-col my-10 md:flex-row gap-12">
                <img src={assets.about_image} alt="aboutImg" className="w-full max-w-[360px]" />
                <div className="flex flex-col justify-center gap-6  md:w-2/4 text-sm text-gray-600">
                    <p>
                        Welcome to Vivid Life Hospital, your trusted partner in managing your
                        healthcare needs conveniently and efficiently. At Vivid Life, we
                        understand the challenges individuals face when it comes to
                        scheduling doctor appointments and managing their health records.
                    </p>

                    <p>
                        Vivid Life is committed to excellence in healthcare technology. We
                        continuously strive to enhance our platform, integrating the latest
                        advancements to improve user experience and deliver superior
                        service. Whether you're booking your first appointment or managing
                        ongoing care, Vivid Life  is here to support you every step of the
                        way.
                    </p>

                    <p className="text-gray-900">Our Vision</p>
                    <p>
                        Our vision at Vivid Life is to create a seamless healthcare
                        experience for every user. We aim to bridge the gap between patients
                        and healthcare providers, making it easier for you to access the
                        care you need, when you need it.
                    </p>
                </div>
            </div>

            <div className="text-xl my-4">
                <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
            </div>

            <div className="flex flex-col md:flex-row mb-20">
                <div className="border border-gray-400 py-4 my-2 px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all ease-in duration-300 text-gray-600 cursor-pointer">
                    <b>Efficiency:</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
                <div className="border border-gray-400 py-4 my-2 px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all ease-in duration-300 text-gray-600 cursor-pointer">
                    <b>Convenience:</b>
                    <p>Access to a network of trusted healthcare professionals in your area.</p>
                </div>
                <div className="border border-gray-400 py-4 my-2 px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all ease-in duration-300 text-gray-600 cursor-pointer">
                    <b>Personalization:</b>
                    <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
