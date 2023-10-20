import { ApiProperty } from '@nestjs/swagger';

export class CreateForkliftDto {
  @ApiProperty()
  readonly warehouse_id: string;
  @ApiProperty()
  readonly name: string;
}
