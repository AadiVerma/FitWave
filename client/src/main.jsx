/* eslint-disable react/prop-types */
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import UpdateProfile from './components/UpdateProfile.jsx';
import TodoList from './components/TodoList.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js'
import Aigenerated from './components/AIgenerated.jsx';
import PassWordChange from './components/PasswordChange.jsx';
import Profile from './components/Profile.jsx';
import Hard75Days from './components/75HardChallenge.jsx';
import FatToFitChallenge from './components/FattoFit.jsx';
import FitnessForBeginners from './components/FitnessForBeginners.jsx';
import Cart from './components/Cart.jsx';
import Favourites from './components/Favourites.jsx';
import Trainer from './components/Trainer.jsx';
import Pricing from './components/Pricing.jsx';
import CoursePage from './components/CoursePage.jsx';
import { jwtDecode } from 'jwt-decode';
import AdminDashboard from './components/AdminDashBoard.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import UserManagementTable from './components/UserManagement.jsx';
import TrainerManagement from './components/TrainerManagement.jsx';
import CourseManagement from './components/CourseManagement.jsx';
import Success from './components/SuccessPage.jsx';
import Failed from './components/FailedPage.jsx';
import PurchasesPage from './components/ViewAllPurchases.jsx';
const getRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.role;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  return null;
};
const role = getRoleFromToken();
const ProtectedRoute = ({ children }) => {
  if (role === 'Admin') {
    // Admin should only be able to access the admin dashboard
    return <Navigate to="/" replace />;
  }
  return children;
};
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {role === 'Admin' ? (
          <Route path="/" element={<AdminLayout />} >
            <Route path='/' element={<AdminDashboard />} />
            <Route path='/user' element={<UserManagementTable />} />
            <Route path='/course' element={<CourseManagement />} />
            <Route path='/trainer' element={<TrainerManagement />} />
          </Route>
        ) : (
          <Route path="/" element={<HomePage />} />
        )}

        <Route path="/" element={<Layout />}>
          <Route path='/shop' element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/Favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
          <Route path='/Cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        </Route>
        <Route path="/trainer/:image/:name" element={<ProtectedRoute><Trainer /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
        <Route path="/" element={<Layout topbar={true} />}>
          <Route path="/coursepage/:image/:type/:name/:desc/:price/:lastprice/:count" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
          <Route path="/updateProfile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path='/dashboard' element={<ProtectedRoute><App /></ProtectedRoute>} />
          <Route path='/purchases' element={<ProtectedRoute><PurchasesPage /></ProtectedRoute>} />
          <Route path='/goals' element={<ProtectedRoute><SetUpGoals /></ProtectedRoute>} />
          <Route path='/aigoal' element={<ProtectedRoute><Aigenerated /></ProtectedRoute>} />
          <Route path='/classes' element={<ProtectedRoute><ClassesUi /></ProtectedRoute>} />
          <Route path="/75HardChallenge" element={<ProtectedRoute><Hard75Days /></ProtectedRoute>} />
          <Route path="/FatToFit" element={<ProtectedRoute><FatToFitChallenge /></ProtectedRoute>} />
          <Route path="/FitnessForBeginners" element={<ProtectedRoute><FitnessForBeginners /></ProtectedRoute>} />
          <Route path='/todo' element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpwd' element={<ProtectedRoute><ForgotPwd /></ProtectedRoute>} />
        <Route path='/verification' element={<ProtectedRoute><VerificationPwd /></ProtectedRoute>} />
        <Route path='/passwordChange' element={<ProtectedRoute><PassWordChange /></ProtectedRoute>} />
        <Route path='/Success' element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path='/Failed' element={<ProtectedRoute><Failed /></ProtectedRoute>} />
        <Route path='/*' element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  </Provider>
) 
