import { useNavigate } from "react-router-dom";
// import { FaDumbbell } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import '../App.css'
import FavouritesCard from "./Favouritescard";
import axios from "axios";
export default function Favourites() {
    const navigate = useNavigate();
    const [addtoCart, setAddtoCart] = useState([]);
    const [data, setdata] = useState();
    useEffect(() => {
        if (localStorage.getItem("username") == null) {
            navigate("/login");
        }
        setdata(JSON.parse(localStorage.getItem("favorites")));
        const fetch = async () => {
            const data = await axios.get(`http://localhost:3000/user/getaddToCart/${localStorage.getItem("username")}`);
            setAddtoCart(data.data);
            console.log(data.data);
        }
        fetch();
}, [])

return (
    <div className="text-white font-space w-full min-h-screen custom-scrollbar">
        <div className='flex justify-between p-6 pr-10'>
            <h1 className='text-3xl'>
                <div className='flex gap-4'>
                    {/* <FaDumbbell className='text-[#CCFF33] text-4xl cursor-pointer' onClick={() => navigate("/")} /> */}
                    <span className="text-white font-bold">FitWave</span>
                </div>
            </h1>
            <div className='flex gap-4 text-2xl cursor-pointer'>
                <h1 className='hover:text-[#CCFF33]' onClick={() => navigate("/")}>HOME</h1>
                <h1 className='hover:text-[#CCFF33]' onClick={() => navigate("/classes")}>CLASSES</h1>
                <h1 className='hover:text-[#CCFF33]' onClick={() => navigate("/shop")}>SHOP</h1>
                {/* <h1 className='hover:text-[#CCFF33]' onClick={() => navigate("/cart")}>CART</h1> */}
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
        <h1 className="text-3xl text-white mt-6 font-bold flex justify-center gap-2"><span className="text-[#CCFF33] ">My</span> Favourites</h1>
        <div className="flex justify-center gap-8 flex-wrap mt-5">
            {data && data.length > 0 ? data.map((d, index) => (
                <FavouritesCard
                    key={index}
                    image={d.image}
                    name={d.name}
                    points={d.points}
                    count={d.count}
                    price={d.price}
                    lastprice={d.lastprice}
                    setdata={setdata}
                    addtoCart={addtoCart}
                    setAddtoCart={setAddtoCart}
                />
            )) : <p className="text-[#CCFF33] font-bold text-xl mt-32 justify-center flex place-items-center">No favourites found.</p>}
        </div>
    </div>
)
}