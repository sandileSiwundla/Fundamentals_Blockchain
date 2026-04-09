import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtppro.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});

console.log('ZOHO_USER:', process.env.ZOHO_USER);
console.log('ZOHO_PASS:', process.env.ZOHO_PASS);

transporter.verify((error, success) => {
  if (error) {
    console.log('Transporter error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

app.post('/api/waitlist', async (req, res) => {
  const { firstName, lastName, email, role } = req.body;
  try {
    await transporter.sendMail({
      from: '"Companions Fintech" <info@companionsfintech.com>',
      to: ['support@companionsfintech.com', 'info@companionsfintech.com'],
      subject: `New Waitlist Registration - ${role?.toUpperCase()}`,
      html: `
        <h2>New Waitlist Registration</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
      `,
    });

    await transporter.sendMail({
      from: '"Companions Fintech" <info@companionsfintech.com>',
      to: email,
      subject: "You're on the waitlist!",
      html: `
        <h2>Hi ${firstName}!</h2>
        <p>You're officially on the Companions Fintech waitlist as an <strong>${role}</strong>.</p>
        <p>We'll be in touch as soon as we launch. We look forward to working with you!</p>
        <br/>
        <p>Warm regards,<br/>The Companions Fintech Team</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await transporter.sendMail({
      from: '"Companions Fintech" <info@companionsfintech.com>',
      to: ['support@companionsfintech.com', 'info@companionsfintech.com'],
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New message from your website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    await transporter.sendMail({
      from: '"Companions Fintech" <info@companionsfintech.com>',
      to: email,
      subject: 'We received your message!',
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out to Companions Fintech.</p>
        <p>We've received your message about <strong>${subject}</strong> 
           and will get back to you as soon as possible.</p>
        <br/>
        <p>Warm regards,<br/>The Companions Fintech Team</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));