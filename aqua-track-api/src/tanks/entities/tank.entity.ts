/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Alert } from 'src/alerts/entities/alert.entity';
import { Forecasting } from 'src/forecasting/entities/forecasting.entity';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { Reviews } from 'src/reviews/entities/review.entity';
import { Suggestion } from 'src/suggestions/entities/suggestion.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class Tank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @OneToMany(() => Sensor, (sensor) => sensor.tank)
  sensors: Sensor[];

  @OneToMany(() => Alert, (alert) => alert.tank)
  alerts: Alert[];

  @OneToMany(() => Suggestion, (s) => s.tank)
  suggestions: Suggestion[];

  @OneToMany(() => Forecasting, (f) => f.tank)
  forecasts: Forecasting[];

  @OneToMany(() => Reviews, (r) => r.tank)
  reviews: Reviews[];
}
