'use strict';

const ejs = require('ejs');
const util = require('util');
const nodemailer = require('nodemailer');
const toEmail = 'Вова введи свй email'
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: "shullerkunnik@gmail.com",
      pass: "sergey123"
  }
});

async function sendEmail({ to, subject }) {
    // send mail with defined transport object
    const renderFile = util.promisify(ejs.renderFile).bind(ejs);

    const html = await renderFile(__dirname + '/send-code.ejs', { code: '123123' });
    return await transporter.sendMail({
        from: 'Fred Foo 👻',
        to,
        subject,
        html
    });
}

sendEmail({
  to: toEmail,
  subject: 'hello world'
}).then(data => {
  console.log('data => ', data)
}).catch(error => {
  console.log('error => ', error)
})