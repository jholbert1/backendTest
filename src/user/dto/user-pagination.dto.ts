import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class UserPaginationDto {
  @ApiProperty({
    default: 10,
    description: 'skip',
    required: false,
  })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  perPage?: number;

  @ApiProperty({
    default: 1,
    description: 'page',
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  page?: number;
}
