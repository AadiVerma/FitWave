import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import '../App.css';
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";
export default function PassWordChange() {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, watch } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Function to toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };
    // Watching password value to validate confirm password
    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:3000/user/changepassword", {
                email: email,
                password: data.password,
                confirm: data.Confirmpassword
            });
            toast.success("Password changed successfully!");
            navigate('/login');
        } catch (error) {
            console.error("Error in changing password", error);
            toast.error("Error changing password. Please try again.",{
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    };

    return (
        <div className='custom-scrollbar min-h-screen'>
            <Toaster />
            <img src="/bgimage2.jpg" className="absolute top-0 h-screen w-full object-cover grayscale opacity-25" />
            <div className='w-full h-full flex justify-center items-center p-5 absolute top-0 left-0'>
                <form
                    className='w-4/5 md:w-2/5 mx-auto p-6 border-2 border-[#212121] rounded-lg bg-black/60 backdrop-blur-lg'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='text-center'>
                        {/* <MdOutlineLockReset className="text-[#CCFF33] text-7xl mb-3" /> */}
                        <h2 className='text-xl font-semibold mt-2 mb-1 text-white'>Reset Password</h2>
                        <h4 className='text-sm text-slate-300'>Create a new password for your account</h4>
                    </div>

                    <div className="mt-4">
                        <h3 className='text-sm font-semibold text-white'>Password <span className='text-red-600'>*</span></h3>
                        <div className="flex relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                className='bg-transparent border-2 rounded-md outline-none p-3 mt-1 w-full text-white placeholder-neutral-400 border-[#121212] focus:ring-2 focus:ring-green-500'
                                {...register("password", {
                                    required: "Password is required.",
                                    minLength: {
                                        value: 7,
                                        message: "Password must be at least 7 characters long."
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{7,}$/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character."
                                    }
                                })}
                                placeholder="Enter your new password" />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-4 top-5">
                                {confirmPasswordVisible ? <IoEyeOffSharp className="text-neutral-400" /> : <IoEye className="text-neutral-400" />}
                            </button>
                        </div>

                        {errors.password && <div className='text-red-600 mb-3 ml-1'>{errors.password.message}</div>}
                    </div>

                    <div className="">
                        <h3 className='text-sm font-semibold text-white mt-4'>Confirm Password <span className='text-red-600'>*</span></h3>
                        <div className="fles relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className='bg-transparent border-2 rounded-md outline-none p-3 mt-1 w-full text-white placeholder-neutral-400 border-[#121212] focus:ring-2 focus:ring-green-500'
                                {...register("Confirmpassword", {
                                    required: "Confirm password is required.",
                                    minLength: {
                                        value: 7,
                                        message: "Password must be at least 7 characters long."
                                    },
                                    validate: {
                                        matchesPassword: value =>
                                            value === password || "Passwords do not match"
                                    }
                                })}
                                placeholder="Confirm your new password"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute top-5 right-4">
                                {passwordVisible ? <IoEyeOffSharp className="text-neutral-400 " /> : <IoEye className="text-neutral-400 " />}
                            </button>
                        </div>
                        {errors.Confirmpassword && <div className='text-red-600 mb-3 ml-1'>{errors.Confirmpassword.message}</div>}
                    </div>

                    <button
                        className='bg-gradient-to-b from-[#ccff33] to-[#99cc00] p-2 rounded-xl mt-4 block w-full text-center font-semibold text-black'
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Continue'}
                    </button>

                    <div className='w-full text-sm mt-3 flex justify-center'>
                        <h3 className='text-slate-300'>Remember your password?</h3>
                        <p
                            className='pl-3 text-emerald-400 cursor-pointer hover:font-semibold'
                            onClick={() => navigate("/login")}
                        >
                            Log In
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
