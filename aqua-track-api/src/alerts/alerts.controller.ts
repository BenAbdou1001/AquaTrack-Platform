import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertService: AlertsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new alert' })
  @ApiBody({ type: CreateAlertDto })
  @ApiResponse({
    status: 201,
    description: 'The alert has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request payload.' })
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertService.create(createAlertDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all alerts' })
  @ApiResponse({
    status: 200,
    description: 'List of alerts returned successfully.',
  })
  findAll() {
    return this.alertService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get alert by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the alert' })
  @ApiResponse({ status: 200, description: 'Alert found.' })
  @ApiResponse({ status: 404, description: 'Alert not found.' })
  findOne(@Param('id') id: string) {
    return this.alertService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an alert by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the alert to update',
  })
  @ApiBody({ type: UpdateAlertDto })
  @ApiResponse({ status: 200, description: 'Alert updated successfully.' })
  @ApiResponse({ status: 404, description: 'Alert not found.' })
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertService.update(+id, updateAlertDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an alert by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the alert to delete',
  })
  @ApiResponse({ status: 200, description: 'Alert deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Alert not found.' })
  remove(@Param('id') id: string) {
    return this.alertService.remove(+id);
  }
}
