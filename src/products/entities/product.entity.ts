import { CreateProductDto } from './../dto/create-product.dto';

export class Product {
    id?: number;
    name: string = '';
    description: string = '';
    price: number = 0;
    constructor(init?: CreateProductDto) {
        
    }
}
