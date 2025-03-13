import { useDispatch } from "react-redux";
import { removecookie } from "../redux/slices/slice";
import { FaDumbbell } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { SiTrainerroad } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function AdminSideBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isActiveRoute = (route) => location.pathname === route;
    return (
        <div className="w-[7%] bg-transparent grid grid-cols-1 place-items-center min-h-screen">
            <div className="cursor-pointer mt-5" onClick={() => navigate("/")}>
                <FaDumbbell className={`text-5xl mt-[-50%] text-purple-500`} />
            </div>
            <div>
                <div
                    className={`text-4xl p-2 hover:text-purple-500 hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/") ? "text-purple-500" : "text-white"}`}
                    onClick={() => navigate("/")}
                >
                    <RiDashboardFill />
                </div>
                <div
                    className={`mt-[40%] text-3xl p-2 hover:text-purple-500 hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/user") ? "text-purple-500" : "text-white"}`}
                    onClick={() => navigate("/user")}
                >
                    <FaUserAlt />
                </div>
                <div
                    className={`mt-[40%] text-4xl p-2 hover:text-purple-500 hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/trainer") ? "text-purple-500" : "text-white"}`}
                    onClick={() => navigate("/trainer")}
                >
                    <SiTrainerroad />
                </div>
                <div
                    className={`mt-[40%] text-4xl p-2 hover:text-purple-500 hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/course") ? "text-purple-500" : "text-white"}`}
                    onClick={() => navigate("/course")}
                >
                    <MdLibraryBooks />
                </div>
            </div>
            <div
                className={`text-4xl p-2 hover:text-purple-500 hover:bg-black cursor-pointer rounded-lg ${isActiveRoute("/login") ? "text-purple-500" : "text-white"}`}
                onClick={() => {
                    dispatch(removecookie());
                    localStorage.removeItem("token");
                    localStorage.removeItem("profilePic");
                    localStorage.removeItem("username");
                    navigate("/login");
                    toast('LogOut Successfully!', {
                        icon: '☠️',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                    window.location.reload();
                }}
            >
                <FiLogOut />
            </div>
        </div>
    )
}
