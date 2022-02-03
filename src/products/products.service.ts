import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  products: Product[] = [
    {
      name: 'macbook',
      description: 'an apple laptop',
      price: 2700,
    },
    {
      name: 'monitor-arm',
      description: 'ergonomic VESA display mount',
      price: 800
    },
  ];
  create(createProductDto: CreateProductDto) {
    this.products.push(createProductDto);
  }

  findAll() {
    return this.products;
  }

  findOne(name: string) {
    const product = this.products.find(prod => prod.name === name) ?? null;
    return { product };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
