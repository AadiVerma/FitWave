import { useState } from 'react';
import { useForm } from "react-hook-form";
import { MdOutlineFitnessCenter } from "react-icons/md";
const clientID = "456140993308-lj743g6h1ssb2si49pb8rgvlrkc28u20.apps.googleusercontent.com";
import '../App.css'
import { useNavigate } from 'react-router-dom';


export default function VerificationPwd() {
    const { register, handleSubmit } = useForm();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const navigate = useNavigate();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to next input field
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (element, index) => {
        if (element.key === "Backspace" && !otp[index]) {
            if (element.target.previousSibling) {
                element.target.previousSibling.focus();
            }
        }
    };

    const handleSubmitOtp = (data) => {
        const otpCode = otp.join("");
        setData(otpCode);
        // Add submission logic here
    };

    return (
        <>
            <div className='bg-black text-white font-space border-[#212121] '>
                <div className='bg-black text-white w-full h-[612px] p-5 my-auto'>
                    <form className='w-2/5 mx-auto h-[440px] mt-5 p-4 border-[#212121] rounded-lg border-2'  onSubmit={handleSubmit(handleSubmitOtp)}>
                        <div className='w-full text-center'>
                            <MdOutlineFitnessCenter className="w-full text-[#CCFF33] text-6xl transform -rotate-45 " />

                            <h2 className='text-xl font-semibold mt-[-1px] mb-1 '>Enter Verification Code</h2>
                            <h4 className='text-xs mt-[-1px] mx-16 text-slate-300'>For your security, we have sent the code to your phone number.</h4>


                            <div className='flex justify-center mx-[12%] mt-3'>
                                {otp.map((value, index) => (
                                    <input key={index} {...register(" otp", {required:true})} type="text" className="bg-black cursor-text mb-4 w-12 h-12 mx-2 text-center text-2xl border-2 rounded-lg border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        maxLength="1" value={value}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace
                                        aria-label={`OTP digit ${index + 1}`}
                                    />
                                ))}
                            </div>

                                <div className="text-center mb-4">
                                <a href="/" className="text-sm text-slate-300">
                                    Didn't get the code? <span className="text-green-500 hover:underline">Click to resend.</span>
                                </a>
                            </div>

                            <input className='bg-pink-500 hover:bg-pink-600 rounded-md mt-2 block w-full cursor-pointer text-center font-semibold p-2' value="Submit code" type="submit" />

                            <div className='w-full text-sm mt-5 '>
                                <h3 className='cursor-pointer hover:font-semibold'>Need help?</h3>
                                <h2 className='text-xs mt-2'>If you cannot receive the code or if you changed your email or phone number, <span className='text-green-300 hover:font-semibold cursor-pointer'>try a different way.</span></h2>
            
                               
                            </div>
                        </div>
                        
                        
                    </form>
                </div>
            </div>
         </>
    )
}
