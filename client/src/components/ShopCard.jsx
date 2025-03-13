import { FaStar } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import axios from 'axios';
export default function ShopCard({ image, name, points, count, price, lastprice, favoritesdata, addtoCart ,setFavorites}) {
    const [added, setAdded] = useState(false);
    const [addtoCart1, setAddtoCart] = useState(false);
    useEffect(() => {
        if (favoritesdata && favoritesdata.some(item => item.name === name)) {
            setAdded(true);
        }
        if (addtoCart && addtoCart.some(item => item.name == name)) {
            setAddtoCart(true);
        }
    }, [favoritesdata, name, addtoCart]);

    const handleaddToCart = async () => {
        try {
            const username = localStorage.getItem("username");
            const response = await axios.post('http://localhost:3000/user/addToCart', {
                image, name, points, count, price, lastprice, username
            })
            console.log(response);
            setAddtoCart(true);
        } catch (error) {
            console.log(error);
        }
    }
    const handleFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (!favorites.some(item => item.name === name)) {
            favorites.push({ image, name, points, count, price, lastprice });
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setFavorites(favorites);
            setAdded(true);
        }
    };

    const handleRemoveFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const updatedFavorites = favorites.filter(item => item.name !== name);

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        setAdded(false);
    };
    const handleRemoveFromCart = async () => {
        try {
            const data = await axios.post(`http://localhost:3000/user/removeFromCart`, {
                name: name,
                username: localStorage.getItem('username'),
            });
            console.log(data);
            setAddtoCart(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-[25%] border-4 border-[#363535] rounded-xl text-white font-space'>
            <div className='relative bg-[#121212] w-[100%] h-[28vh] p-6 rounded-t-xl'>
                <div className="absolute right-4 top-2 z-10">
                    {!added ? <FaRegHeart className="text-2xl mt-1 text-[#CCFF33] cursor-pointer" onClick={handleFavorites} />
                        : <FaHeart className="text-2xl mt-1 text-[#CCFF33] cursor-pointer" onClick={handleRemoveFavorites} />}
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
                        <button className='bg-transparent border-2 border-[#CCFF33] w-[100%] hover:bg-[#CCFF33] hover:text-black font-bold rounded p-1 mt-2' onClick={handleRemoveFromCart}>
                            <h1>Remove</h1>
                        </button>}
                </div>
            </div>
        </div>
    );
}

ShopCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    lastprice: PropTypes.string.isRequired,
    favoritesdata: PropTypes.array.isRequired,
    addtoCart: PropTypes.array.isRequired,
    setFavorites:PropTypes.func.isRequired
};
