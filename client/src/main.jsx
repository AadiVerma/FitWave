import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './components/HomePage.jsx';
import NotFound from './components/NotFound.jsx';
import SetUpGoals from './components/SetUpGoals.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import ClassesUi from './components/ClassUi.jsx';
import Shop from './components/Shop.jsx';
import ForgotPwd from './components/ForgotPwd.jsx';
import VerificationPwd from './components/VerificationPwd.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/" element={<Layout />}>
          <Route path='/dashboard' element={<App />} />
          <Route path='/goals' element={<SetUpGoals />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpwd' element={<ForgotPwd />} />
          <Route path='/verification' element={<VerificationPwd />} />
          <Route path='/classes' element={<ClassesUi />} />
        </Route>
        <Route path='/shop' element={<Shop />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  </Provider>
) 
