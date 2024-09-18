const nodemailer = require('nodemailer');

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendMail(options) {
        try {
            const mailOptions = {
                from: `"Job Portal" <${process.env.MAIL_USER}>`,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
            };

            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

module.exports = new Mailer();
