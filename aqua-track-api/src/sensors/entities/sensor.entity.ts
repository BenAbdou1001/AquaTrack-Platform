/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Tank } from 'src/tanks/entities/tank.entity';
import { SensorData } from 'src/sensor-data/entities/sensor-datum.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; 

  @Column()
  kpi: string; 

  @ManyToOne(() => Tank, (tank) => tank.sensors)
  tank: Tank;

  // eslint-disable-next-line prettier/prettier
  @OneToMany(() => SensorData, (data) => data.sensor)
  data: SensorData[];
}
