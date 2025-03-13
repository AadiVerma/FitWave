import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import '../App.css';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

    const delay = (d) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, d * 1000);
        });
    };

    const onSubmit = async (data) => {
        await toast.promise(
            delay(2).then(async () => {
                // Send the username and email to the backend for password recovery
                const response = await axios.post('http://localhost:3000/user/forgotpwd', {
                    email: data.email,
                    username: data.username
                }, {
                    withCredentials: true
                });
                console.log(response.data); // You can log the response or handle it accordingly
                navigate('/verification', { state: { email: data.email } });
            }),
            {
                loading: 'Sending reset link...',
                success: 'Link sent successfully!',
                error: 'Error sending the reset link. Please try again.',
            },
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        ).catch(error => {
            console.error('Fetch error:', error);
        });
    };

    return (
        <div className='flex w-[100%] relative min-h-screen justify-center place-items-center'>
            <div className='w-[100%]'>
                <Toaster />
                <img src="/bgimage2.jpg" className="absolute top-0 h-screen w-full object-cover grayscale opacity-25" />
                <div className='bg-black text-white font-space flex'>
                    <div className='bg-black text-white w-full h-fit p-5 my-auto'>
                        <form 
                            className='w-2/5 mx-auto h-fit mt-5 p-6 border-[#212121] border-2 rounded-xl bg-black backdrop-blur-sm border-white/18' 
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className='text-center'>
                                {/* <FaUserLock className="text-[#CCFF33] text-5xl mb-2" /> */}
                                <h2 className='text-xl font-semibold mt-[-1px] mb-2'>Trouble logging in?</h2>
                                <h4 className='text-xs mx-16 text-slate-300'>Enter your email or username and we'll send you a link to get back into your account.</h4>
                            </div>

                            <div className="mt-4">
                                <h1 className='text-md font-semibold text-neutral-400 mb-1'>Username</h1>
                                <input 
                                    className='bg-transparent border-2 rounded-md outline-none p-2 mt-1 w-full mb-2 border-[#121212]' 
                                    {...register("username", { 
                                        required: { value: true, message: "Username is required." },
                                        minLength: { value: 3, message: "Username must be at least 3 characters long." }
                                    })}
                                    placeholder="Username" 
                                />
                                {errors.username && <div className='text-red-600 mb-3 ml-1'>{errors.username.message}</div>}
                            </div>

                            <div>
                                <h3 className='text-md font-semibold text-neutral-400 mb-1'>Email</h3>
                                <input 
                                    className='bg-transparent border-2 rounded-md outline-none p-2 mt-1 w-full mb-2 border-[#121212]' 
                                    {...register("email", {
                                        required: { value: true, message: "Email is required." },
                                        pattern: { 
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
                                            message: "Please enter a valid email address."
                                        }
                                    })}
                                    placeholder="Email" 
                                />
                                {errors.email && <div className='text-red-600 mb-3 ml-1'>{errors.email.message}</div>}
                            </div>

                            <button className='bg-gradient-to-b from-[#ccff33] to-[#99cc00] p-2 rounded-xl mt-4 block w-full cursor-pointer text-center font-semibold text-black'>
                                Send Reset Link
                            </button>
{/* 
                            <div className='w-full text-sm mt-2 flex justify-center'>
                                <h3 className='cursor-pointer hover:font-semibold'>Can't reset your password?</h3>
                            </div> */}

                            <div className='flex justify-center'>
                                <hr className='border-[#212121] border-[0.2px] w-[45%] mt-5 mr-2 ' />
                                <h3 className='text-center mt-2 font-medium'>OR</h3>
                                <hr className='border-[#212121] border-[0.2px] w-[45%] ml-2 mt-5 ' />
                            </div>

                            <p 
                                className='text-base text-white text-center mt-2 hover:font-bold cursor-pointer' 
                                onClick={() => navigate("/signup")}
                            >
                                Create new account
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
