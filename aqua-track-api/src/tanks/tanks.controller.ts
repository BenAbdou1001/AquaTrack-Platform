import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TanksService } from './tanks.service';
import { CreateTankDto } from './dto/create-tank.dto';
import { UpdateTankDto } from './dto/update-tank.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tanks')
@Controller('tanks')
export class TanksController {
  constructor(private readonly tanksService: TanksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tank' })
  @ApiResponse({ status: 201, description: 'Tank successfully created' })
  create(@Body() createTankDto: CreateTankDto) {
    return this.tanksService.create(createTankDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tanks' })
  @ApiResponse({ status: 200, description: 'List of tanks returned' })
  findAll() {
    return this.tanksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tank by ID' })
  @ApiParam({ name: 'id', description: 'Tank ID' })
  @ApiResponse({ status: 200, description: 'Tank found' })
  @ApiResponse({ status: 404, description: 'Tank not found' })
  findOne(@Param('id') id: string) {
    return this.tanksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tank' })
  @ApiParam({ name: 'id', description: 'Tank ID' })
  @ApiResponse({ status: 200, description: 'Tank successfully updated' })
  update(@Param('id') id: string, @Body() updateTankDto: UpdateTankDto) {
    return this.tanksService.update(id, updateTankDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tank' })
  @ApiParam({ name: 'id', description: 'Tank ID' })
  @ApiResponse({ status: 200, description: 'Tank successfully deleted' })
  remove(@Param('id') id: string) {
    return this.tanksService.remove(id);
  }
}
