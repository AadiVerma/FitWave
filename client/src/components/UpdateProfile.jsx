import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { MdOutlineUploadFile } from "react-icons/md";
import axios from 'axios';
import { useForm } from "react-hook-form";
import '../App.css'
import { useSelector } from "react-redux";
import { authselector } from "../redux/slices/slice";
export default function UpdateProfile() {
    const navigate = useNavigate();
    const auth = useSelector(authselector);
    useEffect(()=>{
        if(!auth){
            navigate("/login")
        }
    })
    const [username, setusername] = useState();
    const [email, setemail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [age, setage] = useState();
    const [height, setheight] = useState();
    const [weight, setweight] = useState();
    const [gender, setgender] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    console.log(gender);
    const { setValue } = useForm({ mode: 'onChange' });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setemail(value);

        // Check if the email is valid
        if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError(""); // Clear error if valid
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setValue("image", file);
        }
    };
    const handleHeightChange = (e) => {
        const value = e.target.value;
        if (value >= 0 && value <= 300) {
            setheight(value);
        } else {
            toast.error('Invalid height. Please keep it below 300 cm.',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    };

    const handleWeightChange = (e) => {
        const value = e.target.value;
        if (value >= 0 && value <= 200) {
            setweight(value);
        } else {
            toast.error('Invalid weight. Please ensure it is less than 200 kg.',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    };
    const handleageChange = (e) => {
        const value = e.target.value;
        if (value >= 0 && value <= 120) {
            setage(value);
        } else {
            toast.error('Are you really above 120 . Please ensure it is less than 120',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    };
    const onSubmit = useCallback(async (data) => {
        // Check if there's an email error
        if (emailError) {
            toast.error(emailError, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }

        // Initialize formData
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key !== 'image') {
                formData.append(key, data[key]);
            }
        });

        if (imageFile) {
            try {
                const formData1 = new FormData();
                formData1.append("file", imageFile);
                formData1.append("upload_preset", "ml_default");
                await toast.promise(
                    fetch("https://api.cloudinary.com/v1_1/dq93uuksm/image/upload", {
                        method: "POST",
                        body: formData1
                    })
                        .then(async cloudinaryResponse => {
                            const cloudinaryData = await cloudinaryResponse.json();
                            if (cloudinaryData.secure_url) {
                                formData.append("image", cloudinaryData.secure_url);
                            } else {
                                throw new Error('Error uploading image: Please try again');
                            }
                        }),
                    {
                        loading: 'Uploading image...',
                        success: 'Image uploaded successfully!',
                        error: 'Error uploading image: Please try again',
                    },
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Error uploading image: Please try again', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
                return;
            }
        }

        // Make the form submission request with toast promise
        try {
            await toast.promise(
                axios.post('http://localhost:3000/user/profile', {
                    height: parseFloat(height),
                    weight: parseFloat(weight),
                    age: parseInt(age),
                    gender: gender,
                    image: formData.get('image') == null ? imagePreview : formData.get('image'),
                    email: email
                }, {
                    withCredentials: true,
                }),
                {
                    loading: 'Submitting your data...',
                    success: 'Profile updated successfully!',
                    error: 'Error updating profile. Please try again.',
                },
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Error submitting form: Please try again', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [emailError, imageFile, height, weight, age, gender, email, imagePreview]);


    useEffect(() => {
        const fetch = async () => {
            const data1 = await axios.get(`http://localhost:3000/user/updateProfile/${localStorage.getItem("username")}`);
            setusername(data1.data.username);
            setemail(data1.data.email);
            setage(data1.data.age);
            setheight(data1.data.height);
            setweight(data1.data.weight);
            setImagePreview(data1.data.profilePic);
            setgender(data1.data.gender || "Male");
        };
        fetch();
    }, []);

    return (
        <div className="custom-scrollbar min-h-[80vh]">
            <Toaster />
            <div className="text-white font-space w-full flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl text-white mt-6 font-bold"><span className="text-[#CCFF33]">PROFILE</span> SETTINGS</h1>
                <div className="flex justify-center w-full mt-4">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="h-40 w-40 border-2 border-[#dbd9d971] bg-[#212121] rounded">
                            {imagePreview ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover rounded-3xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('fileInputDragDrop').click()}
                                        className="absolute bottom-0 right-0 text-[#CCFF33] text-2xl bg-black/75 px-3 py-2 rounded-md shadow-md hover:bg-black"
                                    >
                                        <MdOutlineUploadFile />
                                    </button>
                                    <input
                                        id="fileInputDragDrop"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleImageChange}
                                        aria-describedby="validFileFormats"
                                    />
                                </div>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        className="w-12 h-12 opacity-75"
                                    >
                                        <path d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" />
                                    </svg>
                                    <div className="group">
                                        <label
                                            className="cursor-pointer font-medium text-black group-focus-within:underline dark:text-white"
                                        >
                                            <input
                                                id="fileInputDragDrop"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleImageChange}
                                                aria-describedby="validFileFormats"
                                            />
                                            Browse Your Image
                                        </label>
                                    </div>
                                    <small id="validFileFormats">PNG, JPG, WebP - Max 50MB</small>
                                </>
                            )}
                        </div>

                        <div className="w-full max-w-4xl px-4">
                            <div className="flex gap-4 justify-center mb-4">
                                <h1 className="text-xl text-[#CCFF33]">{username}</h1>
                            </div>
                            <div className="mb-4">
                                <h1>Email</h1>
                                <input
                                    type="email"
                                    value={email}
                                    className="w-full mt-2 bg-transparent outline-none border-2 p-2 rounded border-[#CCFF33]"
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="mb-4">
                                <div className="flex gap-4 justify-center">
                                    <div className="w-[48%]">
                                        <h1>Height</h1>
                                        <input
                                            placeholder="Height in cm"
                                            type="number"
                                            value={height}
                                            className="w-full mt-2 bg-transparent outline-none border-2 p-2 rounded border-[#CCFF33]"
                                            onChange={handleHeightChange}
                                        />
                                    </div>
                                    <div className="w-[48%]">
                                        <h1>Weight</h1>
                                        <input
                                            placeholder="Weight in kgs"
                                            type="number"
                                            value={weight}
                                            className="w-full mt-2 bg-transparent outline-none border-2 p-2 rounded border-[#CCFF33]"
                                            onChange={handleWeightChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h1>Age</h1>
                                <input
                                    value={age}
                                    type="number"
                                    className="w-full mt-2 bg-transparent outline-none border-2 p-2 rounded border-[#CCFF33]"
                                    onChange={handleageChange}
                                />
                            </div>
                            <div className="mb-4">
                                <h1>Gender</h1>
                                <select
                                    className="w-full mt-2 bg-transparent outline-none border-2 p-2 rounded border-[#CCFF33]"
                                    value={gender}
                                    onChange={(e) => setgender(e.target.value)} 
                                >
                                    <option value="Male" className="bg-[#121212] text-white">Male</option>
                                    <option value="Female" className="bg-[#121212] text-white">Female</option>
                                    <option value="Others" className="bg-[#121212] text-white">Others</option>
                                </select>

                            </div>
                            <button
                                className="w-full bg-[#CCFF33] hover:bg-[#adf739] text-black font-medium py-2 px-4 rounded"
                                onClick={onSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
