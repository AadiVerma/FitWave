import React, { useState } from 'react';
import axios from 'axios'; 

function App() {
  const [search,setSearch] = useState("Enter the food items you ate to count your calories intake. Eg: rice, curd, fish");
  const [calorieData, setCalorieData] = useState('');


  const handleOnChange = (event) =>{
    setSearch(event.target.value);
  }

    const query = search;
    // const URL = `https://api.calorieninjas.com/v1/nutrition?query=${query}`;
    // const URL = `https://cors-anywhere.herokuapp.com/https://api.calorieninjas.com/v1/nutrition?query=${query}`;
    const URL = `http://localhost:8080/https://api.calorieninjas.com/v1/nutrition?query=${search}`;

  
    // const getData = async (e) =>{
    //   e.preventDefault();

    //   const items = search.split(',').map(item => item.trim());
    //   let totalCalories = 0;
    //   let result = '';

    //   for (let item of items) {
    //     const query = encodeURIComponent(item);
    //     try{
    //       const response = await axios.get(URL,{
    //         headers:{
    //           'X-Api-Key': 'dzzB2jwfIu6gbdl3gtm4DQ==2MHZf120qGHORZTn',
    //         }
    //       });
    //       // const data = await response.json();
    //       console.log(response.data);
    //       // let calories = response.data.items.map(i=>i.calories);
    //       // setCalorieData(calories);

    //       if (response.data.items.length > 0) {
    //         const { calories } = response.data.items[0];
    //         result += `calories of ${item}: ${calories.toFixed(2)}, `;
    //         totalCalories += calories;
    //       } else {
    //         result += `calories of ${item}: Not found, `;
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
  
    //   result += `and your total calories are: ${totalCalories.toFixed(2)}`;
    //   setCalorieData(result);
    //   }


    const getData = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(URL, {
          headers: {
            'X-Api-Key': 'dzzB2jwfIu6gbdl3gtm4DQ==2MHZf120qGHORZTn',
          },
        });
  
        // Process the response data
        const data = response.data.items;
        console.log(data);
        let result = '';
        let totalCalories = 0;
  
        data.forEach(item => {
          const calories = item.calories;
          result += `calories of ${item.name}: ${calories.toFixed(2)}\n`;
          totalCalories += calories;
        });
  
        // Append total calories at the end
        result += `and your total calories are: ${totalCalories.toFixed(2)}`;
  
        setCalorieData(result);
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <div className="bg-black flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6 text-white">Calorie Intake Calculator</h1>
      <form onSubmit={getData} className=" text-white p-8 rounded w-full">
        <input className=" ml-1 sm:w-full w-9/12 rounded-full  text-slate-600 p-1 px-3" type="text" onChange={handleOnChange} value={search}/>
        <button type="submit" className="mx-[42%] bg-pink-500 hover:bg-pink-600 w-[200px] text-xl py-1 mt-5 text-white rounded">Generate Calories</button>
      </form>
      {calorieData && (
        <div className="mt-3">
          {/* <h2 className="text-lg font-bold">{JSON.stringify(calorieData,null,2)}</h2> */}
          <h2 className="text-lg font-bold text-white whitespace-pre-wrap">{calorieData}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
