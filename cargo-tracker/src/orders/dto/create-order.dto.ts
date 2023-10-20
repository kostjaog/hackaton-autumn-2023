import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  readonly path_id: string;
  @ApiProperty()
  readonly forklift_id: string;
}
