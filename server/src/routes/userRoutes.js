import {Router} from 'express';
import { ForgotPassword ,VerifyOTP ,SignUp,addAIplanPurchases,purchasecourse, getAIplanPurchases,Login ,getalluserinteractions,ChangePassword,Profile,dayActive,getallusersdata,getUserProfile,AddToCart,GetAddToCart,removeFromCart, getUserdata, updateuser,PlaceOrder,getuserpurchases,AddInteract} from '../controllers/userControllers.js';
const router=Router();

// post routes

router.route('/forgotpwd').post(ForgotPassword);
router.route('/verifyotp').post(VerifyOTP);
router.route('/signup').post(SignUp);
router.route('/login').post(Login);
router.route("/daysactice").post(dayActive);
router.route('/addinteract').post(AddInteract);
router.route('/changepassword').post(ChangePassword);
router.route('/profile').post(Profile);
router.route('/getAIplanPurchases/:username').get(getAIplanPurchases);
router.route('/addAIplanPurchases/:username').post(addAIplanPurchases);
router.route('/getuserdata/:username').get(getUserdata);
router.route('/getalluserinteractions').get(getalluserinteractions);
router.route('/updateProfile/:username').get(getUserProfile);
router.route('/placeOrder/:username').post(PlaceOrder);
router.route('/purchasecourse/:username').post(purchasecourse);
router.route('/addToCart').post(AddToCart);
router.route('/getallusersdata').get(getallusersdata);
router.route('/getPurchases/:username').get(getuserpurchases);
router.route('/updateuser').post(updateuser);
router.route('/getaddToCart/:username').get(GetAddToCart);
router.route('/removeFromCart').post(removeFromCart);



export default router;