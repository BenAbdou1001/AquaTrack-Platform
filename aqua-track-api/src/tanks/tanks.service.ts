import { Injectable } from '@nestjs/common';
import { CreateTankDto } from './dto/create-tank.dto';
import { UpdateTankDto } from './dto/update-tank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tank } from './entities/tank.entity';

@Injectable()
export class TanksService {
  constructor(
    @InjectRepository(Tank)
    private readonly tankRepo: Repository<Tank>,
  ) { }

  async create(createTankDto: CreateTankDto) {
    const tank = this.tankRepo.create(createTankDto);
    return await this.tankRepo.save(tank);
  }

  findAll() {
    return this.tankRepo.find();
  }

  async findOne(id: string) {
    return await this.tankRepo.findOne({ where: { id } });
  }

  async update(id: string, updateTankDto: UpdateTankDto) {
    await this.tankRepo.update(id, updateTankDto);
    return this.tankRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.tankRepo.delete(id);
    // return result.affected > 0;
  }
}
