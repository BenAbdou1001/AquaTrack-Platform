import { Tank } from 'src/tanks/entities/tank.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Suggestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kpi: string;

  @Column()
  message: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Tank, (tank) => tank.suggestions)
  tank: Tank;
}
