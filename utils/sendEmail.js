
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