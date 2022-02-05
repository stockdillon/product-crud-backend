import { PartialType } from '@nestjs/mapped-types';
import {
  MaxLength,
  MinLength,
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsString,
  IsEmpty,
} from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsEmpty()
  name: string;

  @IsString()
  @MaxLength(1000)
  @MinLength(5)
  @IsOptional()
  description: string;

  @IsNumber()
  @Max(20000)
  @Min(1)
  @IsOptional()
  price: number;
}
