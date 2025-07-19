import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Suggestion } from './entities/suggestion.entity';
import { Repository } from 'typeorm';
import { Tank } from 'src/tanks/entities/tank.entity';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectRepository(Suggestion)
    private suggestionRepository: Repository<Suggestion>,

    @InjectRepository(Tank)
    private tankRepository: Repository<Tank>,
  ) { }
  async create(createSuggestionDto: CreateSuggestionDto): Promise<Suggestion> {
    const tank = await this.tankRepository.findOneBy({ id: createSuggestionDto.tankId });
    if (!tank) throw new NotFoundException('tank not found');

    const data = this.suggestionRepository.create({
      kpi: createSuggestionDto.kpi,
      message: createSuggestionDto.message,
      tank: tank,
      createdAt: new Date(createSuggestionDto.createdAt),
    });

    return await this.suggestionRepository.save(data);
  }

  async findAll() {
    return await this.suggestionRepository.find({ relations: ['tank'] });
  }

  async findOne(id: string) {
    const suggestion = await this.suggestionRepository.findOne({ where: { id }, relations: ['tank'] });
    if (!suggestion) throw new NotFoundException('Suggestion not found');
    return suggestion;
  }

  async update(id: string, updateSuggestionDto: UpdateSuggestionDto) {
    const suggestion = await this.suggestionRepository.findOneBy({ id });
    if (!suggestion) throw new NotFoundException('Suggestion not found');
    await this.suggestionRepository.update(id, updateSuggestionDto);
    return await this.suggestionRepository.findOne({ where: { id }, relations: ['tank'] });
  }

  async remove(id: string) {
    const result = await this.suggestionRepository.delete(id);
    // return result.affected > 0;
  }
}
