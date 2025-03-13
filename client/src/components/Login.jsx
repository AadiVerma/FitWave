import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import '../App.css'
import { FaRegUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { addcookie } from '../redux/slices/slice.js'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { authselector } from "../redux/slices/slice";
export default function Login() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();
    const auth = useSelector(authselector);
    const [passwordVisible, setPasswordVisible] = useState(false);
    useEffect(()=>{
        if(auth){
            navigate("/");
        }
    })
    const delay = (d) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, d * 1000);
        })
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async (data) => {
        await toast.promise(
            delay(2).then(async () => {
                try {
                    const response = await axios.post("http://localhost:3000/user/login", {
                        username: data.username,
                        password: data.password,
                    }, {
                        withCredentials: true,
                    });
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("profilePic", response.data.profilePic);
                    dispatch(addcookie(true));
                    window.location.reload();

                    return response; 
                } catch (error) {
                    throw new Error(error.response?.data?.error || "Login failed due to network error");
                }
            }),
            {
                loading: 'Logging in...',
                success: 'Login successful!',
                error: (error) => `Login Failed! ${error.message}`, 
            },
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            }
        ).catch(error => {
            console.error('Fetch error:', error);
        });
    };

    return (
        <div className="flex w-[100%] relative min-h-screen justify-center place-items-center">
            <div className='w-[100%]'>
                <Toaster />
                <img src="/bgimage2.jpg" className="absolute top-0 h-screen w-full object-cover grayscale opacity-25" />
                <div className='bg-black text-white font-space flex'>
                    <div className='bg-black text-white w-full h-fit p-5 my-auto'>
                        <form className='w-2/5 mx-auto h-fit mt-5 p-6 border-[#212121] border-2 rounded-xl bg-black   backdrop-blur-sm border-white/18 ' onSubmit={handleSubmit(onSubmit)}>
                            <h1 className='text-md font-semibold text-neutral-400 mb-1'>Username</h1>
                            <div className="flex">
                                <div className="flex flex-col justify-center place-items-center border-l-2 border-t-2 pl-2 border-b-2 rounded-l-lg mt-1 border-[#121212] ">
                                    <FaRegUser className="text-neutral-400 " />
                                </div>
                                <input className='bg-transparent border-r-2 border-t-2 border-b-2  rounded-r-lg outline-none p-2 mt-1 w-full border-[#121212] ' {...register("username", { required: { "value": true, "message": "This field is required." }, minLength: { value: 3, message: "Username must be at least 3 characters long" } })} placeholder="Username" />
                            </div>
                            {errors.username && <div className='text-red-600 mb-3 ml-1'>{errors.username.message}</div>}

                            <div className="flex justify-between">
                                <h3 className='text-md font-semibold text-neutral-400 mb-1 mt-4'>Password</h3>
                                <h1 className='text-sm text-center flex flex-col  justify-end font-semibold 
                        hover:text-[#ccff33d5] cursor-pointer text-[#ccff33]' onClick={() => {
                                        navigate("/forgotpwd")
                                    }}>Forgot password ?</h1>
                            </div>
                            <div className="flex relative">
                                <div className="flex flex-col justify-center place-items-center border-l-2 border-t-2 pl-2 border-b-2 rounded-l-lg mt-1 border-[#121212] ">
                                    <FaLock className="text-neutral-400 " />
                                </div>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className='bg-transparent border-r-2 border-t-2 border-b-2  rounded-r-lg outline-none p-2 mt-1 w-full border-[#121212] ' {...register("password", {
                                        required: { "value": true, "message": "This field is required." },
                                        minLength: {
                                            value: 7,
                                            message: "Password must be at least 7 characters long"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{7,}$/,
                                            message: "Password must contain at least one uppercase letter, one lowercase letter, and one symbol"
                                        }
                                    })} placeholder="Password" />
                                <button type="button" onClick={togglePasswordVisibility} className="absolute top-4 right-4">
                                    {passwordVisible ? <IoEyeOffSharp className="text-neutral-400 " /> : <IoEye className="text-neutral-400 " />}
                                </button>
                            </div>
                            {errors.password && <div className='text-red-600 mb-3 ml-1'>{errors.password.message}</div>}
                            <button className={`bg-gradient-to-b from-[#ccff33] to-[#99cc00] p-2 rounded-xl mt-4 block w-full cursor-pointer text-center font-semibold text-black`}>
                                Login
                            </button>


                            <div className='w-full text-sm mt-2 flex justify-center '>
                                <h3 className=''>Do not have an account?</h3>
                                <p className='pl-3 text-[#ccff33] cursor-pointer hover:font-semibold' onClick={() => {
                                    navigate("/signup")
                                }}>Sign up</p>
                            </div>

                            {/* <div className='flex justify-center'>
                                <hr className='border-[#212121] border-[0.2px] w-[45%] mt-5 mr-2 ' />
                                <h3 className='text-center mt-2 font-medium'>OR</h3>
                                <hr className='border-[#212121] border-[0.2px] w-[45%] ml-2 mt-5 ' />
                            </div>

                            <div className='flex justify-center mt-4 '>
                            </div> */}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
