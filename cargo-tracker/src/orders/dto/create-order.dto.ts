import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  readonly path_id: string;
  @ApiProperty()
  readonly forklift_name: string;
  @ApiProperty()
  warehouse_id: string;
}
