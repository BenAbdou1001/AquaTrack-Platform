import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tank } from 'src/tanks/entities/tank.entity';
@Entity()
export class Reviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true })
  kpi: string[];

  @Column()
  generatedAt: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Tank, (tank) => tank.reviews)
  tank: Tank;
}
