/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Tank } from 'src/tanks/entities/tank.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private readonly reviewsRepo: Repository<Reviews>,

    @InjectRepository(Tank)
    private readonly tankRepo: Repository<Tank>,
  ) { }
  async create(createReviewDto: CreateReviewDto) {
    const tank = await this.tankRepo.findOne({ where: { id: createReviewDto.tankId } });
    if (!tank) {
      throw new NotFoundException('Tank not found');
    }

    const review = this.reviewsRepo.create({
      ...createReviewDto,
      tank
    });
    return await this.reviewsRepo.save(review);
  }

  async findAll() {
    return await this.reviewsRepo.find();
  }

  async findOne(id: string) {
    return await this.reviewsRepo.findOne({ where: { id } });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    await this.reviewsRepo.update(id, updateReviewDto);
    return await this.reviewsRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.reviewsRepo.delete(id);
    // return result.affected > 0;
  }
}
