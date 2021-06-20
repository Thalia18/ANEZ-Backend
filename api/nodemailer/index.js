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
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Recuperar contraseña ANEZ 🏥 <estefa@anez-salud.com>"', // sender address
    to: to, // list of receivers
    subject: 'Nueva contraseña', // Subject line
    text: 'Nueva contraseña', // plain text body
    html: `
    <div style="text-align: center;"> 
    <img src= "https://i.ibb.co/hLjvrdL/logoANEZ.png width="160" height="150" ><br/><h2>Centro médico ANEZ </h2>
    </div><br/><br/> <br/><br/>  <br/><br/> 
    <h3><b>Nueva contraseña</b></h3><br/>
    <p>Estimado/a usuario/a, hemos reseteado su contraseña de acceso a <a>https://www.anez-salud.com</a>.</p>
    <p>Su nueva contraseña es: <b>${pass}</b></p>
    <p>Puede cambiar su contraseña desde la opción Perfil.</p><br/><br/><br/><br/>
    <footer style="text-align: center;"><b>Dirección:</b> Av. Orellana y Av. 6 de Diciembre &nbsp;&nbsp;&nbsp; <b>Teléfono:</b> 0995363193</footer>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
module.exports = main;
