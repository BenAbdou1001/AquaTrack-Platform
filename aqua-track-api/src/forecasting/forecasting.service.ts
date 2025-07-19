import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateForecastingDto } from './dto/create-forecasting.dto';
import { UpdateForecastingDto } from './dto/update-forecasting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tank } from 'src/tanks/entities/tank.entity';
import { Forecasting } from './entities/forecasting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForecastingService {
  constructor(
    @InjectRepository(Forecasting)
    private readonly forecastingRepo: Repository<Forecasting>,

    @InjectRepository(Tank)
    private readonly tankRepo: Repository<Tank>,
  ) { }
  async create(createForecastingDto: CreateForecastingDto) {
    const tank = await this.tankRepo.findOne({ where: { id: createForecastingDto.tankId } });
    if (!tank) {
      throw new NotFoundException('Tank not found');
    }
    const forecast = this.forecastingRepo.create({
      ...createForecastingDto,
      tank
    });
    const saved = await this.forecastingRepo.save(forecast);
    // await this.notifyFrontend(saved);
    return saved;
  }

  findAll(): Promise<Forecasting[]> {
    return this.forecastingRepo.find();
  }

  async findOne(id: string): Promise<Forecasting | null> {
    return await this.forecastingRepo.findOne({ where: { id } });
  }

  async update(id: string, updateForecastingDto: UpdateForecastingDto): Promise<Forecasting | null> {
    await this.forecastingRepo.update(id, updateForecastingDto);
    return this.forecastingRepo.findOne({ where: { id } });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.forecastingRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
