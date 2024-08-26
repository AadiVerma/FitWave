import { useState } from 'react';
import { useForm } from "react-hook-form";
import { MdOutlineFitnessCenter } from "react-icons/md";
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import { FaUserLock } from "react-icons/fa";
import '../App.css'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const { register, handleSubmit, formState:{errors,isValid, isSubmitting} } = useForm({mode:'onChange'});
    const [data, setData] = useState("");
    const navigate = useNavigate();


    return (
        <>
            <div className='bg-black text-white font-space border-[#212121] '>
                <div className='bg-black text-white w-full h-[612px] p-5 my-auto'>
                    <form className='w-2/5 mx-auto h-[440px] mt-5 p-4 border-[#212121] rounded-lg border-2' onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                        <div className='w-full text-center'>
                            <FaUserLock className="w-full text-[#CCFF33] text-5xl cursor-pointer mb-1 " />
                            <h2 className='text-xl font-semibold mt-[-1px] mb-1 '>Trouble logging in?</h2>
                            <h4 className='text-xs mt-[-1px] mx-16 text-slate-300'>Enter your email or username and we'll send you a link to get back into your account.</h4>
                        </div>


                        <h1 className='text-sm font-semibold'>Username <span className='text-red-600'>   *</span></h1>
                        <input className='bg-transparent border-2 rounded-md outline-none p-2 mt-1 w-full  border-[#121212] cursor-text' {...register("username", { required: {"value":true, "message":"This field is required." }, minLength: { value: 3, message: "Username must be at least 3 characters long" } })} placeholder="Username" />
                        
                        {errors.username && <div className='text-red-600 mb-3 ml-1'>{errors.username.message}</div>}

                        <h3 className='text-sm font-semibold'>Email<span className='text-red-600'>   *</span></h3>
                        <input className='bg-transparent border-2 rounded-md outline-none p-2 mt-1 w-full border-[#121212] cursor-text' {...register("email", {
                             required: {"value":true, "message":"This field is required." },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            }
                        })}
                            placeholder="Email" />

                        {errors.email && <div className='text-red-600 mb-3 ml-1'>{errors.email.message}</div>}

                        

                        <input className={`bg-pink-500 hover:bg-pink-600 rounded-md mt-2 block w-full cursor-pointer text-center font-semibold p-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`} value="Send Login Link" type="submit" onClick={()=>{
                            navigate("/verification")
                            }}/>

                        <div className='w-full text-sm mt-2 flex justify-center '>
                            <h3 className='cursor-pointer hover:font-semibold'>Can't reset your password?</h3>
                            
                        </div>

                        <div className='flex justify-center'>
                            <hr className='border-[#212121] border-[0.2px] w-[45%] mt-5 mr-2 ' />
                            <h3 className='text-center mt-2 font-medium'>OR</h3>
                            <hr className='border-[#212121] border-[0.2px] w-[45%] ml-2 mt-5 ' />
                        </div>
                        <p className='text-base text-white text-center mt-2 hover:font-bold cursor-pointer' onClick={()=>{
                            navigate("/signup")
                            }}>Create new account</p>
                        
                    </form>
                </div>
            </div>
         </>
    )
}
