import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './Admin.css'
const UserManagementTables = () => {
    const [users, setUsers] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dummy data for users and subscribers
    const dummyUsers = [
        { _id: '1', username: 'john_doe', email: 'john@example.com', Block: false, subscribed: true, subscriptionEnds: '2024-12-30' },
        { _id: '2', username: 'jane_smith', email: 'jane@example.com', Block: true, subscribed: false, subscriptionEnds: '2025-01-15' },
        { _id: '3', username: 'alice_jones', email: 'alice@example.com', Block: false, subscribed: true, subscriptionEnds: '2024-12-10' },
        { _id: '4', username: 'bob_brown', email: 'bob@example.com', Block: false, subscribed: false, subscriptionEnds: '2024-11-20' },
    ]

    // Fetch users data (using dummy data here)
    useEffect(() => {
        const fetchUsers = async () => {
            // Simulating an API request with dummy data
            const data = await axios.get('http://localhost:3000/user/getallusersdata');
            setUsers(data.data);
            const allUsers = dummyUsers;
            // setUsers(allUsers);
            setSubscribers(allUsers.filter(user => user.subscribed));
            setLoading(false);
        };
        fetchUsers();
    }, []);

    // Handle block/unblock action
    const handleBlockUser = async (userId, currentBlockStatus) => {
        try {
            const newBlockStatus = !currentBlockStatus;

            // Simulate API call to block/unblock user
            await axios.post('http://localhost:3000/user/updateuser', {
                userId: userId
            });
            setUsers(users.map(user => {
                if (user._id === userId) {
                    return { ...user, Block: newBlockStatus };
                }
                return user;
            }));

            toast.success(`User ${newBlockStatus ? 'Blocked' : 'Unblocked'} successfully!`, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } catch (error) {
            console.error("Error updating user status:", error);
            toast.error('Error updating user status');
        }
    };

    return (
        <div className="bg-black text-white p-6 rounded-lg shadow-lg custom-scrollbar1 min-h-screen">
            <Toaster />

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <span>Loading...</span>
                </div>
            ) : (
                <div>
                    {/* Users Table */}
                    <h2 className="text-2xl font-semibold mb-6 text-neutral-200 ">Users Management</h2>
                    <div className="bg-[#101010] rounded-lg p-6 mb-6 shadow-2xl">
                        <h2 className="text-2xl font-semibold mb-6 text-neutral-200">All Users</h2>
                        <table className="w-full border-collapse">
                            <thead className="bg-[#212121]">
                                <tr>
                                    {['#', 'Username', 'Email', 'Status', 'Actions'].map((header) => (
                                        <th key={header} className="border border-[#212121] p-3 text-left text-gray-300">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, key) => (
                                    <tr key={user._id} className="hover:bg-[#323232] transition-all">
                                        <td className="border border-[#212121] p-3">{key + 1}</td>
                                        <td className="border border-[#212121] p-3">{user.username}</td>
                                        <td className="border border-[#212121] p-3">{user.email}</td>
                                        <td className="border border-[#212121] p-3">
                                            <span className={`px-2 py-1 rounded ${!user.Block ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                                                {user.Block ? "Inactive" : "Active"}
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
                    </div>

                    {/* Subscribers Table */}
                    <div className="bg-[#101010] rounded-lg p-6 shadow-2xl">
                        <h2 className="text-2xl font-semibold mb-6 text-neutral-200">Subscribers</h2>
                        <table className="w-full border-collapse">
                            <thead className="bg-[#212121]">
                                <tr>
                                    {['#', 'Username', 'Email', 'Subscription Status', 'Subscription Ends'].map((header) => (
                                        <th key={header} className="border border-[#212121] p-3 text-left text-gray-300">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {subscribers.map((user, key) => {
                                    // Convert subscriptionEnds string to a Date object for comparison
                                    const subscriptionEndDate = new Date(user.subscriptionEnds);
                                    const isSubscriptionActive = user.subscribed && subscriptionEndDate >= new Date();

                                    return (
                                        <tr key={user._id} className="hover:bg-[#323232] transition-all">
                                            <td className="border border-[#212121] p-3">{key + 1}</td>
                                            <td className="border border-[#212121] p-3">{user.username}</td>
                                            <td className="border border-[#212121] p-3">{user.email}</td>
                                            <td className="border border-[#212121] p-3">
                                                <span className={`px-3 py-1 rounded-lg ${isSubscriptionActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                                                    {isSubscriptionActive ? 'Active Subscriber' : 'Inactive Subscriber'}
                                                </span>
                                            </td>
                                            <td className="border border-[#212121] p-3">
                                                {user.subscriptionEnds}
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementTables;
