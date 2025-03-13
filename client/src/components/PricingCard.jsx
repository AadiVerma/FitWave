/* eslint-disable react/prop-types */
import { TiTick } from "react-icons/ti";
import makePayment from "./util/MakePayment";
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authselector } from '../redux/slices/slice';
import toast from 'react-hot-toast'
import axios from 'axios';
export default function PricingCard({ planName, price, features, heading, premium , buttontext,plan,setplan}) {
    const auth = useSelector(authselector);
    const username = localStorage.getItem("username");
   const navigate = useNavigate();
    const data=[{
        name: planName,
        price: price,
        image:"http://localhost:5173/Image1.png",
        quantity:1,
    }]
    const handleclick=async()=>{
        if(planName=="Free"){
            navigate("/")
            return;
        }
        if(auth && planName!=plan){
            makePayment({data:data});
            const data1=await axios.post(`http://localhost:3000/user/addAIplanPurchases/${username}`,{
                data:{
                    name: planName
                }
            })
            if(data1.status==200){
                setplan(planName)
                toast.success('AI Plan Purchased Successfully', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        }
        else{
            if(!auth){
                toast.error('Please Login First', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
            else{
                toast.error('You Already Have this Plan Choose Another to Buy Instead!', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        }
    }
    return (
        <div className="pricing-card bg-black p-6 rounded-lg  h-[30%] w-[30%] border-2 border-neutral-700 hover:text-white/65 text-neutral-500">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4 ">{planName}</h2>
                {premium && (
                    <h2 className="flex flex-col justify-center border-2 border-neutral-400 h-fit pt-1 pb-1 text-sm text-white/75 rounded-full pl-2 pr-2 text-glow">
                        Most Popular
                    </h2>
                )}            </div>
            <p className="text-3xl text-white">${price} / month</p>
            <h1 className="text-md mt-2 text-neutral-500">{heading}</h1>
            <button
                className=" text-white w-[100%] p-2 bg-[#212121] rounded-lg mt-4 hover:text-white border-2 border-neutral-500 hover:bg-black  font-semibold transition"
                onClick={handleclick}
            >
                {(planName!==plan || plan=='Free')?buttontext:"You Already Have This Plan"}
            </button>
            <div className="flex mt-4 ">
                <hr className="w-[40%] mt-3"></hr>
                <h1 className="w-fit pl-2 pr-2 text-neutral-300">Features</h1>
                <hr className="w-[40%] mt-3"></hr>
            </div>
            <ul className="mt-3">
                {features?.map((feature, index) => (
                    <li
                        key={index}
                        className="text-gray-700 mb-2 flex gap-2">
                        <div className="rounded-full border-2 border-neutral-700 w-fit h-fit">
                            <TiTick className="text-xl text-white/65" />
                        </div>
                        <h1 className="text-neutral-400">{feature}</h1>
                    </li>
                ))}
            </ul>

        </div>
    );
}
