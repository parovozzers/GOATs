import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter | null;

  constructor(private configService: ConfigService) {
    if (!configService.get('SMTP_HOST')) {
      console.warn('SMTP not configured, emails will be skipped');
      this.transporter = null;
    } else {
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
  }

  async sendWelcome(user: { email: string; firstName: string }) {
    if (!this.transporter) return;
    await this.transporter.sendMail({
      from: `"Конкурс СочиГУ" <${this.configService.get('SMTP_USER')}>`,
      to: user.email,
      subject: 'Добро пожаловать на конкурс проектов СочиГУ!',
      html: `
        <h2>Здравствуйте, ${user.firstName}!</h2>
        <p>Вы успешно зарегистрировались на платформе конкурса студенческих проектов СочиГУ.</p>
        <p>Теперь вы можете подать заявку на участие в конкурсе.</p>
        <p><a href="${this.configService.get('FRONTEND_URL')}/cabinet">Перейти в личный кабинет</a></p>
        <p>Организатор — Стартап-студия СочиГУ</p>
      `,
    });
  }

  async sendStatusUpdate(application: any) {
    if (!this.transporter) return;
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
