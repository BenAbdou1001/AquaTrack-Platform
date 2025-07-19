import { PartialType } from '@nestjs/mapped-types';
import { CreateForecastingDto } from './create-forecasting.dto';

export class UpdateForecastingDto extends PartialType(CreateForecastingDto) {}
