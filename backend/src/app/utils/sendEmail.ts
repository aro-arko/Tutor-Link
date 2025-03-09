import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import config from '../config';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, resetLink: string) => {
  try {
    console.log('Attempting to send email via Resend...');

    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY in environment variables.');
    }

    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'Reset your password within ten mins!',
      html: emailTemplate(resetLink),
    });

    console.log('Email sent successfully via Resend!', response);
    return;
  } catch (resendError) {
    console.error('Resend failed, attempting Gmail SMTP...', resendError);
  }

  try {
    console.log('Using Gmail SMTP as fallback...');

    if (!config.smtp_user || !config.smtp_pass) {
      throw new Error('Missing SMTP credentials in config.');
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // SSL secure connection
      secure: true,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_pass,
      },
    });

    // Verify connection before sending
    transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP Connection Error:', error);
      } else {
        console.log('SMTP Server is ready to send emails.');
      }
    });

    const smtpResponse = await transporter.sendMail({
      from: `"Aro Arko" <${config.smtp_user}>`,
      to,
      subject: 'Reset your password within ten mins!',
      html: emailTemplate(resetLink),
    });

    console.log('Email sent successfully via Gmail SMTP!', smtpResponse);
  } catch (smtpError) {
    console.error('Both Resend and Gmail SMTP failed:', smtpError);
  }
};

// Reusable Email Template Function
const emailTemplate = (resetLink: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
      .content {
        font-size: 16px;
        color: #555;
        margin-top: 10px;
      }
      .button {
        display: block;
        width: 100%;
        max-width: 200px;
        margin: 20px auto;
        padding: 10px;
        text-align: center;
        background-color: #007bff;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Reset Your Password</div>
      <div class="content">
        <p>Hello,</p>
        <p>You recently requested to reset your password. Click the button below to proceed:</p>
        <a href="${resetLink}" class="button">Reset Password</a>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <p>This link will expire in 10 minutes for security reasons.</p>
      </div>
      <div class="footer">
        &copy; 2025 Aro Arko. All rights reserved.
      </div>
    </div>
  </body>
  </html>
`;
