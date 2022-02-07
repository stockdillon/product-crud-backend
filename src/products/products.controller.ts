import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  ConflictException,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    if (
      this.productsService.products.find(
        (p) => p.name === createProductDto.name,
      )
    ) {
      throw new ConflictException();
    } else {
      try {
        this.productsService.create(createProductDto);
      } catch {
        throw new InternalServerErrorException();
      }
    }
    res.json({ statusCode: HttpStatus.OK, message: 'success' });
    res.send();
  }

  @Get()
  findAll() {
    return this.productsService.findAll() ?? [];
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    const product = this.productsService.findOne(name);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  @Patch(':name')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @Param('name') name: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (!updateProductDto.description && !updateProductDto.price) {
      throw new BadRequestException(
        'One or more fields (description, price) must be defined',
      );
    }
    return this.productsService.update(name, updateProductDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.productsService.remove(name);
  }
}
