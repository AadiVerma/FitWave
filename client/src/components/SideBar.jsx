import { FaDumbbell } from "react-icons/fa6";
import { IoAnalyticsOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { BsRobot } from "react-icons/bs";
import { MdOutlinePerson } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { LuHome } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removecookie } from "../redux/slices/slice";
import { MdLibraryBooks } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
export default function SideBar() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const dispatch = useDispatch();
    const isActiveRoute = (route) => location.pathname === route;

    return (
        <div className="w-[7%] bg-transparent grid grid-cols-1 place-items-center min-h-screen">
            <div className="cursor-pointer mt-5" onClick={() => navigate("/")}>
                <FaDumbbell className={`text-5xl mt-[-50%] text-[#CCFF33]`} />
            </div>
            <div>
                <div
                    className={`text-3xl p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/") ? "text-[#CCFF33]" : "text-white"}`}
                    onClick={() => navigate("/")}
                >
                    <LuHome />
                </div>
                <div
                    className={`mt-[30%] text-3xl p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/dashboard") ? "text-[#CCFF33]" : "text-white"}`}
                    onClick={() => navigate("/dashboard")}
                >
                    <IoAnalyticsOutline />
                </div>
                <div
                    className={`mt-[30%] text-3xl p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/todo") ? "text-[#CCFF33]" : "text-white"}`}
                    onClick={() => navigate("/todo")}
                >
                    <GoGoal />
                </div>
                <div
                    className={`mt-[30%] text-3xl p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/aigoal") ? "text-[#CCFF33]" : "text-white"}`}
                    onClick={() => navigate("/aigoal")}
                >
                    <BsRobot />
                </div>
                <div
                    className={`mt-[40%] text-3xl p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/classes") ? "text-[#CCFF33]" : "text-white"}`}
                    onClick={() => navigate("/classes")}
                >
                    <MdLibraryBooks />
                </div>
                <div
                    className={`mt-[40%] text-3xl p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/shop") ? "text-[#CCFF33]" : "text-white"}`}
                    onClick={() => navigate("/shop")}
                >
                    <MdOutlineShoppingCart />
                </div>
                <div
                    className={`mt-[40%] text-3xl p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/updateProfile") ? "text-[#CCFF33]" : "text-white"}`}
                    onClick={() => navigate("/updateProfile")}
                >
                    <MdOutlinePerson />
                </div>
            </div>
            <div
                className={`text-3xl p-2 hover:text-[#CCFF33] hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/login") ? "text-[#CCFF33]" : "text-white"}`}
                onClick={() => {
                    dispatch(removecookie());
                    localStorage.removeItem("token");
                    localStorage.removeItem("profilePic");
                    localStorage.removeItem("username");
                    navigate("/login");
                }}
            >
                <FiLogOut />
            </div>
        </div>
    );
}
