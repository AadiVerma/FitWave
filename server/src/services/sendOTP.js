import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "adityaverma9907@gmail.com",
        pass: "jhhaclqgnbsahozi"
    }
});

async function sendOTP({ email, otp }) {
    try {
        const info = await transporter.sendMail({
            from: '"FitWave" <adityaverma9907@gmail.com>',
            to: `${email}`,
            subject: "Your OTP for FitWave",
            text: "Your OTP for FitWave",
            html: `
            <html>
    <head>
        <style>
            /* General Styles */
            body {
                font-family: Arial, sans-serif;
                color: #555;
                margin: 0;
                padding: 0;
                background-color: #f4f7fc;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }
            h1 {
                text-align: center;
                font-size: 28px;
                color: #333;
            }
            .otp-container {
                text-align: center;
                margin: 20px 0;
                background-color: #f0f8ff;
                padding: 15px;
                border-radius: 8px;
            }
            .otp {
                font-size: 40px;
                font-weight: bold;
                color: #00a5b5;
                padding: 10px 20px;
                background-color: #fff;
                border-radius: 5px;
                border: 2px solid #00a5b5;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .note {
                font-size: 14px;
                color: #888;
                text-align: center;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                color: #888;
                font-size: 12px;
                margin-top: 40px;
                border-top: 1px solid #ddd;
                padding-top: 10px;
            }
            .footer a {
                color: #00a5b5;
                text-decoration: none;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Your OTP for FitWave</h1>
            <div class="otp-container">
                <div class="otp">${otp}</div>
            </div>
            <p class="note">Use the above code to complete your registration. The OTP will expire in 10 minutes.</p>
            <div class="footer">
                <p>If you did not request this, please ignore this email.</p>
                <p>For support, visit <a href="https://fitwave-smartwave.netlify.app">Contact Us</a>.</p>
            </div>
        </div>
    </body>
</html>
`,
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export default sendOTP;
