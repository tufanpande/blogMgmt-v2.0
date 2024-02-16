const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "email",
    pass: "APP PASSWORD",
  },
});

// async..await is not allowed in global scope, must use a wrapper
const mailer=async(email )=> {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Tufan Pandey" <your email.com>', // sender address
    to: email, // list of receivers
    subject: "Regestration Successful ✔", // Subject line
    html: "<b>User signUp</b>", // html body
  });
  return info.messageId;
}

module.exports= {mailer};