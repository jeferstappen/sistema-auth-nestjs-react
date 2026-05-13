import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4e1589f8223814",
        pass: "ba94ba2aebb84e"
      }
    });
  }

  async sendUserConfirmation(email: string, token: string) {
    const url = `http://localhost:3000/auth/confirm?token=${token}`;

    await this.transporter.sendMail({
      from: '"Portal Auth" <suporte@portalauth.com>',
      to: email,
      subject: 'Bem-vindo! Confirme seu e-mail',
      html: `
        <h3>Olá! Seja bem-vindo ao sistema.</h3>
        <p>Para concluir seu cadastro e ativar sua conta, por favor clique no link abaixo:</p>
        <p><a href="${url}">👉 Confirmar meu e-mail</a></p>
        <p>Se você não solicitou este cadastro, pode ignorar este e-mail.</p>
      `,
    });
  }

  async sendPasswordRecovery(email: string, token: string) {
    const url = `http://localhost:5173/redefinir-senha?token=${token}`;

    await this.transporter.sendMail({
      from: '"Portal Auth" <suporte@portalauth.com>',
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <h3>Você solicitou a recuperação de senha?</h3>
        <p>Clique no link abaixo para criar uma nova senha. Por segurança, este link expira em 1 hora.</p>
        <p><a href="${url}">👉 Redefinir minha senha</a></p>
        <p>Se você não fez este pedido, pode ignorar este e-mail.</p>
      `,
    });
  }
}