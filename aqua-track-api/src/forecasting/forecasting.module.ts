import { Module } from '@nestjs/common';
import { ForecastingService } from './forecasting.service';
import { ForecastingController } from './forecasting.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Forecasting } from './entities/forecasting.entity';
import { Tank } from 'src/tanks/entities/tank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forecasting, Tank])],
  controllers: [ForecastingController],
  providers: [ForecastingService],
  exports: [ForecastingService], // Exporting the service if needed in other modules
})
export class ForecastingModule {}
