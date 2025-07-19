/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TanksModule } from './tanks/tanks.module';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { AlertsModule } from './alerts/alerts.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { ForecastingModule } from './forecasting/forecasting.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotificationModule } from './notification/notification.module';
import { SensorsModule } from './sensors/sensors.module';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from './users/entities/user.entity';
import { Alert } from './alerts/entities/alert.entity';
import { Forecasting } from './forecasting/entities/forecasting.entity';
import { Reviews } from './reviews/entities/review.entity';
import { Sensor } from './sensors/entities/sensor.entity';
import { SensorData } from './sensor-data/entities/sensor-datum.entity';
import { Tank } from './tanks/entities/tank.entity';
import { Suggestion } from './suggestions/entities/suggestion.entity';
import { Notification } from './notification/entities/notification.entity';
config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev',
      password: '',
      database: 'aquaDB',
      entities: [
        User, 
        Alert,
        Forecasting,
        Notification,
        Reviews,
        Sensor,
        SensorData,
        Tank,
        Suggestion,
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TanksModule,
    SensorDataModule,
    AlertsModule,
    SuggestionsModule,
    ForecastingModule,
    ReviewsModule,
    NotificationModule,
    SensorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
