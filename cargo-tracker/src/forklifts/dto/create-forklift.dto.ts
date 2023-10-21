import { ApiProperty } from '@nestjs/swagger';

export class CreateForkliftDto {
  @ApiProperty()
  readonly warehouse_name: string;
  @ApiProperty()
  readonly name: string;
}
