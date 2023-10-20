import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly warehouse_id: string;
}
