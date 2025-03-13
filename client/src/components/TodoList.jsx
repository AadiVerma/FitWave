import { useState, useEffect } from 'react';
import CalorieCounter from './CalorieCount'
import '../App.css'
import toast,{ Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authselector } from "../redux/slices/slice";
export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const auth = useSelector(authselector);
  const navigate = useNavigate();
  // Load tasks from localStorage on component mount
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  // Add new task
  const addTask = () => {
    if (taskInput.trim() === '') {
      toast.error('Task cannot be empty', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      createdAt: new Date().toLocaleString()
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  // Complete a task
  const completeTask = (taskId) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (taskToComplete) {
      setCompletedTasks([
        ...completedTasks,
        { ...taskToComplete, completedAt: new Date().toLocaleString() }
      ]);
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Delete a task
  const deleteTask = (taskId, isCompleted = false) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
    } else {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, task, isCompleted) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      task,
      isCompleted
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetList) => {
    e.preventDefault();
    const droppedTaskData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const droppedTask = droppedTaskData.task;
    const sourceList = droppedTaskData.isCompleted ? completedTasks : tasks;

    // Remove from source list
    sourceList.filter(t => t.id !== droppedTask.id);

    if (targetList === 'todo') {
      // Moving to Todo list
      setTasks(prev => [...prev, droppedTask]);
      setCompletedTasks(prev => prev.filter(t => t.id !== droppedTask.id));
    } else {
      // Moving to Completed list
      setCompletedTasks(prev => [...prev, droppedTask]);
      setTasks(prev => prev.filter(t => t.id !== droppedTask.id));
    }
  };

  return (
    <div className=" bg-transparent text-white p-8 font-sans w-[100%] h-fit min-h-screen">
      <Toaster/>
      <div className='border-2 border-[#121212] rounded-xl h-[100%]'>
        <CalorieCounter />
      </div>
      <div className="mx-auto mt-10 border-2 border-[#121212] rounded-xl w-[100%] p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#CCFF33]">
          Todo List
        </h1>

        {/* Task Input */}
        <div className="flex mb-6 gap-2 h-[100%]">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a new task"
            className="flex-grow p-4 rounded-lg bg-black border-2 border-[#212121] text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF33] transition"
          />
          <button
            onClick={addTask}
            className="bg-[#CCFF33] text-black px-6 py-4 border-2 border-[#CCFF33] rounded-lg transition"
          >
            Add Task
          </button>
        </div>

        {/* Tasks Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Todo List */}
          <div
            className="bg-black border-2 border-[#121212] rounded-lg p-6 h-fit shadow-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'todo')}
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#CCFF33]">ToDo</h2>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, false)}
                  className="bg-neutral-900 p-4 mb-4 rounded-lg flex justify-between items-center cursor-move  transition"
                >
                  <div>
                    <p>{task.text}</p>
                    <small className="text-gray-400 text-xs">Created: {task.createdAt}</small>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => completeTask(task.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No tasks available.</p>
            )}
          </div>

          {/* Completed List */}
          <div
            className="bg-black border-2 border-[#121212] rounded-lg p-6 h-fit shadow-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'completed')}
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#CCFF33]">Completed</h2>
            {completedTasks.length > 0 ? (
              completedTasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, true)}
                  className="bg-neutral-900 p-4 mb-4 rounded-lg flex justify-between items-center cursor-move  transition"
                >
                  <div>
                    <p className="line-through text-gray-400">{task.text}</p>
                    <small className="text-gray-500 text-xs">Completed: {task.completedAt}</small>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => deleteTask(task.id, true)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No completed tasks.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
