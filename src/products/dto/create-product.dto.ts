import { IsNotEmpty, IsNumberString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @MaxLength(1000)
    @MinLength(5)
    description: string;

    @IsNumberString()
    @Max(20000)
    @Min(1)
    price: number;    
}
