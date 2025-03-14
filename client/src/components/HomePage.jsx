import { authselector } from '../redux/slices/slice';
import { removecookie } from '../redux/slices/slice';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AiFillInstagram } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import TrainerShowCase from './TrainerShowcase';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa6";
import bgimage from '/HomepageBackground.png';
import { FaDumbbell } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { IoMdMail } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Noprofile from '/Noprofile.jpg';
import OurClient from './OurClient';
import AiiMage from '/AiImage.jpg';
import image10 from '/Image10.png'
import image1 from '/Image1.png'
import image3 from '/Image3.png'
import image4 from '/Image4.png'
import image6 from '/Image6.png'
import image7 from '/Image7.png'
import image8 from '/Image8.png'
import image9 from '/Image9.png'
import Image11 from '/Image11.jpg'
import contactus from '/Gym.png'
import image2 from '/Image2.png'
import { cardio } from 'ldrs'
import axios from 'axios';
import gsap from "gsap";
import '../App.css'
export default function HomePage() {
    cardio.register()
    gsap.registerPlugin(ScrollTrigger);
    const profile = localStorage.getItem("profilePic");
    const navigate = useNavigate();
    const [showDropDown, setshowdropdown] = useState(false);
    const dispatch = useDispatch();
    const [email, setemail] = useState();
    const [textarea, settextarea] = useState();
    const auth = useSelector(authselector);
    const [loader, setloader] = useState(true);
    const navicon = useRef();
    const navhome = useRef();
    const navabout = useRef();
    const navclasses = useRef();
    const navshop = useRef();
    const navtrain = useRef();
    const navcont = useRef();
    const navlogin = useRef();
    const section2img = useRef();
    const section21 = useRef();
    const section22 = useRef();
    const section23 = useRef();
    const section24 = useRef();
    const refdropdown = useRef();
    // dropdown should hide on clicking outside the scope
    const handleClickOutside = (event) => {
        if (refdropdown.current && !refdropdown.current.contains(event.target)) {
            setshowdropdown(false);
        }
    }
    const handlecontact = async() => {
        if (!email || !textarea) {
            toast.error('Please enter your email address and Message', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }

        try {
            await axios.post('http://localhost:3000/email',{
                email:email,
                text:textarea
            })
            setemail("");
            settextarea("");
            toast.success('Email Sent Successully!!', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        } catch (error) {
            toast.error(`Error ${error}`, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
        
    }
    useEffect(()=>{
        const fetch =async ()=>{
            await axios.post('http://localhost:3000/user/addinteract')
        }
        fetch();
    },[])
    useEffect(() => {
        const timer = setTimeout(() => {
            setloader(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (!loader && navicon.current) {
            document.getElementById('main-content').style.visibility = 'visible';

            const tl = gsap.timeline();
            tl.from(navicon.current, {
                y: -30,
                duration: 0.1,
                opacity: 0,
                delay: 0.5
            });
            tl.from(navhome.current, {
                y: -30,
                duration: 0.1,
                opacity: 0,
                delay: 0
            });
            tl.from(navabout.current, {
                y: -30,
                duration: 0.1,
                opacity: 0,
                delay: 0
            });
            tl.from(navclasses.current, {
                y: -30,
                duration: 0.1,
                opacity: 0,
                delay: 0
            });
            tl.from(navshop.current, {
                y: -30,
                duration: 0.1,
                opacity: 0,
                delay: 0
            });
            tl.from(navtrain.current, {
                y: -30,
                duration: 0.1,
                opacity: 0,
                delay: 0
            });
            tl.from(navcont.current, {
                y: -30,
                duration: 0.2,
                opacity: 0,
                delay: 0
            });
            tl.from(navlogin.current, {
                y: -30,
                duration: 0.2,
                opacity: 0,
                delay: 0
            });
            tl.from(section2img.current, {
                x: 80,
                duration: 0.2,
                opacity: 0,
                delay: 0
            })
            tl.from(section21.current, {
                x: -80,
                duration: 0.2,
                opacity: 0,
                delay: 0
            })
            tl.from(section22.current, {
                x: -80,
                duration: 0.2,
                opacity: 0,
                delay: 0
            })
            tl.from(section23.current, {
                y: 80,
                duration: 0.2,
                opacity: 0,
                delay: 0
            })
            tl.from(section24.current, {
                y: 80,
                duration: 0.2,
                opacity: 0,
                delay: 0
            })
        }
    }, [loader]);
    return (
        <>
            {loader ? <div className='bg-black flex justify-center place-content-center place-items-center font-space custom-scrollbar min-h-screen h-fit text-white' >
                <l-cardio
                    size="200"
                    stroke="4"
                    speed="1.2"
                    color="#CCFF33"
                ></l-cardio>
            </div> : <div id="main-content" className='bg-black font-space custom-scrollbar min-h-screen h-fit text-white' style={{ visibility: 'hidden' }}
            >
                {/* section - 1 */}
                <div className={`flex justify-between p-4 `} onClick={handleClickOutside}>
                    <h1 className='text-3xl'>
                        <div ref={navicon} className='flex gap-4'>
                            <FaDumbbell className='text-[#CCFF33] text-4xl' />
                            <span className="text-white font-bold">FitWave</span>
                        </div>
                    </h1>
                    <div className='flex gap-4 text-xl cursor-pointer'>
                        <h1 ref={navhome} className='hover:text-[#CCFF33]'>HOME</h1>
                        <h1 ref={navabout} className='hover:text-[#CCFF33]' onClick={() => { navigate('/todo') }}>TODO PLAN</h1>
                        <h1 ref={navclasses} className='hover:text-[#CCFF33]' onClick={() => {
                            navigate("/classes")
                        }}>CLASSES</h1>
                        <h1 ref={navshop} className='hover:text-[#CCFF33]' onClick={() => {
                            navigate("/shop")
                        }}>SHOP</h1>
                        <a ref={navtrain} className='hover:text-[#CCFF33]' href='#trainers'>TRAINERS</a>
                        <a ref={navcont} className='hover:text-[#CCFF33]' onClick={() => navigate("/pricing")}>PRICING</a>
                    </div>
                    {auth == false ? <div ref={navlogin} className='flex gap-4'>
                        <button className='border-2 border-[#CCFF33] bg-[#CCFF33] p-2 pl-6 pr-6 rounded hover:bg-[black] hover:text-white text-black font-bold' onClick={() => {
                            navigate("/login")
                        }}>LogIn</button>
                        <button className='border-2 border-[#CCFF33] p-2 pl-5 pr-5 rounded hover:bg-[#CCFF33] hover:text-black font-bold' onClick={() => {
                            navigate("/signup")
                        }}>SignUp</button>
                    </div> : <div ref={navlogin} className='flex gap-4'>
                        <div className="flex-col justify-center place-content-center cursor-pointer" onClick={() => setshowdropdown((prev) => !prev)}>
                            <div className="h-12  w-12 rounded-full border-2 border-[#dbd9d971] bg-[#212121]">
                                <img src={profile === undefined ? Noprofile : profile} className="rounded-full" />
                            </div>
                        </div>
                    </div>}

                </div>
                <div className='relative'>
                    {showDropDown && auth && <div ref={refdropdown} className="z-50 absolute right-11 -top-3 font-bold border-2 border-[#dbd9d971] rounded-lg shadow w-40 bg-black text-white">
                        <ul className="py-2 text-md text-gray-700 dark:text-gray-200">
                            <li>
                                <a href="/dashboard" className="block px-4 py-2 hover:bg-[#111111]  dark:hover:text-[#CCFF33]">Dashboard</a>
                            </li>
                            <li>
                                <a href="/updateprofile" className="block px-4 py-2 hover:bg-[#111111]  dark:hover:text-[#CCFF33]">Profile</a>
                            </li>
                            {/* <li>
                                <a href="/updateprofile" className="block px-4 py-2 hover:bg-[#111111]  dark:hover:text-[#CCFF33]">Dashboard</a>
                            </li> */}
                            <li className=''>
                                <button className="flex gap-4 w-full text-left px-4 py-2 hover:bg-[#111111]  dark:hover:text-[#CCFF33]" onClick={async () => {
                                    dispatch(removecookie());
                                    localStorage.removeItem("token")
                                    localStorage.removeItem("username")
                                    localStorage.removeItem("profilePic")
                                    toast('LogOut Successfully!',
                                        {
                                            icon: '☠️',
                                            style: {
                                                borderRadius: '10px',
                                                background: '#333',
                                                color: '#fff',
                                            },
                                        }
                                    );
                                    await Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve()
                                        }, 2000);
                                    })
                                    navigate("/login")
                                }}>
                                    Sign out
                                    <div className='flex flex-col justify-center text-2xl'>
                                        <FiLogOut />
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>}
                </div>
                {/* section - 2 */}
                <div className='relative bg-black w-full h-screen p-6' onClick={handleClickOutside}>
                    <Toaster />
                    <div className='absolute inset-0 left-[10%] overflow-hidden'>
                        <img ref={section2img} src={bgimage} alt="Background" className='w-full h-full object-cover grayscale' />
                    </div>
                    <div className='relative z-10 flex items-center h-full'>
                        <div className='text-left'>
                            <h1 ref={section21} className='text-white text-8xl font-bold'>
                                <span className="stroke-text text-[#CCFF33]">ACHIEVE</span> MORE
                            </h1>
                            <h2 ref={section22} className='text-white  text-8xl mt-4 font-extrabold'>THAN JUST FITNESS</h2>
                            <h2 ref={section23} className='flex flex-wrap w-[55%] text-xl ml-[1%] mt-[1%]'>Unlock your full potential with our comprehensive workout programs designed to transform your physique and boost your confidence</h2>
                            <div ref={section24} className='mt-4 ml-10 flex gap-6 '>
                                <button className='p-2 pl-10 pr-10 border-2 font-bold border-[#CCFF33] rounded hover:bg-[#CCFF33] hover:text-black' onClick={() => {
                                    auth ? navigate('/classes') : toast('LogIn First!',
                                        {
                                            icon: '☠️',
                                            style: {
                                                borderRadius: '10px',
                                                background: '#333',
                                                color: '#fff',
                                            },
                                        }
                                    );
                                }}>Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* section - 3 */}
                <section id="about" className="relative bg-[#121212] w-full h-screen p-6 ">
                    <div className="absolute inset-0 left-[10%]">
                        <img src={image1} alt="Background" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="relative z-10 flex h-full justify-end m-12">
                        <div className="w-[50%] text-right">
                            <h1 className="text-white text-center text-5xl font-bold">
                                <span className="stroke-text text-[#CCFF33]">WHY</span> CHOOSE US ?
                            </h1>
                            <div className="flex gap-4 mt-6 ml-20">
                                <div className='flex flex-col place-content-start mt-2'>
                                    <SiTicktick className="text-xl text-green-400" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[#CCFF33] text-2xl font-semibold text-left">AI-Integrated Calorie Counter</h1>
                                    <h2 className="text-white text-sm text-left">
                                        Our AI-powered calorie counter customizes recommendations based on your unique goals, body type, and dietary preferences, ensuring accurate and efficient calorie tracking.
                                    </h2>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4 ml-20">
                                <div className='flex flex-col place-content-start mt-2'>
                                    <SiTicktick className="text-xl text-green-400" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[#CCFF33] text-2xl font-semibold text-left">Expert Trainers</h1>
                                    <h2 className="text-white text-sm text-left">
                                        Access to professional trainers who create personalized workout plans that cater to all fitness levels, from beginners to athletes.
                                    </h2>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4 ml-20">
                                <div className='flex flex-col place-content-start mt-2'>
                                    <SiTicktick className="text-xl text-green-400" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[#CCFF33] text-2xl font-semibold text-left">Diverse Classes</h1>
                                    <h2 className="text-white text-sm text-left">
                                        Choose from a range of fitness classes, including yoga, HIIT, strength training, and more, suitable for all fitness levels.                                </h2>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4 ml-20">
                                <div className='flex flex-col place-content-start mt-2'>
                                    <SiTicktick className="text-xl text-green-400" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[#CCFF33] text-2xl font-semibold text-left"> Nutritious Shopping</h1>
                                    <h2 className="text-white text-sm text-left">
                                        Shop from a curated selection of nutritious items, including supplements, healthy snacks, and meal kits, all designed to support your fitness journey.                                </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* section - 4 */}
                <section id="trainers" className='pt-20 p-2 bg-[#212121]'>
                    <div className='mb-6'>
                        <h1 className='text-white text-center text-4xl font-bold'>
                            <span className="stroke-text text-[#CCFF33]">OUR</span> EXPERT TRAINERS
                        </h1>
                        <h2 className='text-white text-center text-xl mt-4 font-extrabold'>Meet our passionate and dedicated trainers who have been providing personalized training for over 15 years</h2>
                    </div>
                    <div className='flex  flex-wrap gap-6 justify-center'>
                        <TrainerShowCase image={image2} name={"Olivia"} />
                        <TrainerShowCase image={image3} name={"Jack"} />
                        <TrainerShowCase image={image4} name={"Henry"} />
                        <TrainerShowCase image={image6} name={"Matthew"} />
                        <TrainerShowCase image={image7} name={"Sophia"} />
                        <TrainerShowCase image={image8} name={"David"} />
                        <TrainerShowCase image={image9} name={"John"} />
                        <TrainerShowCase image={image10} name={"Amelia"} />
                    </div>
                </section>
                {/* section - 5 */}
                <div className='pt-20 bg-[#212121]'>
                    <div className='w-full '>
                        <div className='relative bg-[#121212] w-full h-screen p-6 rounded-xl'>
                            <div className='absolute inset-0 rounded-xl'>
                                <img src={AiiMage} alt="Background" className='w-full h-full object-cover grayscale' />
                            </div>
                            <div className='relative z-10 flex h-full justify-center gap-4  mt-3'>
                                <div className='w-full'>
                                    <h1 className='text-9xl font-bold text-start '>PERSONAL</h1>
                                    <h1 className='text-9xl font-bold text-center text-[#CCFF33]'>AI FITNESS</h1>
                                    <h1 className='text-9xl font-bold text-end '>ASSISTANT</h1>
                                    <h1 className='text-center text-2xl mt-6'>ACHIEVE YOUR FITNESS GOALS WITH OUR PERSONALIZED PLANS , AI-POWERD FEATURES, AND EXPERT GUIDANCE</h1>
                                    <div className='flex justify-center mt-6'>
                                        <button className='p-4 pl-8 pr-8 border-2 text-xl font-extrabold border-[#CCFF33] rounded hover:bg-[#CCFF33] hover:text-black' onClick={() => {
                                            auth ? navigate('/aigoal') : toast('LogIn First!',
                                                {
                                                    icon: '☠️',
                                                    style: {
                                                        borderRadius: '10px',
                                                        background: '#333',
                                                        color: '#fff',
                                                    },
                                                }
                                            );;

                                        }}>Try Now </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* section - 6 */}
                <div className='pt-20 bg-[#121212]'>
                    <div >
                        <h1 className='text-4xl font-bold justify-center text-center'><span className='stroke-text text-[#CCFF33]'>OUR</span> HAPPY CLIENT</h1>
                    </div>
                    <div className='flex gap-4 flex-wrap mt-10 ml-10 pl-10'>
                        <OurClient />
                        <OurClient />
                        <OurClient />
                        <OurClient />
                        <OurClient />
                        <OurClient />
                    </div>
                </div>
                {/* section - 7 */}
                <section id="contact" className='pt-20 bg-[#121212]'>
                    <div className='w-full '>
                        <div className='relative bg-[#121212] w-full h-screen p-6'>
                            <div className='absolute inset-0 rounded-xl'>
                                <img src={contactus} alt="Background" className='w-full h-full object-cover grayscale' />
                            </div>
                            <div className='relative z-10 flex h-full justify-center place-items-center gap-4  mt-3'>
                                <div className='w-full'>
                                    <h1 className='text-7xl font-bold text-center'><span className='text-[#CCFF33]'>Contact</span> Us</h1>
                                    <div className='flex justify-center'>
                                        <input value={email} type="email" onChange={(e) => setemail(e.target.value)} placeholder='Enter Your Email' className='h-16 block mt-10 bg-black p-4 rounded-xl outline-none w-[50%]' />
                                    </div>
                                    <div className='flex justify-center mt-4'>
                                        <textarea value={textarea} type="text" placeholder='Message For Us' onChange={(e) => settextarea(e.target.value)} className='h-40 block bg-black p-4 rounded-xl outline-none w-[50%]' />
                                    </div>
                                    <div className='flex justify-center mt-6'>
                                        <button className='p-4 w-[50%] border-2 text-xl font-extrabold border-[#CCFF33] rounded hover:bg-[#CCFF33] hover:text-black' onClick={() => {
                                            auth ? handlecontact() : toast('LogIn First!',
                                                {
                                                    icon: '☠️',
                                                    style: {
                                                        borderRadius: '10px',
                                                        background: '#333',
                                                        color: '#fff',
                                                    },
                                                }
                                            );
                                        }}>SEND</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* section - 8 */}
                <div className='bg-black pt-14 '>
                    <div className='flex pl-10 justify-between pr-10'>
                        <div >
                            <h1 className='text-4xl font-extrabold'>FITWAVE</h1>
                            <div className='flex gap-4 mt-4'>
                                <div className="p-2 bg-transparent rounded-md border-2 border-white hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]"><FaFacebookF /></div>
                                <div className="p-2 bg-transparent rounded-md border-2 border-white hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]"><AiFillInstagram /></div>
                                <div className="p-2 bg-transparent rounded-md border-2 border-white hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]"><FaXTwitter /></div>
                            </div>
                        </div>
                        <div >
                            <h1 className='text-4xl font-extrabold'>MENU</h1>
                            <div className=''>
                                <div className="p-2 bg-transparent hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]">HOME</div>
                                <div className="p-2 bg-transparent hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]">ABOUT</div>
                                <div className="p-2 bg-transparent hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]">CLASSES</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='mt-10'>
                                    <div className="p-2 bg-transparent hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]">TRAINERS</div>
                                    <div className="p-2 bg-transparent hover:border-[#CCFF33] cursor-pointer hover:text-[#CCFF33]">SHOP</div>
                                </div>
                            </div>

                        </div>
                        <div >
                            <h1 className='text-3xl font-extrabold'>NEWSLETTER</h1>
                            <div className='flex gap-4 mt-4'>
                                <input className="p-2 bg-transparent border-2 rounded-md outline-none" type='text' placeholder='Enter Your Email' />
                                <button className="p-2 bg-[#CCFF33] hover:bg-[#b2df2c] rounded-md cursor-pointer text-black font-bold">SUBSCRIBE</button>
                            </div>
                            <div className='flex gap-4 mt-4'>
                                <div className="p-2 flex gap-2 ">
                                    <FaPhoneAlt className='text-[#CCFF33] mt-1' />7888997888
                                </div>
                                <div className="p-2 flex gap-2 ">
                                    <IoMdMail className='text-[#CCFF33] mt-1' />abc.be22@chitkara.edu.in
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-6 bg-[#121212] p-2 w-full justify-center'>
                        <h1>Copyright <span className='text-blue-600 cursor-pointer'>@FitWave</span></h1>
                        <h2>All rights reserved .</h2>
                    </div>
                </div>

            </div >}
        </>
    )
}