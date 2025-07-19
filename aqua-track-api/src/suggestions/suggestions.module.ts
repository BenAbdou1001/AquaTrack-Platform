/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { Suggestion } from './entities/suggestion.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Tank } from 'src/tanks/entities/tank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suggestion,Tank])],
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
  exports: [SuggestionsService], // Exporting the service if needed in other modules
})
export class SuggestionsModule {}
