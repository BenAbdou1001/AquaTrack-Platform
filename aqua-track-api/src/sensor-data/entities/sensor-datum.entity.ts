/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity()
export class SensorData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  value: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Sensor, (sensor) => sensor.data)
  sensor: Sensor;
}
