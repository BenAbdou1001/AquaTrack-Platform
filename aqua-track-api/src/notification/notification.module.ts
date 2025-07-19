/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification,User])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService], // Exporting the service if needed in other modules
})
export class NotificationModule {}
