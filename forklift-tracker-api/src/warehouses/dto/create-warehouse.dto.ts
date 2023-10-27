import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @ApiProperty()
  readonly coordX: string;
  @ApiProperty()
  readonly coordY: string;
  @ApiProperty()
  name: string;
}
