/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { FaUsers, FaShoppingCart, FaRegChartBar } from 'react-icons/fa';
import { LuBrainCircuit } from "react-icons/lu";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import './Admin.css';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts for graph
const AdminDashboard = () => {
    const [Usersinteract, setUsersinteract] = useState(0);
    const [loader, setLoader] = useState(true);
    const [Aipurchase,setAiPurchases]=useState();
    const[shoppurchase,setshoppurchases]=useState();
    const [coursePurchaseValue,setCoursePurchaseValue]=useState();
    const [adminTextVisible, setAdminTextVisible] = useState(false); 
    const dispatch = useDispatch();
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
            setAdminTextVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const data = await axios.get('http://localhost:3000/user/getalluserinteractions');
            console.log(data);
            setUsersinteract(data.data.userinteract);
            const data1 = await axios.get('http://localhost:3000/user/getallusersdata');
            let countAipurchase=0;
            let countshoppurchase=0;
            let countcoursepurchases=0;
            data1.data.map((d)=>{
                if(d.AIplanPurchases!=="Free"){
                    countAipurchase++;
                }
                countshoppurchase+=d.placedOrder.length;
                countcoursepurchases+=d.CoursePurchases.length;
            })
            setshoppurchases(countshoppurchase);
            setAiPurchases(countAipurchase);
            setCoursePurchaseValue(countcoursepurchases);
        };
        fetch();
    }, []);
    const revenueData = [
        { month: 'Jan', revenue: 2000 },
        { month: 'Feb', revenue: 3000 },
        { month: 'Mar', revenue: 3500 },
        { month: 'Apr', revenue: 4200 },
        { month: 'May', revenue: 5000 },
        { month: 'Jun', revenue: 6000 },
        { month: 'Jul', revenue: 5500 },
    ];
    // Sample data for the value boxes
    const userInteractionValue = 1200;
    // const coursePurchaseValue = 450;
    const aiPlanPurchaseValue = 220;
    const ecommercePurchaseValue = 650;

    return (
        <>
            {loader ? (
                <div className='bg-black flex justify-center place-content-center place-items-center font-space custom-scrollbar min-h-screen h-fit text-white'>
                    <l-cardio
                        size="200"
                        stroke="4"
                        speed="1.2"
                        color="#CCFF33"
                    ></l-cardio>
                </div>
            ) : (
                <div className="bg-black text-gray-100 min-h-screen p-6 custom-scrollbar1">
                    <div className='flex justify-between'>
                        <Toaster />
                    </div>
                    {/* Value Boxes Section */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6 mt-9">
                        {/* User Interactions */}
                        <div className="bg-[#101010] rounded-lg p-6 shadow-2xl flex items-center justify-between">
                            <div className='bg-black/80 p-4 rounded-xl'>
                                <FaRegChartBar className="text-3xl text-blue-500" />
                            </div>
                            <div className="text-right">
                                <h3 className="text-xl text-neutral-200">User Interactions</h3>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col justify-end'>
                                        <FaArrowTrendUp className='text-3xl text-green-500' />
                                    </div>
                                    <p className="text-3xl font-semibold text-white">{Usersinteract}</p>
                                </div>
                            </div>
                        </div>

                        {/* Course Purchases */}
                        <div className="bg-[#101010] rounded-lg p-6 shadow-2xl flex items-center justify-between">
                            <div className='bg-black/80 p-4 rounded-xl'>
                                <FaUsers className="text-3xl text-green-500" />
                            </div>
                            <div className="text-right">
                                <h3 className="text-xl text-neutral-200">Course Purchases</h3>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col justify-end '>
                                        <FaArrowTrendDown className='text-3xl text-red-500' />
                                    </div>
                                    <p className="text-3xl font-semibold text-white ">{coursePurchaseValue}</p>
                                </div>

                            </div>
                        </div>

                        {/* AI Plan Purchases */}
                        <div className="bg-[#101010] rounded-lg p-6 shadow-2xl flex items-center justify-between">
                            <div className='bg-black/80 p-4 rounded-xl'>
                                <LuBrainCircuit className="text-3xl text-purple-500" />
                            </div>
                            <div className="text-right">
                                <h3 className="text-xl text-neutral-200">AI Plan Purchases</h3>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col justify-end '>
                                        <FaArrowTrendUp className='text-3xl text-green-500' />
                                    </div>
                                    <p className="text-3xl font-semibold text-white">{Aipurchase}</p>
                                </div>
                            </div>
                        </div>

                        {/* Ecommerce Purchases */}
                        <div className="bg-[#101010] rounded-lg p-6 shadow-2xl flex items-center justify-between">
                            <div className='bg-black/80 p-4 rounded-xl'>
                                <FaShoppingCart className="text-3xl text-red-500" />
                            </div>
                            <div className="text-right">
                                <h3 className="text-xl text-neutral-200">Store Purchases</h3>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col justify-end '>
                                        <FaArrowTrendDown className='text-3xl text-red-500' />
                                    </div>
                                    <p className="text-3xl font-semibold text-white">{shoppurchase}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Revenue Graph */}
                    <div className="bg-[#101010] rounded-lg p-6 shadow-2xl mb-4">
                        <h2 className="text-2xl font-semibold mb-6 text-neutral-200">Revenue Over Time</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                                <XAxis dataKey="month" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                                    itemStyle={{ color: '#F3F4F6' }}
                                />
                                <Legend wrapperStyle={{ color: '#D1D5DB' }} />
                                {/* Purple color for the Line and Fill */}
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#8B5CF6"  // Purple color for the line
                                    fill="rgba(139, 92, 246, 0.3)"   // Soft purple color with transparency for the fill
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Users Management Table */}
                    {/* <div className="bg-[#101010] rounded-lg p-6 shadow-2xl">
                        <h2 className="text-2xl font-semibold mb-6 text-neutral-200">User Management</h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#101010]">
                                    {['ID', 'Name', 'Email', 'Status', 'Actions'].map((header) => (
                                        <th key={header} className="border border-[#212121] p-3 text-left text-gray-300">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, key) => (
                                    <tr key={user.id} className="hover:bg-[#212121] transition-colors">
                                        <td className="border border-[#212121] p-3">{key + 1}</td>
                                        <td className="border border-[#212121] p-3">{user.username}</td>
                                        <td className="border border-[#212121] p-3">{user.email}</td>
                                        <td className="border border-[#212121] p-3">
                                            <span className={`px-2 py-1 rounded ${!user.Block ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                                                {user.Block ? "InActive" : "Active"}
                                            </span>
                                        </td>
                                        <td className="border border-[#212121] p-3">
                                            <button
                                                className={`px-4 py-2 rounded font-semibold transition-all ${!user.Block ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                                                onClick={() => handleBlockUser(user._id, user.Block)}
                                            >
                                                {!user.Block ? 'Block Account' : 'Unblock Account'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                </div>
            )}
        </>
    );
};

export default AdminDashboard;
