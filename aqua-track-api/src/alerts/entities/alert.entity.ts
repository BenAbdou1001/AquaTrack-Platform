import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tank } from 'src/tanks/entities/tank.entity';
@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kpi: string; // KPI affected

  @Column()
  severity: 'info' | 'warning' | 'critical';

  @Column()
  status: 'active' | 'resolved';

  @Column()
  type: 'threshold' | 'anomaly' | 'maintenance';

  @Column()
  image: string; // URL or path to the alert image

  @Column()
  message: string;

  @Column()
  timestamp: Date;

  @Column()
  triggeredAt: Date;

  @ManyToOne(() => Tank, (tank) => tank.alerts)
  tank: Tank;
}
