/* eslint-disable no-unused-vars */
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
const makePayment = async({data})=>{
    console.log(data);
    const stripe =  await loadStripe("pk_test_51QUJxjA3Eyr2j1n5fXs0wzU9eGRy3IFDqG4rb9hs2M1drQiN2BMEUjVqCtAwHfxWNplqX0CAhmDXOQ2SoFEJehXb00yPkqcaYl") ;
    const response = await axios.post('http://localhost:3000/create-payment',{
        data
    })
    console.log(response.data.id)
    const result = stripe.redirectToCheckout({
        sessionId: response.data.id
    })
    if(result.error){
        console.log(result.error);
    } 
}
export default makePayment;