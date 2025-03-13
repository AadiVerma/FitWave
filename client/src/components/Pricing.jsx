import PropTypes from 'prop-types';
import { authselector } from '../redux/slices/slice';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Noprofile from '/Noprofile.jpg';
const profile = localStorage.getItem("profilePic");
import { removecookie } from '../redux/slices/slice';
import toast from 'react-hot-toast';
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import PricingCard from './PricingCard';
import  axios  from 'axios';
import { Toaster } from 'react-hot-toast';
export default function Pricing() {
    const navigate = useNavigate();
    const [showDropDown, setshowdropdown] = useState(false);
    const dispatch = useDispatch();
    const refdropdown = useRef();
    const [plan,setplan] = useState("Free");
    const auth = useSelector(authselector);
    const username = localStorage.getItem("username");
    const handleClickOutside = (event) => {
        if (refdropdown.current && !refdropdown.current.contains(event.target)) {
            setshowdropdown(false);
        }
    }
    useEffect(()=>{
        const fetch=async()=>{
            const data=await axios.get(`http://localhost:3000/user/getAIplanPurchases/${username}`);
            setplan(data.data);
        }
        fetch();
    },[])
    return (
        <div className=' min-h-screen w-full bg-black font-space text-white'>
            <Toaster/>
            <div className={`flex justify-between p-4 z-20 border-b-2 border-b-neutral-800`} onClick={handleClickOutside}>
                <h1 className='text-3xl'>
                    <div className='flex gap-4'>
                        {/* <FaDumbbell className='text-[#CCFF33] text-4xl' /> */}
                        <span className="text-white font-bold">FitWave</span>
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
            <div className='w-[100%] mb-4 mt-4'>
                <h1 className='flex justify-center text-4xl font-semibold text-white'>Simple and Affordable</h1>
                <h2 className='flex justify-center text-4xl font-semibold mt-2 '>Pricing Plans</h2>
                <h3 className='flex justify-center text-lg font-semibold mt-2 text-neutral-400'>Achieve your fitness goals with personalized plans at unbeatable prices!</h3>
                <div className='flex gap-2 justify-center mt-4'>
                    <PricingCard planName={"Free"} price={"0"} heading={"Limited workout videos, basic training plans, community support."} features={['5 free workout videos per month',
                        'Community access (forums, basic challenges)',
                        'Limited diet plans', 'Basic support (via email)']} buttontext={"Start for free"} plan={plan} setplan={setplan}/>
                    <PricingCard planName={"Premium"} price={"19.99"} heading={"Full access to all workout videos, personalized training plans, and additional content."} features={['Unlimited workout videos',
                        'Personalized training plans',
                        'Advanced diet plans',
                        'Access to private groups and challenges',
                        'Priority email support']} premium={true} buttontext={"Start Premium"} plan={plan} setplan={setplan}/>
                    <PricingCard planName={"Pro"} price={"49.99"} heading={" Everything in the Premium Plan plus exclusive one-on-one coaching, premium content, and additional advanced features."} features={['All Premium features',
                        'Personal 1-on-1 coaching (online)',
                        'Exclusive VIP workout content',
                        'Access to high-level nutrition and fitness resources',
                        'Direct chat support with trainers',
                        'Priority access to new features and challenges']} buttontext={"Start Pro"} plan={plan} setplan={setplan}/>
                </div>
            </div>
        </div>
    )
}

Pricing.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
