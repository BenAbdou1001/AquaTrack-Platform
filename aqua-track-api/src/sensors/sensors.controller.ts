import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Sensors')
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sensor' })
  @ApiBody({ type: CreateSensorDto })
  @ApiResponse({ status: 201, description: 'Sensor created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid sensor data.' })
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all sensors' })
  @ApiResponse({ status: 200, description: 'List of all sensors.' })
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a sensor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the sensor' })
  @ApiResponse({ status: 200, description: 'Sensor retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Sensor not found.' })
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sensor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the sensor to update' })
  @ApiBody({ type: UpdateSensorDto })
  @ApiResponse({ status: 200, description: 'Sensor updated successfully.' })
  @ApiResponse({ status: 404, description: 'Sensor not found.' })
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sensor by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the sensor to delete' })
  @ApiResponse({ status: 200, description: 'Sensor deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Sensor not found.' })
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(id);
  }
}
