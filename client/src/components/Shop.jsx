import { useNavigate } from "react-router-dom";
// import { FaDumbbell } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ShopCard from "./ShopCard";
import Image from "/Dumbbell.png";
import Image2 from "/Barbell.png";
import Image3 from '/Protien.png';
import Image4 from '/Creatine.png';
import Image5 from '/PunchingBag.png';
import toast, { Toaster } from 'react-hot-toast';
import Image6 from '/Treadmill.png';
import '../App.css';
import { useSelector } from "react-redux";
import { authselector } from "../redux/slices/slice";
import { useEffect, useState } from "react";
import axios from 'axios';
export default function Shop() {
    const auth = useSelector(authselector);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [addtoCart, setAddtoCart] = useState([]);
    useEffect(() => {
            if (!auth) {
              navigate("/login");
            }
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
        const fetch = async () => {
            const data = await axios.get(`http://localhost:3000/user/getaddToCart/${localStorage.getItem("username")}`);
            setAddtoCart(data.data);
        }
        fetch();
    }, []);
    console.log(addtoCart);
    const handleNavigate = (path) => {
        if (auth || path !== "/dashboard") {
            navigate(path);
        } else {
            toast('LogIn First!', {
                icon: '☠️',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div className="bg-black min-h-screen text-white font-space custom-scrollbar">
            <Toaster />
            <div className='flex justify-between p-6 pr-10'>
                <h1 className='text-3xl'>
                    <div className='flex gap-4'>
                        {/* <FaDumbbell className='text-[#CCFF33] text-4xl cursor-pointer' onClick={() => navigate("/")} /> */}
                        <span className="text-white font-bold">FitWave</span>
                    </div>
                </h1>
                <div className='flex gap-4 text-2xl cursor-pointer'>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => handleNavigate("/")}>HOME</h1>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => handleNavigate("/classes")}>CLASSES</h1>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => handleNavigate("/shop")}>SHOP</h1>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => handleNavigate("/todo")}>TODO PLAN</h1>
                    <h1 className='hover:text-[#CCFF33]' onClick={() => handleNavigate("/purchases")}>PURCHASES</h1>
                </div>
                <div className="flex justify-center gap-4 relative">
                    <FaRegHeart className="text-3xl mt-1 text-[#CCFF33] cursor-pointer" onClick={() => {
                        navigate("/favourites")
                    }} />
                    {favorites.length!=0 && <h1 className="h-3 w-3 rounded-full bg-[#CCFF33] absolute right-12 top-1"></h1>}
                    <AiOutlineShoppingCart className="text-4xl text-[#CCFF33] cursor-pointer" onClick={() => {
                        navigate("/cart")
                    }} />
                </div>
            </div>

            <div className="flex p-2 flex-wrap gap-4 justify-center">
                <ShopCard image={Image} name={"Dumbells"} points={"4.7"} count={"25,145"} price={"40.99"} lastprice={"50.99"} favoritesdata={favorites} addtoCart={addtoCart} setFavorites={setFavorites}/>
                <ShopCard image={Image2} name={"Barbells"} points={"4.7"} count={"25,145"} price={"40.99"} lastprice={"50.99"} favoritesdata={favorites} addtoCart={addtoCart} setFavorites={setFavorites}/>
                <ShopCard image={Image3} name={"Protien"} points={"4.7"} count={"25,145"} price={"40.99"} lastprice={"50.99"} favoritesdata={favorites} addtoCart={addtoCart} setFavorites={setFavorites}/>
                <ShopCard image={Image4} name={"Creatine"} points={"4.7"} count={"25,145"} price={"40.99"} lastprice={"50.99"} favoritesdata={favorites} addtoCart={addtoCart} setFavorites={setFavorites}/>
                <ShopCard image={Image5} name={"Punching Bag"} points={"4.7"} count={"25,145"} price={"40.99"} lastprice={"50.99"} favoritesdata={favorites} addtoCart={addtoCart} setFavorites={setFavorites}/>
                <ShopCard image={Image6} name={"TreadMills"} points={"4.7"} count={"25,145"} price={"40.99"} lastprice={"50.99"} favoritesdata={favorites} addtoCart={addtoCart} setFavorites={setFavorites}/>
            </div>
        </div>
    );
}
