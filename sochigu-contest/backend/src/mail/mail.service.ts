import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('SMTP_HOST'),
      port: configService.get<number>('SMTP_PORT', 465),
      secure: true,
      auth: {
        user: configService.get('SMTP_USER'),
        pass: configService.get('SMTP_PASS'),
      },
    });
  }

  async sendStatusUpdate(application: any) {
    if (!application?.user?.email) return;

    const statusLabels: Record<string, string> = {
      submitted: 'На проверке',
      accepted: 'Принята',
      rejected: 'Отклонена',
      admitted: 'Допущена к очному этапу',
      winner: 'Победитель',
      runner_up: 'Призёр',
    };

    await this.transporter.sendMail({
      from: `"Конкурс СочиГУ" <${this.configService.get('SMTP_USER')}>`,
      to: application.user.email,
      subject: `Статус заявки изменён — ${statusLabels[application.status] || application.status}`,
      html: `
        <h2>Статус вашей заявки изменён</h2>
        <p>Проект: <strong>${application.projectTitle}</strong></p>
        <p>Новый статус: <strong>${statusLabels[application.status]}</strong></p>
        ${application.adminComment ? `<p>Комментарий: ${application.adminComment}</p>` : ''}
        <p><a href="${this.configService.get('FRONTEND_URL')}/cabinet">Перейти в личный кабинет</a></p>
      `,
    });
  }
}
