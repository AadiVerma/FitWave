import React, { useState } from 'react';

function App() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState(null);

  const calculateCalories = async (e) => {
    e.preventDefault();

    // Formula for calculating calories burned (simplified example)
    const MET = 3.5; // Metabolic Equivalent for Task (Walking)
    const caloriesBurned = (MET * weight * 3.5) / 200 * (steps / 1000);

    setCalories(caloriesBurned.toFixed(2));
  };

    const URL = "https://potterapi-fedeperin.vercel.app/en/characters";

    const getData = async ()=>{
        console.log("fetching data...");
        let response = await fetch(URL);
        console.log(response);
        let data = await response.json();
        console.log(data); 
    }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6">Calorie Burnt Calculator</h1>
      <form onSubmit={calculateCalories} className="border-[#212121] text-white border-2 p-8 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Steps Walked/Ran</label>
          <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Generate Calories</button>
      </form>
      {calories && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Calories Burned: {calories} kcal</h2>
        </div>
      )}
    </div>
  );
}

export default App;
