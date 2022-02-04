import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { Status } from 'src/status/status.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    let status: number = Status.Success;
    if(createProductDto.id === 999) {
      status = Status.BadRequest;
    } else {
      try {
        this.productsService.create(createProductDto);
      } catch {
        status = Status.ServerError;
      }
    }
    res.status(status);
    res.json({status});
    res.send();
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.productsService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateProductDto: Partial<UpdateProductDto>) {
    return this.productsService.update(name, updateProductDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.productsService.remove(name);
  }
}
