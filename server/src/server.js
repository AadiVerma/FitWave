import express from 'express';
import DBConnect from './config/dbConfig.js';
import dbURI from "./config/envConfig.js"
import router from './routes/userRoutes.js';
import router1 from './routes/aiRoute.js'
import sessionConfig from './config/sessionConfig.js';
import cors from "cors";
import router2 from './routes/paymentrouter.js';
import sendUserMessage from '../src/services/emailfromuser.js'
DBConnect(dbURI.dbURI);
const app = express();
app.use(express.json());
app.use(sessionConfig);
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use('/user', router);
app.use('/api', router1);
app.use('/create-payment', router2);
app.use('/email', async (req, res) => {
    const { email, text } = req.body;
    try {
        sendUserMessage({ email: email, message: text })
        return res.status(200).send({ success: "Email Sent  Successfully" });
    } catch (error) {
        return res.status(500).send({ error: "Error sending user message" });
    }
});
app.listen(3000, () => {
    console.log("listening on 3000");
})