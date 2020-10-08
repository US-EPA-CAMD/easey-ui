import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FacilitiesFilter {
  // TODO: status validation pipe
  @IsOptional()
  @ApiPropertyOptional()
  status: string;
}
