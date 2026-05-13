import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.idUsuario };
    return { access_token: this.jwtService.sign(payload) };
  }

  async forgotPassword(email: string) {
    const token = await this.usersService.saveRecoveryToken(email);
    if (token) {
      await this.mailService.sendPasswordRecovery(email, token);
    }
    return { message: 'Se o e-mail estiver cadastrado, as instruções foram enviadas.' };
  }

  async confirmEmail(token: string) {
    return this.usersService.activateAccount(token);
  }

  async resetPassword(token: string, newPassword: string) {
    return this.usersService.resetPassword(token, newPassword);
  }
}