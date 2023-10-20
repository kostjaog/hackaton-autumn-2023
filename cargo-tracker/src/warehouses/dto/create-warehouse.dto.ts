import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @ApiPropertyOptional()
  readonly coordX?: string;
  @ApiPropertyOptional()
  readonly coordY?: string;
  @ApiProperty()
  name: string;
}
