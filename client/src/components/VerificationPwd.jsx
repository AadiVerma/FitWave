import { useState } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import '../App.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerificationPwd() {
    const location = useLocation();
    const { email } = location.state;
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const navigate = useNavigate();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async () => {
        const stringdata = otp.join('');
        if (stringdata.length < 6) {
            return false;
        } else {
            setOtp(new Array(6).fill(""));
            const data = parseInt(stringdata);
            try {
                const response = await axios.post('http://localhost:3000/user/verifyotp', {
                    otp: data,
                    email: email
                }, {
                    withCredentials: true
                });

                if (response.status !== 200) {
                    throw new Error("OTP is Incorrect", response.status);
                } else {
                    navigate("/passwordChange", { state: { email } });
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    const handleKeyDown = (element, index) => {
        if (element.key === "Backspace" && !otp[index]) {
            if (element.target.previousSibling) {
                element.target.previousSibling.focus();
            }
        }
    };

    return (
        <div className='flex w-[100%] relative min-h-screen justify-center items-center'>
            <div className='w-[100%]'>
                <img src="/bgimage2.jpg" className="absolute top-0 h-screen w-full object-cover grayscale opacity-25" />
                <div className='bg-black bg-opacity-60 text-white font-space flex'>
                    <div className='bg-black text-white w-full h-fit p-5 my-auto'>
                        <div className='w-2/5 mx-auto p-6 mt-5 border-2 border-[#212121] rounded-xl backdrop-blur-sm'>
                            <div className='w-full text-center'>
                                <MdVerifiedUser className="w-full text-[#CCFF33] text-6xl mb-3" />
                                <h2 className='text-xl font-semibold mt-[-1px] mb-1'>Enter Verification Code</h2>
                                <h4 className='text-xs mt-[-1px] mx-16 text-slate-300'>
                                    For your security, we have sent the code to your phone number.
                                </h4>
                            </div>

                            <div className='flex justify-center mt-5'>
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="bg-transparent w-12 h-12 mx-2 text-center text-2xl border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        maxLength="1"
                                        value={value}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        aria-label={`OTP digit ${index + 1}`}
                                    />
                                ))}
                            </div>


                            <button
                                className='bg-gradient-to-b from-[#ccff33] to-[#99cc00] p-2 rounded-xl mt-4 block w-full text-center font-semibold text-black'
                                onClick={handleSubmit}
                            >
                                Submit Code
                            </button>
                            <div className="text-center mb-4 mt-3">
                                <a href="/" className="text-sm text-slate-300">
                                    Didn’t get the code? <span className="text-green-500 hover:underline">Click to resend.</span>
                                </a>
                            </div>

                            {/* <div className='w-full text-sm mt-5 text-center'>
                                <h3 className='cursor-pointer hover:font-semibold'>Need help?</h3>
                                <h2 className='text-xs mt-2'>
                                    If you cannot receive the code or changed your email or phone number, 
                                    <span className='text-green-300 hover:font-semibold cursor-pointer'>
                                        try a different way.
                                    </span>
                                </h2>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
