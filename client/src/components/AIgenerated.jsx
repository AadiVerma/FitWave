import { useEffect, useState } from "react";
import axios from 'axios';
import '../App.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { authselector } from "../redux/slices/slice";
import { useNavigate } from "react-router-dom";
const parseWorkoutPlan = (response) => {
    // Split the response into sections for each day or additional tips
    console.log(response);
    const sections = response.trim().split(/\n(?=[A-Za-z])/);

    const parsedData = {};

    // Define valid weekday keys and additional tips key
    const validKeys = [
        'Monday:',
        'Tuesday:',
        'Wednesday:',
        'Thursday:',
        'Friday:',
        'Saturday:',
        'Additional tips:',
        'Additional Tips:'
    ];

    sections.forEach(section => {
        const lines = section.trim().split('\n');
        const dayName = lines.shift().trim();
         console.log(lines);
        // Only process if the dayName is a valid key
        if (validKeys.includes(dayName)) {
            if (dayName === 'Additional tips:' || dayName==='Additional Tips:') {
                parsedData['Additional Tips'] = lines.map(tip => tip.trim().replace(/^\*\s*/, ''));
            } else {
                parsedData[dayName] = lines.map(line => {
                    // Remove leading numbers, special characters, and bullet points from the details
                    const [type, ...details] = line.split(':');
                    const cleanedDetails = details.join(':').trim().replace(/^\d+\.\s*/, '').replace(/^[^\w\s]+/, '');
                    return { type: type.trim(), details: cleanedDetails };
                }).filter(entry => entry.type);
            }
        }
    });

    return parsedData;
};






export default function Aigenerated() {
    const state=useSelector(authselector);
    const navigate=useNavigate();
    useEffect(()=>{
      if(!state){
        navigate("/login");
      }
    },[])
    const [data, setData] = useState();
    const handleclick = async () => {
        const data1 = await axios.get('http://localhost:3000/api/ai', {
            withCredentials: true
        });
        console.log(data1);
        const structuredPlan = parseWorkoutPlan(data1.data);
        setData(structuredPlan);
        console.log(structuredPlan);
    }
    return (

        <div className="bg- from-gray-900 via-teal-900 to-black text-white font-space custom-scrollbar min-h-[100%] h-fit">
            <div className="flex justify-center items-center mt-6">
                <h1 className="text-3xl font-extrabold font-manrope leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">Personalized Fitness Plan Crafted by AI</h1>
            </div>
            <div className="flex justify-center mt-10">
                <div className="relative inline-flex  group">
                    <div
                        className="outline-none absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-70 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                    </div>
                    <button onClick={handleclick}
                        className="outline-none relative inline-flex items-center justify-center px-6 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-400"
                    >Generate with Ai
                    </button>
                </div>
            </div>
            <div className="mt-6">
            {data && Object.keys(data).map((key) => (
                    <div key={key} className="flex flex-col items-start ml-[30%] mb-4">
                        <h1 className="text-2xl font-bold text-[#CCFF33] mb-3">{key}</h1>
                        <ul className="space-y-2">
                        {Array.isArray(data[key]) && data[key]
                                .filter(item => item && item !== "")
                                .map((item, index) => (
                                    typeof item === 'string' ? (
                                        // Rendering for "Additional Tips"
                                        <li key={index} className="flex gap-4 text-gray-300"> <FaArrowRightLong className="text-lg mt-1 text-indigo-600" />{item}</li>
                                    ) : (
                                        // Rendering for weekday plans
                                        <li key={index} className="flex gap-4">
                                            <FaArrowRightLong className="text-lg mt-1 text-indigo-600" />
                                            <div className="gap-1 flex">
                                                {item.type}
                                                {item.details && <span className="text-gray-300">: {item.details}</span>}
                                            </div>
                                        </li>
                                    )
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        // {data?.data}
    )
}
