const nodemailer = require('nodemailer');

module.exports = {
  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'error.404.qa@gmail.com',
      pass: 'wlrh pdhq efff uhyg',
    },
  })
};

module.exports.transporter.verify().then(() => {
  console.log('Listo para enviar mensajes');
});