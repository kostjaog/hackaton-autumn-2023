import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @ApiPropertyOptional()
  readonly coordX?: string;
  @ApiPropertyOptional()
  readonly coordY?: string;
}
