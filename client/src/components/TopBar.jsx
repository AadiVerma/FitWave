import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { authselector } from '../redux/slices/slice';
import { removecookie } from '../redux/slices/slice';
import { MdArrowDropDown } from "react-icons/md";
import toast from 'react-hot-toast';
import { useEffect, useState} from "react";
import Noprofile from '/Noprofile.jpg';
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
export default function TopBar({showDropDown,refdropdown,setshowdropdown}) {
    const [current, setcurrent] = useState();
    const dispatch = useDispatch();
    const auth = useSelector(authselector);
    const navigate = useNavigate();
    // dropdown should hide on clicking outside the scope
    useEffect(() => {
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 0 && hour < 12) {
            setcurrent('Morning');
        } else if (hour >= 12 && hour < 17) {
            setcurrent('Afternoon');
        } else {
            setcurrent('Evening');
        }
    }, [])
    const username = localStorage.getItem("username");
    const profile = localStorage.getItem("profilePic");
    return (
        <div className="flex bg-black h-fit  justify-between w-[100%]">
            <div className="text-white w-full mt-3 ml-6">
                <h1 className="text-[#CCFF33] text-lg font-space font-bold">Good {current}</h1>
                <h2 className="text-xl font-bold font-space">Welcome Back</h2>
            </div>
            <div className="flex w-full p-4 gap-4">
                <div className="text-white mr-[5%] flex-col justify-between place-content-center">
                    {/* <div className="flex border-2 rounded-2xl border-[#dbd9d957]">
                        <IoSearchOutline className="p-3 text-5xl text-[#dbd9d957]" />
                        <input className="bg-transparent outline-none placeholder:text-[#dbd9d9cb] font-space" placeholder="Search" />
                    </div> */}
                </div>
                {/* <div className="flex-col justify-center place-content-center">
                    <div className="p-2 pr-0 rounded-full border-2 border-[#dbd9d971] bg-[#212121] flex cursor-pointer h-fit" >
                        <IoNotificationsOutline className="text-2xl text-white" />
                        <div className="h-2 w-2 rounded-full bg-[#CCFF33] relative right-[30%] top-[100%]"></div>
                    </div>
                </div> */}
                <div className="flex gap-4 justify-end w-[100%]">
                    <div className="flex-col justify-end place-content-center">
                        <div className="h-12  w-12 rounded-full border-2 border-[#dbd9d971] bg-[#212121]">
                            <img src={profile === undefined ? Noprofile : profile} className="rounded-full" />
                        </div>
                    </div>
                    <div className="flex-col justify-end place-content-center ">
                        <div className="flex cursor-pointer"  onClick={()=>setshowdropdown((prev)=>!prev)}>
                            <h1 className="text-white text-sm font-space font-bold">{username}</h1>
                            <div className="flex-col text-white justify-center place-content-center cursor-pointer">
                                <MdArrowDropDown />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                {showDropDown && auth && <div ref={refdropdown} className="z-50 absolute right-8 top-16 font-bold border-2 border-[#dbd9d971] rounded-lg shadow w-40 bg-black text-white">
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
                                    <FiLogOut/>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

TopBar.propTypes = {
    showDropDown: PropTypes.bool.isRequired,
    refdropdown: PropTypes.object.isRequired,
    setshowdropdown:PropTypes.func.isRequired
}