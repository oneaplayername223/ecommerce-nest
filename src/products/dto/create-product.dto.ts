import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
/* istambul ignore file */
export class CreateProductDto {
    
    id?: number
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    product: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    description: string;
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
    @IsNumber()
    @IsNotEmpty()
    price: number;
    userId: number
}
