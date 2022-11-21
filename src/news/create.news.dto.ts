import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString({
    message: 'поле description должно быть строкой',
  })
  description: string;

  @ApiProperty({
    description: 'Description news',
    minimum: 1,
    maximum: 2,
  })
  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  countView?: string;
}
