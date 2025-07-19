/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Tank } from 'src/tanks/entities/tank.entity';

// import FirebaseNotificationService from '../notification/firebase.service'; // optional

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepo: Repository<Alert>,

    @InjectRepository(Tank)
    private readonly tankRepo: Repository<Tank>,
  ) { }

  async create(createAlertDto: CreateAlertDto) {
    const tank = await this.tankRepo.findOne({ where: { id: createAlertDto.tankId } });
    console.log("tank: ", tank)
    if (!tank) {
      throw new NotFoundException('Tank not found');
    }
    const alert = this.alertRepo.create({
      ...createAlertDto,
      timestamp: new Date(),
      triggeredAt: new Date(),
      tank,
    });
    const saved = await this.alertRepo.save(alert);
    return saved;
  }

  findAll() {
    return this.alertRepo.find({ relations: ['tank'] });
  }

  findOne(id: number) {
    return this.alertRepo.findOne({ where: { id: id.toString() }, relations: ['tank'] });
  }

  async update(id: number, updateAlertDto: UpdateAlertDto) {
    await this.alertRepo.update(id, updateAlertDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.alertRepo.delete(id);
    return { message: 'Deleted successfully' };
  }
}
