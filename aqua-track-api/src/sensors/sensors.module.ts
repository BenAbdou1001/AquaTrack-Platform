import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorData } from 'src/sensor-data/entities/sensor-datum.entity';
import { Tank } from 'src/tanks/entities/tank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, SensorData, Tank])],
  controllers: [SensorsController],
  providers: [SensorsService],
  exports: [SensorsService], // Exporting the service if needed in other modules
})
export class SensorsModule {}
