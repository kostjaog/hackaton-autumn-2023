import { ApiProperty } from '@nestjs/swagger';

export class CreatePathDto {
  @ApiProperty()
  readonly target_name: string;
}
