import { ApiProperty } from '@nestjs/swagger';

export class CreateForkliftStepDto {
  @ApiProperty()
  readonly point_name: string;
  @ApiProperty()
  readonly time: Date;
  @ApiProperty()
  readonly order_id: string;
}
