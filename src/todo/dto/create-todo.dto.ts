import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  todo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
