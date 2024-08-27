import {Router} from 'express';
import { ForgotPassword ,VerifyOTP ,SignUp, Login} from '../controllers/userControllers.js';
const router=Router();

// post routes

router.route('/forgotpwd').post(ForgotPassword);
router.route('/verifyotp').post(VerifyOTP);
router.route('/signup').post(SignUp);
router.route('/login').post(Login);




export default router;