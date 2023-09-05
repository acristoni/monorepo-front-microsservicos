import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ unique: true, length: 11 })
  document: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'varchar' })
  password: string;

  setPassword(password: string) {
    const saltRounds = 10; // Número de rounds de salt (quanto maior, mais seguro)
    this.password = bcrypt.hashSync(password, saltRounds);
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
