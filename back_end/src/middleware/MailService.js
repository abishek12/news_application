import nodemailer from "nodemailer";

// setup nodemailer
let transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    }
});
