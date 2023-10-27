import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckPointDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly next_check_point_distance: number;
  @ApiProperty()
  readonly path_id: string;
}
