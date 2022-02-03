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

  update(name: string, updateProductDto: UpdateProductDto) {
    const original = this.products.find(p => p.name === name);
    original.name = updateProductDto?.name ?? original.name;
    original.description = updateProductDto?.description ?? original.description;
    original.price = updateProductDto?.price ?? original.price;
    return { product: original };
  }

  remove(name: string) {
    this.products = this.products.filter(p => !(p.name === name))
    return { message: `This action removes a #${name} product`};
  }
}
