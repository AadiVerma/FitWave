import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { FaRegUser, FaLock } from "react-icons/fa";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { IoEye , IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";

export default function Login() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();

    // State to manage password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Function to toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const onSubmit = async (formData) => {
        try {
            const { username, email, password } = formData;
            console.log(username, email, password);
            await axios.post('http://localhost:3000/user/signup', {
                username,
                email,
                password
            }, {
                withCredentials: true
            });
            navigate('/profile', { state: { email } });
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            toast.error("Error signing up, please try again.",{
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    };

    return (
        <div className="flex w-[100%] relative min-h-screen justify-center place-items-center">
            <div className='w-[100%]'>
                <Toaster />
                <img src="/bgimage2.jpg" className="absolute top-0 h-screen w-full object-cover grayscale opacity-25" />
                <div className='bg-black text-white font-space flex'>
                    <div className='bg-black text-white w-full h-fit p-5 my-auto'>
                        <form
                            className='w-2/5 mx-auto h-fit mt-5 p-6 border-[#212121] border-2 rounded-xl bg-black backdrop-blur-sm border-white/18'
                            onSubmit={handleSubmit(onSubmit)}>

                            <h1 className='text-md font-semibold text-neutral-400 mb-1'>Username</h1>
                            <div className="flex">
                                <div className="flex flex-col justify-center place-items-center border-l-2 border-t-2 pl-2 border-b-2 rounded-l-lg mt-1 border-[#121212]">
                                    <FaRegUser className="text-neutral-400" />
                                </div>
                                <input
                                    className='bg-transparent border-r-2 border-t-2 border-b-2 rounded-r-lg outline-none p-2 mt-1 w-full border-[#121212]'
                                    {...register("username", {
                                        required: { "value": true, "message": "This field is required." },
                                        minLength: { value: 3, message: "Username must be at least 3 characters long" },
                                        pattern: {
                                            value: /^[A-Za-z][A-Za-z0-9_]*$/, // This ensures that the username is not only numeric and starts with a letter
                                            message: "Username cannot be only numbers."
                                        }
                                    })}
                                    placeholder="Username"
                                />
                            </div>
                            {errors.username && <div className='text-red-600 mb-3 ml-1'>{errors.username.message}</div>}

                            <h1 className='text-md font-semibold text-neutral-400 mb-1 mt-4'>Email</h1>
                            <div className="flex">
                                <div className="flex flex-col justify-center place-items-center border-l-2 border-t-2 pl-2 border-b-2 rounded-l-lg mt-1 border-[#121212]">
                                    <MdOutlineEmail className="text-neutral-400 text-lg" />
                                </div>
                                <input
                                    className='bg-transparent border-r-2 border-t-2 border-b-2 rounded-r-lg outline-none p-2 mt-1 w-full border-[#121212]'
                                    {...register("email", {
                                        required: { "value": true, "message": "This field is required." },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Please enter a valid email address."
                                        }
                                    })}
                                    placeholder="Email"
                                />
                            </div>
                            {errors.email && <div className='text-red-600 mb-3 ml-1'>{errors.email.message}</div>}

                            <h1 className='text-md font-semibold text-neutral-400 mb-1 mt-4'>Password</h1>
                            <div className="flex relative">
                                <div className="flex flex-col justify-center place-items-center border-l-2 border-t-2 pl-2 border-b-2 rounded-l-lg mt-1 border-[#121212]">
                                    <FaLock className="text-neutral-400" />
                                </div>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className='bg-transparent border-r-2 border-t-2 border-b-2 rounded-r-lg outline-none p-2 mt-1 w-full border-[#121212]'
                                    {...register("password", {
                                        required: { "value": true, "message": "This field is required." },
                                        minLength: { value: 7, message: "Password must be at least 7 characters long" },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{7,}$/,
                                            message: "Password must contain at least one uppercase letter, one lowercase letter, and one symbol"
                                        }
                                    })}
                                    placeholder="Password"
                                />
                                <button type="button" onClick={togglePasswordVisibility} className="absolute top-4 right-4">
                                    {passwordVisible ? <IoEyeOffSharp className="text-neutral-400 " /> : <IoEye className="text-neutral-400 " />}
                                </button>
                            </div>
                            {errors.password && <div className='text-red-600 mb-3 ml-1'>{errors.password.message}</div>}

                            <h1 className='text-md font-semibold text-neutral-400 mb-1 mt-4'>Confirm Password</h1>
                            <div className="flex relative">
                                <div className="flex flex-col justify-center place-items-center border-l-2 border-t-2 pl-2 border-b-2 rounded-l-lg mt-1 border-[#121212]">
                                    <FaLock className="text-neutral-400" />
                                </div>
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    className='bg-transparent border-r-2 border-t-2 border-b-2 rounded-r-lg outline-none p-2 mt-1 w-full border-[#121212]'
                                    {...register("confirmPassword", {
                                        required: { "value": true, "message": "Please confirm your password." },
                                        validate: value => value === getValues("password") || "Passwords do not match"
                                    })}
                                    placeholder="Confirm Password"
                                />
                                <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-4 top-4">
                                    {confirmPasswordVisible ? <IoEyeOffSharp className="text-neutral-400" /> : <IoEye className="text-neutral-400" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <div className='text-red-600 mb-3 ml-1'>{errors.confirmPassword.message}</div>}

                            <button className={`bg-gradient-to-b from-[#ccff33] to-[#99cc00] p-2 rounded-xl mt-4 block w-full cursor-pointer text-center font-semibold text-black`}>
                                Sign Up
                            </button>

                            <div className='w-full text-sm mt-2 flex justify-center'>
                                <h3 className=''>Already Have an account?</h3>
                                <p className='pl-3 text-[#ccff33] cursor-pointer hover:font-semibold' onClick={() => {
                                    navigate("/login")
                                }}>Log In</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
