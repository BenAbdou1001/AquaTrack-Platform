/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorDataController } from './sensor-data.controller';
import { SensorData } from './entities/sensor-datum.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { Tank } from 'src/tanks/entities/tank.entity';
import { SensorDataGateway } from './sensor-data.gateway';
import { Alert } from 'src/alerts/entities/alert.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tank, Sensor, SensorData, Alert])], // Added Alert entity]
  controllers: [SensorDataController],
  providers: [SensorDataService,SensorDataGateway],
  exports: [SensorDataService], // Exporting the service if needed in other modules
})
export class SensorDataModule {}
