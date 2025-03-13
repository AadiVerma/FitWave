// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import Noprofile from '/Noprofile.jpg';
// import { FaDumbbell } from "react-icons/fa6";
// import { useDispatch, useSelector } from 'react-redux';
// import { authselector } from '../redux/slices/slice';
// import { removecookie } from '../redux/slices/slice';
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from 'axios';
import '../App.css'
import CartCard from "./CartCard";
import CheckOutPart from "./CheckOutPart";
export default function Cart() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [profile, setProfile] = useState();
    const [data, setdata] = useState([]);
    const [total, settotal] = useState(0);
    const [countselected, setcountselected] = useState(0);
    useEffect(() => {
        // setProfile(localStorage.getItem("profilePic"));
        if (localStorage.getItem("username") == null) {
            navigate("/login");
        }
        const fetch = async () => {
            const data = await axios.get(`http://localhost:3000/user/getaddToCart/${localStorage.getItem("username")}`);
            setdata(data.data.map(item => ({
                ...item,
                quantity: 1
            })));
            setcountselected(data.data.length)
            const totalPrice = data.data.reduce((acc, item) => {
                return acc + parseFloat(item.price);
            }, 0);
            settotal(totalPrice);
        }
        fetch();
    }, [])
    // const auth = useSelector(authselector);
    return (
        <div className="text-white font-space w-full min-h-screen custom-scrollbar">
            <div className="flex justify-between w-full px-4 py-2 mt-4">
                <h1 className='text-3xl'>
                    <div className='flex gap-4 cursor-pointer' onClick={() => navigate("/")}>
                        {/* <FaDumbbell className='text-[#CCFF33] text-4xl' /> */}
                        <span className="text-white font-bold">FitWave</span>
                    </div>
                </h1>
                <div className='flex gap-4 text-xl cursor-pointer'>
                    <h1 onClick={() => { navigate("/") }} className='hover:text-[#CCFF33] text-2xl'>HOME</h1>
                    <h1 className='hover:text-[#CCFF33] text-2xl' onClick={() => { navigate("/classes") }}>CLASSES</h1>
                    <h1 className='hover:text-[#CCFF33] text-2xl' onClick={() => { navigate("/shop") }}>SHOP</h1>
                    {/* <a onClick={() => { navigate("/favourites") }} className='hover:text-[#CCFF33] text-2xl'>FAVOURITES</a> */}
                </div>
                <div className="flex justify-center gap-4">
                    <FaRegHeart className="text-3xl mt-1 text-[#CCFF33] cursor-pointer" onClick={() => {
                        navigate("/favourites")
                    }} />
                    <AiOutlineShoppingCart className="text-4xl text-[#CCFF33] cursor-pointer" onClick={() => {
                        navigate("/cart")
                    }} />
                </div>
            </div>
            <h1 className="text-3xl text-white mt-6 font-bold flex justify-center gap-2"><span className="text-[#CCFF33] ">My</span> Cart</h1>

            <div className="flex gap-20 justify-center mt-4">
                <div>
                    {data.length != 0 && data.map((d, key) => {
                        return (
                            <CartCard key={key} image={d.image} lastPrice={d.lastprice} price={d.price} name={d.name} setdata={setdata} settotal={settotal} setcountselected={setcountselected} />
                        )
                    })}
                </div>
                {data.length != 0 && countselected != 0 && <div className="w-[30%] mt-4">
                    <CheckOutPart totalprice={total} data={data} />
                </div>}
            </div>
            {data.length == 0 && <p className="text-[#CCFF33] w-[100%] font-bold text-xl mt-32 justify-center flex place-items-center">No Items found Add Some.</p>}
        </div>
    )
}