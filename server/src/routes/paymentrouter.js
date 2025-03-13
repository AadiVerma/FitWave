import { Router } from 'express';
import Stripe from 'stripe';
import SECRET from '../config/envConfig.js';
const router = Router();
const stripe = new Stripe(SECRET.STRIPE_SECRET);

router.post('/', async (req, res) => {
    const { data } = req.body;
    const lineItems = data.map((d) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: d.name,
                images: [`${d.image}`]
            },
            unit_amount: Math.round(parseInt(d.price) * 100),
        },
        quantity: d.quantity
    }))
    // lineItems.forEach((item, index) => {
    //     console.log(`Item ${index + 1} Product Data:`, item.price_data.product_data);
    //     console.log("Image URL:", item.price_data.product_data.images);
    // });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/Success',
        cancel_url: 'http://localhost:5173/Failed'
    })
    res.json({ id: session.id }); 
})
export default router;