import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "adityaverma9907@gmail.com",
        pass: "jhhaclqgnbsahozi"
    }
});

async function sendEmail({ email}) {
    console.log(email);
    try {
        const info = await transporter.sendMail({
            from: '"FitWave" <adityaverma9907@gmail.com>',
            to: `${email}`,
            subject: "Welcome to FitWave",
            text: "Welcome to FitWave! We're glad to have you onboard.",
            html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            background-color: #f4f7fc;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 40px auto;
                            padding: 20px;
                            background-color: white;
                            border-radius: 8px;
                            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            font-size: 28px;
                            color: #333;
                            text-align: center;
                        }
                        p {
                            font-size: 16px;
                            color: #555;
                            line-height: 24px;
                            text-align: center;
                        }
                        .button {
                            display: block;
                            width: 100%;
                            max-width: 200px;
                            margin: 20px auto;
                            padding: 10px;
                            background-color: #00a5b5;
                            color: #fff;
                            text-align: center;
                            text-decoration: none;
                            font-size: 16px;
                            border-radius: 4px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 12px;
                            color: #888;
                            margin-top: 20px;
                        }
                        .footer a {
                            color: #00a5b5;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Welcome to FitWave!</h1>
                        <p>We're excited to have you on board. Start exploring our fitness platform today and begin your journey towards your health and fitness goals.</p>
                        <a href="https://fitwave-smartwave.netlify.app" class="button">Get Started</a>
                        <p class="footer">If you have any questions, feel free to <a href="https://fitwave-smartwave.netlify.app/contact">contact us</a>.</p>
                    </div>
                </body>
            </html>
`,
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
// sendEmail({email:'ujjawal.arora4812@gmail.com'})
export default sendEmail;
