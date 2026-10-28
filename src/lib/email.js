import nodemailer from 'nodemailer';

function createSmtpTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'false' ? false : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER || 'verified@richroom.games',
      pass: process.env.SMTP_PASS || '',
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendEmail({ to, subject, html, text }) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.log(`[SMTP SIMULATED - No credentials] To: ${to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = createSmtpTransporter();
    const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Rich Room VIP Lounge';
    const fromAddress = process.env.SMTP_FROM || user || 'verified@richroom.games';

    const info = await transporter.sendMail({
      from: `"${appName}" <${fromAddress}>`,
      to,
      subject,
      text: text || '',
      html,
    });

    console.log(`[SMTP SUCCESS] Sent to: ${to} | ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[SMTP ERROR] To: ${to} | Message: ${error.message}`);
    return { success: false, error: error.message };
  }
}

export function getWelcomeEmailTemplate(username) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://richroom.games';
  return `
    <div style="background-color: #070914; color: #ffffff; padding: 40px; font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 20px; border: 1px solid rgba(255, 215, 0, 0.35); text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <img src="${appUrl}/logo.png" alt="Rich Room VIP Lounge" style="height: 65px; margin-bottom: 12px;" />
      <h1 style="color: #FFD700; margin: 0 0 6px 0; font-size: 24px; font-weight: 900; letter-spacing: 1.5px;">RICH ROOM VIP</h1>
      <p style="color: #00F0FF; font-size: 12px; margin-top: 0; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700;">PREMIER VIP GAMING &amp; SWEEPS</p>
      <hr style="border-color: rgba(255, 215, 0, 0.2); margin: 24px 0;" />
      <h2 style="font-size: 20px; color: #FFFFFF; text-align: left;">Welcome to the VIP High Rollers, ${username}!</h2>
      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6; text-align: left;">
        Your Rich Room player account is activated. You are ready to request official credentials and play top sweeps titles.
      </p>
      <div style="background-color: #0d122b; padding: 20px; border-radius: 14px; margin: 24px 0; border: 1px solid rgba(255, 215, 0, 0.35); text-align: left;">
        <p style="margin: 0; font-size: 17px; color: #FFD700; font-weight: bold;">Exclusive VIP Welcome Bonus</p>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: #e2e8f0;">Load your balance today to unlock instant match coins with 1:1 USD real cashouts.</p>
      </div>
      <a href="${appUrl}" style="display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #080704; padding: 14px 36px; font-weight: 900; text-decoration: none; border-radius: 9999px; font-size: 15px; letter-spacing: 0.05em; box-shadow: 0 0 20px rgba(255,215,0,0.5);">
        ENTER THE LOUNGE
      </a>
      <p style="margin-top: 36px; font-size: 11px; color: #64748b;">
        No purchase necessary. Void where prohibited. Must be 18+ and a US resident.
      </p>
    </div>
  `;
}

export function getOtpEmailTemplate(otp, purpose = 'Account Verification') {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://richroom.games';
  return `
    <div style="background-color: #070914; color: #FFFFFF; padding: 40px 24px; font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: auto; border-radius: 20px; border: 1px solid rgba(255, 215, 0, 0.4); box-shadow: 0 20px 60px rgba(0,0,0,0.9); text-align: center;">
      <div style="margin-bottom: 24px;">
        <img src="${appUrl}/logo.png" alt="Rich Room" style="height: 60px; margin-bottom: 8px;" />
        <h1 style="color: #FFD700; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1.5px;">RICH ROOM</h1>
        <p style="color: #00F0FF; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 700;">VIP Gaming &amp; Sweeps Lounge</p>
      </div>
      <div style="background: #0d122b; border: 1px solid rgba(255, 215, 0, 0.25); border-radius: 16px; padding: 26px; text-align: center;">
        <h2 style="font-size: 17px; margin: 0 0 10px 0; color: #FFFFFF;">${purpose} Code</h2>
        <p style="font-size: 13px; color: #cbd5e1; margin: 0 0 22px 0; line-height: 1.5;">
          Use the 6-digit one-time security code below to complete your action. This code will expire in <strong>10 minutes</strong>.
        </p>
        <div style="display: inline-block; background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(0, 240, 255, 0.15)); border: 2px dashed #FFD700; padding: 14px 28px; border-radius: 14px; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #FFD700; font-family: monospace; text-shadow: 0 0 15px rgba(255,215,0,0.6);">
          ${otp}
        </div>
      </div>
      <p style="margin-top: 24px; font-size: 11px; color: #64748B; text-align: center; line-height: 1.5;">
        If you did not request this security code, please ignore this email or reach out to 24/7 VIP Live Support.
      </p>
    </div>
  `;
}
