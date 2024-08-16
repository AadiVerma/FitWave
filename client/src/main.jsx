import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calendar from './components/StreakCalendar.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} /> 
      <Route path='/calendar' element={<Calendar />} /> 
      </Routes>

  </BrowserRouter>,
)
