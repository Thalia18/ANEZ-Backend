'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main(to, pass) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'estefa@anez-salud.com', // generated ethereal user
      pass: 'haYmhQFuQy48', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Recuperar contraseña ANEZ 🏥 <estefa@anez-salud.com>"', // sender address
    to: to, // list of receivers
    subject: 'Nueva contraseña', // Subject line
    text: 'Nueva contraseña', // plain text body
    html: `<b>Nueva contraseña</b> <p>Su nueva contraseña es: <b>${pass}</b></p>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
module.exports = main;
