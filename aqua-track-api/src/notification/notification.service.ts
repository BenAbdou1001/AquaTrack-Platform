/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const notif = this.notificationRepo.create(createNotificationDto);
    const saved = await this.notificationRepo.save(notif);
    // await this.notifyFrontend(saved);
    return saved;
  }

  async findAll() {
    return this.notificationRepo.find();
  }

  async findOne(id: string) {
    return this.notificationRepo.findOne({ where: { id } });
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    await this.notificationRepo.update(id, updateNotificationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.notificationRepo.delete(id);
    return { deleted: true };
  }
}
