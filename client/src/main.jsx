import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './components/HomePage.jsx';
import NotFound from './components/NotFound.jsx';
import SetUpGoals from './components/SetUpGoals.jsx';
import Login from './components/Login.jsx';
import ClassesUi from './components/ClassUi.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage />} /> 
    <Route path="/" element={<Layout />}>
      <Route path='/dashboard' element={<App />} /> 
      <Route path='/goals' element={<SetUpGoals />} /> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/classes' element={<ClassesUi/>}/>
      </Route>
      <Route path='/*' element={<NotFound />} /> 
      </Routes>

  </BrowserRouter>,
) 
