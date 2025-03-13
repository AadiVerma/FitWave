import { useEffect, useState } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import PropTypes from "prop-types";
import makePayment from "./util/MakePayment";
import axios from "axios";
export default function CheckOutPart({ totalprice, data }) {
    const username = localStorage.getItem("username");
    const [subtotal, setsubtotal] = useState(0.0);
    useEffect(() => {
        setsubtotal(totalprice + 1.99 + 5.00);
    }, [totalprice]);
    console.log("data",data);
    const formattedData = data
        .map(item => ({
            name: item.name,
            price: item.price,
            image: `http://localhost:5173${item.image}`,
            quantity: item.quantity
        }));
    const handlesubmit = async () => {
        makePayment({
            data: formattedData,
        });
        await axios.post(`http://localhost:3000/user/placeOrder/${username}`, {
            data: formattedData
        });
        const itemNames = formattedData.map((d) => d.name);  
        await axios.post(`http://localhost:3000/user/removeFromCart`,{
            username: username,
            name:itemNames
        })
    }
    return (
        <div className="w-[100%] border-white/15 border-2 p-4 rounded-xl">
            <div className="flex justify-between">
                <h1>Total Price</h1>
                <h2>${totalprice.toFixed(2)}</h2>
            </div>
            <div className="flex justify-between">
                <h1>GST</h1>
                <h2>$1.99</h2>
            </div>
            <div className="flex justify-between">
                <h1>Delivery Charges</h1>
                <h2>$5.00</h2>
            </div>
            <div className="flex justify-between mt-1">
                <h1 className="text-[#CCFF33] text-xl">SubTotal</h1>
                <h2 className="text-[#CCFF33] text-xl">${subtotal.toFixed(2)}</h2>
            </div>
            <button className="flex gap-2 text-black font-bold text-xl justify-center place-items-center w-[100%] bg-[#CCFF33] hover:bg-[#ccff33da] rounded-lg p-2 mt-4" onClick={handlesubmit}>
                <MdOutlineShoppingCartCheckout className="text-3xl text-black" />
                Checkout
            </button>
        </div>
    )
}
CheckOutPart.propTypes = {
    totalprice: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired
};