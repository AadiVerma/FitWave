import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { authselector } from '../redux/slices/slice';
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Noprofile from '/Noprofile.jpg';
const profile = localStorage.getItem("profilePic");
import { removecookie } from '../redux/slices/slice';
import toast from 'react-hot-toast';
import { FiLogOut } from "react-icons/fi";

import { useDispatch, useSelector } from 'react-redux';
export default function Trainer() {
    const { image, name } = useParams();
    const navigate = useNavigate();
    const [showDropDown, setshowdropdown] = useState(false);
    const dispatch = useDispatch();
    const refdropdown = useRef();
    const auth = useSelector(authselector);
    const handleClickOutside = (event) => {
        if (refdropdown.current && !refdropdown.current.contains(event.target)) {
            setshowdropdown(false);
        }
    }
    return (
        <div className=' min-h-screen w-full bg-black font-space text-white'>
            <div className={`flex justify-between p-4 z-50`} onClick={handleClickOutside}>
                <h1 className='text-3xl'>
                    <div className='flex gap-4 cursor-pointer z-20' onClick={()=>navigate("/")}>
                        <span className="text-white font-bold z-20" >FitWave</span>
                    </div>
                </h1>
                <div className='flex gap-4 text-xl cursor-pointer z-20'>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => navigate("/")}>HOME</h1>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => { navigate('/todo') }}>TODO PLAN</h1>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => {
                        navigate("/classes")
                    }}>CLASSES</h1>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => {
                        navigate("/shop")
                    }}>SHOP</h1>
                    <a className='hover:text-[#CCFF33]' onClick={() => navigate("/")}>TRAINERS</a>
                    <a className='hover:text-[#CCFF33]' onClick={() => navigate("/pricing")}>PRICING</a>
                </div>
                {auth == false ? <div className='flex gap-4'>
                    <button className='border-2 border-[#CCFF33] bg-[#CCFF33] p-2 pl-6 pr-6 rounded hover:bg-[black] hover:text-white text-black font-bold' onClick={() => {
                        navigate("/login")
                    }}>LogIn</button>
                    <button className='border-2 border-[#CCFF33] p-2 pl-5 pr-5 rounded hover:bg-[#CCFF33] hover:text-black font-bold' onClick={() => {
                        navigate("/signup")
                    }}>SignUp</button>
                </div> : <div className='flex gap-4'>
                    <div className="flex-col justify-center place-content-center cursor-pointer" onClick={() => setshowdropdown((prev) => !prev)}>
                        <div className="h-12  w-12 rounded-full border-2 border-[#dbd9d971] bg-[#212121]">
                            <img src={profile === undefined ? Noprofile : profile} className="rounded-full" />
                        </div>
                    </div>
                </div>}

            </div>
            <div className='relative'>
                {showDropDown && auth && <div ref={refdropdown} className="z-50 absolute right-11 -top-3 font-bold border-2 border-[#dbd9d971] rounded-lg shadow w-40 bg-black text-white">
                    <ul className="py-2 text-md text-gray-700 dark:text-gray-200">
                        <li>
                            <a href="/dashboard" className="block px-4 py-2 hover:bg-[#111111]  dark:hover:text-[#CCFF33]">Dashboard</a>
                        </li>
                        <li>
                            <a href="/updateprofile" className="block px-4 py-2 hover:bg-[#111111]  dark:hover:text-[#CCFF33]">Profile</a>
                        </li>
                        {/* <li>
                                <a href="/updateprofile" className="block px-4 py-2 hover:bg-[#111111]  dark:hover:text-[#CCFF33]">Dashboard</a>
                            </li> */}
                        <li className=''>
                            <button className="flex gap-4 w-full text-left px-4 py-2 hover:bg-[#111111]  dark:hover:text-[#CCFF33]" onClick={() => {
                                dispatch(removecookie());
                                localStorage.removeItem("token")
                                localStorage.removeItem("username")
                                localStorage.removeItem("profilePic")
                                toast('LogOut Successfully!',
                                    {
                                        icon: '☠️',
                                        style: {
                                            borderRadius: '10px',
                                            background: '#333',
                                            color: '#fff',
                                        },
                                    }
                                );
                                navigate("/login")
                            }}>
                                Sign out
                                <div className='flex flex-col justify-center text-2xl'>
                                    <FiLogOut />
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>}
            </div>


            {/* Background Image (Aligned to the Left) */}
            <div className='relative'></div>
            <div className='absolute inset-0 w-2/4'>
                <img
                    src={`/${image}`}
                    alt="Background"
                    className='w-full h-full object-cover grayscale opacity-80'
                />
            </div>
            <div className='relaive z-10 text-white'>
                <div className='absolute top-[20%] w-[100%]'>
                    <h1 className='absolute text-4xl md:text-6xl font-bold text-[#CCFF33] left-[60%]'>{name}</h1>
                </div>

                <div className='absolute top-[30%] w-full mt-4'>
                    <div className='flex gap-10 items-center absolute  left-[48%]'>
                        <div className='flex gap-4'>
                            <h1 className='text-lg  md:text-xl font-semibold text-[#CCFF33]'>Contact:</h1>
                            <h2 className='text-lg  md:text-xl'>+91 7888999928</h2>
                        </div>

                        <div className='flex gap-4'>
                            <h1 className='text-lg  md:text-xl font-semibold text-[#CCFF33]'>Email:</h1>
                            <h2 className='text-lg  md:text-xl'>abc@gmail.com</h2>
                        </div>
                    </div>
                </div>
                <div className='absolute top-[40%] left-[62%] flex gap-6'>
                    <div className="p-2 bg-transparent rounded-md border-2 border-white hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]">
                        <FaFacebookF />
                    </div>
                    <div className="p-2 bg-transparent rounded-md border-2 border-white hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]">
                        <AiFillInstagram />
                    </div>
                    <div className="p-2 bg-transparent rounded-md border-2 border-white hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]">
                        <FaXTwitter />
                    </div>
                </div>
                <div className='absolute top-[48%] left-[46%] text-lg flex text-start'>
                    <h1>Meet  <span className='text-[#CCFF33] text-xl ml-2 mr-2'>{name}</span>,an expert dedicated to helping you reach your fitness and wellness goals with personalized training and guidance.Transform your body and mind with   {name}, your personal guide to fitness, wellness, and strength</h1>
                </div>
                <div className='absolute bottom-[33%] left-[46%] text-2xl flex text-start'>
                    <h1 className='text-[#CCFF33] font-bold'>Certificates : </h1>
                </div>
                <div className='absolute border-2 w-[20%] h-[25%] left-[50%] bottom-[6%] bg-black border-black'>
                    <div className='flex gap-4'>
                        <img
                            src={`/certificate1.png`}
                            alt="Background"
                            className='w-full h-full object-cover border-2 p-2 rounded-lg border-neutral-500'
                        />
                        <img
                            src={`/certificate.png`}
                            alt="Background"
                            className='w-full h-full object-cover border-2 p-2 rounded-lg border-neutral-500'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

Trainer.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
