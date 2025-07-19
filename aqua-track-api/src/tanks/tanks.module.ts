/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TanksService } from './tanks.service';
import { TanksController } from './tanks.controller';
import { Tank } from './entities/tank.entity';
import { Alert } from 'src/alerts/entities/alert.entity';
import { Forecasting } from 'src/forecasting/entities/forecasting.entity';
import { Suggestion } from 'src/suggestions/entities/suggestion.entity';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { Reviews } from 'src/reviews/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tank, Sensor, Alert, Suggestion, Forecasting, Reviews])],
  controllers: [TanksController],
  providers: [TanksService],
  exports: [TanksService], // Exporting the service if needed in other modules
})
export class TanksModule {}

