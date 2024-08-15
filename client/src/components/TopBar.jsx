import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import image from '/Image.png';
export default function TopBar() {
    return (
        <div className="flex bg-[#121212] h-fit  justify-evenly ">
            <div className="text-white w-full mt-3 ml-10">
                <h1 className="text-[#CCFF33] text-lg font-space font-bold">Good Morning</h1>
                <h2 className="text-xl font-bold font-space">Welcome Back</h2>
            </div>
            <div className="flex w-full p-4 gap-4">
                <div className="text-white mr-[10%] flex-col justify-center place-content-center">
                    <div className="flex border-2 rounded-2xl border-[#dbd9d957]">
                        <IoSearchOutline className="p-3 text-5xl text-[#dbd9d957]" />
                        <input className="bg-transparent outline-none placeholder:text-[#dbd9d9cb]" placeholder="Search" />
                    </div>
                </div>
                <div className="flex-col justify-center place-content-center">
                <div className="p-2 pr-0 rounded-full border-2 border-[#dbd9d971] bg-[#212121] flex cursor-pointer h-fit" >
                    <IoNotificationsOutline className="text-2xl text-white" />
                    <div className="h-2 w-2 rounded-full bg-[#CCFF33] relative right-[30%] top-[100%]"></div>
                </div>
                </div>
                <div className="flex gap-4 ">
                    <div className="flex-col justify-center place-content-center">
                    <div className="h-12  w-12 rounded-full border-2 border-[#dbd9d971] bg-[#212121]">
                        <img src={image} className="" />
                    </div>
                    </div>
                    <div className="flex-col justify-center place-content-center ">
                        <div className="flex cursor-pointer">
                            <h1 className="text-white text-sm font-space font-bold">Aditya Verma</h1>
                            <div className="flex-col text-white justify-center place-content-center cursor-pointer">
                                <MdArrowDropDown />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}