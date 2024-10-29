import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    minimum: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
export class AuthResponse {
  @ApiProperty({
    example: 'User registered successfully',
    description: 'Response message',
  })
  message: string;
}
