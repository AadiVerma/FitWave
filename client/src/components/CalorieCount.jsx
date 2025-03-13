import { useState } from 'react';
import { BsFire } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';

function App() {
  const { formState: { isSubmitting } } = useForm({ mode: 'onChange' });
  const [search, setSearch] = useState("");
  const [calorieData, setCalorieData] = useState('');
  const [responsedata, setresponsedata] = useState([]);
  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  const getData = async (e) => {
    e.preventDefault();
    const URL = `https://api.calorieninjas.com/v1/nutrition?query=${search}`;

    try {
      const response = await axios.get(URL, {
        headers: {
          'X-Api-Key': 'dzzB2jwfIu6gbdl3gtm4DQ==2MHZf120qGHORZTn',
        },
      });

      const data = response.data.items;
      let result = '';
      let totalCalories = 0;
      let itemsList = [];
      setresponsedata(data);
      if (data.length == 0) {
        toast.error('Item not found or invalid input. Please try again.', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      }
      // Process each item and push to itemsList array
      data.forEach(item => {
        const calories = item.calories;
        itemsList.push({
          name: item.name,
          calories: calories.toFixed(2),
        });
        totalCalories += calories;
      });

      result = `Total Calories: ${totalCalories.toFixed(2)}`;
      setCalorieData({ items: itemsList, total: result });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black flex flex-col justify-center items-center p-6 rounded-xl">
      <div className="w-full p-8 bg-black rounded-lg shadow-2xl">
        {/* Title Section */}
        <div className="flex justify-center items-center mb-8 w-[100%]">
          <h1 className="text-4xl font-extrabold text-[#CCFF33] flex items-center gap-2">
            <BsFire className="text-[#CCFF33]" />
            Calorie Intake Calculator
          </h1>
        </div>

        {/* Form Section */}
        <form
          onSubmit={getData}
          className="bg-black p-6 rounded-lg shadow-md space-y-6"
        >
          <input
            type="text"
            className="w-full p-4 rounded-xl border-2 border-[#CCFF33] text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#CCFF33] transition-all duration-300 ease-in-out"
            placeholder="Enter food items (e.g., rice, fish, curd etc.)"
            onChange={handleOnChange}
            value={search}
          />

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white text-lg font-semibold border-2 border-[#CCFF33] hover:bg-[#CCFF33] hover:text-black transition-all duration-300 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Calculate Calories"}
          </button>
        </form>

        {/* Calorie Data Section */}
        {calorieData && responsedata.length != 0 && (
          <div className="mt-6 text-center">
            {/* Display list of items */}
            <ul className="list-none text-white font-semibold space-y-2">
              {calorieData.items.map((item, index) => (
                <li key={index}>
                  Calories of <strong>{item.name}</strong>: {item.calories}
                </li>
              ))}
            </ul>

            {/* Display total calories */}
            {responsedata.length != 0 && <div className="mt-4 text-lg font-bold">
              <p className='text-[#CCFF33]'>{calorieData.total}</p>
            </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
