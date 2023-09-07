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
    const saltRounds = 10;
    this.password = bcrypt.hashSync(password, saltRounds);
  }

  setEmail(email: string) {
    const saltRounds = 10;
    this.email = bcrypt.hashSync(email, saltRounds);
  }

  setDocument(document: string) {
    const saltRounds = 10;
    this.document = bcrypt.hashSync(document, saltRounds);
  }

  setPhoneNumber(phone_number: string) {
    const saltRounds = 10;
    this.phone_number = bcrypt.hashSync(phone_number, saltRounds);
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  checkEmail(email: string) {
    return bcrypt.compareSync(email, this.email);
  }

  checkDocument(document: string) {
    return bcrypt.compareSync(document, this.document);
  }

  checkPhoneNumber(phone_number: string) {
    return bcrypt.compareSync(phone_number, this.phone_number);
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
