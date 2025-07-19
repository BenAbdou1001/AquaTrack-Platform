import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Alert } from 'src/alerts/entities/alert.entity';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firebaseToken: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Alert)
  alert: Alert;
}
