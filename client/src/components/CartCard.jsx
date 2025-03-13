import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
// import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
// import { IoCheckbox } from "react-icons/io5";

export default function CartCard({ image, name, lastPrice, price, setdata, settotal}) {
    const [qty, setqty] = useState(1); // Default quantity is 1
    const [updatedPrice, setUpdatedPrice] = useState(parseFloat(price)); // Updated price based on quantity
    // const [selected, setselected] = useState(true); // Initially selected

    // Increment quantity and update total price
    const handleinc = () => {
        // if (selected) {
            setqty(qty + 1);
            const newPrice = updatedPrice + parseFloat(price); // Increment price based on quantity
            setUpdatedPrice(newPrice);
            settotal((prev) => prev + parseFloat(price)); // Update total
            setdata(prevData => 
                prevData.map(item => 
                    item.name === name 
                    ? { ...item, quantity: item.quantity + 1 } // Update quantity
                    : item
                )
            );
            
        // }
    };

    // Decrement quantity and update total price
    const handledec = () => {
        if (qty > 1) {
            setqty(qty - 1);
            const newPrice = updatedPrice - parseFloat(price); // Decrease price based on quantity
            setUpdatedPrice(newPrice);
            settotal((prev) => prev - parseFloat(price)); // Update total
            setdata(prevData => 
                prevData.map(item => 
                    item.name === name 
                    ? { ...item, quantity: item.quantity - 1 } // Update quantity
                    : item
                )
            );
        }
    };

    // Remove item from cart and reset necessary states
    const handleRemove = async () => {
        try {
            const data = await axios.post(`http://localhost:3000/user/removeFromCart`, {
                name: name,
                username: localStorage.getItem('username'),
            });
            console.log(data);
            settotal((prev) => prev - updatedPrice); 
            setUpdatedPrice(parseFloat(price)); 
            setqty(1);
            setdata(prevData => prevData.filter(item => item.name !== name)); 
        } catch (error) {
            console.log(error);
        }
    };

    // Toggle selection (checkbox)
    // const toggleSelection = () => {
    //     setselected(!selected); // Toggle the selected state
    //     const newTotal = selected ? (updatedPrice * -1) : updatedPrice; // Add or subtract the price from total
    //     settotal((prev) => prev + newTotal); // Update total based on whether the item is selected or not
    //     setcountselected((prev) => selected ? prev - 1 : prev + 1); // Update the count of selected items
    //     setdata(prevData => 
    //         prevData.map(item => 
    //             item.name === name 
    //                 ? { ...item, selected: !item.selected } // Toggle selected state in item data
    //                 : item
    //         )
    //     );
    // };

    return (
        <div className="flex gap-14 border-b-2 border-slate-500 p-4 mt-2">
            <img src={image} className="h-20 w-20 object-cover" />
            
            {/* Checkbox for selection */}
            {/* {selected ? 
                <IoCheckbox className="text-2xl text-[#CCFF33] cursor-pointer" onClick={toggleSelection} /> :
                <MdOutlineCheckBoxOutlineBlank className="text-2xl text-[#CCFF33] cursor-pointer" onClick={toggleSelection} />
            } */}
            
            <div>
                <h1 className="text-[#CCFF33] text-xl font-semibold">{name}</h1>
                <div className="flex gap-4 mb-2 mt-1">
                    <h1>${price}</h1>
                    <h2 className='line-through text-slate-500'>${lastPrice}</h2>
                </div>
                <h1 className="text-red-500 cursor-pointer" onClick={handleRemove}>X Remove</h1>
            </div>

            <div className="mt-4">
                <div className="flex gap-2 justify-center">
                    <h1 className="text-lg mb-2">${updatedPrice.toFixed(2)}</h1>
                </div>
                <div className="gap-2 flex">
                    <button className="bg-red rounded-lg pl-5 pr-5 bg-green-500 hover:bg-green-600" onClick={handleinc}>+</button>
                    <h2 className="flex text-[#CCFF33]">{qty}</h2>
                    <button className="bg-red pl-5 pr-5 rounded-lg bg-red-500 hover:bg-red-600" onClick={handledec}>-</button>
                </div>
            </div>
        </div>
    );
}

CartCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    lastPrice: PropTypes.string.isRequired,
    setdata: PropTypes.func.isRequired,
    settotal: PropTypes.func.isRequired,
    setcountselected: PropTypes.func.isRequired
};
