import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "adityaverma9907@gmail.com",
        pass: "jhhaclqgnbsahozi" 
    }
});

async function sendEmail() {
    try {
        const info = await transporter.sendMail({
            from: '"Aditya Verma" <adityaverma9907@gmail.com>',
            to: "ujjawal.arora2004@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

sendEmail();
