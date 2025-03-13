import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import { useNavigate } from "react-router-dom";
export default function PurchasesPage() {
    const [purchases, setPurchases] = useState([]);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    useEffect(() => {
        if(!username){
            navigate("/login");
            return;
        }
        const fetchPurchases = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/getPurchases/${username}`);
                console.log(response);
                setPurchases(response.data);
            } catch (error) {
                console.error("Error fetching purchases", error);
            }
        };
        fetchPurchases();
    }, []);

    return (
        <div className="bg-black p-8 custom-scrollbar min-h-[87vh] font-space">
            <h1 className="text-3xl font-bold text-center mb-8 text-[#CCFF33]">Your Purchase History</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {purchases.length === 0 ? (
                     <p className="text-center text-xl text-[#CCFF33]">You have no purchases yet!</p>
                ) : (
                    purchases.map((purchase, index) => (
                        <div key={index} className="border-2 rounded-xl p-3 border-[#212121]">
                            <div
                                
                                className="bg-[#121212] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={purchase.image}
                                    alt={purchase.name}
                                    className="w-full h-36 object-contains rounded-lg mb-4"
                                />
                            </div>
                            <div className="bg-black mt-2">
                                <h2 className="text-2xl font-semibold text-[#CCFF33] ">{purchase.name}</h2>
                                <p className="text-lg text-white mt-2"><span className="text-[#CCFF33]">Quantity: </span>{purchase.quantity}</p>
                                <p className="text-lg text-white mt-2"><span className="text-[#CCFF33]">Price: </span> ${purchase.price}</p>
                                <div className="mt-4">
                                    <button
                                        className="w-full bg-[#CCFF33] text-black font-bold py-2 rounded-lg transition-colors"
                                        onClick={() => navigate("/shop")}
                                    >
                                        Reorder
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
