import { FaDumbbell } from "react-icons/fa6";
import { IoAnalyticsOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { IoCalendarSharp } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { LuHome } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
export default function SideBar() {
    const navigate=useNavigate();
    return (
        <div className="w-[7%] bg-transparent grid grid-cols-1 place-items-center min-h-screen">
            <div className="cursor-pointer" onClick={()=>{
                navigate("/");
            }}>
                <FaDumbbell className="text-5xl text-[#CCFF33] mt-[-50%]" />
            </div>
            <div>
                <div className="text-3xl text-white p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg">
                    <LuHome/>
                </div>
                <div className=" mt-[50%] text-3xl text-white  p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg">
                    <IoAnalyticsOutline />
                </div>
                <div className=" mt-[50%] text-3xl text-white  p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg">
                    <GoGoal />
                </div>
                <div className=" mt-[50%] text-3xl text-white  p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg">
                    <IoCalendarSharp />
                </div>
                <div className=" mt-[50%] text-3xl text-white  p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg">
                    < MdOutlinePerson />
                </div>
            </div>
            <div className="text-3xl text-white  p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg">
                <FiLogOut />
            </div>

        </div>
    )
}