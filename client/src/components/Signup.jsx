import { useState } from 'react';
import { useForm } from "react-hook-form";
import { MdOutlineFitnessCenter } from "react-icons/md";
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
const clientID = "456140993308-lj743g6h1ssb2si49pb8rgvlrkc28u20.apps.googleusercontent.com";
import '../App.css'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const navigate = useNavigate();

    console.log(data);

    const onSuccess = (res) => {
        console.log("Login Success! Current user: ", res.profileObj);
    };

    const onFailure = (res) => {
        console.log("Login Failed! res: ", res);
    };

    return (
        <div className='custom-scrollbar min-h-[100%] h-fit'>
            <div className='bg-black text-white font-space border-[#212121] '>
                <div className='bg-black text-white w-full h-[612px] p-5 my-auto'>
                    <form className='w-2/5 mx-auto h-[530px] mt-5 p-4 border-[#212121] rounded-lg border-2' onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                        <div className='w-full text-center'>
                            <MdOutlineFitnessCenter className="w-full text-[#CCFF33] text-6xl transform -rotate-45 cursor-pointer" />
                            <h2 className='text-xl font-semibold mt-[-4px]'>Welcome to FitWave</h2>
                            <h4 className='text-sm mt-[-1px]'>Create account to access our services</h4>
                        </div>

                        <h1 className='text-sm font-semibold'>Username</h1>
                        <input className='bg-transparent border-2 rounded-md outline-none p-2 mt-1 w-full mb-2 border-[#121212]' {...register("firstName", { required: true, minLength: { value: 2, message: "Username must be at least 2 characters long" } })} placeholder="Username" />

                        <h3 className='text-sm font-semibold'>Email</h3>
                        <input className='bg-transparent border-2 rounded-md outline-none p-2 mt-1 w-full mb-2 border-[#121212]' {...register("Email", {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            }
                        })}
                            placeholder="Email" />

                        <h3 className='text-sm font-semibold'>Password</h3>
                        <input className='bg-transparent border-2 rounded-md outline-none p-2 mt-1 w-full mb-2 border-[#121212]' {...register("password", {
                            required: true,
                            minLength: {
                                value: 7,
                                message: "Password must be at least 7 characters long"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{7,}$/,
                                message: "Password must contain at least one uppercase letter, one lowercase letter, and one symbol"
                            }
                        })} placeholder="Password" />

                        <input className='bg-pink-500 hover:bg-pink-600 rounded-md mt-2 block w-full cursor-pointer text-center font-semibold p-2' value="Continue" type="submit" />

                        <div className='w-full text-sm mt-2 flex justify-center '>
                            <h3 className=''>Already have an account?</h3>
                            <p className='pl-3 text-emerald-400 cursor-pointer hover:font-semibold'
                            onClick={()=>{
                            navigate("/login")
                            }}>Log in</p>
                        </div>

                        <div className='flex justify-center'>
                            <hr className='border-[#212121] border-[0.2px] w-[45%] mt-5 mr-2 ' />
                            <h3 className='text-center mt-2 font-medium'>OR</h3>
                            <hr className='border-[#212121] border-[0.2px] w-[45%] ml-2 mt-5 ' />
                        </div>

                        <div className='flex justify-center mt-4 '>

                            <GoogleLogin
                                clientId={clientID}
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                render={renderProps => (
                                    <div className='flex w-[90%] bg-white justify-center rounded-lg cursor-pointer' onClick={renderProps.onClick}>
                                        <FcGoogle className='text-3xl mt-1' />
                                        <button disabled={renderProps.disabled} className='text-black font-extrabold rounded-md px-4 py-2 cursor-pointer'>
                                            Sign in with Google
                                        </button>
                                    </div>

                                )}
                            />
                        </div>
                    </form>
                </div>
            </div>
         </div>
    )
}
