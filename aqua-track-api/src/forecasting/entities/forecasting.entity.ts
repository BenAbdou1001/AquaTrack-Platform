import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tank } from 'src/tanks/entities/tank.entity';
@Entity()
export class Forecasting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kpi: string;

  @Column('float')
  predictedValue: number;

  @Column()
  predictionDate: Date;

  @ManyToOne(() => Tank, (tank) => tank.forecasts)
  tank: Tank;
}
