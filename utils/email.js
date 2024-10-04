const nodemailer = require('nodemailer');

class Email {
  constructor(user, url) {
    this.firstName = user.name.split(' ')[0];
    this.to = user.email;
    this.url = url; // URL that you want to use in the email
    this.from = `Jon Doo <${process.env.EMAIL_FROM}>`;
  }

  transport() {
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME, // Ensure your env vars are correct
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: `Hello ${this.firstName},\n\nWelcome to Laptopcity Family! We're glad to have you.\n\nVisit us at: ${this.url}`, // Added URL
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Laptopcity Family</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #4285f4;
              color: white;
              padding: 10px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #777;
            }
            a {
              color: #4285f4;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Laptopcity Family</h1>
            </div>
            <div class="content">
              <p>Hello ${this.firstName},</p>
              <p>We're excited to welcome you to the Laptopcity Family! We're glad to have you on board.</p>
              <p>Visit us at: <a href="${this.url}">laptopcity.com</a></p>
              <p>We hope you enjoy your experience with us. If you have any questions, feel free to reach out!</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Laptopcity. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `, // HTML version of the email body
    };

    await this.transport().sendMail(mailOptions); // Corrected method call
  }

  async sendWelcome() {
    await this.send('Welcome to the Laptopcity Family!');
  }
}

module.exports = Email;
