import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: { user: config.smtp.user, pass: config.smtp.pass },
});

export interface IContactEmail {
  name: string; email: string; phone?: string; subject: string; message: string;
}

export const sendContactNotification = async (data: IContactEmail): Promise<void> => {
  const phoneRow = data.phone
    ? `<tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${data.phone}</td></tr>`
    : '';
  const msgHtml = data.message.replace(/\n/g, '<br>');

  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.smtp.user}>`,
    to: config.smtp.adminEmail,
    subject: `New Contact: ${data.subject}`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2>New message from your portfolio</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;font-weight:bold;">Name:</td><td>${data.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email:</td><td>${data.email}</td></tr>
        ${phoneRow}
        <tr><td style="padding:8px;font-weight:bold;">Subject:</td><td>${data.subject}</td></tr>
      </table>
      <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px;">
        <strong>Message:</strong><p style="margin-top:8px;">${msgHtml}</p>
      </div></div>`,
  });

  await transporter.sendMail({
    from: `"Tanvir Ahmmed Sifat" <${config.smtp.user}>`,
    to: data.email,
    subject: `Thanks for reaching out - I got your message`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2>Hi ${data.name},</h2>
      <p>Thanks for reaching out. I received your message and will get back to you shortly.</p>
      <p style="color:#666;">- Tanvir Ahmmed Sifat</p></div>`,
  });
};
