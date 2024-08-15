import BarChart from "./components/BarChart"
import DonutChart from "./components/PieChart"
import SideBar from "./components/SideBar"
import TopBar from "./components/TopBar"
function App() {

  return (
    <div className='text-xl  text-[#CCFF33] h-[100vh] bg-black flex'>
      <SideBar />
      <div className="w-full">
        <TopBar />
        <div className="flex">
          <div className="w-[50%] p-10 h-fit">
            <div className="flex justify-between">
              <h1 className="text-2xl text-white font-space font-bold mb-4">Activity</h1>
            </div>
            <BarChart />
          </div>
          <div className="w-[50%] p-10 h-fit">
            <div className="flex justify-between">
              <h1 className="text-2xl text-white font-space font-bold mb-4">Overview</h1>
            </div>
            <div className="flex ">
              <DonutChart />
              <div className="bg-[#121212] pr-10 pl-10">
                <div>
                  <div className="flex gap-4 mt-5">
                    <h1 className="h-3 w-3 rounded-full bg-[#CCFF33] mt-2"></h1>
                    <h1 className="text-white font-space">Calories burn</h1>
                  </div>
                  <div className="flex gap-4 justify-between border-b-2 border-[#313131] pt-1 p-2">
                    <h1 className="text-white font-space font-medium">33.5%</h1>
                    <h1 className="text-sm mt-1 font-space font-medium">+1,25%</h1>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4 mt-5">
                    <h1 className="h-3 w-3 rounded-full bg-[#45ffa6] mt-2"></h1>
                    <h1 className="text-white font-space">Protien</h1>
                  </div>
                  <div className="flex gap-4 justify-between border-b-2 border-[#313131] pt-2 p-2">
                    <h1 className="text-white font-space font-medium ">23.02%</h1>
                    <h1 className="text-sm mt-1 font-space font-medium text-[#45ffa6]">+3,43%</h1>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4 mt-5">
                    <h1 className="h-3 w-3 rounded-full bg-[#9c9c9c] mt-2"></h1>
                    <h1 className="text-white font-space">Carbs</h1>
                  </div>
                  <div className="flex gap-4 justify-between border-b-2 border-[#313131] pt-1 p-2">
                    <h1 className="text-white font-space font-medium">11.24%</h1>
                    <h1 className="text-sm mt-1 font-space font-medium text-[#9c9c9c]">+2,12%</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
