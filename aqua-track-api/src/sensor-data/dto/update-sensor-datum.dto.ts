import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDataDto } from './create-sensor-datum.dto';


export class UpdateSensorDatumDto extends PartialType(CreateSensorDataDto) {}
