import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  // @ApiProperty()
  @IsString()
  title: string;

  // @ApiProperty()
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

  // @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  countView?: string;
}
