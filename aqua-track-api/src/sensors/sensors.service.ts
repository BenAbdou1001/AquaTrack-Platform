import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tank } from 'src/tanks/entities/tank.entity';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Tank)
    private readonly tankRepo: Repository<Tank>,

    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,
  ) { }
  async create(dto: CreateSensorDto): Promise<Sensor> {
    const tank = await this.tankRepo.findOneBy({ id: dto.tankId });
    if (!tank) throw new NotFoundException('Tank not found');

    const sensor = this.sensorRepo.create({
      type: dto.type,
      kpi: dto.kpi,
      tank,
    });

    return await this.sensorRepo.save(sensor);
  }

  async findAll() {
    return await this.sensorRepo.find({ relations: ['tank'] });
  }

  async findOne(id: string) {
    const sensor = await this.sensorRepo.findOne({ where: { id }, relations: ['tank'] });
    if (!sensor) throw new NotFoundException('Sensor not found');
    return sensor;
  }

  async update(id: string, updateSensorDto: UpdateSensorDto) {
    const sensor = await this.sensorRepo.findOneBy({ id });
    if (!sensor) throw new NotFoundException('Sensor not found');
    await this.sensorRepo.update(id, updateSensorDto);
    return await this.sensorRepo.findOne({ where: { id }, relations: ['tank'] });
  }

  async remove(id: string) {
    const result = await this.sensorRepo.delete(id);
    // return result.affected > 0;
  }
}
