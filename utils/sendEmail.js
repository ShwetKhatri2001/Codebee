// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//     let transport = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: 'shwetkhatri2001@gmail.com',
//             pass: 'nodeMailerTest',
//         },
//     });

//     let mailOptions = {
//         from: "shwetkhatri2001@gmail.com",
//         to: options.email,
//         subject: options.subject,
//         html: options.html,
//     };

//     transport.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Email sent: " + info.response);
//         }
//     });
// };

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (options) => {
  try {
    const data = {
      to: options.email,
      from: process.env.SENDGRID_VERIFIED_MAIL,
      subject: options.subject,
      html: options.html,
    };
    return sgMail.send(data);
  } catch (e) {
    console.log(e);
  }
};


module.exports = sendEmail;