import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dto/create-sensor-datum.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Sensor Data')
@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sensor data entry' })
  @ApiBody({ type: CreateSensorDataDto })
  @ApiResponse({
    status: 201,
    description: 'Sensor data created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid sensor data input.' })
  create(@Body() createSensorDatumDto: CreateSensorDataDto) {
    return this.sensorDataService.create(createSensorDatumDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a sensor data entry by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the sensor data entry',
  })
  @ApiResponse({ status: 200, description: 'Sensor data found.' })
  @ApiResponse({ status: 404, description: 'Sensor data not found.' })
  findOne(@Param('id') id: string) {
    return this.sensorDataService.findOne(id);
  }

  @Post('start-monitoring')
  @ApiOperation({ summary: 'Start real-time monitoring of sensor data' })
  @ApiResponse({ status: 200, description: 'Monitoring has been started.' })
  startMonitoring() {
    this.sensorDataService.startMonitoring();
    return { message: 'Monitoring started' };
  }

  @Post('stop-monitoring')
  @ApiOperation({ summary: 'Stop real-time monitoring of sensor data' })
  @ApiResponse({ status: 200, description: 'Monitoring has been stopped.' })
  stopMonitoring() {
    this.sensorDataService.stopMonitoring();
    return { message: 'Monitoring stopped' };
  }
}
