import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username }
      ],
    });

    if (existingUser) {
      throw new ConflictException('E-mail ou nome de usuário já está em uso.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(newUser);

    const activationToken = Buffer.from(savedUser.email).toString('base64');
    await this.mailService.sendUserConfirmation(savedUser.email, activationToken);

    return savedUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { idUsuario: id } });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async activateAccount(token: string) {
    try {
      const email = Buffer.from(token, 'base64').toString('utf-8');
      const user = await this.findByEmail(email);
      
      if (!user) throw new BadRequestException('Token inválido.');
      
      user.status_validacao = true;
      await this.usersRepository.save(user);
      
      return { message: 'Conta ativada com sucesso!' };
    } catch (error) {
      throw new BadRequestException('Token inválido ou corrompido.');
    }
  }

  async saveRecoveryToken(email: string): Promise<string | null> {
    const user = await this.findByEmail(email);
    if (!user) return null; 

    const token = crypto.randomBytes(20).toString('hex');
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    user.recovery_token = token;
    user.token_expires = expiration;

    await this.usersRepository.save(user);
    return token;
  }

  async resetPassword(token: string, newPassword: string) {
    const cleanToken = token.trim();
    console.log('--- SUPER SCANNER DE DADOS ---');
    console.log('1. Token recebido do Front-end:', cleanToken);

    const todosUsuarios = await this.usersRepository.find();
    
    console.log('2. O que o TypeORM está enxergando no Banco de Dados agora:');
    todosUsuarios.forEach(u => {
      console.log(`   -> Email: ${u.email}`);
      console.log(`   -> Token salvo lá: ${u.recovery_token}`);
    });

    const usuarioEncontradoNaMao = todosUsuarios.find(u => u.recovery_token === cleanToken);

    if (usuarioEncontradoNaMao) {
      console.log('✅ ACHAMOS NA MÃO! O problema é que o TypeORM estava cego no findOne.');
      
      if (new Date() > usuarioEncontradoNaMao.token_expires) {
        throw new BadRequestException('Token expirado.');
      }
      usuarioEncontradoNaMao.password = await bcrypt.hash(newPassword, 10);
      usuarioEncontradoNaMao.recovery_token = null as any;
      usuarioEncontradoNaMao.token_expires = null as any;
      await this.usersRepository.save(usuarioEncontradoNaMao);
      return { message: 'Senha alterada com sucesso!' };

    } else {
      console.log('❌ ERRO FATAL: O token do React definitivamente NÃO É IGUAL ao que está no banco!');
      throw new BadRequestException('Token inválido ou não encontrado.');
    }
  }
}