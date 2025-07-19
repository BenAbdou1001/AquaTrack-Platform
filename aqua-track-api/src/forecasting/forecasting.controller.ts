import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ForecastingService } from './forecasting.service';
import { CreateForecastingDto } from './dto/create-forecasting.dto';
import { UpdateForecastingDto } from './dto/update-forecasting.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Forecasting')
@Controller('forecasting')
export class ForecastingController {
  constructor(private readonly forecastingService: ForecastingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new forecasting entry' })
  @ApiBody({ type: CreateForecastingDto })
  @ApiResponse({
    status: 201,
    description: 'Forecasting data created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  create(@Body() createForecastingDto: CreateForecastingDto) {
    return this.forecastingService.create(createForecastingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all forecasting entries' })
  @ApiResponse({
    status: 200,
    description: 'List of forecasting entries retrieved successfully.',
  })
  findAll() {
    return this.forecastingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific forecasting entry by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the forecasting entry',
  })
  @ApiResponse({
    status: 200,
    description: 'Forecasting entry retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Forecasting entry not found.' })
  findOne(@Param('id') id: string) {
    return this.forecastingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific forecasting entry' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the forecasting entry to update',
  })
  @ApiBody({ type: UpdateForecastingDto })
  @ApiResponse({
    status: 200,
    description: 'Forecasting entry updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Forecasting entry not found.' })
  update(
    @Param('id') id: string,
    @Body() updateForecastingDto: UpdateForecastingDto,
  ) {
    return this.forecastingService.update(id, updateForecastingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a forecasting entry by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the forecasting entry to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Forecasting entry deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Forecasting entry not found.' })
  remove(@Param('id') id: string) {
    return this.forecastingService.remove(id);
  }
}
