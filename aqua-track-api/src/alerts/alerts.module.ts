/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Alert } from './entities/alert.entity';
import { Tank } from 'src/tanks/entities/tank.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Alert,Tank])],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
