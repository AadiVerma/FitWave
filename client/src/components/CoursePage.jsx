/* eslint-disable react/prop-types */
import { ShoppingCart, Star, Download } from 'lucide-react';
import { useParams } from 'react-router-dom';
import '../App.css'
import makePayment from './util/MakePayment';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const CoursePage = () => {
    const { image, type, name, desc, price, lastprice, count } = useParams();
    const username = localStorage.getItem("username");
    const courseData = {
        title: " Web Development",
        instructor: "John Smith",
        rating: 4.7,
        reviewCount: 1245,
        price: {
            standard: 49.99,
            premium: 79.99
        },
        description: "Master web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, and more with hands-on projects.",
        includedResources: [
            "50+ hours of video content",
            "Lifetime access",
            "Downloadable resources",
            "Certificate of completion"
        ],
    };
    const formateddata = [{
        name: name,
        price: price,
        image: `http://localhost:5173/${image}`,
        quantity: 1
    }]
    const handleclick = async () => {
        makePayment({
            data:formateddata
        })
        const response = await axios.post(`http://localhost:3000/user/purchasecourse/${username}`, {
            data: formateddata
        })
        if (response.status==200) {
                setTimeout(()=>{
                    toast.success('Course Purchased Successfully', {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                },2000)
        }
        else {
            console.log(response);
            toast.error('Something Went Wrong Please trry Again!!', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }
    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 text-white custom-scrollbar max-h-[87vh]">
            {/* Course Image Section */}
            <Toaster />
            <div className="bg-[#121212] rounded-lg p-4 flex items-center justify-center h-fit max-h-[75vh] overflow-hidden">
                <img
                    src={`/${image}`}
                    alt={courseData.type}
                    className="max-w-full rounded-lg shadow-lg "
                />
            </div>

            {/* Course Details Section */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Complete {type} Masterclass</h1>

                {/* Instructor & Rating */}
                <div className="flex items-center mb-4">
                    <span className="mr-4 text-neutral-400">By {name}</span>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(courseData.rating) ? 'text-[#CCFF33]' : 'text-gray-300'}`}
                                fill={i < Math.floor(courseData.rating) ? 'currentColor' : 'none'}
                            />
                        ))}
                        <span className="ml-2 text-gray-600">
                            ({4}) • {count} reviews
                        </span>
                    </div>
                </div>

                {/* Price & Tiers */}
                <div className="mb-6 flex gap-4">
                    <div className="text-2xl font-bold text-green-600">
                        ${price}
                    </div>
                    <div className='line-through text-neutral-500 text-2xl'>
                        ${lastprice}
                    </div>
                </div>

                {/* Course Description */}
                <p className="mb-6 text-neutral-500">{desc}</p>

                {/* Included Resources */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2"> What`s Included:</h3>
                    <ul className="space-y-2">
                        {courseData.includedResources.map((resource, index) => (
                            <li key={index} className="flex items-center">
                                <Download className="mr-2 h-5 w-5 text-blue-600" />
                                {resource}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Add to Cart Button */}
                <button
                    className="w-full bg-[#CCFF33] text-black font-bold py-3 rounded-lg transition flex items-center justify-center"

                    onClick={handleclick}
                >
                    <ShoppingCart className="mr-2" />
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default CoursePage;