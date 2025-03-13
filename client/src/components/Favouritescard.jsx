import { FaStar, FaHeart } from "react-icons/fa";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from "react";
export default function FavouritesCard({ image, name, points, count, price, lastprice, setdata, addtoCart,}) {
    const [addtoCart1,setAddtoCart1] = useState(false);
    useEffect(()=>{
        if (addtoCart && addtoCart.some(item => item.name == name)) {
            setAddtoCart1(true);
        }
    },[addtoCart])
    const handleaddToCart = async () => {
        try {
            const username = localStorage.getItem("username");
            await axios.post('http://localhost:3000/user/addToCart', {
                image, name, points, count, price, lastprice, username
            })
            // const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            // const updatedFavorites = favorites.filter(item => item.name !== name);
            // localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            // setdata(updatedFavorites);
            setAddtoCart1(true);
        } catch (error) {
            console.log(error);
        }
    }
    const handleRemoveFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const updatedFavorites = favorites.filter(item => item.name !== name);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setdata(updatedFavorites);
    };
    return (
        <div className='w-[25%] border-4 border-[#363535] rounded-xl text-white font-space'>
            <div className='relative bg-[#121212] w-[100%] h-[28vh] p-6 rounded-t-xl'>
                <div className="absolute right-4 top-2 z-10">
                    <FaHeart className="text-2xl mt-1 text-[#CCFF33] cursor-pointer" onClick={handleRemoveFavorites} />
                </div>
                <div className='absolute inset-0 left-[10%] rounded-xl'>
                    <img src={image} alt="Product" className='w-[90%] h-full object-cover' />
                </div>
            </div>
            <div className='p-4'>
                <h2 className='text-lg font-medium text-[#CCFF33]'>{name}</h2>
                <div className='flex gap-2 mt-2'>
                    <h2>{points}</h2>
                    <div className="flex gap-2 mt-1">
                        <FaStar className="text-[#CCFF33]" />
                        <FaStar className="text-[#CCFF33]" />
                        <FaStar className="text-[#CCFF33]" />
                        <FaStar className="text-[#CCFF33]" />
                        <FaStar />
                    </div>
                    <div>
                        ({count})
                    </div>
                </div>
                <div className='flex gap-2 mt-1'>
                    <h1>${price}</h1>
                    <h2 className='line-through text-slate-500'>${lastprice}</h2>
                </div>
                <div className="flex gap-4 justify-center">
                    {!addtoCart1 ? <button className='bg-[#CCFF33] w-[100%] hover:bg-transparent border-2 border-[#CCFF33] hover:text-white text-black font-bold rounded p-1 mt-2' onClick={handleaddToCart}>
                        <h1>Add to Cart</h1>
                    </button> :
                        <div className='bg-transparent w-[100%] border-2 border-[#CCFF33] h text-white font-bold rounded p-1 mt-2 flex justify-center'>
                            <h1>Item in a Cart</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

FavouritesCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    lastprice: PropTypes.string.isRequired,
    setdata: PropTypes.func.isRequired,
    addtoCart:PropTypes.array.isRequired
};
