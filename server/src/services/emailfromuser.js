import nodemailer from "nodemailer";

// Create transporter to send email via Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "adityaverma9907@gmail.com", // Your email
        pass: "jhhaclqgnbsahozi", // Your Gmail App password or regular password
    },
});

async function sendUserMessage({ email, message }) {
    try {
        const info = await transporter.sendMail({
            from: `"User Message" <${email}>`, // Sender's email address
            to: "adityaverma9907@gmail.com", // Admin's email (you)
            subject: "New Message from User", // Subject of the email
            text: `You have received a new message from ${email}:\n\n${message}`, // Plain text content
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
                        }
                        .footer {
                            text-align: center;
                            font-size: 12px;
                            color: #888;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>New Message from User</h1>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                        <p class="footer">This message was sent from your website's contact form.</p>
                    </div>
                </body>
            </html>
            `,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Example usage: sendUserMessage({ email: 'user@example.com', message: 'Hello, I have a question about your service.' });

export default sendUserMessage;
