import dayjs from "dayjs";
import { useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { SiTicktick } from "react-icons/si";
import PropTypes from 'prop-types'; 
export default function Calendar({daysActive}) {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    // console.log(daysActive.data[0].getFullYear(),daysActive.data[0].getMonth(),daysActive.data[0].getDate());
    const yeardata=daysActive?.data[0];
    const dateObj = new Date(yeardata);
    console.log(dateObj     .getFullYear())
    const tasks = {
        "2024-08-10": true,
        "2024-08-12": true,
        "2024-08-15": true,
    };

    return (
        <div className="flex gap-2  justify-center mx-auto h-fit items-center text-white">
            <div className="w-full h-fit">
                <div className="flex justify-between items-center">
                    <h1 className="select-none font-semibold">
                        {months[today.month()]}, {today.year()}
                    </h1>
                    <div className="flex gap-6 items-center">
                        <GrFormPrevious
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <h1
                            className="cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(currentDate);
                            }}
                        >
                            Today
                        </h1>
                        <GrFormNext
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-7 bg-[#212121] mt-2 rounded-t-xl">
                    {days.map((day, index) => (
                        <h1
                            key={index}
                            className="text-sm text-center h-10 w-10 grid place-content-center text-white select-none"
                        >
                            {day}
                        </h1>
                    ))}
                </div>

                <div className="grid grid-cols-7 bg-[#212121] rounded-b-xl">
                    {generateDate(today.month(), today.year()).map(
                        ({ date, currentMonth, today: isToday }, index) => {
                            const isBeforeToday = date.isBefore(currentDate, 'day');
                            const dateString = date.format("YYYY-MM-DD");
                            const taskDone = tasks[dateString];

                            return (
                                <div
                                    key={index}
                                    className="p-2 text-center h-10 grid place-content-center text-sm "
                                >
                                    <h1
                                        className={cn(
                                            currentMonth ? "" : "text-gray-400",
                                            isToday
                                                ? "bg-[#CCFF33] text-black font-bold h-7 w-7 rounded-full grid place-content-center"
                                                : ""
                                        )}
                                    >
                                        {taskDone ? (
                                            <SiTicktick className="text-green-400 text-2xl" />
                                        ) : (
                                            date.date()
                                        )}
                                    </h1>
                                    {isBeforeToday && !isToday && !taskDone && (
                                        <div className="h-2 w-2 rounded-full bg-red-500 mt-1 mx-auto"></div>
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
}
Calendar.propTypes = {
  daysActive:PropTypes.any
}