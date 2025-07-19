/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Reviews } from './entities/review.entity';
import { Tank } from 'src/tanks/entities/tank.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Reviews,Tank])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService], // Exporting the service if needed in other modules
})
export class ReviewsModule {}
