import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  idUsuario!: number;

  @Column({ length: 50 })
  firstName!: string;

  @Column({ length: 50 })
  lastName!: string;

  @Column({ length: 30, unique: true })
  username!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  recovery_token!: string;

  @Column({ type: 'datetime', nullable: true })
  token_expires!: Date;

  @Column({ default: false })
  status_validacao!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}