import Lottie from "lottie-react";
import data from '../assets/failed.json';
import { FaCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Failed() {
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
                <h1 className=" flex justify-center text-4xl font-extrabold text-red-600">Payment Failed !!</h1>
                <h1 className=" flex justify-center text-center text-xl mt-4 text-neutral-400 ">Oops! Something went wrong with your payment.
                    We`re sorry, but your payment didn`t go through. Don`t` worry, we`re here to help you. Please try a different payment method </h1>
                <div className="flex justify-center relative">
                    <div className="flex mt-6 justify-center bg-red-900 relative w-[80%] rounded-full p-2">
                        <FaCircleXmark className="text-red-600 bg-white rounded-full text-3xl left-0 -top-2 absolute z-20 " />
                        <FaCircleXmark className="text-red-600 bg-white rounded-full text-3xl left-[45%] -top-2 absolute z-20 " />
                        <FaCircleXmark className="text-red-600 bg-white rounded-full text-3xl right-0 -top-2 absolute z-20 " />
                        <h1 className="text-xl absolute text-white -left-16 top-10">Initialize Payment </h1>
                        <h1 className="text-xl absolute text-white left-[31%] top-10">Payment Received </h1>
                        <h1 className="text-xl absolute text-white -right-10 top-10">Order Placed</h1>
                    </div>
                    <div className="absolute top-32 flex gap-6 left-20">
                        <button className="text-white  bg-red-800 border-2 border-red-800 p-3 pl-4 pr-4 rounded-xl hover:bg-black hover:text-red-500" onClick={() => navigate("/")}>Back to Home</button>
                        <button className="hover:text-white text-red-500  border-2 border-red-800 p-3 pl-4 pr-4 rounded-xl hover:bg-red-800" onClick={() => navigate("/purchases")}>View Purchases</button>
                    </div>
                </div>
            </div>
            <div className="w-[40%]">
                <Lottie animationData={data} loop={true} />
            </div>
        </div>
    )
}