const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendMail({ from, to, subject, text, html }) {
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: 'aliimranadil2@gmail.com',
            pass: process.env.PASSWORD
        }

    });



    let info = await transporter.sendMail({
        from: `inShare<${from}>`,
        to: to,
        subject: subject,
        text: text,
        html: html
    });


}



module.exports = sendMail;