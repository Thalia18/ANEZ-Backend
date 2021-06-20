'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main(to, fecha, hora, paciente, direccion, telefono) {
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
    from: '"Recordatorio de cita ANEZ 🏥 <estefa@anez-salud.com>"', // sender address
    to: to, // list of receivers
    subject: 'Recordatorio de cita', // Subject line
    text: 'ANEZ', // plain text body
    html: `
    <div style="text-align: center;"> 
    <img src= "https://i.ibb.co/hLjvrdL/logoANEZ.png width="160" height="150" ><br/><h2>Centro médico ANEZ </h2>
    </div><br/><br/> <br/><br/>  <br/><br/> 
    <h3><b>Recordatorio de cita médica</b></h3><br/>
    <p>Estimado/a <b>${paciente}</b>, </p>
    <p>Te recordamos tu próxima cita para el día <b>${fecha}</b> a las <b>${hora}</b></p>
    <p>Si no puedes acudir o precisas algún cambio comunícate al número: <b>${telefono}</b></p>
    <footer style="text-align: center;"><b>Dirección:</b> ${direccion} &nbsp;&nbsp;&nbsp; <b>Teléfono:</b> 0995363193</footer>
`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
module.exports = main;
