import { MailService } from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  const mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured - email notifications disabled');
    return false;
  }

  try {
    const mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);
    
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Tax deadline reminder emails
export async function sendDeadlineReminder(
  userEmail: string,
  deadline: { title: string; description: string; deadline: string }
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2563EB, #3B82F6); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Fiscavo Herinnering</h1>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #1e293b;">Belangrijke deadline nadert!</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <h3 style="margin-top: 0; color: #dc2626;">${deadline.title}</h3>
          <p style="color: #64748b;">${deadline.description}</p>
          <p style="font-weight: bold; color: #1e293b;">Deadline: ${new Date(deadline.deadline).toLocaleDateString('nl-NL')}</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="${process.env.APP_URL || 'https://your-app.replit.app'}" 
             style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Ga naar Fiscavo Dashboard
          </a>
        </div>
        
        <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
          Deze herinnering is automatisch verzonden door Fiscavo om je te helpen deadlines niet te missen.
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: userEmail,
    from: 'info@fiscavo.com',
    subject: `Herinnering: ${deadline.title} - Deadline ${new Date(deadline.deadline).toLocaleDateString('nl-NL')}`,
    html
  });
}

// Weekly summary emails
export async function sendWeeklySummary(
  userEmail: string,
  summary: {
    newTransactions: number;
    pendingBtw: number;
    upcomingDeadlines: number;
    potentialSavings: number;
  }
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2563EB, #3B82F6); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Fiscavo Weekoverzicht</h1>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #1e293b;">Jouw week in cijfers</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="margin: 0; color: #2563EB; font-size: 24px;">${summary.newTransactions}</h3>
            <p style="margin: 5px 0 0 0; color: #64748b;">Nieuwe transacties</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="margin: 0; color: #16a34a; font-size: 24px;">€${summary.pendingBtw}</h3>
            <p style="margin: 5px 0 0 0; color: #64748b;">BTW te betalen</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="margin: 0; color: #dc2626; font-size: 24px;">${summary.upcomingDeadlines}</h3>
            <p style="margin: 5px 0 0 0; color: #64748b;">Komende deadlines</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="margin: 0; color: #7c3aed; font-size: 24px;">€${summary.potentialSavings}</h3>
            <p style="margin: 5px 0 0 0; color: #64748b;">Potentiële besparing</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="${process.env.APP_URL || 'https://your-app.replit.app'}" 
             style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Bekijk volledig dashboard
          </a>
        </div>
      </div>
    </div>
  `;

  return await sendEmail({
    to: userEmail,
    from: 'info@fiscavo.com',
    subject: 'Jouw Fiscavo weekoverzicht',
    html
  });
}