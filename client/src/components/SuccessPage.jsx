import Lottie from "lottie-react";
import data from '../assets/success.json';
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Success() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    useEffect(()=>{
        if(!username) {
            navigate("/login");
            return ;
        }
    },[])
    return (
        <div className="flex justify-between place-items-center min-h-screen font-space p-10">
            <div className="w-[50%]">
                <h1 className=" flex justify-center text-4xl text-white/85 font-extrabold">Payment SuccessFul !!</h1>
                <h1 className=" flex justify-center text-center text-xl mt-4 text-neutral-400 ">Thank you for choosing FitWave! , Your purchase was completed successfully.
                    Thank you for your purchase! We`re thrilled to have you with us. You can now enjoy your new purchase, and we’re here to support you along the way. </h1>
                <div className="flex justify-center relative">
                    <div className="flex mt-6 justify-center bg-green-900 relative w-[80%] rounded-full p-2">
                        <FaCircleCheck className="text-green-600 bg-white rounded-full text-3xl left-0 -top-2 absolute z-20 " />
                        <FaCircleCheck className="text-green-600 bg-white rounded-full text-3xl left-[45%] -top-2 absolute z-20 " />
                        <FaCircleCheck className="text-green-600 bg-white rounded-full text-3xl right-0 -top-2 absolute z-20 " />
                        <h1 className="text-xl absolute text-white -left-16 top-10">Initialize Payment </h1>
                        <h1 className="text-xl absolute text-white left-[31%] top-10">Payment Received </h1>
                        <h1 className="text-xl absolute text-white -right-10 top-10">Order Placed</h1>
                    </div>
                    <div className="absolute top-32 flex gap-6 left-20">
                        <button className="text-white  bg-green-800 border-2 border-green-800 p-3 pl-4 pr-4 rounded-xl hover:bg-black hover:text-green-500" onClick={()=>navigate("/")}>Back to Home</button>
                        <button className="hover:text-white text-green-500  border-2 border-green-800 p-3 pl-4 pr-4 rounded-xl hover:bg-green-800" onClick={()=>navigate("/purchases")}>View Purchases</button>
                    </div>
                </div>
            </div>
            <div className="w-[50%]">
                <Lottie animationData={data} loop={true} className="text-green-950" />
            </div>
        </div>
    )
}