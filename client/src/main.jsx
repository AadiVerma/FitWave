import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SetUpGoals from './components/SetUpGoals.jsx';
import Layout from './components/Layout.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route path='/' element={<App />} /> 
      <Route path='/goals' element={<SetUpGoals />} /> 
      </Route>
      </Routes>

  </BrowserRouter>,
)
