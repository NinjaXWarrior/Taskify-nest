export class EmailService {
  private transporter: any;

  constructor() {
    try {
      // lazily require nodemailer so builds don't fail if optional dep missing
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nodemailer = require('nodemailer');

      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } catch (err) {
      this.transporter = null;
    }
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      if (!this.transporter) return;

      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'no-reply@taskify.app',
        to,
        subject,
        text,
      });
    } catch (err) {
      // best-effort: log and continue
    }
  }
}
